import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/chadwallet/id6757367474";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 px-4 py-4 sm:px-8 sm:py-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/brand/dark-logo.png"
            alt="ChadWallet"
            width={36}
            height={36}
            className="size-9 rounded-lg"
            priority
          />
          <span className="text-lg font-semibold tracking-tight text-white">
            ChadWallet
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-black/80 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/10 transition hover:bg-black sm:inline-flex sm:px-4 sm:text-sm"
          >
            App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-black/80 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/10 transition hover:bg-black sm:inline-flex sm:px-4 sm:text-sm"
          >
            Google Play
          </a>
          <button
            type="button"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-zinc-800"
          >
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
