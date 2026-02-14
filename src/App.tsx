import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import GoldFrame from './components/GoldFrame';
import HeroSection from './sections/HeroSection';
import FindHomeSection from './sections/FindHomeSection';
import PropertiesSection from './sections/PropertiesSection';
import StoriesSection from './sections/StoriesSection';
import ValuesSection from './sections/ValuesSection';
import NumbersSection from './sections/NumbersSection';
import JournalSection from './sections/JournalSection';
import ServicesSection from './sections/ServicesSection';
import ContactSection from './sections/ContactSection';

function App() {
  const [currentSection, setCurrentSection] = useState('INTRO');

  useEffect(() => {
    // Track current section for the section label
    const sections = [
      { id: 'hero', label: 'INTRO' },
      { id: 'find-home', label: 'COLLECTION' },
      { id: 'properties', label: 'LISTINGS' },
      { id: 'stories', label: 'STORIES' },
      { id: 'values', label: 'VALUES' },
      { id: 'numbers', label: 'IMPACT' },
      { id: 'journal', label: 'JOURNAL' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find((s) => s.id === entry.target.id);
            if (section) {
              setCurrentSection(section.label);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '0px' }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      {/* Gold Frame - Persistent */}
      <GoldFrame />

      {/* Noise Overlay - Persistent */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Section Label - Persistent */}
      <div className="section-label">
        {currentSection}
      </div>

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* Section 2: Find Your Home */}
        <div id="find-home">
          <FindHomeSection />
        </div>

        {/* Section 3: Featured Properties */}
        <div id="properties">
          <PropertiesSection />
        </div>

        {/* Section 4: Homeowner Stories */}
        <div id="stories">
          <StoriesSection />
        </div>

        {/* Section 5: Our Values */}
        <div id="values">
          <ValuesSection />
        </div>

        {/* Section 6: By The Numbers */}
        <div id="numbers">
          <NumbersSection />
        </div>

        {/* Section 7: From The Journal */}
        <div id="journal">
          <JournalSection />
        </div>

        {/* Section 8: Services & Newsletter */}
        <ServicesSection />

        {/* Section 9: Contact / Footer */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
