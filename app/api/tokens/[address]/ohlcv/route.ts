import { NextRequest, NextResponse } from "next/server";
import { fetchOHLCV } from "@/lib/birdeye/client";

export const revalidate = 60; // cache 60s

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;
  const { searchParams } = new URL(request.url);
  const resolution = searchParams.get("resolution") || "1H";

  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
  }

  try {
    const ohlcv = await fetchOHLCV(address, resolution);
    return NextResponse.json(ohlcv, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
