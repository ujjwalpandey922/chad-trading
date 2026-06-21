import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-surface">
      <Navbar />
      <Hero />
    </div>
  );
}
