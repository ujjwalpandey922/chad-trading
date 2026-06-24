import { NextRequest, NextResponse } from "next/server";
import { fetchTokenHolders } from "@/lib/birdeye/client";

export const revalidate = 60; // cache 60s

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
  }

  try {
    const holders = await fetchTokenHolders(address);
    return NextResponse.json(holders, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
