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
    <section className="py-4 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4">
            never miss out again
          </h2>
          <p className="text-lg md:text-xl text-muted font-medium">
            the only social-first trading app
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white/3 border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col min-h-[400px] md:min-h-[450px] overflow-hidden group"
            >
              {/* Card Text Content */}
              <div className="mb-8 z-10 relative">
                <div className="text-primary text-xs font-bold uppercase tracking-widest mb-3">
                  {card.eyebrow}
                </div>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight text-foreground">
                  {card.title}
                </h3>
              </div>

              {/* Card Image */}
              <div className="relative flex-1 w-full min-h-[220px] mt-auto flex items-end">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-contain object-bottom drop-shadow-xl transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-2"
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
