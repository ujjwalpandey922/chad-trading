"use client";

import { useQuery } from "@tanstack/react-query";
import { TokenHolder } from "@/lib/birdeye/client";

interface HoldersTableProps {
  address: string;
}

export default function HoldersTable({ address }: HoldersTableProps) {
  const {
    data: holders,
    isLoading,
    error,
  } = useQuery<TokenHolder[]>({
    queryKey: ["token-holders", address],
    queryFn: async () => {
      const res = await fetch(`/api/tokens/${address}/holders`);
      if (!res.ok) throw new Error("Failed to fetch token holders");
      return res.json();
    },
    refetchInterval: 60 * 1000,
  });

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 backdrop-blur-md">
      <h3 className="mb-4 flex items-center gap-2 text-base font-extrabold text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-yellow-400"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        Top Holders
      </h3>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-3 py-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center justify-between gap-4"
              >
                <div className="h-4 w-6 rounded bg-white/10" />
                <div className="h-4 w-32 rounded bg-white/10" />
                <div className="h-4 w-24 rounded bg-white/10" />
                <div className="h-4 w-12 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-4 text-center text-xs text-rose-400">
            Failed to load holders list
          </div>
        ) : holders && holders.length > 0 ? (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                <th className="pb-2 font-semibold">Rank</th>
                <th className="pb-2 font-semibold">Address</th>
                <th className="pb-2 text-right font-semibold">Balance</th>
                <th className="pb-2 text-right font-semibold">Share</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3 text-xs">
              {holders.map((holder, idx) => (
                <tr key={holder.owner + idx} className="hover:bg-white/2">
                  <td className="py-2.5 font-mono text-white/50">{idx + 1}</td>
                  <td className="py-2.5 font-mono text-white/80">
                    <a
                      href={`https://solscan.io/account/${holder.owner}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-150 hover:text-yellow-400"
                    >
                      {holder.owner.length > 15
                        ? `${holder.owner.slice(0, 6)}...${holder.owner.slice(-4)}`
                        : holder.owner}
                    </a>
                  </td>
                  <td className="py-2.5 text-right font-mono font-medium text-white/90">
                    {holder.uiAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="py-2.5 text-right font-mono font-bold text-white">
                    <div className="flex items-center justify-end gap-2">
                      <span>{holder.percent.toFixed(2)}%</span>
                      <div className="hidden h-1.5 w-12 overflow-hidden rounded-full bg-white/10 sm:block">
                        <div
                          className="h-full rounded-full bg-yellow-400"
                          style={{ width: `${Math.min(holder.percent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-4 text-center text-xs text-white/40">
            No holders found
          </div>
        )}
      </div>
    </div>
  );
}
