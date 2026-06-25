import Image from "next/image";

export function CrossPlatformSection() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Desktop Header */}
        <div className="mx-auto hidden max-w-4xl text-center sm:block">
          <h3 className="text-primary mb-4 text-sm font-bold tracking-[0.2em] uppercase">
            Now Available on Web
          </h3>
          <h2 className="text-center text-[60px] leading-14 tracking-tight">
            trade from anywhere.
            <br />
            never lose a beat.
          </h2>
          <p className="mt-4 text-[22px] tracking-tight text-white/70">
            Open a trade on your phone, close it on your desktop &mdash; all in
            one app.
          </p>
        </div>

        {/* Mobile Layout (Image at top, text at bottom) */}
        <div className="flex flex-col items-center sm:hidden">
          {/* Mobile Image */}
          <div className="relative -mb-10 aspect-4/5 w-full max-w-[380px]">
            <Image
              src="/available/fomo-mobile-app.webp"
              alt="ChadWallet Mobile App"
              fill
              className="object-contain"
              priority
              sizes="380px"
            />
          </div>

          {/* Mobile Text */}
          <div className="relative z-20 px-4 text-center">
            <h2 className="text-center text-4xl leading-10 font-extrabold tracking-tighter text-white">
              trade from anywhere.
              <br />
              never lose a beat.
            </h2>
            <p className="mt-3 text-base leading-relaxed font-medium tracking-tight text-[#94A3B8]">
              Pick up a trade on your phone, close it on your desktop &mdash;
              all in one app.
            </p>
          </div>
        </div>

        {/* Desktop Mockups Container */}
        <div className="relative mx-auto hidden justify-center sm:flex">
          <div className="relative z-10 aspect-4/3 w-full">
            {/* Desktop Mockup */}
            <Image
              src="/available/desktop.webp"
              alt="ChadWallet Desktop Interface"
              fill
              className="object-contain object-center drop-shadow-2xl"
              priority
              sizes="(max-width: 1000px) 100vw, 1000px"
            />

            {/* Mobile Mockup (layered over desktop, offset to the right and bottom) */}
            <div className="absolute top-40 right-10 z-20 aspect-1/2 w-[28vw] animate-[float_4s_ease-in-out_infinite] drop-shadow-2xl">
              <Image
                src="/available/desktop-phone.webp"
                alt="ChadWallet Mobile Interface"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1000px) 28vw, 350px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
