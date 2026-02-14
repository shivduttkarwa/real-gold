import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    date: '12 February 2026',
    title: 'Phase One Fully Sold at Pendle Farm',
    image: '/images/journal_1.jpg',
  },
  {
    date: '6 February 2026',
    title: 'Higher Apprentice of the Year Finalist',
    image: '/images/journal_2.jpg',
  },
  {
    date: '26 January 2026',
    title: 'From reservation to completion in 10 working days',
    image: '/images/journal_3.jpg',
  },
];

export default function JournalSection() {
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
      id="journal"
      className="section-pinned"
      style={{ zIndex: 70, backgroundColor: '#0B0B0D' }}
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
        <h2 className="headline-lg mb-3">From the journal</h2>
        <p className="body-text">
          News, stories, and updates from across the company.
        </p>
      </div>

      {/* Article Cards */}
      <div
        className="absolute flex gap-6 lg:gap-8"
        style={{
          left: '50%',
          top: '54vh',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {articles.map((article, i) => (
          <div
            key={article.title}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="gold-card cursor-pointer group overflow-hidden"
            style={{
              width: 'clamp(240px, 26vw, 360px)',
              height: 'clamp(360px, 48vh, 520px)',
              opacity: 0,
              transform: 'translateY(50px) scale(0.97)',
              transition: 'all 0.8s ease',
            }}
          >
            {/* Image (top 55%) */}
            <div className="relative h-[55%] overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-5 h-[45%] flex flex-col justify-between">
              <div>
                {/* Date */}
                <div 
                  className="font-mono text-xs mb-3 tracking-widest"
                  style={{ color: '#C9A45C' }}
                >
                  {article.date}
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg text-[#F4F1EA] leading-snug">
                  {article.title}
                </h3>
              </div>

              {/* Read more */}
              <div className="flex items-center gap-2 text-[#C9A45C] group-hover:gap-3 transition-all">
                <span className="font-mono text-xs tracking-wider">Read more</span>
                <ArrowRight size={12} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="absolute"
        style={{ left: '50%', bottom: '10vh', transform: 'translateX(-50%)' }}
      >
        <a href="#" className="cta-button-outline">
          View all articles
          <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
