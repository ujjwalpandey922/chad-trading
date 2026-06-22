import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-surface py-4">
      <div className="w-full px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand Column */}
          <div className="flex flex-col items-start max-w-sm">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/brand/dark-logo.png"
                alt="ChadWallet Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-3xl font-bold text-white tracking-tight">
                ChadWallet
              </span>
            </div>
            <p className="text-base text-white/80 font-medium mb-12 md:mb-16">
              where traders become legends.
            </p>
            <p className="text-xs text-muted font-medium mt-auto">
              &copy; 2026 ChadWallet Inc.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap md:flex-nowrap gap-12 lg:gap-24">
            {/* ABOUT */}
            <div className="flex flex-col gap-2 min-w-[120px]">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                About
              </h4>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Affiliates
              </Link>
            </div>

            {/* SOCIAL */}
            <div className="flex flex-col gap-2 min-w-[120px]">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                Social
              </h4>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Discord
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                X/Twitter
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Youtube
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                LinkedIn
              </Link>
            </div>

            {/* LEGAL */}
            <div className="flex flex-col gap-2 min-w-[120px]">
              <h4 className="text-[10px] font-semibold text-gray-500 uppercase tracking-[0.2em]">
                Legal
              </h4>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
