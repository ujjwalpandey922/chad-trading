"use client";

import { useQuery } from "@tanstack/react-query";
import { TokenTrade } from "@/lib/birdeye/client";

interface LiveTradesFeedProps {
  address: string;
}

export default function LiveTradesFeed({ address }: LiveTradesFeedProps) {
  const {
    data: trades,
    isLoading,
    error,
  } = useQuery<TokenTrade[]>({
    queryKey: ["token-trades", address],
    queryFn: async () => {
      const res = await fetch(`/api/tokens/${address}/trades`);
      if (!res.ok) throw new Error("Failed to fetch token trades");
      return res.json();
    },
    refetchInterval: 15 * 1000, // rapid 15s updates for trades feed
  });

  const formatTime = (unixTime: number) => {
    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

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
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
        Live Trades
      </h3>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="space-y-3 py-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center justify-between gap-4"
              >
                <div className="h-4 w-12 rounded bg-white/10" />
                <div className="h-4 w-10 rounded bg-white/10" />
                <div className="h-4 w-16 rounded bg-white/10" />
                <div className="h-4 w-20 rounded bg-white/10" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-4 text-center text-xs text-rose-400">
            Failed to load trades feed
          </div>
        ) : trades && trades.length > 0 ? (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold tracking-wider text-white/40 uppercase">
                <th className="pb-2 font-semibold">Time</th>
                <th className="pb-2 font-semibold">Type</th>
                <th className="pb-2 text-right font-semibold">Price</th>
                <th className="pb-2 text-right font-semibold">Amount</th>
                <th className="pb-2 text-right font-semibold">Total</th>
                <th className="pb-2 text-right font-semibold">TX</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/3 text-xs">
              {trades.map((trade) => {
                const isBuy = trade.side === "buy";
                return (
                  <tr key={trade.txHash} className="hover:bg-white/2">
                    <td className="py-2.5 font-mono text-white/50">
                      {formatTime(trade.blockUnixTime)}
                    </td>
                    <td className="py-2.5 font-bold">
                      <span
                        className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase ${
                          isBuy
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {trade.side}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-white/80">
                      $
                      {trade.priceUSD < 0.01
                        ? trade.priceUSD.toFixed(6)
                        : trade.priceUSD.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 4,
                          })}
                    </td>
                    <td className="py-2.5 text-right font-mono text-white/80">
                      {trade.fromSymbol === "USDC" || trade.fromSymbol === "SOL"
                        ? trade.toAmount.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })
                        : trade.fromAmount.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                          })}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-white/90">
                      $
                      {trade.volumeUSD.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-2.5 text-right font-mono text-white/40">
                      <a
                        href={`https://solscan.io/tx/${trade.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-150 hover:text-yellow-400"
                        title="View on Solscan"
                      >
                        ↗
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="py-4 text-center text-xs text-white/40">
            No trades found
          </div>
        )}
      </div>
    </div>
  );
}
