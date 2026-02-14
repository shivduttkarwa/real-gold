import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Your Buying Journey',
    image: '/images/cat_buying_journey.jpg',
  },
  {
    title: 'Inside Our Homes',
    image: '/images/cat_inside_homes.jpg',
  },
  {
    title: 'Homeowner Stories',
    image: '/images/cat_homeowner_stories.jpg',
  },
];

export default function FindHomeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (titleRef.current) {
              titleRef.current.style.opacity = '1';
              titleRef.current.style.transform = 'translateY(0)';
            }

            // Animate cards with stagger
            cardsRef.current.forEach((card, i) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) scale(1)';
                }, 200 + i * 150);
              }
            });

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
      id="find-home"
      className="section-pinned"
      style={{ zIndex: 20, backgroundColor: '#0B0B0D' }}
    >
      {/* Title Block */}
      <div
        ref={titleRef}
        className="absolute text-center"
        style={{
          left: '50%',
          top: '16vh',
          transform: 'translateX(-50%) translateY(-20px)',
          opacity: 0,
          transition: 'all 0.8s ease',
          width: 'min(52vw, 720px)',
        }}
      >
        <h2 className="headline-lg mb-4">Find your home</h2>
        <p className="body-text">
          Browse by what matters most—style, setting, or lifestyle.
        </p>
      </div>

      {/* Category Cards */}
      <div
        className="absolute flex gap-6 lg:gap-8"
        style={{
          left: '50%',
          top: '54vh',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {categories.map((category, i) => (
          <div
            key={category.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="gold-card image-hover cursor-pointer group"
            style={{
              width: 'clamp(200px, 22vw, 320px)',
              height: 'clamp(320px, 46vh, 520px)',
              opacity: 0,
              transform: 'translateY(60px) scale(0.96)',
              transition: 'all 0.8s ease',
            }}
          >
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent" />
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-6 right-6">
              <div 
                className="h-[1px] w-12 mb-4"
                style={{ backgroundColor: '#C9A45C' }}
              />
              <h3 className="font-heading text-xl lg:text-2xl text-[#F4F1EA]">
                {category.title}
              </h3>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#C9A45C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="absolute"
        style={{ left: '50%', bottom: '12vh', transform: 'translateX(-50%)' }}
      >
        <a href="#properties" className="cta-button-outline">
          View all collections
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
