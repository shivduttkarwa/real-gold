import { useEffect, useRef } from 'react';

const values = [
  {
    number: '01',
    title: 'Family built, with heart.',
    description: 'We care for people—our colleagues, our customers, our community.',
    image: '/images/values_craft.jpg',
  },
  {
    number: '02',
    title: 'Tomorrow in mind, today in focus.',
    description: 'We evolve with purpose, keeping what works and improving what doesn\'t.',
    image: '/images/values_evolve.jpg',
  },
  {
    number: '03',
    title: 'Each one part of a family\'s story.',
    description: 'A home is the backdrop to real life—designed to belong.',
    image: '/images/values_story.jpg',
  },
];

export default function ValuesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rulesRef = useRef<(HTMLDivElement | null)[]>([]);

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
                }, 300 + i * 150);
              }
            });

            // Animate rules
            rulesRef.current.forEach((rule, i) => {
              if (rule) {
                setTimeout(() => {
                  rule.style.transform = 'scaleX(1)';
                }, 500 + i * 150);
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
      id="values"
      className="section-pinned"
      style={{ zIndex: 50, backgroundColor: '#0B0B0D' }}
    >
      {/* Title Block */}
      <div
        ref={titleRef}
        className="absolute text-center"
        style={{
          left: '50%',
          top: '14vh',
          transform: 'translateX(-50%) translateY(-20px)',
          opacity: 0,
          transition: 'all 0.8s ease',
        }}
      >
        <h2 className="headline-lg mb-3">Our values</h2>
        <p className="body-text">
          Built on consistency, care, and craft.
        </p>
      </div>

      {/* Value Cards */}
      <div
        className="absolute flex gap-6 lg:gap-8"
        style={{
          left: '50%',
          top: '54vh',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {values.map((value, i) => (
          <div
            key={value.number}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="gold-card overflow-hidden"
            style={{
              width: 'clamp(220px, 24vw, 340px)',
              height: 'clamp(360px, 44vh, 480px)',
              opacity: 0,
              transform: 'translateY(50px) scale(0.97)',
              transition: 'all 0.8s ease',
            }}
          >
            {/* Top Rule */}
            <div
              ref={(el) => { rulesRef.current[i] = el; }}
              className="absolute top-0 left-0 right-0 h-[2px] bg-[#C9A45C]"
              style={{
                transform: 'scaleX(0)',
                transformOrigin: 'left',
                transition: 'transform 0.6s ease',
              }}
            />

            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={value.image}
                alt={value.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Number */}
              <div 
                className="font-mono text-xs mb-3 tracking-widest"
                style={{ color: '#C9A45C' }}
              >
                {value.number}
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl lg:text-2xl text-[#F4F1EA] mb-3 leading-tight">
                {value.title}
              </h3>

              {/* Description */}
              <p className="body-text text-sm">
                {value.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
