import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate left column
            if (leftRef.current) {
              leftRef.current.style.opacity = '1';
              leftRef.current.style.transform = 'translateX(0)';
            }

            // Animate right column
            if (rightRef.current) {
              setTimeout(() => {
                rightRef.current!.style.opacity = '1';
                rightRef.current!.style.transform = 'translateX(0)';
              }, 200);
            }

            // Animate footer
            if (footerRef.current) {
              setTimeout(() => {
                footerRef.current!.style.opacity = '1';
              }, 400);
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
    alert('Thank you for your message! We will be in touch soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      className="section-flowing py-24 lg:py-32"
      style={{ zIndex: 90, backgroundColor: '#0B0B0D' }}
    >
      <div className="px-[10vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20">
          {/* Left: Contact Info */}
          <div
            ref={leftRef}
            className="lg:w-2/5"
            style={{ opacity: 0, transform: 'translateX(-30px)', transition: 'all 0.8s ease' }}
          >
            <h2 className="headline-lg mb-6">Get in touch</h2>
            <p className="body-text mb-10 max-w-md">
              Have a question about a home, a development, or working with us? We're here to help.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-10">
              <a 
                href="mailto:hello@realgold.com" 
                className="flex items-center gap-4 text-[#F4F1EA] hover:text-[#C9A45C] transition-colors"
              >
                <Mail size={18} strokeWidth={1.5} className="text-[#C9A45C]" />
                <span className="font-mono text-sm tracking-wide">Say hello</span>
              </a>
              <a 
                href="tel:01535639620" 
                className="flex items-center gap-4 text-[#F4F1EA] hover:text-[#C9A45C] transition-colors"
              >
                <Phone size={18} strokeWidth={1.5} className="text-[#C9A45C]" />
                <span className="font-mono text-sm tracking-wide">01535 639 620</span>
              </a>
              <div className="flex items-start gap-4">
                <MapPin size={18} strokeWidth={1.5} className="text-[#C9A45C] mt-1" />
                <div className="font-mono text-sm text-[#A7A29A] tracking-wide">
                  Real Gold Properties Ltd<br />
                  Golden Court<br />
                  Regent Street<br />
                  London W1B 2EL
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-[#C9A45C]/40 text-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#0B0B0D] transition-all"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-[#C9A45C]/40 text-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#0B0B0D] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 flex items-center justify-center border border-[#C9A45C]/40 text-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#0B0B0D] transition-all"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div
            ref={rightRef}
            className="lg:w-3/5"
            style={{ opacity: 0, transform: 'translateX(30px)', transition: 'all 0.8s ease' }}
          >
            <div 
              className="p-8 lg:p-10"
              style={{ 
                backgroundColor: '#111114',
                border: '1px solid rgba(201, 164, 92, 0.25)'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-mono text-xs text-[#A7A29A] mb-2 tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[#A7A29A] mb-2 tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#A7A29A] mb-2 tracking-wide">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#A7A29A] mb-2 tracking-wide">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="form-input resize-none"
                    required
                  />
                </div>
                <button type="submit" className="cta-button w-full justify-center">
                  Send message
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="pt-10 border-t border-[#C9A45C]/20"
          style={{ opacity: 0, transition: 'opacity 0.8s ease' }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="font-mono text-xs text-[#A7A29A] tracking-wide">
              © 2026 Real Gold Properties Ltd. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="font-mono text-xs text-[#A7A29A] hover:text-[#C9A45C] transition-colors tracking-wide">
                Privacy Policy
              </a>
              <a href="#" className="font-mono text-xs text-[#A7A29A] hover:text-[#C9A45C] transition-colors tracking-wide">
                Cookie Policy
              </a>
              <a href="#" className="font-mono text-xs text-[#A7A29A] hover:text-[#C9A45C] transition-colors tracking-wide">
                Terms
              </a>
              <a href="#" className="font-mono text-xs text-[#A7A29A] hover:text-[#C9A45C] transition-colors tracking-wide">
                Sitemap
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
