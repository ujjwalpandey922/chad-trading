import { NextResponse } from "next/server";
import { FALLBACK_TOKENS } from "@/lib/tokens";

export const revalidate = 60; // Cache this route for 60 seconds

const BIRDEYE_CHAIN = "solana";
const SOLANA_ADDRESS_PATTERN = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

interface BirdEyeToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  price?: number;
  logoURI?: string;
  v24hChangePercent?: number;
}

interface BirdEyePriceVolume {
  price?: number;
  priceChangePercent?: number;
}

function birdeyeHeaders(apiKey: string): HeadersInit {
  return {
    "X-API-KEY": apiKey,
    "x-chain": BIRDEYE_CHAIN,
    accept: "application/json",
  };
}

async function fetchPriceVolumeByAddress(
  apiKey: string,
  addresses: string[]
): Promise<Record<string, BirdEyePriceVolume>> {
  if (addresses.length === 0) return {};

  try {
    const response = await fetch(
      "https://public-api.birdeye.so/defi/price_volume/multi",
      {
        method: "POST",
        headers: {
          ...birdeyeHeaders(apiKey),
          "content-type": "application/json",
        },
        body: JSON.stringify({
          list_address: addresses.join(","),
          type: "24h",
        }),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) return {};

    const json = (await response.json()) as {
      success?: boolean;
      data?: Record<string, BirdEyePriceVolume>;
    };

    return json.success && json.data ? json.data : {};
  } catch {
    // Enrichment is optional — trending list still works without 24h change
    return {};
  }
}


export async function GET() {
  const apiKey = process.env.BIRDEYE_API_KEY;

  if (!apiKey) {
    console.log("BirdEye API Key not found, serving fallback tokens.");
    return NextResponse.json(FALLBACK_TOKENS, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  }

  try {
    // Solana-only trending list — scoped via x-chain header (not cross-chain)
    const response = await fetch(
      "https://public-api.birdeye.so/defi/token_trending?sort_by=rank&sort_type=asc&offset=0&limit=15",
      {
        headers: birdeyeHeaders(apiKey),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`BirdEye responded with status: ${response.status}`);
    }

    const json = await response.json();

    if (!json.success || !json.data || !json.data.tokens) {
      throw new Error("Invalid response format from BirdEye");
    }

    const trendingTokens = (json.data.tokens as BirdEyeToken[]).filter((t) =>
      SOLANA_ADDRESS_PATTERN.test(t.address)
    );

    const priceVolumeByAddress = await fetchPriceVolumeByAddress(
      apiKey,
      trendingTokens.map((t) => t.address)
    );

    // Map BirdEye structure to our application token schema
    const tokens = trendingTokens.map((t) => {
      const priceVolume = priceVolumeByAddress[t.address];

      return {
        address: t.address,
        symbol: t.symbol,
        name: t.name,
        price: priceVolume?.price ?? t.price ?? 0,
        change24h:
          priceVolume?.priceChangePercent ?? t.v24hChangePercent ?? 0,
        logoURI: t.logoURI || null,
      };
    });

    return NextResponse.json(tokens, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("Error fetching trending tokens from BirdEye:", error);
    // Graceful degradation fallback
    return NextResponse.json(FALLBACK_TOKENS, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  }
}
