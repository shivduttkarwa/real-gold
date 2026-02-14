import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-play entrance animation on load
    const tl = setTimeout(() => {
      // Eyebrow
      if (eyebrowRef.current) {
        eyebrowRef.current.style.opacity = '1';
        eyebrowRef.current.style.transform = 'translateY(0)';
      }
      
      // Headline words
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        words.forEach((word, i) => {
          setTimeout(() => {
            (word as HTMLElement).style.opacity = '1';
            (word as HTMLElement).style.transform = 'translateY(0)';
          }, 200 + i * 60);
        });
      }
      
      // Subline
      if (sublineRef.current) {
        setTimeout(() => {
          sublineRef.current!.style.opacity = '1';
          sublineRef.current!.style.transform = 'translateY(0)';
        }, 600);
      }
      
      // CTA
      if (ctaRef.current) {
        setTimeout(() => {
          ctaRef.current!.style.opacity = '1';
          ctaRef.current!.style.transform = 'translateY(0)';
        }, 800);
      }
      
      // Scroll cue
      if (scrollCueRef.current) {
        setTimeout(() => {
          scrollCueRef.current!.style.opacity = '1';
        }, 1000);
      }
    }, 300);

    return () => clearTimeout(tl);
  }, []);

  const headlineWords = "A family builder, crafting homes with heart.".split(' ');

  return (
    <section
      ref={sectionRef}
      className="section-pinned"
      style={{ zIndex: 10 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero_architecture.jpg"
          alt="Luxury Architecture"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(11,11,13,0.35), rgba(11,11,13,0.55))'
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6"
        style={{ maxWidth: 'min(72vw, 1100px)' }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="eyebrow mb-6"
          style={{ opacity: 0, transform: 'translateY(-12px)', transition: 'all 0.5s ease' }}
        >
          Crafted with care. Designed to last.
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="headline-xl mb-6"
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.25em]"
              style={{ opacity: 0, transform: 'translateY(28px)', transition: 'all 0.5s ease' }}
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="body-text mb-10 max-w-xl mx-auto"
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.5s ease' }}
        >
          Premium homes across prime locations—built with detail, designed for living.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="cta-button"
          style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.5s ease' }}
        >
          Explore Homes
          <ArrowRight size={16} />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollCueRef}
        className="scroll-indicator"
        style={{ opacity: 0, transition: 'opacity 0.5s ease' }}
      >
        Scroll to explore
      </div>
    </section>
  );
}
