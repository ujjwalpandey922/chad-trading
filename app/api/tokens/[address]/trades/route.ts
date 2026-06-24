import { NextRequest, NextResponse } from "next/server";
import { fetchTokenTrades } from "@/lib/birdeye/client";

export const revalidate = 15; // cache 15s

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
  }

  try {
    const trades = await fetchTokenTrades(address);
    return NextResponse.json(trades, {
      headers: {
        "Cache-Control": "public, s-maxage=15, stale-while-revalidate=5",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
