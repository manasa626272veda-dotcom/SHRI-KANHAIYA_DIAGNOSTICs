import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { CLINIC_INFO, SOCIAL_LINKS } from '../data/clinicData';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Dr. Sree Ranga' },
  { id: 'services', label: 'Cardiology Services' },
  { id: 'research', label: 'Research & Academics' },
  { id: 'patient-care', label: 'Patient Care Journey' },
  { id: 'gallery', label: 'Clinical Gallery' },
  { id: 'our-story', label: 'Our Story & Video Tour' },
  { id: 'faq', label: 'Frequently Asked Questions' },
  { id: 'contact', label: 'Contact & Location' },
  { path: '/book-appointment', label: 'Book Appointment', isRoute: true },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
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
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              {/* Facebook */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full bg-[#1877F2] text-white shadow-md hover:scale-110 hover:shadow-lg hover:shadow-[#1877F2]/40 transition-all duration-300"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.112 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-md hover:scale-110 hover:shadow-lg hover:shadow-[#dc2743]/40 transition-all duration-300"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Threads */}
              <a
                href={SOCIAL_LINKS.threads}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Threads"
                className="grid h-9 w-9 place-items-center rounded-full bg-black border border-white/20 text-white shadow-md hover:scale-110 hover:shadow-lg hover:shadow-white/30 transition-all duration-300"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.186 24c-3.535 0-6.44-1.163-8.18-3.276-1.572-1.908-2.155-4.485-1.642-7.256.55-2.969 2.37-5.51 5.127-7.156 2.585-1.545 5.792-2.135 9.03-1.66 3.498.513 6.448 2.51 8.307 5.626 1.343 2.25 1.84 4.887 1.436 7.625-.472 3.208-2.26 5.894-5.034 7.564-2.583 1.556-5.748 2.05-8.914 1.393-.195-.04-.325-.23-.284-.426.04-.195.23-.325.426-.284 2.97.616 5.94.153 8.364-1.306 2.6-1.566 4.277-4.085 4.72-7.094.38-2.573-.086-5.047-1.347-7.16-1.745-2.925-4.512-4.798-7.794-5.28-3.04-.446-6.05.108-8.477 1.56C6.15 8.1 4.442 10.487 3.927 13.275c-.482 2.602.066 5.02 1.542 6.812 1.53 1.858 4.103 2.88 7.247 2.88 3.518 0 6.643-1.285 8.8-3.618.14-.15.378-.158.528-.018.15.14.158.378.018.528-2.28 2.467-5.584 3.824-9.31 3.824zm.447-16.71c-3.155 0-5.72 2.384-5.72 5.313 0 2.93 2.565 5.314 5.72 5.314 3.154 0 5.718-2.385 5.718-5.314 0-2.93-2.564-5.313-5.718-5.313zm0 9.876c-2.742 0-4.97-2.046-4.97-4.563 0-2.517 2.228-4.563 4.97-4.563 2.74 0 4.968 2.046 4.968 4.563 0 2.517-2.227 4.563-4.968 4.563z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="grid h-9 w-9 place-items-center rounded-full bg-black border border-white/20 text-white shadow-md hover:scale-110 hover:shadow-lg hover:shadow-white/30 transition-all duration-300"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* ResearchGate */}
              <a
                href={SOCIAL_LINKS.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ResearchGate"
                className="grid h-9 w-9 place-items-center rounded-full bg-[#00CCBB] text-white shadow-md hover:scale-110 hover:shadow-lg hover:shadow-[#00CCBB]/40 transition-all duration-300"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.586 0c-.818 0-1.508.266-2.052.793-.54.526-.814 1.205-.814 2.022 0 .822.274 1.503.814 2.03.544.527 1.234.793 2.052.793.82 0 1.506-.266 2.046-.793.545-.527.818-1.208.818-2.03 0-.817-.273-1.496-.818-2.022C21.092.266 20.406 0 19.586 0zM1.77 8.35v15.65h4.634V8.35H1.77zm7.625 0v15.65h4.634v-8.42c0-1.896.425-3.328 1.272-4.296.847-.968 2.024-1.452 3.53-1.452 1.433 0 2.525.44 3.275 1.32.75.88 1.125 2.19 1.125 3.93v8.918h4.634v-9.688c0-3.003-.787-5.267-2.36-6.79-1.573-1.523-3.793-2.285-6.66-2.285-2.264 0-4.148.514-5.653 1.542V8.35H9.395z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white shadow-md hover:scale-110 hover:shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300"
              >
                <svg className="h-4.5 w-4.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF4148]">
              Quick Links
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.isRoute ? (
                    <Link
                      to={link.path}
                      className="group inline-flex items-center gap-1.5 hover:text-white transition-all cursor-pointer text-left"
                    >
                      <span className="text-[#E92932] group-hover:translate-x-1 transition-transform font-bold">›</span>
                      <span>{link.label}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="group inline-flex items-center gap-1.5 hover:text-white transition-all cursor-pointer text-left"
                    >
                      <span className="text-[#E92932] group-hover:translate-x-1 transition-transform font-bold">›</span>
                      <span>{link.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#FF4148]">
              Cardiac Services
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              {serviceLinks.map((serv) => (
                <li key={serv}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="group inline-flex items-center gap-1.5 hover:text-white transition-all cursor-pointer text-left"
                  >
                    <span className="text-[#E92932] group-hover:translate-x-1 transition-transform font-bold">›</span>
                    <span>{serv}</span>
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
                    {CLINIC_INFO.phone}
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
