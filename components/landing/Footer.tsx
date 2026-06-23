import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-surface w-full py-4">
      <div className="w-full px-4 md:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Brand Column */}
          <div className="flex max-w-sm flex-col items-start">
            <div className="mb-2 flex items-center gap-3">
              <Image
                src="/brand/dark-logo.png"
                alt="ChadWallet Logo"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-3xl font-bold tracking-tight text-white">
                ChadWallet
              </span>
            </div>
            <p className="mb-12 text-base font-medium text-white/80 md:mb-16">
              where traders become legends.
            </p>
            <p className="text-muted mt-auto text-xs font-medium">
              &copy; 2026 ChadWallet Inc.
            </p>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap gap-12 md:flex-nowrap lg:gap-24">
            {/* ABOUT */}
            <div className="flex min-w-[120px] flex-col gap-2">
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                About
              </h4>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Affiliates
              </Link>
            </div>

            {/* SOCIAL */}
            <div className="flex min-w-[120px] flex-col gap-2">
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                Social
              </h4>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Discord
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                X/Twitter
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Instagram
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Youtube
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                LinkedIn
              </Link>
            </div>

            {/* LEGAL */}
            <div className="flex min-w-[120px] flex-col gap-2">
              <h4 className="text-[10px] font-semibold tracking-[0.2em] text-gray-500 uppercase">
                Legal
              </h4>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
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
