import Image from "next/image";

export function CrossPlatformSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h3 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">
            Now Available on Web
          </h3>
          <h2 className="text-[60px] leading-14 tracking-tight text-center">
            trade from anywhere.
            <br />
            never lose a beat.
          </h2>
          <p className="text-white/70 text-[22px] tracking-tight mt-4">
            Open a trade on your phone, close it on your desktop &mdash; all in
            one app.
          </p>
        </div>

        {/* Mockups Container */}
        <div className="relative mx-auto mt-12 flex justify-center">
          {/* Background Glow */}

          <div className="relative w-full  sm:aspect-video md:aspect-16/10 lg:aspect-16/10 z-10">
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
            <div className="w-[28vw] absolute right-10 top-40 animate-[float_4s_ease-in-out_infinite] z-20 aspect-1/2 drop-shadow-2xl">
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
