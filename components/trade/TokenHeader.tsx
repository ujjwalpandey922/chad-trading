"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { TokenOverview } from "@/lib/birdeye/client";
import { useState } from "react";

interface TokenHeaderProps {
  address: string;
  initialData?: {
    symbol?: string;
    price?: number;
    change?: number;
    logo?: string | null;
  };
}

export default function TokenHeader({
  address,
  initialData,
}: TokenHeaderProps) {
  const [copied, setCopied] = useState(false);

  const { data: token, isLoading } = useQuery<TokenOverview>({
    queryKey: ["token-overview", address],
    queryFn: async () => {
      const res = await fetch(`/api/tokens/${address}`);
      if (!res.ok) throw new Error("Failed to fetch token overview");
      return res.json();
    },
    refetchInterval: 30 * 1000, // refresh every 30s
  });

  const displaySymbol = token?.symbol || initialData?.symbol || "UNKNOWN";
  const displayName =
    token?.name ||
    (initialData?.symbol ? `${initialData.symbol} Token` : "Unknown Token");
  const displayPrice = token?.price ?? initialData?.price ?? null;
  const displayChange =
    token?.priceChange24hPercent ?? initialData?.change ?? null;
  const displayLogo = token?.logoURI || initialData?.logo || null;

  const isPositive = displayChange !== null ? displayChange >= 0 : true;

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border-b border-white/10 bg-black/20 p-4 backdrop-blur-md sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Token Info Identity */}
        <div className="flex min-w-0 items-center gap-4">
          {displayLogo ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/15 bg-black/40 shadow-lg">
              <Image
                src={displayLogo}
                alt={displaySymbol}
                fill
                sizes="48px"
                className="object-cover"
                unoptimized={displayLogo.startsWith("http")}
              />
            </div>
          ) : (
            <div className="dshrink-0 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-400/30 bg-yellow-400/20 text-lg font-bold text-yellow-400 shadow-lg">
              {displaySymbol.slice(0, 2)}
            </div>
          )}

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-xl font-extrabold text-white sm:text-2xl">
                {displayName}
              </h1>
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-bold text-white/80">
                {displaySymbol}
              </span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
              <span className="max-w-[150px] truncate font-mono sm:max-w-none">
                {address}
              </span>
              <button
                onClick={copyAddress}
                className="p-0.5 transition-colors duration-150 hover:text-white"
                title="Copy Address"
              >
                {copied ? (
                  <span className="font-semibold text-emerald-400">
                    Copied!
                  </span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Price & Change */}
          <div className="text-left sm:text-right">
            <div className="text-xs font-bold tracking-wider text-white/40 uppercase">
              Price
            </div>
            {displayPrice !== null ? (
              <div className="mt-0.5 flex items-center gap-2">
                <span className="font-mono text-lg font-bold text-white sm:text-xl">
                  $
                  {displayPrice < 0.01
                    ? displayPrice.toFixed(6)
                    : displayPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 4,
                      })}
                </span>
                {displayChange !== null && (
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-xs font-bold ${
                      isPositive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-rose-500/10 text-rose-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {displayChange.toFixed(2)}%
                  </span>
                )}
              </div>
            ) : (
              <div className="mt-1 h-6 w-24 animate-pulse rounded bg-white/10" />
            )}
          </div>

          {/* Market Cap */}
          <div className="border-l border-white/10 pl-4 text-left sm:pl-6 sm:text-right">
            <div className="text-xs font-bold tracking-wider text-white/40 uppercase">
              Market Cap
            </div>
            {isLoading ? (
              <div className="mt-1 h-6 w-20 animate-pulse rounded bg-white/10" />
            ) : token?.mc ? (
              <div className="mt-0.5 font-mono text-base font-bold text-white/90">
                $
                {token.mc.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            ) : (
              <div className="mt-0.5 text-sm text-white/60">—</div>
            )}
          </div>

          {/* 24h Volume */}
          <div className="border-l border-white/10 pl-4 text-left sm:pl-6 sm:text-right">
            <div className="text-xs font-bold tracking-wider text-white/40 uppercase">
              24h Vol
            </div>
            {isLoading ? (
              <div className="mt-1 h-6 w-20 animate-pulse rounded bg-white/10" />
            ) : token?.v24h ? (
              <div className="mt-0.5 font-mono text-base font-bold text-white/90">
                $
                {token.v24h.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </div>
            ) : (
              <div className="mt-0.5 text-sm text-white/60">—</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
