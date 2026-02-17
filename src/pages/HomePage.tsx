import HeroSection from "../sections/HeroSection";
import About from "../sections/About";
import Differ from "../sections/Differ";
import PortfolioShowcase from "../extra/Home/PortfolioShowcase";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <About />
      <Differ />
      <PortfolioShowcase />
    </>
  );
}
