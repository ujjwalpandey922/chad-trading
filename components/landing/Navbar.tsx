import Image from "next/image";
import Link from "next/link";

export const APP_STORE_URL =
  "https://apps.apple.com/us/app/chadwallet/id6757367474";
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";

export function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-20 p-4 max-sm:hidden">
      <nav className="mx-auto flex items-center justify-between gap-4">
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
            className="bg-btn-badge hover:bg-btn-badge-hover hidden items-center gap-2 rounded-lg px-3 py-1.5 transition sm:flex"
          >
            <svg viewBox="0 0 384 512" width="22" height="22" fill="white">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            <div className="flex flex-col items-start leading-none">
              <span className="pb-0.5 text-[10px] font-medium text-white/90">
                Download on the
              </span>
              <span className="text-base leading-none font-semibold text-white">
                App Store
              </span>
            </div>
          </a>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-btn-badge hover:bg-btn-badge-hover hidden items-center gap-2 rounded-lg px-3 py-1.5 transition sm:flex"
          >
            <svg viewBox="0 0 512 512" width="22" height="22">
              <path
                fill="#67C15E"
                d="M29.5 44.1C25.4 48 23 54.1 23 61.6v388.9c0 7.4 2.4 13.6 6.5 17.5l.3.3 219.7-219.6v-.5L29.8 43.8l-.3.3z"
              />
              <path
                fill="#EA4335"
                d="M327.9 319l-78.4-78.4v-.5l78.4-78.4.4.2 92.9 52.8c26.5 15 26.5 39.6 0 54.7l-93.3 49.6-.4-.2z"
              />
              <path
                fill="#F2C14F"
                d="M327.9 319L249.5 240.6 29.8 460.3c8.9 9.3 23.4 10.3 39.4 1.2L327.9 319z"
              />
              <path
                fill="#4B8BF5"
                d="M327.9 193.1L69.2 46.5C53.1 37.4 38.6 38.4 29.8 47.7l219.7 219.7 78.4-74.3z"
              />
            </svg>
            <div className="flex flex-col items-start leading-none">
              <span className="pb-0.5 text-[10px] font-medium text-white/90">
                GET IT ON
              </span>
              <span className="text-base leading-none font-semibold text-white">
                Google Play
              </span>
            </div>
          </a>

          <button
            type="button"
            className="bg-btn-login rounded-lg px-5 py-2.5 text-base font-bold text-white shadow-sm ring-1 ring-white/5 transition hover:bg-black"
            style={{
              textShadow:
                "1.5px 0px 0px var(--google-red), -1.5px 0px 0px var(--google-blue)",
            }}
          >
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
