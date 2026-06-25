"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import { FALLBACK_TOKENS, type Token } from "@/lib/tokens";

interface TokenBannerProps {
  direction?: "left" | "right";
  speed?: "slow" | "medium" | "fast";
}

function TokenBannerSkeleton() {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-transparent py-3.5 backdrop-blur-xs">
      <div className="flex animate-pulse justify-around gap-8 px-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-white/10" />
            <div className="h-4 w-12 rounded-sm bg-white/10" />
            <div className="h-4 w-16 rounded-sm bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenBanner({
  direction = "left",
  speed = "medium",
}: TokenBannerProps) {
  const {
    data: tokens,
    isLoading,
    isError,
  } = useQuery<Token[]>({
    queryKey: ["trendingTokens"],
    queryFn: async () => {
      const res = await fetch("/api/tokens");
      if (!res.ok) {
        throw new Error("Failed to fetch tokens");
      }
      return res.json();
    },
    staleTime: 30000,
  });

  if (isLoading) {
    return <TokenBannerSkeleton />;
  }

  const tokenList = isError || !tokens?.length ? FALLBACK_TOKENS : tokens;

  const marqueeItems = [...tokenList];

  const speedClass =
    speed === "fast"
      ? "[animation-duration:20s]"
      : speed === "slow"
        ? "[animation-duration:50s]"
        : "[animation-duration:35s]";

  return (
    <div className="hover-pause relative w-full overflow-hidden border-y border-white/5 bg-transparent py-3.5 backdrop-blur-md">
      <div
        className={`flex w-max shrink-0 flex-nowrap items-center ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        } ${speedClass}`}
      >
        {marqueeItems.map((token, index) => {
          const isPositive = token.change24h >= 0;
          return (
            <Link
              key={`${token.address}-${index}`}
              href={`/trade/${token.address}?symbol=${token.symbol}&price=${token.price}&change=${token.change24h}&logo=${encodeURIComponent(token.logoURI || "")}`}
              className="mx-6 flex shrink-0 cursor-pointer items-center gap-3.5 rounded-xl border border-white/4 bg-white/2 px-4 py-1.5 transition duration-200 hover:scale-102 hover:border-white/10 hover:bg-white/8"
            >
              {token.logoURI ? (
                <div className="relative h-6 w-6 overflow-hidden rounded-full border border-white/10 bg-black/40">
                  <Image
                    src={token.logoURI}
                    alt={token.symbol}
                    fill
                    sizes="24px"
                    className="object-cover"
                    unoptimized={token.logoURI.startsWith("http")}
                  />
                </div>
              ) : (
                <div className="bg-primary/20 text-primary border-primary/30 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-bold">
                  {token.symbol.slice(0, 2)}
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-wide text-white">
                  {token.symbol}
                </span>
                <span className="text-muted/70 hidden max-w-20 truncate text-xs font-medium sm:inline">
                  {token.name}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-mono text-sm font-semibold text-white/90">
                  $
                  {token.price < 0.01
                    ? token.price.toFixed(6)
                    : token.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                </span>
                <span
                  className={`rounded-sm px-1.5 py-0.5 font-mono text-xs font-bold ${
                    isPositive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {token.change24h.toFixed(2)}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
