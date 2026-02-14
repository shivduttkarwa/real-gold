import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NumbersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate headline
            if (headlineRef.current) {
              headlineRef.current.style.opacity = '1';
              headlineRef.current.style.transform = 'translateX(0)';
            }

            // Animate number
            if (numberRef.current) {
              setTimeout(() => {
                numberRef.current!.style.opacity = '1';
                numberRef.current!.style.transform = 'translateX(0) scale(1)';
                
                // Start counting animation
                let start = 0;
                const end = 4000;
                const duration = 2000;
                const increment = end / (duration / 16);
                
                const timer = setInterval(() => {
                  start += increment;
                  if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                  } else {
                    setCount(Math.floor(start));
                  }
                }, 16);
              }, 300);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned"
      style={{ zIndex: 60, backgroundColor: '#0B0B0D' }}
    >
      {/* Headline Block */}
      <div
        ref={headlineRef}
        className="absolute"
        style={{
          left: '10vw',
          top: '50%',
          transform: 'translateY(-50%) translateX(-60px)',
          opacity: 0,
          transition: 'all 1s ease',
          width: '44vw',
          maxWidth: '640px',
        }}
      >
        <h2 className="headline-lg mb-4">
          We've built almost
        </h2>
        <p className="body-text mb-8">
          homes in prime locations across the country.
        </p>
        <button className="cta-button">
          See our developments
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Giant Number */}
      <div
        ref={numberRef}
        className="absolute"
        style={{
          right: '10vw',
          top: '50%',
          transform: 'translateY(-50%) translateX(60px) scale(0.95)',
          opacity: 0,
          transition: 'all 1s ease',
        }}
      >
        <div 
          className="font-heading font-medium"
          style={{
            fontSize: 'clamp(96px, 14vw, 220px)',
            lineHeight: 1,
            color: '#C9A45C',
          }}
        >
          {count.toLocaleString()}
        </div>
      </div>
    </section>
  );
}
