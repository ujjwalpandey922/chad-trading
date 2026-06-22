import Image from "next/image";
import Link from "next/link";
import { APP_STORE_URL } from "./Navbar";

export function CommunitySection() {
  return (
    <section className="relative w-full flex items-center justify-center">
      {/* Background Image (Crowd) */}
      <Image
        src="/circle/legends.webp"
        alt="Traders Background"
        fill
        className="object-cover"
        priority
      />

      {/* Top and Bottom Fades */}
      <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-surface to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-surface to-transparent pointer-events-none z-0" />

      {/* Unified Aspect-Square Container for Circles and Content */}
      <div className="px-4 md:px-8 w-full md:w-[80vw]">
        <div className="flex flex-col justify-center items-center aspect-square relative">
          {/* Centered Content */}
          <div className="flex flex-col gap-3 md:gap-6 items-center w-[90vw] md:w-[70vw] relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight text-center">
              a trading app
              <br />
              for the rest of us
            </h2>
            <p className="text-base md:text-lg text-white/80 font-medium text-center">
              join 500,000 traders making their name on ChadWallet
            </p>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-semibold text-white transition hover:bg-primary-hover shadow-lg shadow-primary/25 pointer-events-auto"
              >
                Start trading
              </Link>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md px-8 text-base font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20 pointer-events-auto"
              >
                Download app
              </a>
            </div>
          </div>

          {/* Inner Circle */}
          <Image
            src="/circle/inner-circle.webp"
            alt="Inner circle"
            width={600}
            height={600}
            className="absolute inset-0 m-auto z-0 w-[60vw] md:w-[30vw] animate-[spin_30s_linear_infinite_reverse] pointer-events-none"
          />

          {/* Outer Circle */}
          <Image
            src="/circle/outer-circle.webp"
            alt="Outer circle"
            width={1100}
            height={1100}
            className="absolute inset-0 m-auto z-0 w-[120vw] sm:w-screen md:w-[50vw] max-w-[1100px] animate-[spin_45s_linear_infinite] pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
