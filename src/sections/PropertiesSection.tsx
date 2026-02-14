import { useEffect, useRef } from 'react';
import { ArrowRight, Bed, Bath, Sun } from 'lucide-react';

export default function PropertiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate info panel
            if (infoRef.current) {
              infoRef.current.style.opacity = '1';
              infoRef.current.style.transform = 'translateX(0)';
            }

            // Animate image
            if (imageRef.current) {
              setTimeout(() => {
                imageRef.current!.style.opacity = '1';
                imageRef.current!.style.transform = 'translateX(0) scale(1)';
              }, 200);
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
      id="properties"
      className="section-pinned"
      style={{ zIndex: 30, backgroundColor: '#0B0B0D' }}
    >
      {/* Info Panel */}
      <div
        ref={infoRef}
        className="absolute"
        style={{
          left: '10vw',
          top: '50%',
          transform: 'translateY(-50%) translateX(-50px)',
          opacity: 0,
          transition: 'all 1s ease',
          width: '30vw',
          maxWidth: '420px',
        }}
      >
        {/* Eyebrow */}
        <div className="eyebrow mb-4">Homes of the Month</div>

        {/* Property Name */}
        <h2 className="headline-lg mb-2">The Hawcliffe</h2>
        <p className="font-mono text-sm text-[#A7A29A] mb-6 tracking-wide">
          The Carriages, Oxenhope
        </p>

        {/* Price */}
        <div 
          className="font-heading text-4xl lg:text-5xl mb-6"
          style={{ color: '#C9A45C' }}
        >
          £390,000
        </div>

        {/* Features */}
        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Bed size={18} strokeWidth={1.5} className="text-[#C9A45C]" />
            <span className="font-mono text-sm text-[#A7A29A]">3</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} strokeWidth={1.5} className="text-[#C9A45C]" />
            <span className="font-mono text-sm text-[#A7A29A]">2</span>
          </div>
          <div className="flex items-center gap-2">
            <Sun size={18} strokeWidth={1.5} className="text-[#C9A45C]" />
            <span className="font-mono text-sm text-[#A7A29A]">Sunny Garden</span>
          </div>
        </div>

        {/* CTA */}
        <button className="cta-button">
          View this home
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Image */}
      <div
        ref={imageRef}
        className="absolute image-hover"
        style={{
          right: '7vw',
          top: '50%',
          transform: 'translateY(-50%) translateX(50px) scale(0.98)',
          opacity: 0,
          transition: 'all 1s ease',
          width: '46vw',
          height: '62vh',
          maxWidth: '720px',
          maxHeight: '720px',
        }}
      >
        <div 
          className="relative w-full h-full overflow-hidden"
          style={{ border: '1px solid rgba(201, 164, 92, 0.55)' }}
        >
          <img
            src="/images/prop_hawcliffe.jpg"
            alt="The Hawcliffe"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        {/* Pagination */}
        <div 
          className="absolute -bottom-10 right-0 font-mono text-sm text-[#A7A29A]"
        >
          01 / 04
        </div>
      </div>
    </section>
  );
}
