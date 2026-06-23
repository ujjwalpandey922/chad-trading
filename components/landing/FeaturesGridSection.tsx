import Image from "next/image";

const cards = [
  {
    eyebrow: "LEADERBOARD",
    title: "become a legend, top the leaderboard",
    image: "/cards/leaderboard.webp",
  },
  {
    eyebrow: "FEED",
    title: "discover and follow top traders",
    image: "/cards/social-static.webp",
  },
  {
    eyebrow: "ALERTS",
    title: "real time notifications for what the best are buying",
    image: "/cards/alerts-static.webp",
  },
  {
    eyebrow: "EASY ONBOARDING",
    title: "create an account in an instant",
    image: "/cards/sign-in-static.webp",
  },
  {
    eyebrow: "ZERO COMPLEXITY",
    title: "multichain & gasless",
    image: "/cards/assets-static.webp",
  },
  {
    eyebrow: "ONE CLICK TO BUY",
    title: "fund with apple pay",
    image: "/cards/apple-pay-static.webp",
  },
];

export function FeaturesGridSection() {
  return (
    <section className="pb-4">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl max-sm:hidden">
          <h2 className="text-foreground mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            never miss out again
          </h2>
          <p className="text-muted text-lg font-medium md:text-xl">
            the only social-first trading app
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group flex min-h-[400px] flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/3 p-6 md:min-h-[450px] md:p-8"
            >
              {/* Card Text Content */}
              <div className="relative z-10 sm:mb-8">
                <div className="text-primary mb-3 text-xs font-bold tracking-widest uppercase">
                  {card.eyebrow}
                </div>
                <h3 className="text-foreground text-2xl leading-tight font-semibold tracking-tight">
                  {card.title}
                </h3>
              </div>

              {/* Card Image */}
              <div className="relative mt-auto flex w-full flex-1 items-end sm:min-h-[220px]">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain object-center drop-shadow-xl transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.03] sm:object-bottom"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
