import { Navbar } from "@/components/fragments/Navbar";
import { HeroSection } from "@/components/fragments/HeroSection";
import { FeaturesSection } from "@/components/fragments/FeaturesSection";
import { Footer } from "@/components/fragments/Footer";
import { ThemeSwitch } from "@/components/fragments/ThemeSwitch";

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-[#d4d4d4] font-display antialiased transition-colors duration-200">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <Footer />
      <ThemeSwitch />
    </div>
  );
}
