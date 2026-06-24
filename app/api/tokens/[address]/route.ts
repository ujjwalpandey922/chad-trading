import { NextRequest, NextResponse } from "next/server";
import { fetchTokenOverview } from "@/lib/birdeye/client";

export const revalidate = 30; // cache 30s

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ address: string }> }
) {
  const { address } = await params;

  if (!address) {
    return NextResponse.json({ error: "Missing address parameter" }, { status: 400 });
  }

  try {
    const overview = await fetchTokenOverview(address);
    return NextResponse.json(overview, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
