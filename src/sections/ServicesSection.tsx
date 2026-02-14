import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Home, Repeat, Calculator } from 'lucide-react';

const services = [
  {
    icon: Home,
    title: 'SimpleMove',
    description: 'Trusted support to help you sell your current home with less stress.',
  },
  {
    icon: Repeat,
    title: 'Part Exchange',
    description: 'We buy your current home, saving time, fees, and uncertainty.',
  },
  {
    icon: Calculator,
    title: 'Mortgage Advice',
    description: 'Expert guidance and thousands of products tailored to new-build homes.',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

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

            // Animate service cards
            cardsRef.current.forEach((card, i) => {
              if (card) {
                setTimeout(() => {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                }, 200 + i * 100);
              }
            });

            // Animate newsletter
            if (newsletterRef.current) {
              setTimeout(() => {
                newsletterRef.current!.style.opacity = '1';
                newsletterRef.current!.style.transform = 'translateY(0)';
              }, 600);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      alert('Thank you for subscribing!');
      setEmail('');
      setAgreed(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-flowing py-24 lg:py-32"
      style={{ zIndex: 80, backgroundColor: '#0B0B0D' }}
    >
      <div className="px-[10vw]">
        {/* Title */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease' }}
        >
          <h2 className="headline-lg mb-4">Our services</h2>
          <p className="body-text max-w-md mx-auto">
            Support designed to make your move simpler.
          </p>
        </div>

        {/* Service Cards */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 justify-center mb-20">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="gold-card p-8"
              style={{
                width: '100%',
                maxWidth: '340px',
                opacity: 0,
                transform: 'translateY(40px)',
                transition: 'all 0.8s ease',
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 flex items-center justify-center mb-6"
                style={{ border: '1px solid rgba(201, 164, 92, 0.4)' }}
              >
                <service.icon size={22} strokeWidth={1.5} className="text-[#C9A45C]" />
              </div>

              {/* Title */}
              <h3 className="font-heading text-xl text-[#F4F1EA] mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="body-text text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Newsletter Panel */}
        <div
          ref={newsletterRef}
          className="mx-auto"
          style={{
            maxWidth: '1100px',
            backgroundColor: '#111114',
            padding: 'clamp(40px, 6vh, 80px) clamp(30px, 6vw, 80px)',
            opacity: 0,
            transform: 'translateY(50px)',
            transition: 'all 0.8s ease',
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left: Text */}
            <div className="lg:w-2/5">
              <h3 className="headline-md mb-4">
                Stay up to date with Real Gold
              </h3>
              <p className="body-text text-sm">
                Get new releases, journal updates, and homeowner stories—delivered monthly.
              </p>
            </div>

            {/* Right: Form */}
            <form onSubmit={handleSubmit} className="lg:w-1/2">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="form-input flex-1"
                  required
                />
                <button type="submit" className="cta-button whitespace-nowrap">
                  Subscribe
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Checkbox */}
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <span className="body-text text-xs">
                  I confirm I have read and understood the{' '}
                  <a href="#" className="text-[#C9A45C] hover:underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#" className="text-[#C9A45C] hover:underline">Cookie Policy</a>
                  , and I agree to the{' '}
                  <a href="#" className="text-[#C9A45C] hover:underline">Terms</a>.
                </span>
              </label>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
