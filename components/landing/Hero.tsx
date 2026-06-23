import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/us/app/chadwallet/id6757367474";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";

export function Hero() {
  return (
    <section className="bg-surface relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-4 pt-28 pb-48 sm:px-8 sm:pt-32 sm:pb-56">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/landing/space-bg.webp)" }}
      />
      <div
        aria-hidden
        className="from-surface/30 to-surface pointer-events-none absolute inset-0 bg-linear-to-b via-transparent"
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Image
          src="/brand/dark-logo.png"
          alt=""
          width={72}
          height={72}
          className="mb-2 size-14 rounded-2xl sm:size-18"
          priority
        />
        <h1 className="mb-2 text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
          ChadWallet
        </h1>
        <p className="text-xl font-semibold text-white sm:text-2xl md:text-3xl">
          where traders become legends.
        </p>
        <p className="text-muted max-w-lg text-base sm:text-lg">
          From memecoins to viral tokens, trade any crypto in seconds.
        </p>

        <div className="relative z-10 mt-4 flex w-full flex-col gap-3 sm:mt-6 sm:flex-row sm:justify-center">
          <Link
            href="#"
            className="group bg-btn-primary hover:bg-btn-primary-hover pointer-events-auto z-10 flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 py-2.5 text-base font-bold backdrop-blur-md transition-colors duration-150 max-sm:hidden sm:w-48"
          >
            <span>Start trading</span>
            <div className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-150 ease-out group-hover:w-7 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 shrink-0"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </Link>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group pointer-events-auto z-10 flex w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/10 py-2.5 text-base font-bold backdrop-blur-md transition-colors duration-150 hover:bg-white/20 max-sm:mx-auto sm:w-48"
          >
            <div className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-150 ease-out group-hover:w-7 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 shrink-0"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
            </div>
            <span>Download app</span>
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-1 flex justify-center">
        <Image
          src="/landing/astronaut.webp"
          alt=""
          width={700}
          height={400}
          className="h-auto w-full max-w-md animate-[float_4s_ease-in-out_infinite] object-contain object-bottom"
          priority
        />
      </div>
    </section>
  );
}
