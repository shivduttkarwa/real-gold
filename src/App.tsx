import Menu from "./components/Menu";
import HeroSection from "./sections/HeroSection";
import TestSection from "./sections/TestSection";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="relative">
      {/* Menu */}
      <Menu />

      {/* Hero Section */}
      <HeroSection />

      {/* Test Section */}
      <TestSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
