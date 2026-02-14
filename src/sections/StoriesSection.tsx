import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function StoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate background
            if (bgRef.current) {
              bgRef.current.style.opacity = '1';
              bgRef.current.style.transform = 'scale(1)';
            }

            // Animate quote
            if (quoteRef.current) {
              setTimeout(() => {
                quoteRef.current!.style.opacity = '1';
                quoteRef.current!.style.transform = 'translateX(0)';
              }, 300);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stories"
      className="section-pinned"
      style={{ zIndex: 40, backgroundColor: '#0B0B0D' }}
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          transform: 'scale(1.08)',
          transition: 'all 1.2s ease',
        }}
      >
        <img
          src="/images/story_nigel_sarah.jpg"
          alt="Homeowner Story"
          className="w-full h-full object-cover"
        />
        {/* Left vignette for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(11,11,13,0.85) 0%, rgba(11,11,13,0.5) 40%, rgba(11,11,13,0.2) 100%)'
          }}
        />
      </div>

      {/* Quote Block */}
      <div
        ref={quoteRef}
        className="absolute z-10"
        style={{
          left: '10vw',
          top: '50%',
          transform: 'translateY(-50%) translateX(-60px)',
          opacity: 0,
          transition: 'all 1s ease',
          width: '38vw',
          maxWidth: '560px',
        }}
      >
        {/* Quote Mark */}
        <div 
          className="font-heading text-8xl mb-4 leading-none"
          style={{ color: '#C9A45C', opacity: 0.6 }}
        >
          "
        </div>

        {/* Quote Text */}
        <blockquote className="font-heading text-2xl lg:text-3xl text-[#F4F1EA] leading-relaxed mb-8 -mt-8">
          Every family becomes part of our story. Here they share theirs, from the first days of moving in, to a lifetime of memories made within the walls of a Real Gold home.
        </blockquote>

        {/* Attribution */}
        <div className="mb-8">
          <p className="font-mono text-sm text-[#F4F1EA] tracking-wide">
            Nigel & Sarah
          </p>
          <p className="font-mono text-xs text-[#A7A29A] tracking-wide">
            The Emily, Glusburn
          </p>
        </div>

        {/* CTA */}
        <a href="#" className="cta-button-outline">
          Read all stories
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
