import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Dr. Sree Ranga' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'services', label: 'Cardiology Services' },
  { id: 'gallery', label: 'Clinical Gallery' },
  { id: 'contact', label: 'Contact & Location' },
];

const serviceLinks = [
  'ECG & Cardiac Evaluation',
  'Echocardiography (ECHO)',
  'TMT / Stress Testing',
  'Holter Monitoring (24-72h)',
  'Coronary Angiography',
  'Angioplasty / PCI Stenting',
  'Arrhythmia Evaluation',
  'Preventive Heart Packages',
];

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
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
    <footer className="bg-[#061A2B] text-white border-t border-white/10 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center shrink-0 group">
              <img 
                src="/kanhaiya-logo-darktheme.png" 
                alt="Shri Kanhaiya Diagnostics & Chest Pain Clinic" 
                className="h-11 sm:h-13 md:h-15 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Premier cardiology practice in Nandini Layout, Bangalore. Led by Dr. Sree Ranga P.C. — Professor of Cardiology at BMCRI.
            </p>

            {/* Real Social Brand SVG Logos */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-[#E92932] hover:border-[#E92932] hover:text-white transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.112 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-[#E92932] hover:border-[#E92932] hover:text-white transition-all shadow-sm"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-[#E92932] hover:border-[#E92932] hover:text-white transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-[#E92932] hover:border-[#E92932] hover:text-white transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-[#E92932] hover:border-[#E92932] hover:text-white transition-all shadow-sm"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href={`https://wa.me/${CLINIC_INFO.phoneTel.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="grid h-9 w-9 place-items-center rounded-full bg-[#25d366] text-white shadow-md hover:scale-105 transition-transform"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF4148]">
              Quick Links
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF4148]">
              Cardiac Services
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {serviceLinks.map((serv) => (
                <li key={serv}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {serv}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Resources */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF4148]">
              Contact & Hours
            </div>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex gap-2.5 items-start">
                <MapPin className="h-4 w-4 mt-0.5 text-[#E92932] shrink-0" />
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  446, 1st Main Rd, Sreenivas Nagar, Nandini Layout, Bengaluru, Karnataka 560096
                </a>
              </div>
              <div className="flex gap-2.5 items-start">
                <Phone className="h-4 w-4 text-[#E92932] shrink-0 mt-0.5" />
                <div className="flex flex-col text-sm">
                  <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white font-medium transition-colors">
                    {CLINIC_INFO.phone} <span className="text-xs text-slate-400 font-normal">(Primary)</span>
                  </a>
                  <a href={`tel:${CLINIC_INFO.phoneTel.replace(/\s+/g, '')}`} className="hover:text-white font-medium transition-colors text-slate-300 text-xs">
                    {CLINIC_INFO.phoneTel}
                  </a>
                </div>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="h-4 w-4 text-[#E92932] shrink-0" />
                <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-white">
                  {CLINIC_INFO.email}
                </a>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 rounded-full bg-[#E92932] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(233,41,50,0.5)] transition-all hover:scale-105"
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 Shri Kanhaiya Diagnostics & Chest Pain Clinic. All rights reserved. Dr. Sree Ranga P.C.
          </div>
          <div className="flex gap-6">
            <button onClick={() => scrollToSection('home')} className="hover:text-slate-200 transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => scrollToSection('home')} className="hover:text-slate-200 transition-colors cursor-pointer">Terms of Care</button>
            <button onClick={() => scrollToSection('home')} className="hover:text-slate-200 transition-colors cursor-pointer">Medical Disclaimer</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
