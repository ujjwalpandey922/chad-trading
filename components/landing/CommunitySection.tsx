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

            <div className="pt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="#"
                className="group flex items-center justify-center overflow-hidden bg-btn-primary hover:bg-btn-primary-hover backdrop-blur-md transition-colors duration-150 py-3 w-48 rounded-xl text-lg font-bold border border-white/10 z-10 pointer-events-auto"
              >
                <span>Start trading</span>
                <div className="flex items-center overflow-hidden w-0 opacity-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-150 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 shrink-0"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </Link>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center overflow-hidden bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors duration-150 border border-white/10 rounded-xl text-lg font-bold w-48 py-3 z-10 pointer-events-auto"
              >
                <div className="flex items-center overflow-hidden w-0 opacity-0 group-hover:w-7 group-hover:opacity-100 transition-all duration-150 ease-out">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 shrink-0"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
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
