import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'services', label: 'Services' },
  { id: 'patient-care', label: 'Patient Care' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#061A2B]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
        : 'bg-[#061A2B]/85 backdrop-blur-xl border-b border-white/10 shadow-md'
        }`}
    >
      {/* Top Accent Gradient Border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E92932]/50 to-transparent pointer-events-none" />

      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16 sm:h-18' : 'h-20'
          }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
          <div className="grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-xl bg-[#E92932] text-white shadow-[0_0_15px_rgba(233,41,50,0.5)] transition-transform group-hover:scale-105">
            <Heart className="h-5 w-5 sm:h-5.5 sm:w-5.5 text-white" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <div className="text-[14px] sm:text-[16px] font-bold text-white tracking-tight group-hover:text-[#FF4148] transition-colors">
              Shri Kanhaiya
            </div>
            <div className="text-[9.5px] sm:text-[10.5px] text-[#FF4148] font-semibold tracking-wide">
              Diagnostics & Chest Pain Clinic
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-[13.5px] font-medium text-slate-300 hover:text-white transition-all px-4 py-1.5 rounded-full hover:bg-white/10 cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Controls (CTA Button) */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center rounded-full bg-[#E92932] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(233,41,50,0.5)] transition-all transform hover:scale-105 hover:bg-[#FF4148] hover:shadow-[0_0_28px_rgba(255,65,72,0.7)] active:scale-95"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Controls (Menu Hamburger) */}
        <div className="lg:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-full text-white/80 hover:bg-white/10 border border-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#061A2B]/98 backdrop-blur-2xl border-t border-white/10 px-4 pb-6 pt-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="py-3 text-left text-[15px] font-medium text-slate-300 border-b border-white/5 last:border-b-0 transition-colors hover:text-white cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-4 pt-2">
            <Link
              to="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-full bg-[#E92932] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(233,41,50,0.5)]"
            >
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

