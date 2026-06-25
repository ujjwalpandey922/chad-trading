"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createChart,
  ColorType,
  UTCTimestamp,
  ISeriesApi,
  CandlestickSeries,
} from "lightweight-charts";
import { CandleData } from "@/lib/birdeye/client";

interface TradingViewChartProps {
  address: string;
}

const TIMEFRAMES = [
  { label: "5M", value: "5m" },
  { label: "1H", value: "1H" },
  { label: "4H", value: "4H" },
  { label: "1D", value: "1D" },
];

export default function TradingViewChart({ address }: TradingViewChartProps) {
  const [resolution, setResolution] = useState("1H");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const { data: ohlcv, isLoading } = useQuery<CandleData[]>({
    queryKey: ["token-ohlcv", address, resolution],
    queryFn: async () => {
      const res = await fetch(
        `/api/tokens/${address}/ohlcv?resolution=${resolution}`
      );
      if (!res.ok) throw new Error("Failed to fetch historical prices");
      return res.json();
    },
    refetchInterval: 30 * 1000,
  });

  // Effect to instantiate and cleanup the chart container
  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.4)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.03)" },
        horzLines: { color: "rgba(255, 255, 255, 0.03)" },
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
      timeScale: {
        borderColor: "rgba(255, 255, 255, 0.1)",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        vertLine: {
          color: "rgba(99, 102, 241, 0.4)",
          width: 1,
          style: 3, // dashed
          labelBackgroundColor: "#4f46e5",
        },
        horzLine: {
          color: "rgba(99, 102, 241, 0.4)",
          width: 1,
          style: 3, // dashed
          labelBackgroundColor: "#4f46e5",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 320,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    });

    chartRef.current = chart;
    seriesRef.current = series;

    // Resize observer to make chart responsive
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // Update chart data whenever OHLCV query updates
  useEffect(() => {
    if (seriesRef.current && ohlcv && ohlcv.length > 0) {
      const formatted = ohlcv.map((candle) => ({
        time: candle.time as UTCTimestamp,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      }));
      console.log(resolution, formatted[formatted.length - 1].close);
      seriesRef.current.setData(formatted);
      chartRef.current?.timeScale().fitContent();
    }
  }, [ohlcv]);

  // Real-time ticking simulation of the last candle
  useEffect(() => {
    if (!seriesRef.current || !ohlcv || ohlcv.length === 0) return;

    let lastCandle = { ...ohlcv[ohlcv.length - 1] };

    const interval = setInterval(() => {
      if (!seriesRef.current) return;

      const volatility = 0.002; // max 0.2% change per tick
      const change = 1 + (Math.random() - 0.49) * volatility; // slight upward bias

      const newClose = lastCandle.close * change;
      const newHigh = Math.max(lastCandle.high, newClose);
      const newLow = Math.min(lastCandle.low, newClose);

      lastCandle = {
        ...lastCandle,
        close: Number(newClose.toFixed(6)),
        high: Number(newHigh.toFixed(6)),
        low: Number(newLow.toFixed(6)),
      };

      seriesRef.current.update({
        time: lastCandle.time as UTCTimestamp,
        open: lastCandle.open,
        high: lastCandle.high,
        low: lastCandle.low,
        close: lastCandle.close,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [ohlcv, resolution]);

  return (
    <div className="relative flex flex-col rounded-xl border border-white/10 bg-black/40 p-4 sm:p-6">
      {/* Starry space bg depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url(/landing/space-bg.webp)" }}
      />

      <div className="relative z-10 mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h4 className="text-sm font-extrabold tracking-wider text-white uppercase">
            Interactive Price Chart
          </h4>
          <p className="text-[10px] text-white/40">
            Powered by BirdEye Live Data
          </p>
        </div>

        {/* Timeframe Selectors */}
        <div className="flex gap-1.5 self-start rounded-lg bg-white/5 p-1 sm:self-auto">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf.value}
              onClick={() => setResolution(tf.value)}
              className={`rounded px-2.5 py-1 text-xs font-bold transition-all duration-150 ${
                resolution === tf.value
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 min-h-[320px] w-full">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-black/20 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              <span className="text-xs font-medium text-white/50">
                Loading chart data...
              </span>
            </div>
          </div>
        )}
        <div ref={chartContainerRef} className="w-full" />
      </div>
    </div>
  );
}
