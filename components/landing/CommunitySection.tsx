import Image from "next/image";
import { StartTradingButton } from "@/components/landing/StartTradingButton";
import { APP_STORE_URL } from "./Navbar";

export function CommunitySection() {
  return (
    <section className="relative flex w-full items-center justify-center max-sm:py-12">
      {/* Background Image (Crowd) */}
      <Image
        src="/circle/legends.webp"
        alt="Traders Background"
        fill
        className="object-cover"
        priority
      />

      {/* Top and Bottom Fades */}
      <div className="from-surface pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-linear-to-b to-transparent" />
      <div className="from-surface pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-linear-to-t to-transparent" />

      {/* Unified Aspect-Square Container for Circles and Content */}
      <div className="w-full px-4 md:w-[80vw] md:px-8">
        <div className="relative flex aspect-square flex-col items-center justify-center">
          {/* Centered Content */}
          <div className="relative z-10 flex w-[90vw] flex-col items-center gap-3 md:w-[70vw] md:gap-6">
            <h2 className="text-center text-4xl leading-tight font-extrabold tracking-tight text-white max-sm:lowercase md:text-5xl lg:text-6xl">
              a trading app
              <br />
              for the rest of us
            </h2>
            <p className="text-center text-base font-medium text-white/80 md:text-lg">
              join 500,000 traders making their name on{" "}
              <span className="max-sm:hidden">ChadWallet</span>
              <span className="sm:hidden">chadwallet</span>
            </p>

            <div className="flex w-full flex-col gap-3 pt-6 sm:w-auto sm:flex-row">
              <StartTradingButton className="group bg-btn-primary hover:bg-btn-primary-hover pointer-events-auto z-10 flex w-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/10 py-3 text-lg font-bold backdrop-blur-md transition-colors duration-150 max-sm:hidden" />
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group pointer-events-auto z-10 flex w-48 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 py-3 text-lg font-bold backdrop-blur-md transition-colors duration-150 hover:bg-white/10 max-sm:mx-auto"
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

          {/* Inner Circle */}
          <Image
            src="/circle/inner-circle.webp"
            alt="Inner circle"
            width={600}
            height={600}
            className="pointer-events-none absolute inset-0 z-0 m-auto w-[30vw] animate-[spin_30s_linear_infinite_reverse] md:w-[30vw]"
          />

          {/* Outer Circle */}
          <Image
            src="/circle/outer-circle.webp"
            alt="Outer circle"
            width={1100}
            height={1100}
            className="pointer-events-none absolute inset-0 z-0 m-auto w-[65vw] max-w-[1100px] animate-[spin_45s_linear_infinite] sm:w-[70vw] md:w-[50vw]"
          />
        </div>
      </div>
    </section>
  );
}
