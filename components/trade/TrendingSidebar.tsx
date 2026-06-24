"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { Token } from "@/lib/tokens";

interface TrendingSidebarProps {
  activeTokenId: string;
}

export default function TrendingSidebar({
  activeTokenId,
}: TrendingSidebarProps) {
  const {
    data: tokens,
    isLoading,
    error,
  } = useQuery<Token[]>({
    queryKey: ["trending-tokens"],
    queryFn: async () => {
      const res = await fetch("/api/tokens");
      if (!res.ok) throw new Error("Failed to fetch trending tokens");
      return res.json();
    },
    refetchInterval: 60 * 1000, // refresh every 60s
  });

  return (
    <div className="flex h-full flex-col border-r border-white/10 bg-black/40 backdrop-blur-md">
      <div className="border-b border-white/10 p-4">
        <h2 className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-white">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-yellow-400" />
          Trending Tokens
        </h2>
      </div>

      <div className="flex-1 divide-y divide-white/5 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-3 p-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex animate-pulse items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 rounded bg-white/10" />
                  <div className="h-2.5 w-24 rounded bg-white/10" />
                </div>
                <div className="h-3 w-12 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 text-center text-xs text-rose-400">
            Failed to load trending tokens
          </div>
        ) : tokens && tokens.length > 0 ? (
          tokens.map((token) => {
            const isActive =
              token.address.toLowerCase() === activeTokenId.toLowerCase();
            const isPositive = token.change24h >= 0;

            return (
              <Link
                key={token.address}
                href={`/trade/${token.address}?symbol=${token.symbol}&price=${token.price}&change=${token.change24h}${token.logoURI ? `&logo=${encodeURIComponent(token.logoURI)}` : ""}`}
                className={`flex items-center justify-between p-3.5 transition-all duration-150 ${
                  isActive
                    ? "border-l-4 border-yellow-400 bg-yellow-400/10 text-white"
                    : "text-white/80 hover:bg-white/3 hover:text-white"
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  {token.logoURI ? (
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-white/10 bg-black/40">
                      <Image
                        src={token.logoURI}
                        alt={token.symbol}
                        fill
                        sizes="32px"
                        className="object-cover"
                        unoptimized={token.logoURI.startsWith("http")}
                      />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/20 text-xs font-bold text-yellow-400">
                      {token.symbol.slice(0, 2)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-bold">
                        {token.symbol}
                      </span>
                    </div>
                    <span className="block max-w-[130px] truncate text-[11px] text-white/40">
                      {token.name}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="font-mono text-sm font-semibold">
                    $
                    {token.price < 0.01
                      ? token.price.toFixed(6)
                      : token.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                  </div>
                  <div
                    className={`font-mono text-[10px] font-bold ${
                      isPositive ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {token.change24h.toFixed(2)}%
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-4 text-center text-xs text-white/40">
            No tokens found
          </div>
        )}
      </div>
    </div>
  );
}
