import { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Find Your Home', href: '#find-home' },
    { label: 'Your Journey', href: '#stories' },
    { label: 'Our Purpose', href: '#values' },
    { label: 'Journal', href: '#journal' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0B0B0D]/90 backdrop-blur-md py-4'
            : 'bg-transparent py-6'
        }`}
        style={{ paddingLeft: '6vw', paddingRight: '6vw' }}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-mono text-sm tracking-[0.2em] text-[#F4F1EA]">
            REAL GOLD
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-6">
            <button className="text-[#F4F1EA] hover:text-[#C9A45C] transition-colors">
              <Heart size={20} strokeWidth={1.5} />
            </button>
            <button
              className="text-[#F4F1EA] hover:text-[#C9A45C] transition-colors lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button className="hidden lg:block text-[#F4F1EA] hover:text-[#C9A45C] transition-colors">
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0B0B0D]/98 backdrop-blur-lg transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-lg tracking-[0.15em] text-[#F4F1EA] hover:text-[#C9A45C] transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
