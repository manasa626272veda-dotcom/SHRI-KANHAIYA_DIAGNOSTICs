import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'research', label: 'Research' },
  { id: 'patient-care', label: 'Patient Care' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'faq', label: 'FAQ' },
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (sectionId === 'about') {
      navigate('/about');
      return;
    }
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-md'
          : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'
      }`}
    >
      {/* Top Accent Gradient Border */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#E92932]/50 to-transparent pointer-events-none" />

      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16 sm:h-18' : 'h-20'
        }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center shrink-0 group py-1">
          <img 
            src="/kanhaiya-logo-transparent.png" 
            alt="Shri Kanhaiya Diagnostics & Chest Pain Clinic" 
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full border border-slate-200/90 bg-slate-100/80 backdrop-blur-md transition-colors">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className="text-[12px] xl:text-[13.5px] font-medium transition-all px-2.5 xl:px-3.5 py-1.5 rounded-full cursor-pointer text-slate-700 hover:text-[#E92932] hover:bg-white"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Controls (CTA) */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center rounded-full bg-[#E92932] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(233,41,50,0.5)] transition-all transform hover:scale-105 hover:bg-[#FF4148] hover:shadow-[0_0_28px_rgba(255,65,72,0.7)] active:scale-95"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="grid h-10 w-10 place-items-center rounded-full transition-colors text-slate-800 hover:bg-slate-100 border border-slate-300"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden backdrop-blur-2xl px-4 pb-6 pt-3 shadow-2xl animate-in slide-in-from-top duration-200 bg-white/98 border-t border-slate-200 text-slate-900">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className="py-3 text-left text-[15px] font-medium border-b border-slate-200/70 text-slate-700 hover:text-[#E92932] last:border-b-0 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-2 flex flex-col gap-3">
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

