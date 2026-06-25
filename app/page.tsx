import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { TokenBanner } from "@/components/landing/TokenBanner";
import { CrossPlatformSection } from "@/components/landing/CrossPlatformSection";
import { FeaturesGridSection } from "@/components/landing/FeaturesGridSection";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="bg-surface relative min-h-screen">
      <Navbar />
      {/* Top Banner - positioned nicely below absolute navbar on desktop, normal flow on mobile */}
      <div className="absolute z-30 max-w-full overflow-hidden pt-0 sm:pt-18">
        <TokenBanner direction="left" speed="medium" />
      </div>
      <Hero />
      <CrossPlatformSection />
      <FeaturesGridSection />
      <CommunitySection />
      {/* Bottom Banner - positioned above the footer */}
      <div className="relative z-10 py-6">
        <TokenBanner direction="right" speed="medium" />
      </div>
      <Footer />
    </div>
  );
}
