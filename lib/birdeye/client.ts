export interface TokenOverview {
  address: string;
  symbol: string;
  name: string;
  price: number;
  mc: number;
  v24h: number;
  logoURI: string | null;
  priceChange24hPercent: number;
  supply: number;
}

export interface TokenHolder {
  owner: string;
  amount: number;
  uiAmount: number;
  percent: number;
}

export interface TokenTrade {
  txHash: string;
  blockUnixTime: number;
  side: "buy" | "sell";
  volumeUSD: number;
  fromAmount: number;
  fromSymbol: string;
  toAmount: number;
  toSymbol: string;
  priceUSD: number;
}

const BIRDEYE_CHAIN = "solana";

function birdeyeHeaders(apiKey: string): HeadersInit {
  return {
    "X-API-KEY": apiKey,
    "x-chain": BIRDEYE_CHAIN,
    accept: "application/json",
  };
}

export async function fetchTokenOverview(address: string): Promise<TokenOverview> {
  const apiKey = process.env.BIRDEYE_API_KEY;

  if (!apiKey) {
    console.log(`[BirdEye] API key missing. Serving fallback overview for: ${address}`);
    return getFallbackOverview(address);
  }

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/token_overview?address=${address}`,
      {
        headers: birdeyeHeaders(apiKey),
        next: { revalidate: 30 },
      }
    );

    if (!response.ok) {
      throw new Error(`Overview returned status ${response.status}`);
    }

    const json = await response.json();
    if (!json.success || !json.data) {
      throw new Error("Invalid overview format");
    }

    const d = json.data;
    return {
      address: d.address || address,
      symbol: d.symbol || "UNKNOWN",
      name: d.name || "Unknown Token",
      price: d.price || 0,
      mc: d.mc || 0,
      v24h: d.v24hUSD || d.v24h || 0,
      logoURI: d.logoURI || null,
      priceChange24hPercent: d.priceChange24hPercent || d.v24hChangePercent || 0,
      supply: d.supply || 0,
    };
  } catch (error) {
    console.error(`Error fetching overview for ${address}:`, error);
    return getFallbackOverview(address);
  }
}

export async function fetchTokenHolders(address: string, limit = 10): Promise<TokenHolder[]> {
  const apiKey = process.env.BIRDEYE_API_KEY;

  if (!apiKey) {
    console.log(`[BirdEye] API key missing. Serving fallback holders for: ${address}`);
    return getFallbackHolders(address, limit);
  }

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/v3/token/holder?address=${address}&offset=0&limit=${limit}`,
      {
        headers: birdeyeHeaders(apiKey),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Holders returned status ${response.status}`);
    }

    const json = await response.json();
    if (!json.success || !json.data || !json.data.items) {
      throw new Error("Invalid holders format");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return json.data.items.map((item: any) => ({
      owner: item.owner || "Unknown",
      amount: Number(item.amount) || 0,
      uiAmount: Number(item.ui_amount) || 0,
      percent: (Number(item.ui_amount) / (json.data.total_supply || 1)) * 100 || item.percentage || 0,
    }));
  } catch (error) {
    console.error(`Error fetching holders for ${address}:`, error);
    return getFallbackHolders(address, limit);
  }
}

export async function fetchTokenTrades(address: string, limit = 15): Promise<TokenTrade[]> {
  const apiKey = process.env.BIRDEYE_API_KEY;

  if (!apiKey) {
    console.log(`[BirdEye] API key missing. Serving fallback trades for: ${address}`);
    return getFallbackTrades(address, limit);
  }

  try {
    const response = await fetch(
      `https://public-api.birdeye.so/defi/txs/token?address=${address}&tx_type=swap&sort_type=desc&offset=0&limit=${limit}`,
      {
        headers: birdeyeHeaders(apiKey),
        next: { revalidate: 15 }, // frequent updates
      }
    );

    if (!response.ok) {
      throw new Error(`Trades returned status ${response.status}`);
    }

    const json = await response.json();
    if (!json.success || !json.data || !json.data.items) {
      throw new Error("Invalid trades format");
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return json.data.items.map((item: any) => {
      // Find swap direction details or fall back
      const side = item.side === "sell" ? "sell" : "buy";
      return {
        txHash: item.txHash,
        blockUnixTime: item.blockUnixTime,
        side,
        volumeUSD: item.volumeUSD || 0,
        fromAmount: item.fromAmount || 0,
        fromSymbol: item.fromSymbol || "SOL",
        toAmount: item.toAmount || 0,
        toSymbol: item.toSymbol || "TOKEN",
        priceUSD: item.priceUSD || 0,
      };
    });
  } catch (error) {
    console.error(`Error fetching trades for ${address}:`, error);
    return getFallbackTrades(address, limit);
  }
}

// Fallback Generators
function getFallbackOverview(address: string): TokenOverview {
  return {
    address,
    symbol: address.slice(0, 4).toUpperCase(),
    name: `Chad Token (${address.slice(0, 4)})`,
    price: 1.25,
    mc: 12500000,
    v24h: 340000,
    logoURI: null,
    priceChange24hPercent: 4.25,
    supply: 10000000,
  };
}

function getFallbackHolders(address: string, limit: number): TokenHolder[] {
  const holders: TokenHolder[] = [];
  let remainingPercent = 100;
  for (let i = 0; i < limit; i++) {
    const share = Math.min(remainingPercent * 0.45, 10 + Math.random() * 15);
    remainingPercent -= share;
    holders.push({
      owner: `${i === 0 ? "Raydium Pool" : `Owner${i}`}...${address.slice(-4)}`,
      amount: 1000000 * share,
      uiAmount: 1000000 * share,
      percent: Number(share.toFixed(2)),
    });
  }
  return holders;
}

function getFallbackTrades(address: string, limit: number): TokenTrade[] {
  const trades: TokenTrade[] = [];
  const baseTime = Math.floor(Date.now() / 1000);
  for (let i = 0; i < limit; i++) {
    const isBuy = Math.random() > 0.5;
    const amount = 50 + Math.random() * 5000;
    const price = 1.25 + (Math.random() - 0.5) * 0.1;
    trades.push({
      txHash: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 6)}`,
      blockUnixTime: baseTime - i * 45,
      side: isBuy ? "buy" : "sell",
      volumeUSD: amount * price,
      fromAmount: isBuy ? amount * price : amount,
      fromSymbol: isBuy ? "USDC" : "TOKEN",
      toAmount: isBuy ? amount : amount * price,
      toSymbol: isBuy ? "TOKEN" : "USDC",
      priceUSD: price,
    });
  }
  return trades;
}
