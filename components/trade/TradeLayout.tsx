"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import TrendingSidebar from "./TrendingSidebar";
import TokenHeader from "./TokenHeader";
import HoldersTable from "./HoldersTable";
import LiveTradesFeed from "./LiveTradesFeed";
import TradeExecutionPanel from "./TradeExecutionPanel";

const TradingViewChart = dynamic(() => import("./TradingViewChart"), {
  ssr: false,
  loading: () => (
    <div className="relative flex h-[350px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/40 p-6 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
        <span className="text-xs font-medium text-white/50">
          Loading chart...
        </span>
      </div>
    </div>
  ),
});

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
            <TradingViewChart address={tokenId} />

            {/* Tables Area */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <HoldersTable address={tokenId} />
              <LiveTradesFeed address={tokenId} />
            </div>
          </div>
        </main>

        {/* Right Panel: Buy/Sell Execution */}
        <section
          className={`w-full shrink-0 flex-col overflow-y-auto bg-black/30 p-2 backdrop-blur-md md:flex md:w-[300px] lg:w-[350px] ${
            activeTab === "trade" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* // MOCK  */}
          <TradeExecutionPanel
            tokenSymbol={initialData?.symbol || "TOKEN"}
            tokenAddress={tokenId}
            solPrice={123}
          />
        </section>
      </div>
    </div>
  );
}
