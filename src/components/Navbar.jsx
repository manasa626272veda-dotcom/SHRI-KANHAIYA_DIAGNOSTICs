import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useAppState } from '../context/AppContext';

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
  const { theme, toggleTheme } = useAppState();
  const isLight = theme === 'light';
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
        isLight
          ? scrolled
            ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/80 shadow-md'
            : 'bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'
          : scrolled
            ? 'bg-[#061A2B]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-[#061A2B]/85 backdrop-blur-xl border-b border-white/10 shadow-md'
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
            src={isLight ? "/kanhaiya-logo-transparent.png" : "/kanhaiya-logo-darktheme.png"} 
            alt="Shri Kanhaiya Diagnostics & Chest Pain Clinic" 
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border backdrop-blur-md transition-colors ${
          isLight
            ? 'bg-slate-100/80 border-slate-200/90'
            : 'bg-white/[0.03] border-white/10'
        }`}>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.id)}
              className={`text-[12px] xl:text-[13.5px] font-medium transition-all px-2.5 xl:px-3.5 py-1.5 rounded-full cursor-pointer ${
                isLight
                  ? 'text-slate-700 hover:text-[#E92932] hover:bg-white'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Controls (CTA & Theme Toggle) */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className={`grid h-10 w-10 place-items-center rounded-full transition-all duration-300 cursor-pointer ${
              isLight
                ? 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300/80 shadow-sm'
                : 'bg-white/10 text-amber-300 hover:bg-white/20 border border-white/15'
            }`}
          >
            {isLight ? (
              <Moon className="h-4.5 w-4.5 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
            ) : (
              <Sun className="h-4.5 w-4.5 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            )}
          </button>

          <Link
            to="/book-appointment"
            className="inline-flex items-center justify-center rounded-full bg-[#E92932] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(233,41,50,0.5)] transition-all transform hover:scale-105 hover:bg-[#FF4148] hover:shadow-[0_0_28px_rgba(255,65,72,0.7)] active:scale-95"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors cursor-pointer ${
              isLight
                ? 'bg-slate-100 text-slate-800 border border-slate-300'
                : 'text-amber-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            {isLight ? <Moon className="h-4.5 w-4.5 text-slate-700" /> : <Sun className="h-4.5 w-4.5 text-amber-300" />}
          </button>

          <button
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors ${
              isLight
                ? 'text-slate-800 hover:bg-slate-100 border border-slate-300'
                : 'text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden backdrop-blur-2xl px-4 pb-6 pt-3 shadow-2xl animate-in slide-in-from-top duration-200 ${
          isLight
            ? 'bg-white/98 border-t border-slate-200 text-slate-900'
            : 'bg-[#061A2B]/98 border-t border-white/10 text-white'
        }`}>
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.id)}
                className={`py-3 text-left text-[15px] font-medium border-b last:border-b-0 transition-colors cursor-pointer ${
                  isLight
                    ? 'text-slate-700 border-slate-200/70 hover:text-[#E92932]'
                    : 'text-slate-300 border-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-4 pt-2 flex flex-col gap-3">
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-full border text-sm font-semibold transition-colors cursor-pointer ${
                isLight
                  ? 'bg-slate-100 text-slate-800 border-slate-300'
                  : 'bg-white/10 text-white border-white/15'
              }`}
            >
              {isLight ? (
                <>
                  <Moon className="h-4 w-4 text-slate-700" /> Switch to Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 text-amber-300" /> Switch to Light Mode
                </>
              )}
            </button>

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

