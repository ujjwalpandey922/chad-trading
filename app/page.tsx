import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { CrossPlatformSection } from "@/components/landing/CrossPlatformSection";
import { FeaturesGridSection } from "@/components/landing/FeaturesGridSection";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      <Hero />
      <CrossPlatformSection />
      <FeaturesGridSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
