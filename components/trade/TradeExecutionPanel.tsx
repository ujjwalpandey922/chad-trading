"use client";

import { useState, useCallback, useEffect } from "react";

interface TradeExecutionPanelProps {
  tokenSymbol?: string;
  tokenAddress?: string;
  solPrice?: number;
}

type Side = "buy" | "sell";
type FeeMode = "fast" | "turbo" | "custom";
type SlipPreset = "0.5" | "1" | "2" | "custom";

// Mock position data — replace with real wallet + BirdEye balance queries
const MOCK_POSITION = {
  tokenBalance: 4_280_000,
  costBasisSol: 0.82,
  avgEntryUsd: 0.0000028,
  symbol: "BONK",
};

const SOL_BALANCE = 12.441; // replace with real wallet balance via Alchemy RPC

export default function TradeExecutionPanel({
  tokenSymbol = "TOKEN",
  tokenAddress,
  solPrice = 167.42,
}: TradeExecutionPanelProps) {
  const [side, setSide] = useState<Side>("buy");
  const [payInput, setPayInput] = useState("");
  const [receiveEstimate, setReceiveEstimate] = useState("");
  const [slipPreset, setSlipPreset] = useState<SlipPreset>("0.5");
  const [slipCustom, setSlipCustom] = useState("");
  const [feeMode, setFeeMode] = useState<FeeMode>("fast");
  const [buyPreset, setBuyPreset] = useState<number | null>(null);
  const [sellPct, setSellPct] = useState<number | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmSuccess, setConfirmSuccess] = useState(false);
  const [pricePerToken, setPricePerToken] = useState(0.00000375); // SOL/token

  // In production: fetch via BirdEye price API
  // useEffect(() => {
  //   fetch(`https://public-api.birdeye.so/defi/price?address=${tokenAddress}`, {
  //     headers: { "X-API-KEY": process.env.NEXT_PUBLIC_BIRDEYE_API_KEY! }
  //   }).then(r => r.json()).then(d => setPricePerToken(d.data.value / solPrice));
  // }, [tokenAddress, solPrice]);

  const slip =
    slipPreset === "custom"
      ? parseFloat(slipCustom) || 0.5
      : parseFloat(slipPreset);

  const calcReceive = useCallback(
    (val: string, currentSide: Side) => {
      const n = parseFloat(val) || 0;
      if (!n) {
        setReceiveEstimate("");
        return;
      }
      if (currentSide === "buy") {
        const tokens = n / pricePerToken;
        setReceiveEstimate(fmtToken(tokens));
      } else {
        const sol = n * pricePerToken;
        setReceiveEstimate(sol.toFixed(6));
      }
    },
    [pricePerToken]
  );

  const handlePayChange = (v: string) => {
    setPayInput(v);
    setBuyPreset(null);
    setSellPct(null);
    calcReceive(v, side);
  };

  const handleSideChange = (s: Side) => {
    setSide(s);
    setPayInput("");
    setReceiveEstimate("");
    setBuyPreset(null);
    setSellPct(null);
  };

  const setPresetSol = (amt: number) => {
    setBuyPreset(amt);
    setSellPct(null);
    setPayInput(String(amt));
    calcReceive(String(amt), "buy");
  };

  const setPresetPct = (pct: number) => {
    setSellPct(pct);
    setBuyPreset(null);
    const amt = Math.floor(MOCK_POSITION.tokenBalance * (pct / 100));
    setPayInput(String(amt));
    calcReceive(String(amt), "sell");
  };

  const setMax = () => {
    if (side === "buy") {
      const v = Math.max(SOL_BALANCE - 0.01, 0).toFixed(3);
      setPayInput(v);
      calcReceive(v, "buy");
    } else {
      setPayInput(String(MOCK_POSITION.tokenBalance));
      calcReceive(String(MOCK_POSITION.tokenBalance), "sell");
    }
  };

  const minReceived = (() => {
    const n = parseFloat(receiveEstimate?.replace(/[KMB]/g, "") || "") || 0;
    if (!n) return "—";
    return side === "buy"
      ? fmtToken(n * (1 - slip / 100)) + " " + tokenSymbol
      : (n * (1 - slip / 100)).toFixed(6) + " SOL";
  })();

  const priceImpact = (() => {
    const n = parseFloat(payInput) || 0;
    if (!n) return 0;
    return Math.min(n * 0.08, 2.5);
  })();

  const handleExecute = async () => {
    const val = parseFloat(payInput);
    if (!val || val <= 0) return;
    setIsConfirming(true);
    // In production: submit swap via Jupiter Aggregator or Raydium SDK
    await new Promise((r) => setTimeout(r, 1300));
    setIsConfirming(false);
    setConfirmSuccess(true);
    setTimeout(() => {
      setConfirmSuccess(false);
      setPayInput("");
      setReceiveEstimate("");
    }, 2000);
  };

  // ── Position calcs ──
  const posValueUsd =
    MOCK_POSITION.tokenBalance * MOCK_POSITION.avgEntryUsd * 1.246;
  const costBasisUsd = MOCK_POSITION.costBasisSol * solPrice;
  const pnlUsd = posValueUsd - costBasisUsd;
  const pnlPct = (pnlUsd / costBasisUsd) * 100;
  const isProfit = pnlUsd >= 0;

  const btnLabel = confirmSuccess
    ? "✓ Order Placed!"
    : isConfirming
      ? "Confirming..."
      : side === "buy"
        ? `Buy ${tokenSymbol}`
        : `Sell ${tokenSymbol}`;

  return (
    <div className="flex h-full flex-col gap-2.5 overflow-y-auto">
      {/* Wallet status */}
      <div className="flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/3 px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]" />
        <span className="flex-1 font-mono text-[11px] text-white/80">
          Gh7x...mK3f
        </span>
        <span className="font-mono text-[11px] font-bold text-yellow-400">
          {SOL_BALANCE.toFixed(3)} SOL
        </span>
      </div>

      {/* Buy / Sell toggle */}
      <div className="grid grid-cols-2 gap-0.5 rounded-xl border border-white/[0.07] bg-white/4 p-0.5">
        <button
          onClick={() => handleSideChange("buy")}
          className={`rounded-[9px] py-2 text-xs font-black tracking-widest uppercase transition-all duration-150 ${
            side === "buy"
              ? "bg-emerald-500 text-black shadow-[0_2px_12px_rgba(34,197,94,0.3)]"
              : "text-white/40 hover:bg-white/6 hover:text-white"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => handleSideChange("sell")}
          className={`rounded-[9px] py-2 text-xs font-black tracking-widest uppercase transition-all duration-150 ${
            side === "sell"
              ? "bg-red-500 text-white shadow-[0_2px_12px_rgba(239,68,68,0.3)]"
              : "text-white/40 hover:bg-white/6 hover:text-white"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Order form */}
      <div className="flex flex-col gap-3 rounded-xl border border-white/[0.07] bg-black/20 p-3">
        {/* Pay field */}
        <div>
          <label className="mb-1 block text-[10px] font-bold tracking-widest text-white/40 uppercase">
            {side === "buy" ? "Pay (SOL)" : `Sell (${tokenSymbol})`}
          </label>
          <div className="flex h-11 items-center rounded-lg border border-white/10 bg-white/4 px-3 transition-colors focus-within:border-yellow-400/40 focus-within:bg-yellow-400/3">
            <input
              type="number"
              min="0"
              step={side === "buy" ? "0.01" : "1000"}
              placeholder="0.00"
              value={payInput}
              onChange={(e) => handlePayChange(e.target.value)}
              className="min-w-0 flex-1 bg-transparent font-mono text-[15px] font-semibold text-white outline-none placeholder:font-normal placeholder:text-white/30"
            />
            <button
              onClick={setMax}
              className="ml-2 rounded-[5px] bg-yellow-400/10 px-1.5 py-0.5 text-[10px] font-bold text-yellow-400 transition-colors hover:bg-yellow-400/20"
            >
              MAX
            </button>
            <span className="ml-2 text-[11px] font-bold tracking-wide text-white/40 uppercase">
              {side === "buy" ? "SOL" : tokenSymbol}
            </span>
          </div>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-4 gap-1">
          {side === "buy"
            ? [0.1, 0.5, 1, 5].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setPresetSol(amt)}
                  className={`rounded-md py-1.5 text-[11px] font-semibold transition-all ${
                    buyPreset === amt
                      ? "border border-yellow-400/60 bg-yellow-400/10 text-yellow-400"
                      : "border border-white/[0.07] bg-white/4 text-white/40 hover:border-yellow-400/40 hover:text-yellow-300"
                  }`}
                >
                  {amt < 1 ? amt : `${amt} SOL`}
                </button>
              ))
            : [25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setPresetPct(pct)}
                  className={`rounded-md py-1.5 text-[11px] font-semibold transition-all ${
                    sellPct === pct
                      ? "border border-yellow-400/60 bg-yellow-400/10 text-yellow-400"
                      : "border border-white/[0.07] bg-white/4 text-white/40 hover:border-yellow-400/40 hover:text-yellow-300"
                  }`}
                >
                  {pct}%
                </button>
              ))}
        </div>

        {/* Swap arrow */}
        <div className="flex items-center justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-black/40 text-sm text-white/40">
            ↓
          </div>
        </div>

        {/* Receive field */}
        <div>
          <label className="mb-1 block text-[10px] font-bold tracking-widest text-white/40 uppercase">
            {side === "buy" ? `Receive (${tokenSymbol})` : "Receive (SOL)"}
          </label>
          <div className="flex h-11 items-center rounded-lg border border-white/[0.07] bg-white/2 px-3">
            <input
              readOnly
              value={receiveEstimate}
              placeholder="0.00"
              className="min-w-0 flex-1 bg-transparent font-mono text-[15px] font-semibold text-white/50 outline-none placeholder:font-normal placeholder:text-white/20"
            />
            <span className="ml-2 text-[11px] font-bold tracking-wide text-white/30 uppercase">
              {side === "buy" ? tokenSymbol : "SOL"}
            </span>
          </div>
        </div>

        <div className="border-t border-white/[0.07]" />

        {/* Slippage */}
        <div>
          <p className="mb-1.5 text-[10px] font-bold tracking-widest text-white/40 uppercase">
            Slippage tolerance
          </p>
          <div className="flex items-center gap-1">
            {(["0.5", "1", "2"] as const).map((v) => (
              <button
                key={v}
                onClick={() => {
                  setSlipPreset(v);
                  setSlipCustom("");
                }}
                className={`rounded-[5px] px-2 py-1 text-[10px] font-bold transition-all ${
                  slipPreset === v
                    ? "border border-indigo-400/50 bg-indigo-400/10 text-indigo-300"
                    : "border border-white/[0.07] bg-white/4 text-white/40 hover:text-white/70"
                }`}
              >
                {v}%
              </button>
            ))}
            <div className="flex flex-1 items-center gap-1">
              <input
                type="number"
                placeholder="Custom"
                value={slipCustom}
                min="0"
                max="50"
                step="0.1"
                onFocus={() => setSlipPreset("custom")}
                onChange={(e) => {
                  setSlipCustom(e.target.value);
                  setSlipPreset("custom");
                }}
                className="w-full rounded-[5px] border border-white/[0.07] bg-white/4 px-2 py-1 text-right text-[10px] font-bold text-white outline-none focus:border-indigo-400/50"
              />
              <span className="text-[11px] text-white/30">%</span>
            </div>
          </div>
        </div>

        {/* Priority fee */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
            Priority fee
          </span>
          <div className="flex gap-1">
            {(["fast", "turbo", "custom"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFeeMode(f)}
                className={`rounded-[5px] px-2 py-1 text-[9px] font-bold tracking-wide uppercase transition-all ${
                  feeMode === f
                    ? f === "turbo"
                      ? "border border-amber-400/50 bg-amber-400/10 text-amber-300"
                      : "border border-indigo-400/50 bg-indigo-400/10 text-indigo-300"
                    : "border border-white/[0.07] bg-white/4 text-white/40 hover:text-white/60"
                }`}
              >
                {f === "turbo" ? "⚡ Turbo" : f}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.07]" />

        {/* Order summary */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/40">Price impact</span>
            <span
              className={`font-mono font-medium ${priceImpact > 1 ? "text-red-400" : "text-emerald-400"}`}
            >
              ~{priceImpact.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/40">Min. received</span>
            <span className="font-mono font-medium text-white">
              {minReceived}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/40">Network fee</span>
            <span className="font-mono font-medium text-white">
              ~0.000025 SOL
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-white/40">Route</span>
            <span className="font-mono font-medium text-white">
              Raydium → Orca
            </span>
          </div>
        </div>

        {/* Execute CTA */}
        <button
          onClick={handleExecute}
          disabled={isConfirming || !payInput || parseFloat(payInput) <= 0}
          className={`mt-1 w-full rounded-xl py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
            confirmSuccess
              ? "bg-emerald-500 text-black"
              : side === "buy"
                ? "bg-emerald-500 text-black shadow-[0_4px_20px_rgba(34,197,94,0.25)] hover:-translate-y-px hover:bg-emerald-400 hover:shadow-[0_6px_28px_rgba(34,197,94,0.35)]"
                : "bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.25)] hover:-translate-y-px hover:bg-red-400 hover:shadow-[0_6px_28px_rgba(239,68,68,0.35)]"
          }`}
        >
          {btnLabel}
        </button>
      </div>

      {/* Position card */}
      <div className="relative rounded-xl border border-white/[0.07] bg-black/20 p-3">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
            {tokenSymbol} Position
          </span>
          <span
            className={`rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide uppercase ${
              isProfit
                ? "bg-emerald-400/10 text-emerald-400"
                : "bg-red-400/10 text-red-400"
            }`}
          >
            {isProfit ? "+" : ""}
            {pnlPct.toFixed(1)}%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            {
              label: "Balance",
              val: fmtToken(MOCK_POSITION.tokenBalance),
              sub: `≈ $${posValueUsd.toFixed(2)}`,
              colored: false,
            },
            {
              label: "Avg. entry",
              val: `$${MOCK_POSITION.avgEntryUsd.toFixed(7)}`,
              sub: `Cost: ${MOCK_POSITION.costBasisSol} SOL`,
              colored: false,
            },
            {
              label: "Current value",
              val: `$${posValueUsd.toFixed(2)}`,
              sub: `≈ ${(posValueUsd / solPrice).toFixed(4)} SOL`,
              colored: false,
            },
            {
              label: "Unrealized P&L",
              val: `${isProfit ? "+" : ""}$${pnlUsd.toFixed(2)}`,
              sub: `${isProfit ? "+" : ""}${pnlPct.toFixed(1)}%`,
              colored: true,
            },
          ].map(({ label, val, sub, colored }) => (
            <div key={label} className="rounded-lg bg-white/3 px-2.5 py-2">
              <p className="mb-0.5 text-[9px] font-semibold tracking-widest text-white/30 uppercase">
                {label}
              </p>
              <p
                className={`font-mono text-[13px] font-bold ${
                  colored
                    ? isProfit
                      ? "text-emerald-400"
                      : "text-red-400"
                    : "text-white"
                }`}
              >
                {val}
              </p>
              <p
                className={`font-mono text-[10px] ${
                  colored
                    ? isProfit
                      ? "text-emerald-400/70"
                      : "text-red-400/70"
                    : "text-white/30"
                }`}
              >
                {sub}
              </p>
            </div>
          ))}
        </div>

        <div className="my-2.5 grid grid-cols-2 gap-1.5">
          <button className="rounded-lg border border-yellow-400/30 bg-yellow-400/8 py-1.5 text-[10px] font-bold tracking-wide text-yellow-400 uppercase transition-colors hover:bg-yellow-400/15">
            Close 50%
          </button>
          <button className="rounded-lg border border-red-400/30 bg-red-400/8 py-1.5 text-[10px] font-bold tracking-wide text-red-400 uppercase transition-colors hover:bg-red-400/15">
            Close All
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ──
function fmtToken(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return n.toFixed(2);
}
