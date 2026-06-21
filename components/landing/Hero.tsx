import Image from "next/image";
import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/us/app/chadwallet/id6757367474";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=xyz.chadwallet.www";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden bg-surface px-4 pb-48 pt-28 sm:px-8 sm:pb-56 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/landing/space-bg.webp)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-surface/30 via-transparent to-surface"
      />

      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <Image
          src="/brand/dark-logo.png"
          alt=""
          width={72}
          height={72}
          className="mb-6 size-14 rounded-2xl sm:mb-8 sm:size-18"
          priority
        />
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl">
          ChadWallet
        </h1>
        <p className="mt-4 text-xl font-semibold text-white sm:mt-6 sm:text-2xl md:text-3xl">
          where traders become legends.
        </p>
        <p className="mt-3 max-w-lg text-base text-muted sm:mt-4 sm:text-lg">
          From memecoins to viral tokens, trade any crypto in seconds.
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center">
          <Link
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white transition hover:bg-primary-hover"
          >
            Start trading
          </Link>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-zinc-900 px-8 text-base font-semibold text-white ring-1 ring-white/10 transition hover:bg-zinc-800"
          >
            Download app
          </a>
        </div>

        <div className="mt-6 flex gap-3 sm:hidden">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-black/80 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/10"
          >
            App Store
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-black/80 px-3 py-2 text-xs font-medium text-white ring-1 ring-white/10"
          >
            Google Play
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 flex justify-center">
        <Image
          src="/landing/astronaut.webp"
          alt=""
          width={900}
          height={600}
          className="h-auto w-full max-w-md object-contain object-bottom sm:max-w-lg"
          priority
        />
      </div>
    </section>
  );
}
