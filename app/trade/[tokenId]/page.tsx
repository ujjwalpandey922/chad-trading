import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    tokenId: string;
  }>;
  searchParams: Promise<{
    symbol?: string;
    price?: string;
    change?: string;
    logo?: string;
  }>;
}

export default async function TradePage({ params, searchParams }: PageProps) {
  const { tokenId } = await params;
  const resolvedSearchParams = await searchParams;

  const symbol = resolvedSearchParams.symbol || "UNKNOWN";
  const price = resolvedSearchParams.price
    ? parseFloat(resolvedSearchParams.price)
    : null;
  const change = resolvedSearchParams.change
    ? parseFloat(resolvedSearchParams.change)
    : null;
  const logo = resolvedSearchParams.logo
    ? decodeURIComponent(resolvedSearchParams.logo)
    : null;

  const isPositive = change !== null ? change >= 0 : true;

  return (
    <div className="bg-surface relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      {/* Background space/stars image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url(/landing/space-bg.webp)" }}
      />
      <div
        aria-hidden
        className="from-surface/80 to-surface pointer-events-none absolute inset-0 bg-linear-to-b via-transparent"
      />

      <div className="relative z-10 flex w-full max-w-lg flex-col rounded-2xl border border-white/10 bg-white/3 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        {/* Back Button */}
        <Link
          href="/"
          className="text-muted group mb-8 flex w-fit items-center gap-2 text-sm font-semibold transition duration-150 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Token Info Section */}
        <div className="flex flex-col items-center text-center">
          {logo ? (
            <div className="relative mb-4 h-16 w-16 overflow-hidden rounded-full border-2 border-white/20 bg-black/40 shadow-lg">
              <Image
                src={logo}
                alt={symbol}
                fill
                sizes="64px"
                className="object-cover"
                unoptimized={logo.startsWith("http")}
              />
            </div>
          ) : (
            <div className="bg-primary/20 text-primary border-primary/30 mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 text-xl font-bold shadow-lg">
              {symbol.slice(0, 2)}
            </div>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {symbol}
          </h1>
          <p className="text-muted mt-1 text-sm font-medium">
            Solana Token Information
          </p>

          {/* Price & Change */}
          {price !== null && (
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="font-mono text-2xl font-bold text-white">
                $
                {price < 0.01
                  ? price.toFixed(6)
                  : price.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </span>
              {change !== null && (
                <span
                  className={`rounded-md px-2 py-0.5 font-mono text-sm font-bold ${
                    isPositive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {change.toFixed(2)}%
                </span>
              )}
            </div>
          )}

          {/* Token Address Details */}
          <div className="mt-8 w-full rounded-xl border border-white/[0.05] bg-black/40 p-4 text-left">
            <span className="text-muted/60 text-[10px] font-bold tracking-wider uppercase">
              Contract Address
            </span>
            <div className="mt-1 flex items-center justify-between gap-2">
              <code className="block font-mono text-xs break-all text-white/90">
                {tokenId}
              </code>
            </div>
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-8 flex w-full flex-col items-center rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5 text-center">
            <span className="mb-1 text-lg font-bold text-yellow-400">
              Trading Coming Soon
            </span>
            <span className="text-muted/80 max-w-sm text-xs leading-relaxed">
              The ChadWallet trading interface, real-time charts, and liquidity
              pools for this token are currently in development.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
