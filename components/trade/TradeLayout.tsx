"use client";

import { useState } from "react";
import Link from "next/link";
import TrendingSidebar from "./TrendingSidebar";
import TokenHeader from "./TokenHeader";
import HoldersTable from "./HoldersTable";
import LiveTradesFeed from "./LiveTradesFeed";

interface TradeLayoutProps {
  tokenId: string;
  initialData?: {
    symbol?: string;
    price?: number;
    change?: number;
    logo?: string | null;
  };
}

export default function TradeLayout({
  tokenId,
  initialData,
}: TradeLayoutProps) {
  const [activeTab, setActiveTab] = useState<"trending" | "details" | "trade">(
    "details"
  );

  return (
    <div className="bg-surface flex h-screen flex-col overflow-hidden">
      {/* Top Trading Header / Navigation bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            {/* Minimal Logo */}
            <span className="flex items-center gap-1.5 text-lg font-black tracking-tight text-white">
              <span className="text-yellow-400">CHAD</span>
              <span>TERMINAL</span>
            </span>
          </Link>
        </div>

        {/* Back Link */}
        <Link
          href="/"
          className="flex items-center gap-1 text-xs font-semibold text-white/60 transition-colors duration-150 hover:text-white"
        >
          ← Exit Terminal
        </Link>
      </header>

      {/* Mobile Tab Selectors (visible below md) */}
      <div className="flex shrink-0 border-b border-white/10 bg-black/20 md:hidden">
        <button
          onClick={() => setActiveTab("trending")}
          className={`flex-1 py-3 text-center text-xs font-bold tracking-wider uppercase transition-colors duration-150 ${
            activeTab === "trending"
              ? "border-b-2 border-yellow-400 text-yellow-400"
              : "text-white/40 hover:text-white/60"
          }`}
        >
          Trending
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`flex-1 py-3 text-center text-xs font-bold tracking-wider uppercase transition-colors duration-150 ${
            activeTab === "details"
              ? "border-b-2 border-yellow-400 text-yellow-400"
              : "text-white/40 hover:text-white/60"
          }`}
        >
          Details & Feed
        </button>
        <button
          onClick={() => setActiveTab("trade")}
          className={`flex-1 py-3 text-center text-xs font-bold tracking-wider uppercase transition-colors duration-150 ${
            activeTab === "trade"
              ? "border-b-2 border-yellow-400 text-yellow-400"
              : "text-white/40 hover:text-white/60"
          }`}
        >
          Trade
        </button>
      </div>

      {/* Main Grid View */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Trending List */}
        <aside
          className={`w-full shrink-0 flex-col md:flex md:w-[280px] lg:w-[320px] ${
            activeTab === "trending" ? "flex" : "hidden md:flex"
          }`}
        >
          <TrendingSidebar activeTokenId={tokenId} />
        </aside>

        {/* Middle Panel: Charts & Feed */}
        <main
          className={`flex-1 flex-col overflow-y-auto ${
            activeTab === "details"
              ? "flex"
              : "hidden border-r border-white/10 md:flex"
          }`}
        >
          <TokenHeader address={tokenId} initialData={initialData} />

          <div className="space-y-6 p-4 sm:p-6">
            {/* Chart Area Placeholder */}
            <div className="relative flex h-[350px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/10 bg-black/40 p-6 text-center">
              {/* Starry spacebg for depth */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
                style={{ backgroundImage: "url(/landing/space-bg.webp)" }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-3 flex h-12 w-12 animate-pulse items-center justify-center rounded-full border border-yellow-400/20 bg-yellow-400/10 text-yellow-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h4 className="text-base font-extrabold text-white">
                  Interactive Price Chart
                </h4>
                <p className="mt-1 max-w-sm text-xs text-white/40">
                  Candlestick intervals (1H, 4H, 1D) with real-time trade overlay.
                </p>
              </div>
            </div>

            {/* Tables Area */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <HoldersTable address={tokenId} />
              <LiveTradesFeed address={tokenId} />
            </div>
          </div>
        </main>

        {/* Right Panel: Buy/Sell Execution */}
        <section
          className={`w-full shrink-0 flex-col overflow-y-auto bg-black/30 p-4 backdrop-blur-md md:flex md:w-[300px] lg:w-[350px] ${
            activeTab === "trade" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Mock Order Form */}
          <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
            <h3 className="text-sm font-extrabold tracking-wider text-white uppercase">
              Execute Order
            </h3>

            {/* Buy / Sell Tabs */}
            <div className="grid grid-cols-2 gap-2 rounded-lg bg-white/5 p-1">
              <button className="rounded-md bg-emerald-500 py-1.5 text-xs font-bold text-white shadow-lg">
                BUY
              </button>
              <button className="rounded-md py-1.5 text-xs font-bold text-white/50 transition-colors duration-150 hover:text-white">
                SELL
              </button>
            </div>

            {/* Order Settings / Input fields */}
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold tracking-wider text-white/40 uppercase">
                  Pay Amount
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2">
                  <span className="font-mono text-sm font-bold text-white">
                    0.00
                  </span>
                  <span className="text-xs font-bold text-white/60">SOL</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold tracking-wider text-white/40 uppercase">
                  Receive Amount
                </label>
                <div className="mt-1 flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2">
                  <span className="font-mono text-sm font-bold text-white">
                    0.00
                  </span>
                  <span className="text-xs font-bold text-white/60">
                    {initialData?.symbol || "TOKEN"}
                  </span>
                </div>
              </div>
            </div>


            {/* Connect Wallet Trigger */}
            <button
              disabled
              className="hover:bg-yellow-350 mt-2 w-full cursor-not-allowed rounded-xl bg-yellow-400 py-3 text-xs font-bold text-black opacity-50 shadow-lg shadow-yellow-400/10 transition-all duration-150"
            >
              Connect Wallet to Trade
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
