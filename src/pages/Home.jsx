import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Maximize2, X, BookOpen, FileText, Users, ExternalLink, Check, Activity, Heart, Shield, FlaskConical, Sun, ShieldCheck, Award, GraduationCap, HeartPulse, CheckCircle2, Sparkles, Building2, Stethoscope, Star } from "lucide-react";
import {
  CLINIC_INFO,
  MISSION,
  VISION,
  CORE_VALUES,
  SERVICES,
  BLOOD_TESTS,
  DIAGNOSTIC_TESTS,
  DIAGNOSTIC_FEATURES,
  CONDITIONS_ADDRESSED,
  WHY_CHOOSE_US,
  RESEARCH_ACADEMIC,
  PATIENT_JOURNEY,
  PREVENTIVE_RISKS,
  FAQS,
  CARE_PHILOSOPHY,
  KEY_CLINICAL_EXPERTISE,
  MEDICAL_EDUCATOR,
  PUBLISHED_RESEARCH_PAPERS,
} from "../data/clinicData";
import { useAppState } from "../context/AppContext";

// ─── Optimized Singleton Intersection Observer ─────────────────────────────
let sharedObserver = null;

function getSharedObserver() {
  if (typeof window === 'undefined') return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            sharedObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );
  }
  return sharedObserver;
}

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || el.classList.contains("visible")) return;
    const obs = getSharedObserver();
    if (obs) {
      obs.observe(el);
      return () => obs.unobserve(el);
    }
  }, []);
  return ref;
}

const RevealItem = React.memo(function RevealItem({ children, className = "", delay = 0 }) {
  const ref = useReveal();
  const delayClass = delay > 0 ? `reveal-delay-${Math.min(delay, 6)}` : "";
  return (
    <div ref={ref} className={`reveal ${delayClass} ${className}`}>
      {children}
    </div>
  );
});

function useCounter(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.max(1, Math.ceil(target / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref };
}

// ─── Image & Asset URLs ────────────────────────────────────────────────────────
const IMGS = {
  doctorHero: "/dr-sree-ranga-hero-laptop.jpg",
  doctorAbout: "/dr-sree-ranga-pc-about.jpg",
  aiPreventive: "/ai-preventive-cardiology.jpg",
  aiDiagnostics: "/ai-cardiac-diagnostics.jpg",
  aiInterventional: "/ai-interventional-cardiology.jpg",
  aiMissionBg: "/ai-clinic-mission-bg.jpg",
  aiVisionBg: "/ai-clinic-vision-bg.jpg",
  aiServicesBg: "/ai-services-bg.jpg",
  aiResearchBg: "/ai-research-bg.jpg",
  aiHypertensionBg: "/ai-hypertension-bg.jpg",
  aiRhythmBg: "/ai-rhythm-bg.jpg",
  aiConsultationBg: "/ai-consultation-bg.jpg",
  ecgMonitor: "/clinic-facility-01.jpg",
  ecgScreen: "/clinic-diagnostics-room-02.jpg",
  heartbeat: "/clinic-ecg-station-03.jpg",
  medicalTools: "/clinic-consultation-area-06.jpg",
  hospitalRoom: "/clinic-environment-suite-08.jpg",
  waitingRoom: "/clinic-patient-care-11.jpg",
  ecgPaper: "/clinic-workspace-15.jpg",
  medWorker: "/clinic-cardiac-desk-17.jpg",
};

const CLINIC_GALLERY_IMAGES = [
  { src: "/clinic-facility-01.jpg" },
  { src: "/clinic-diagnostics-room-02.jpg" },
  { src: "/clinic-ecg-station-03.jpg" },
  { src: "/clinic-chest-pain-desk-04.jpg" },
  { src: "/clinic-testing-facility-05.jpg" },
  { src: "/clinic-consultation-area-06.jpg" },
  { src: "/clinic-advanced-diagnostics-07.jpg" },
  { src: "/clinic-environment-suite-08.jpg" },
  { src: "/clinic-consultation-desk-09.jpg" },
  { src: "/clinic-cardiac-diagnostics-10.jpg" },
  { src: "/clinic-patient-care-11.jpg" },
  { src: "/clinic-reception-lounge-12.jpg" },
  { src: "/clinic-patient-unit-13.jpg" },
  { src: "/clinic-main-area-14.jpg" },
  { src: "/clinic-workspace-15.jpg" },
  { src: "/clinic-equipment-area-16.jpg" },
  { src: "/clinic-cardiac-desk-17.jpg" },
  { src: "/clinic-testing-suite-18.jpg" },
  { src: "/clinic-evaluation-suite-19.jpg" },
  { src: "/clinic-medical-diagnostics-20.jpg" },
  { src: "/clinic-station-21.jpg" },
  { src: "/clinic-heart-care-unit-22.jpg" },
  { src: "/clinic-diagnostic-suite-23.jpg" },
  { src: "/clinic-doctor-suite-24.jpg" },
  { src: "/clinic-examination-room-25.jpg" },
  { src: "/clinic-diagnostic-lab-26.jpg" },
  { src: "/clinic-chest-pain-screening-27.jpg" },
  { src: "/clinic-workspace-unit-28.jpg" },
  { src: "/clinic-instruments-desk-29.jpg" },
  { src: "/clinic-monitoring-station-30.jpg" },
  { src: "/clinic-waiting-lounge-31.jpg" },
  { src: "/clinic-cardiology-facility-32.jpg" },
  { src: "/clinic-healthcare-room-33.jpg" },
  { src: "/clinic-kanhaiya-facility-34.jpg" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="home" className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[820px] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-24 sm:pb-20 lg:pb-16 transition-colors duration-300 bg-gradient-to-r from-[#F0F7FE] via-[#FFFFFF] to-[#E6F2FD]">
      {/* Background Decorative Atmosphere & Glows - Right side 3D Heart Image */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Right Side Background Image - 3D Heart (Shifted left, static without animation) */}
        <div className="absolute top-1/2 right-4 sm:right-12 lg:right-28 xl:right-40 -translate-y-1/2 w-[220px] sm:w-[360px] lg:w-[460px] xl:w-[520px] h-auto pointer-events-none z-0 select-none opacity-30 sm:opacity-80 lg:opacity-90">
          <img
            src="/hero-3d-heart.png"
            alt=""
            className="w-full h-full object-contain"
            style={{
              filter: 'drop-shadow(0 15px 30px rgba(229,35,35,0.16))',
              imageRendering: 'high-quality',
            }}
          />
        </div>

        {/* Soft Right Cyan-Blue Ambient Glow */}
        <div className="animate-hero-bg-glow absolute top-0 right-0 w-[60%] sm:w-[55%] h-full bg-gradient-to-l from-[#DCEEFE] via-[#EEF6FE]/60 to-transparent opacity-70 rounded-l-full blur-3xl" />

        {/* Soft Left Ambient White/Blue Glow behind Doctor */}
        <div className="animate-hero-bg-glow absolute top-1/4 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#0284C7]/06 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />

        {/* Soft Right Red Cardiac Glow behind Heart */}
        <div className="animate-heart-aura absolute bottom-10 right-10 w-[300px] sm:w-[460px] h-[300px] sm:h-[460px] bg-[#E52323]/08 rounded-full blur-3xl" />

        {/* Ambient Subtle Animated ECG Line */}
        <svg className="absolute top-1/2 left-0 w-full h-28 sm:h-36 opacity-10 pointer-events-none -translate-y-1/2" viewBox="0 0 1200 120" fill="none">
          <path d="M0 60 H350 L365 38 L380 82 L395 15 L410 105 L425 60 H520 L530 42 L540 78 L550 60 H1200" stroke="#0284C7" strokeWidth="2.2" className="animate-ecg-draw" strokeLinecap="round" />
        </svg>
      </div>

      <div className="relative max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Main Banner Grid - Doctor on Left, Content & Interactive elements on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center">

          {/* LEFT COLUMN: Doctor Photograph with Curved Boundary */}
          <div className="lg:col-span-5 relative flex flex-col items-center lg:items-start justify-end animate-[fadeSlideUp_0.8s_ease-out_both]">

            {/* Handwritten Script Badge - Positioned on Upper Left like Reference */}
            <div className="absolute top-12 -left-2 sm:-left-4 lg:-left-6 z-30 pointer-events-none select-none -rotate-6">
              <div className="inline-block bg-white/70 backdrop-blur-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl shadow-xs border border-white/60">
                <span className="font-cursive text-xl sm:text-2xl lg:text-3xl text-[#0E2F56] font-bold tracking-wide leading-tight block">
                  Caring<br />for every<br />heartbeat
                </span>
                <svg className="w-16 sm:w-20 h-2 mt-0.5" viewBox="0 0 160 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9C45 3 115 2 158 9" stroke="#E52323" strokeWidth="3.4" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Doctor Portrait Container with Right-Side Curved Arc */}
            <div className="relative w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[470px] aspect-[4/5] rounded-[32px] sm:rounded-[44px] lg:rounded-tr-[160px] lg:rounded-br-[220px] lg:rounded-l-[36px] overflow-hidden shadow-2xl border-2 border-white/90 bg-white mb-6 lg:mb-0 group">
              <img
                src={IMGS.doctorHero}
                alt="Dr. Sree Ranga P.C. - Professor of Cardiology (BMCRI) & Consultant Cardiologist"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                style={{
                  imageRendering: 'high-quality',
                }}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Headline, Subtitle, Feature Badges, Location & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6 z-10">

            {/* Tagline Header & Location Pill */}
            <div className="animate-[fadeSlideDown_0.6s_ease-out_0.1s_both] flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2">
              <span className="text-[9.5px] sm:text-xs font-bold tracking-[0.12em] sm:tracking-[0.18em] uppercase inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-blue-100/90 shadow-2xs text-[#1E3A8A] bg-blue-50/90">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#E52323] animate-pulse-dot" />
                KANHAIYA CHEST PAIN CLINIC & DIAGNOSTICS
              </span>

              {/* Location Badge */}
              <span className="text-[9.5px] sm:text-[11px] font-bold tracking-wider uppercase inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-slate-200 bg-white/80 text-[#0E2F56] shadow-2xs">
                <MapPinIcon size={12} color="#E52323" className="animate-bounce" />
                BENGALURU, KARNATAKA
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.12] text-[#0E2F56] animate-[fadeSlideUp_0.7s_ease-out_0.2s_both]">
              Expert Heart Care
              <span className="block text-[#E52323] font-black mt-0.5 sm:mt-1">
                for a Healthier Tomorrow
              </span>
            </h1>

            {/* Sub-headline Paragraph */}
            <p className="text-xs sm:text-base font-medium leading-relaxed max-w-xl mx-auto lg:mx-0 text-slate-600 animate-[fadeSlideUp_0.7s_ease-out_0.3s_both]">
              Advanced diagnostics. Personalized treatment. Compassionate care under Professor Dr. Sree Ranga P.C.
            </p>

            {/* Interactive Cardiac Mission Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 pt-0.5 font-bold tracking-wider text-[10px] sm:text-xs uppercase select-none text-[#0E2F56]">
              <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#E52323]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-dot" />
                PREVENT
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7]">
                DETECT
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A]">
                TREAT
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#D97706]">
                LIVE BETTER
              </span>
            </div>

            {/* 4 Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-0.5">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center group p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-100 bg-white/80 shadow-2xs hover:shadow-md hover:border-red-200 transition-all duration-300 hover:-translate-y-1 cursor-default animate-[fadeSlideUp_0.6s_ease-out_0.4s_both]">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FFEBEB] border border-[#FFCDCD] flex items-center justify-center text-[#E52323] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-cardiac-beat" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h2l1-2 1.5 4 1-2h1.5" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-bold leading-tight text-[#0E2F56]">
                  Chest Pain<br />Evaluation
                </span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center group p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-100 bg-white/80 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all duration-300 hover:-translate-y-1 cursor-default animate-[fadeSlideUp_0.6s_ease-out_0.5s_both]">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EBF5FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-bold leading-tight text-[#0E2F56]">
                  ECG & Cardiac<br />Diagnostics
                </span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center group p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-100 bg-white/80 shadow-2xs hover:shadow-md hover:border-emerald-200 transition-all duration-300 hover:-translate-y-1 cursor-default animate-[fadeSlideUp_0.6s_ease-out_0.6s_both]">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#E6F4EA] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-bold leading-tight text-[#0E2F56]">
                  Preventive<br />Cardiology
                </span>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center text-center group p-2 sm:p-2.5 rounded-xl sm:rounded-2xl border border-slate-100 bg-white/80 shadow-2xs hover:shadow-md hover:border-amber-200 transition-all duration-300 hover:-translate-y-1 cursor-default animate-[fadeSlideUp_0.6s_ease-out_0.7s_both]">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#FFF5E5] border border-[#FDE68A] flex items-center justify-center text-[#D97706] mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                  <svg className="w-4.5 h-4.5 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-[10px] sm:text-xs font-bold leading-tight text-[#0E2F56]">
                  Personalized<br />Consultation
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-1.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 w-full animate-[fadeSlideUp_0.7s_ease-out_0.8s_both]">
              <Link to="/book-appointment" className="group animate-button-glow inline-flex items-center justify-center gap-2.5 bg-[#E52323] hover:bg-[#D01A1A] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto">
                Book an Appointment
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-[#0E2F56] px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-2xs transition-all duration-300 hover:scale-105 cursor-pointer">
                  <PhoneIcon size={14} color="#E52323" className="animate-pulse" />
                  Call Clinic
                </a>
                <a href={CLINIC_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-[#0E2F56] px-3.5 sm:px-5 py-2.5 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-2xs transition-all duration-300 hover:scale-105 cursor-pointer">
                  <MapPinIcon size={14} color="#E52323" />
                  Directions
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Banner Slideshow Section (Between Hero and About Us) ───────────────────────
function BannerSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenBanner, setFullscreenBanner] = useState(null);

  const banners = [
    {
      id: 1,
      src: '/cardiology-banner-1.png',
      alt: 'Dr. Sree Ranga P.C. — Interventional Cardiologist 18+ Years Experience Banner',
      title: 'Clinical Excellence & Interventional Cardiology',
    },
    {
      id: 2,
      src: '/cardiology-banner-2.png',
      alt: 'Dr. Sree Ranga P.C. — 20,000+ Coronary Angiograms & 5,000+ Angioplasties Banner',
      title: '20,000+ Angiograms & 5,000+ Angioplasties',
    },
  ];

  useEffect(() => {
    if (fullscreenBanner) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [fullscreenBanner, banners.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <section className="w-full relative z-20 bg-gradient-to-b from-[#F0F7FE]/60 via-white to-[#F4F8FC] border-y border-slate-200/80 py-5 sm:py-8">
      <div className="w-full px-2 sm:px-6 max-w-7xl mx-auto space-y-4">

        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-[#E52323] text-[11px] sm:text-xs font-bold tracking-widest uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E52323] animate-pulse-dot" />
            Clinical Excellence & Interventional Achievements
          </div>
        </div>

        {/* Full-View Banner Card Container */}
        <div className="relative w-full overflow-hidden shadow-xl rounded-xl sm:rounded-2xl border border-slate-200 bg-white group transition-all duration-300">
          
          {/* Main Banner Image Display */}
          <div
            className="relative w-full cursor-pointer overflow-hidden bg-slate-900"
            onClick={() => setFullscreenBanner(banners[currentIndex].src)}
          >
            {/* Natural Aspect Ratio Sizer (Hidden placeholder to maintain height) */}
            <img
              src={banners[0].src}
              alt=""
              className="w-full h-auto opacity-0 pointer-events-none block"
            />

            {banners.map((b, idx) => (
              <img
                key={b.id}
                src={b.src}
                alt={b.alt}
                style={{ imageRendering: 'high-quality' }}
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-700 ease-in-out ${
                  idx === currentIndex
                    ? 'opacity-100 z-10 scale-100'
                    : 'opacity-0 z-0 scale-102 pointer-events-none'
                }`}
              />
            ))}

            {/* Click to Enlarge Badge (Top-Right) */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium shadow-lg">
                <Maximize2 size={13} /> Click to expand
              </span>
            </div>

            {/* Left / Right Nav Buttons on Image (Hover) */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/85 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md hover:scale-105"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900/85 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all cursor-pointer shadow-md hover:scale-105"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Slide Indicator Bar Below Image (Zero Overlap with Banner Text) */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 text-white border-t border-slate-800">
            <span className="text-xs font-semibold text-slate-300 truncate max-w-[70%]">
              Slide {currentIndex + 1} of {banners.length}: {banners[currentIndex].title}
            </span>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {banners.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 h-2 rounded-full bg-[#E52323]'
                      : 'w-2 h-2 rounded-full bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      {fullscreenBanner && (
        <div
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setFullscreenBanner(null)}
        >
          <button
            type="button"
            onClick={() => setFullscreenBanner(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors cursor-pointer z-50"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <img
            src={fullscreenBanner}
            alt="Full size cardiology banner"
            className="max-w-full max-h-[92vh] object-contain rounded-xl shadow-2xl border border-white/10"
          />
        </div>
      )}
    </section>
  );
}

// ─── Stats & Key Highlights Section ──────────────────────────────────────────
function StatsSection() {
  const ref = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section className={`py-12 sm:py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-gradient-to-b from-white via-[#F4F8FC] to-white' : 'bg-[#030A14]'
      }`}>
      <div ref={ref} className="reveal max-w-7xl mx-auto space-y-8 sm:space-y-12">
        {/* Top Tagline */}
        <div className={`text-center font-display font-extrabold text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] uppercase ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
          EXPERIENCE <span className="text-[#E92932] mx-1 sm:mx-2 animate-pulse-subtle">•</span> EXPERTISE <span className="text-[#E92932] mx-1 sm:mx-2 animate-pulse-subtle">•</span> INNOVATION <span className="text-[#E92932] mx-1 sm:mx-2 animate-pulse-subtle">•</span> COMPASSION
        </div>

        {/* Main Statistics Card Container */}
        <div className={`relative rounded-3xl border overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl ${isLight
            ? 'border-slate-200/90 bg-gradient-to-br from-[#FBFDFF] via-[#F7FBFF] to-white text-slate-900 shadow-[0_15px_45px_rgba(20,55,90,0.05)]'
            : 'border-white/15 bg-gradient-to-br from-[#06192E] via-[#041220] to-[#030A14] text-white shadow-2xl'
          }`}>
          {/* Animated Ambient ECG Vector Line Background */}
          <svg
            className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-24 pointer-events-none opacity-50 z-0"
            viewBox="0 0 1400 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0 55 L90 55 L105 55 L120 18 L137 86 L151 55 L250 55 L270 55 L282 55 L300 10 L320 94 L340 55 L450 55 L470 55 L490 55 L505 25 L522 80 L540 55 L640 55 L660 55 L680 55 L695 15 L715 92 L735 55 L840 55 L860 55 L880 55 L895 24 L912 80 L930 55 L1040 55 L1060 55 L1080 55 L1095 12 L1115 94 L1135 55 L1240 55 L1260 55 L1280 55 L1295 28 L1312 78 L1330 55 L1400 55"
              fill="none"
              stroke="#E92932"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
              className="animate-ecg-draw"
            />
          </svg>

          {/* 4 Grid Columns */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 dark:divide-white/10">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center group transition-all duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-red-50 border border-red-200/80 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md group-hover:bg-red-100/90 shadow-2xs">
                <svg className="w-8 h-8 stroke-[#E92932] fill-none" viewBox="0 0 48 48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="12" r="6" />
                  <path d="M12 39v-5c0-6 5-10 12-10s12 4 12 10v5" />
                  <path d="M15 25v8" />
                  <path d="M33 25v8" />
                  <circle cx="15" cy="36" r="3" />
                  <circle cx="33" cy="36" r="3" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#E92932] leading-none mb-1 group-hover:scale-105 transition-transform duration-300">
                BMCRI
              </div>
              <div className={`text-base font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Professor
              </div>
              <div className="w-7 h-1 rounded-full bg-[#E92932] mt-3 group-hover:w-14 transition-all duration-300 shadow-sm" />
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center group transition-all duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-sky-50 border border-sky-200/80 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-115 group-hover:-rotate-6 group-hover:shadow-md group-hover:bg-sky-100/90 shadow-2xs">
                <svg className="w-8 h-8 stroke-[#0284C7] fill-none" viewBox="0 0 48 48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="11" width="30" height="28" rx="4" />
                  <line x1="9" y1="19" x2="39" y2="19" />
                  <line x1="17" y1="7" x2="17" y2="15" />
                  <line x1="31" y1="7" x2="31" y2="15" />
                  <circle cx="17" cy="26" r="1.5" />
                  <circle cx="24" cy="26" r="1.5" />
                  <circle cx="31" cy="26" r="1.5" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#E92932] leading-none mb-1 group-hover:scale-105 transition-transform duration-300">
                18+
              </div>
              <div className={`text-base font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Years Experience
              </div>
              <div className="w-7 h-1 rounded-full bg-[#E92932] mt-3 group-hover:w-14 transition-all duration-300 shadow-sm" />
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center group transition-all duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-amber-50 border border-amber-200/80 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md group-hover:bg-amber-100/90 shadow-2xs">
                <svg className="w-8 h-8 stroke-[#D97706] fill-none" viewBox="0 0 48 48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M24 7l5.2 10.5L41 19l-8.5 8.3L34.5 39 24 33.5 13.5 39l2-11.7L7 19l11.8-1.5z" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#E92932] leading-none mb-1 group-hover:scale-105 transition-transform duration-300">
                4.9/5
              </div>
              <div className={`text-base font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Patient Rating
              </div>
              <div className="w-7 h-1 rounded-full bg-[#E92932] mt-3 group-hover:w-14 transition-all duration-300 shadow-sm" />
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center group transition-all duration-300 hover:-translate-y-1.5 cursor-default">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-115 group-hover:-rotate-6 group-hover:shadow-md group-hover:bg-emerald-100/90 shadow-2xs">
                <svg className="w-8 h-8 stroke-[#16A34A] fill-none" viewBox="0 0 48 48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="24" cy="14" r="6" />
                  <circle cx="10" cy="18" r="4" />
                  <circle cx="38" cy="18" r="4" />
                  <path d="M12 39c0-7 5-12 12-12s12 5 12 12" />
                  <path d="M2 38c0-5 3-8 8-8" />
                  <path d="M46 38c0-5-3-8-8-8" />
                </svg>
              </div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-[#E92932] leading-none mb-1 group-hover:scale-105 transition-transform duration-300">
                127+
              </div>
              <div className={`text-base font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Verified Reviews
              </div>
              <div className="w-7 h-1 rounded-full bg-[#E92932] mt-3 group-hover:w-14 transition-all duration-300 shadow-sm" />
            </div>
          </div>
        </div>

        {/* Lower Highlights (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className={`flex items-center gap-5 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-red-200/80 group cursor-default ${isLight
              ? 'bg-white border-slate-200/90 shadow-sm text-slate-900'
              : 'dark-glass-card border-white/15 text-white'
            }`}>
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:bg-red-100/90 transition-all duration-300">
              <svg className="w-8 h-8 stroke-[#E92932] fill-none" viewBox="0 0 48 48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 39S7 29 7 17c0-6 4-10 9-10 4 0 7 2 8 6 1-4 4-6 8-6 5 0 9 4 9 10 0 12-17 22-17 22z" />
                <path d="M10 24h8l3-6 4 12 3-6h10" />
              </svg>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#E92932]">
                20,000+
              </div>
              <div className={`text-sm font-bold mt-0.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Cardiac & Vascular Procedures
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`flex items-center gap-5 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-sky-200/80 group cursor-default ${isLight
              ? 'bg-white border-slate-200/90 shadow-sm text-slate-900'
              : 'dark-glass-card border-white/15 text-white'
            }`}>
            <div className="w-16 h-16 rounded-2xl bg-sky-50 border border-sky-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:bg-sky-100/90 transition-all duration-300">
              <svg className="w-8 h-8 stroke-[#0284C7] fill-none" viewBox="0 0 48 48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 39V25c0-5 3-8 7-8s7 3 7 8v14" />
                <path d="M17 28h14" />
                <path d="M21 17V9" />
                <path d="M26 17V7" />
                <path d="M31 17v-6" />
                <path d="M13 39h22" />
              </svg>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isLight ? 'text-[#0E2F56]' : 'text-sky-400'}`}>
                2,000+
              </div>
              <div className={`text-sm font-bold mt-0.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Procedures in the last 2 years
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`flex items-center gap-5 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-red-200/80 group cursor-default ${isLight
              ? 'bg-white border-slate-200/90 shadow-sm text-slate-900'
              : 'dark-glass-card border-white/15 text-white'
            }`}>
            <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:bg-red-100/90 transition-all duration-300">
              <svg className="w-8 h-8 stroke-[#E92932] fill-none" viewBox="0 0 48 48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M25 39c-8-3-13-10-13-18 0-6 4-11 10-14 2 4 5 7 9 8 4 2 7 5 7 10 0 7-5 12-13 14z" />
                <path d="M25 39V18" />
                <path d="M25 25l-7-5" />
                <path d="M25 29l8-6" />
              </svg>
            </div>
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <div className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isLight ? 'text-[#0E2F56]' : 'text-white'}`}>
                Advanced Interventions
              </div>
              <div className={`text-xs sm:text-sm font-bold mt-0.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                Complex & Structural Heart Care
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Dr. Sree Ranga P.C. & Kanhaiya Diagnostics ─────────────────────
// ─── About Dr. Sree Ranga P.C. & Kanhaiya Diagnostics ─────────────────────
function About() {
  const ref = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="about" className={`py-14 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300 overflow-hidden ${isLight ? 'bg-gradient-to-br from-[#F8FAFC] via-white to-[#F0F4F8] border-b border-slate-200/80' : 'bg-[#040E1B] border-b border-white/10'
      }`}>
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

      <div ref={ref} className="reveal max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Heroic Doctor Photo Card & Floating Key Badges */}
          <div className="lg:col-span-5 flex flex-col items-center">

            {/* Interactive Portrait Card Frame */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] group">
              {/* Outer Ambient Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#E92932]/30 via-[#0E2F56]/20 to-[#0284C7]/30 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700" />

              {/* Main Card Image Box */}
              <div className={`relative w-full aspect-[4/4.8] rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500 group-hover:scale-[1.01] ${isLight ? 'bg-white border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.12)]' : 'bg-[#06192E] border-white/15'
                }`}>
                <img
                  src={IMGS.doctorAbout}
                  alt="Dr. Sree Ranga P.C."
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />

                {/* Top Badge: Lead Cardiologist & Founder */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[11px] sm:text-xs font-bold shadow-lg border border-white/20">
                    <Star size={13} className="text-amber-400 fill-amber-400" /> Lead Cardiologist & Founder
                  </span>
                </div>

                {/* Bottom Glassmorphism Overlay Panel */}
                <div className="absolute inset-x-3 bottom-3 p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md text-white border border-white/20 shadow-xl space-y-1">
                  <h3 className="text-lg sm:text-xl font-extrabold leading-tight text-white tracking-tight">
                    Dr. Sree Ranga P.C.
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    MBBS, MD (General Medicine), DM (Cardiology), FCSI
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Glassmorphic Feature Stat Badges */}
            <div className="mt-5 w-full max-w-[400px] grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Badge 1 */}
              <div className={`p-2.5 rounded-2xl border text-center transition-all duration-300 shadow-2xs hover:shadow-md ${isLight ? 'bg-white/90 border-slate-200/90 text-slate-800' : 'bg-white/5 border-white/10 text-slate-200'
                }`}>
                <div className="flex items-center justify-center gap-1 text-[#E92932] mb-0.5">
                  <Award size={14} />
                  <span className="text-xs font-black tracking-tight">18+ Yrs</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
                  Clinical Experience
                </div>
              </div>

              {/* Badge 2 */}
              <div className={`p-2.5 rounded-2xl border text-center transition-all duration-300 shadow-2xs hover:shadow-md ${isLight ? 'bg-white/90 border-slate-200/90 text-slate-800' : 'bg-white/5 border-white/10 text-slate-200'
                }`}>
                <div className="flex items-center justify-center gap-1 text-[#0284C7] mb-0.5">
                  <GraduationCap size={14} />
                  <span className="text-xs font-black tracking-tight">Professor</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
                  @ BMCRI
                </div>
              </div>

              {/* Badge 3 */}
              <div className={`p-2.5 rounded-2xl border text-center transition-all duration-300 shadow-2xs hover:shadow-md ${isLight ? 'bg-white/90 border-slate-200/90 text-slate-800' : 'bg-white/5 border-white/10 text-slate-200'
                }`}>
                <div className="flex items-center justify-center gap-1 text-[#16A34A] mb-0.5">
                  <Activity size={14} />
                  <span className="text-xs font-black tracking-tight">20,000+</span>
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-tight">
                  Interventions
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Content Narrative & Styled Elements */}
          <div className="lg:col-span-7 space-y-6">

            {/* Header Eyebrow Tag */}
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-[2.5px] rounded-full bg-[#E92932]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E92932]">
                About Our Practice & Leadership
              </span>
            </div>

            {/* Main Title */}
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-[1.18] ${isLight ? 'text-[#0E2F56]' : 'text-white'
              }`}>
              Pioneering Heart Care with <span className="text-[#E92932]">Precision, Compassion & Academic Excellence</span>
            </h2>

            {/* Paragraphs with Refined Text Styling */}
            <div className={`space-y-3.5 text-sm sm:text-base leading-relaxed font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
              <p>
                <strong className={isLight ? 'text-[#0E2F56]' : 'text-white'}>Shri Kanhaiya Chest Pain Clinic & Diagnostics</strong> was founded by <strong className={isLight ? 'text-[#0E2F56]' : 'text-white'}>Dr. Sree Ranga P.C.</strong>, Professor of Cardiology at the prestigious Bangalore Medical College and Research Institute (BMCRI). With nearly two decades of clinical and interventional practice, our center represents the pinnacle of patient-centered cardiac management in Bengaluru.
              </p>
              <p>
                Dr. Sree Ranga P.C. has performed over <strong className={isLight ? 'text-[#0E2F56]' : 'text-white'}>20,000 cardiac and vascular procedures</strong>, including 5,000+ complex angioplasties (PCI), primary PCI in acute heart attacks, pacemaker implantations, and advanced structural interventions. As a dedicated academic educator, he trains the next generation of cardiologists while delivering world-class evidence-based treatment to patients.
              </p>
              <p>
                Our clinic combines immediate diagnostic evaluation—ECG, Echo, Treadmill Testing (TMT), Holter Monitoring, and Comprehensive Blood Diagnostics—with personalized care plans designed for early risk detection, chest pain triage, and long-term cardiovascular health.
              </p>
            </div>

            {/* Bullet Points Grid (4 Glass Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 shadow-2xs group hover:shadow-md ${isLight ? 'bg-white border-slate-200/90 hover:border-emerald-300' : 'bg-white/5 border-white/10 hover:border-emerald-500/40'
                }`}>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </div>
                <span className={`text-xs sm:text-sm font-bold leading-snug ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  Immediate Chest Pain & Emergency Triage
                </span>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 shadow-2xs group hover:shadow-md ${isLight ? 'bg-white border-slate-200/90 hover:border-emerald-300' : 'bg-white/5 border-white/10 hover:border-emerald-500/40'
                }`}>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </div>
                <span className={`text-xs sm:text-sm font-bold leading-snug ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  Evidence-Based & Guideline-Driven Care
                </span>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 shadow-2xs group hover:shadow-md ${isLight ? 'bg-white border-slate-200/90 hover:border-emerald-300' : 'bg-white/5 border-white/10 hover:border-emerald-500/40'
                }`}>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </div>
                <span className={`text-xs sm:text-sm font-bold leading-snug ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  State-of-the-Art In-House Diagnostics
                </span>
              </div>

              <div className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center gap-3 shadow-2xs group hover:shadow-md ${isLight ? 'bg-white border-slate-200/90 hover:border-emerald-300' : 'bg-white/5 border-white/10 hover:border-emerald-500/40'
                }`}>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={18} className="text-emerald-600" />
                </div>
                <span className={`text-xs sm:text-sm font-bold leading-snug ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  Affordable, Transparent & Patient-First
                </span>
              </div>
            </div>

            {/* Read More Link */}
            <div className="pt-3">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#E92932] to-[#FF4148] hover:from-[#D01A1A] hover:to-[#E92932] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] transition-all cursor-pointer group"
              >
                <span>Read More About Dr. Sree Ranga & Practice</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Services & Diagnostics ───────────────────────────────────────────────────
function ServicesSection() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="services" className={`py-14 lg:py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300 overflow-hidden ${isLight ? 'bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-y border-slate-200/80' : 'bg-[#051322] border-y border-white/10'
      }`}>
      <div className="max-w-7xl mx-auto relative z-10 space-y-16 lg:space-y-20">

        {/* CARDIOLOGY SERVICES HEADER & GRID */}
        <div>
          <div ref={headRef} className="reveal text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
            <div className="flex items-center justify-center gap-2">
              <span className="w-8 h-[2.5px] rounded-full bg-[#E92932]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E92932]">
                CARDIOLOGY SERVICES
              </span>
              <span className="w-8 h-[2.5px] rounded-full bg-[#E92932]" />
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Comprehensive <span className="text-[#E92932]">Cardiac Care</span>
            </h2>
            <p className={`text-sm sm:text-base font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              Expert consultation, advanced diagnostic evaluation, and personalized treatment plans for all cardiovascular conditions.
            </p>
          </div>

          {/* 10 Cardiology Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {SERVICES.map((s, i) => (
              <RevealItem key={s.id || s.name} delay={(i % 3) + 1}>
                <div className={`group relative flex flex-col justify-between p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl h-full ${isLight
                  ? 'bg-white border-slate-200/90 shadow-2xs hover:border-[#E92932]/40 text-slate-900'
                  : 'dark-glass-card border-white/15 text-white'
                  }`}>
                  <div>
                    {/* Icon Badge */}
                    <div className={`w-13 h-13 rounded-2xl flex items-center justify-center mb-4.5 group-hover:scale-110 transition-transform duration-300 shadow-2xs ${isLight
                      ? 'bg-red-50 border border-red-200 text-[#E92932]'
                      : 'bg-red-950/60 border border-red-800/40 text-red-400'
                      }`}>
                      {s.icon ? (
                        <span className="w-6 h-6 flex items-center justify-center text-[#E92932]">{s.icon}</span>
                      ) : (
                        <Heart size={24} className="text-[#E92932]" />
                      )}
                    </div>

                    <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-2 transition-colors group-hover:text-[#E92932] ${isLight ? 'text-slate-900' : 'text-white'
                      }`}>
                      {s.name}
                    </h3>

                    <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                      {s.description}
                    </p>
                  </div>

                  <div className={`mt-5 pt-3.5 border-t ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
                    <Link
                      to="/book-appointment"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#E92932] hover:text-[#FF4148] transition-colors group-hover:gap-2.5 duration-300"
                    >
                      <span>{s.ctaText || "Book Consultation"}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>

        {/* DIAGNOSTICS & LABORATORY SERVICES SECTION */}
        <div id="diagnostics" className={`py-12 sm:py-16 transition-all duration-300 ${isLight ? 'border-t border-slate-200/80' : 'border-t border-white/10'}`}>

          {/* Header (Left Aligned matching reference image) */}
          <div className="max-w-4xl mb-8 sm:mb-10 space-y-2.5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-[2.5px] rounded-full bg-[#E92932]" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#E92932]">
                DIAGNOSTICS & LABORATORY SERVICES
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] ${isLight ? 'text-[#0E2F56]' : 'text-white'}`}>
              Essential investigations for<br />
              <span className="text-[#E92932]">accurate and timely healthcare.</span>
            </h2>
            <p className={`text-sm sm:text-base font-medium leading-relaxed max-w-2xl ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              A range of diagnostic and laboratory investigations to support clinical evaluation and routine health assessment.
            </p>
          </div>

          {/* Grid Layout: Left Main Card + Right 2x2 Diagnostic Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Left: Main Blood Tests Card (Spans 5 cols on LG) */}
            <div className="lg:col-span-5 flex flex-col">
              <RevealItem delay={1} className="h-full">
                <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 h-full flex flex-col justify-between shadow-xl ${isLight
                  ? 'bg-white border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06)] hover:shadow-[0_25px_60px_rgba(15,23,42,0.1)]'
                  : 'bg-[#06192E] border-white/15 text-white'
                  }`}>
                  <div>
                    {/* Beaker / Lab Icon */}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-2xs ${isLight ? 'bg-rose-50 border border-rose-200/80 text-[#E92932]' : 'bg-rose-950/60 border border-rose-900/40 text-rose-400'
                      }`}>
                      <FlaskConical size={22} className={isLight ? 'text-[#E92932]' : 'text-rose-400'} />
                    </div>

                    <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight mb-1.5 ${isLight ? 'text-[#0E2F56]' : 'text-white'}`}>
                      Blood Tests & Laboratory Investigations
                    </h3>

                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Comprehensive laboratory testing covering routine and specialised blood investigations based on clinical requirements.
                    </p>

                    {/* 16 Checklist Items inside Soft Tinted Container */}
                    <div className={`rounded-2xl p-4 sm:p-5 my-5 border transition-colors ${isLight ? 'bg-rose-50/50 border-rose-100/90' : 'bg-white/5 border-white/10'
                      }`}>
                      <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 text-xs sm:text-[13px] font-medium">
                        {/* Column 1 */}
                        <div className="space-y-2.5">
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Complete Blood Count (CBC)</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Blood Sugar / Glucose</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>HbA1c</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Lipid Profile</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Liver Function Tests (LFT)</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Kidney Function Tests (KFT / RFT)</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Thyroid Function Tests (T3, T4, TSH)</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Vitamin B12</span>
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="space-y-2.5">
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Vitamin D</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Iron Studies</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Electrolytes</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Uric Acid</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>CRP</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>ESR</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Routine Blood Tests</span>
                          </div>
                          <div className="flex items-start gap-2 leading-snug">
                            <span className="w-4 h-4 rounded-full bg-[#E92932] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">✓</span>
                            <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200'}>Other clinically indicated investigations</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Red CTA Button */}
                  <div className="pt-1">
                    <Link
                      to="/book-appointment?service=blood-tests-laboratory"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E92932] to-[#FF4148] hover:from-[#D01A1A] hover:to-[#E92932] text-white font-extrabold text-xs sm:text-sm shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/35 transition-all hover:scale-105 cursor-pointer group"
                    >
                      <span>View All Tests →</span>
                    </Link>
                  </div>

                </div>
              </RevealItem>
            </div>

            {/* Right: 4 Diagnostic Test Cards 2x2 Grid (Spans 7 cols on LG) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Card 1: Chest X-Ray */}
              <RevealItem delay={1}>
                <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between h-full group ${isLight ? 'bg-white border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.04)]' : 'bg-[#06192E] border-white/15 text-white'
                  }`}>
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0 shadow-2xs group-hover:scale-110 transition-transform ${isLight ? 'bg-sky-50 border border-sky-200/80 text-sky-600' : 'bg-sky-950/60 border border-sky-900/40 text-sky-400'
                      }`}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2v20M8 5v14M16 5v14M4 8v8M20 8v8" />
                      </svg>
                    </div>
                    <h4 className={`text-base sm:text-lg font-extrabold tracking-tight mb-1.5 ${isLight ? 'text-[#0E2F56]' : 'text-white'}`}>
                      Chest X-Ray
                    </h4>
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Chest radiography to assist in evaluating the lungs, heart size and other structures within the chest.
                    </p>
                  </div>
                  <div className="mt-6 pt-2">
                    <Link to="/book-appointment?service=chest-xray-diagnostics" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#E92932] group-hover:text-[#FF4148] group-hover:gap-2.5 transition-all">
                      <span>Book Test →</span>
                    </Link>
                  </div>
                </div>
              </RevealItem>

              {/* Card 2: ECG */}
              <RevealItem delay={2}>
                <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between h-full group ${isLight ? 'bg-white border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.04)]' : 'bg-[#06192E] border-white/15 text-white'
                  }`}>
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0 shadow-2xs group-hover:scale-110 transition-transform ${isLight ? 'bg-rose-50 border border-rose-200/80 text-[#E92932]' : 'bg-rose-950/60 border border-rose-900/40 text-rose-400'
                      }`}>
                      <Activity size={20} className={isLight ? 'text-[#E92932]' : 'text-rose-400'} />
                    </div>
                    <h4 className={`text-base sm:text-lg font-extrabold tracking-tight mb-1.5 ${isLight ? 'text-[#0E2F56]' : 'text-white'}`}>
                      ECG (Electrocardiogram)
                    </h4>
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Assessment of heart rate, rhythm and electrical activity.
                    </p>
                  </div>
                  <div className="mt-6 pt-2">
                    <Link to="/book-appointment?service=ecg-diagnostics" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#E92932] group-hover:text-[#FF4148] group-hover:gap-2.5 transition-all">
                      <span>Book Test →</span>
                    </Link>
                  </div>
                </div>
              </RevealItem>

              {/* Card 3: ECHO */}
              <RevealItem delay={3}>
                <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between h-full group ${isLight ? 'bg-white border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.04)]' : 'bg-[#06192E] border-white/15 text-white'
                  }`}>
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0 shadow-2xs group-hover:scale-110 transition-transform ${isLight ? 'bg-blue-50 border border-blue-200/80 text-blue-600' : 'bg-blue-950/60 border border-blue-900/40 text-blue-400'
                      }`}>
                      <Heart size={20} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                    </div>
                    <h4 className={`text-base sm:text-lg font-extrabold tracking-tight mb-1.5 ${isLight ? 'text-[#0E2F56]' : 'text-white'}`}>
                      ECHO (Echocardiography)
                    </h4>
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Evaluation of cardiac structure and function.
                    </p>
                  </div>
                  <div className="mt-6 pt-2">
                    <Link to="/book-appointment?service=echo-diagnostics" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#E92932] group-hover:text-[#FF4148] group-hover:gap-2.5 transition-all">
                      <span>Book Test →</span>
                    </Link>
                  </div>
                </div>
              </RevealItem>

              {/* Card 4: TMT */}
              <RevealItem delay={4}>
                <div className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between h-full group ${isLight ? 'bg-white border-slate-200/90 shadow-[0_10px_30px_rgba(15,23,42,0.04)]' : 'bg-[#06192E] border-white/15 text-white'
                  }`}>
                  <div>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0 shadow-2xs group-hover:scale-110 transition-transform ${isLight ? 'bg-amber-50 border border-amber-200/80 text-amber-600' : 'bg-amber-950/60 border border-amber-900/40 text-amber-400'
                      }`}>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="5" r="2" />
                        <path d="M10 22l3-7 3 2 3-5M6 14l4-3 2 3" />
                      </svg>
                    </div>
                    <h4 className={`text-base sm:text-lg font-extrabold tracking-tight mb-1.5 ${isLight ? 'text-[#0E2F56]' : 'text-white'}`}>
                      TMT (Treadmill Test)
                    </h4>
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      Assessment of cardiac response to exercise when clinically indicated.
                    </p>
                  </div>
                  <div className="mt-6 pt-2">
                    <Link to="/book-appointment?service=tmt-diagnostics" className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#E92932] group-hover:text-[#FF4148] group-hover:gap-2.5 transition-all">
                      <span>Book Test →</span>
                    </Link>
                  </div>
                </div>
              </RevealItem>

            </div>

          </div>

          {/* 3-COLUMN FEATURE HIGHLIGHTS BAR */}
          <div className={`mt-8 rounded-2xl p-5 border shadow-sm transition-all ${isLight
              ? 'bg-[#F0F7FF] border-[#D5E6F9]'
              : 'bg-[#06192E] border-white/15 text-white'
            }`}>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 dark:divide-white/10 gap-4 md:gap-0">

              {/* Feature 1 */}
              <div className="flex items-center gap-3.5 md:px-6 first:pl-0">
                <div className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 shadow-2xs ${isLight ? 'bg-white border-sky-300 text-sky-600' : 'bg-sky-950/80 border-sky-800 text-sky-300'
                  }`}>
                  <Sun size={20} className={isLight ? 'text-sky-600' : 'text-sky-300'} />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Advanced Technology
                  </h4>
                  <p className={`text-[11px] sm:text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Modern equipment & latest techniques
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3.5 md:px-6 pt-3 md:pt-0">
                <div className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 shadow-2xs ${isLight ? 'bg-white border-sky-300 text-sky-600' : 'bg-sky-950/80 border-sky-800 text-sky-300'
                  }`}>
                  <ShieldCheck size={20} className={isLight ? 'text-sky-600' : 'text-sky-300'} />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Accurate Results
                  </h4>
                  <p className={`text-[11px] sm:text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Reliable and timely reporting
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3.5 md:px-6 pt-3 md:pt-0 last:pr-0">
                <div className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 shadow-2xs ${isLight ? 'bg-white border-sky-300 text-sky-600' : 'bg-sky-950/80 border-sky-800 text-sky-300'
                  }`}>
                  <Heart size={20} className={isLight ? 'text-sky-600' : 'text-sky-300'} />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Trusted Care
                  </h4>
                  <p className={`text-[11px] sm:text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Your heart health is our priority
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Conditions We Address */}
          <div className="mt-8 sm:mt-10">
            <RevealItem delay={1}>
              <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'dark-glass-card border-white/10 text-white'
                }`}>
                <div className="text-center mb-5">
                  <h3 className={`text-lg sm:text-xl font-bold mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Conditions We Address
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    Evaluating & managing a wide spectrum of heart and vascular conditions.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
                  {CONDITIONS_ADDRESSED.map((cond) => (
                    <span
                      key={cond}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-105 ${isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-800 shadow-2xs hover:border-[#E92932] hover:bg-red-50/50'
                        : 'bg-white/5 border-white/15 text-slate-200 hover:border-[#E92932]'
                        }`}
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              </div>
            </RevealItem>
          </div>

        </div>

      </div>
    </section>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="why-choose-us" className={`py-10 sm:py-14 px-4 sm:px-6 lg:px-8 overflow-hidden relative z-10 transition-colors duration-300 ${isLight ? 'bg-slate-100/70 border-b border-slate-200/80' : 'bg-[#040E1B]/95 backdrop-blur-xl border-b border-white/10'
      }`}>
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Compact Section Header */}
        <div ref={headRef} className="reveal text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#E52323] text-xs font-bold tracking-widest uppercase shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E52323] animate-pulse-dot" />
            Why Choose Dr. Sree Ranga P.C.
          </div>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Precision in Diagnosis. <span className="text-[#E52323]">Confidence in Care.</span>
          </h2>
          <p className={`text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Combining academic excellence at Bangalore Medical College & Research Institute (BMCRI) with patient-focused clinical evaluation in Bengaluru.
          </p>
        </div>

        {/* 10 Items Compact 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {WHY_CHOOSE_US.map((r, i) => (
            <RevealItem key={r.num} delay={Math.min((i % 5) + 1, 4)}>
              <div className={`flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md h-full ${isLight
                  ? 'bg-white border-slate-200/90 shadow-2xs text-slate-900 hover:border-red-200'
                  : 'bg-[#06192E] border-white/15 text-white hover:border-red-500/30'
                }`}>
                <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E52323] font-black text-xs sm:text-sm shadow-2xs">
                  {r.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`text-xs sm:text-sm font-bold leading-snug mb-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {r.title}
                  </h3>
                  <p className={`text-[11px] sm:text-xs leading-relaxed font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {r.desc}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Research & Academic Contributions ──────────────────────────────────────
function ResearchAcademicSection() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const [selectedPaper, setSelectedPaper] = useState(null);
  const [showAllPapers, setShowAllPapers] = useState(false);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'pdf'

  const displayedPapers = showAllPapers ? PUBLISHED_RESEARCH_PAPERS : PUBLISHED_RESEARCH_PAPERS.slice(0, 5);

  return (
    <section id="research" className={`py-14 lg:py-20 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300 overflow-hidden ${isLight ? 'bg-gradient-to-br from-[#F0F7FE]/60 via-white to-[#F8FAFC]' : 'bg-[#040E1B] border-y border-white/10'
      }`}>
      {/* Background Decorative Ambient 3D Heart Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[300px] sm:w-[420px] lg:w-[480px] h-auto pointer-events-none z-0 select-none opacity-10 blur-[0.5px]">
        <img src="/hero-3d-heart.png" alt="" className="w-full h-full object-contain" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headRef} className="reveal grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* LEFT COLUMN: Section Title, Intro, Feature Pills & Quote Callout */}
          <div className="lg:col-span-6 space-y-6">

            {/* Eyebrow with Red Line Indicator */}
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-[2.5px] rounded-full bg-[#E92932]" />
              <span className={`text-xs font-extrabold uppercase tracking-[0.2em] ${isLight ? 'text-[#0E2F56]' : 'text-slate-200'}`}>
                ACADEMIC & RESEARCH
              </span>
            </div>

            {/* Main Dual-Tone Headline */}
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.14] ${isLight ? 'text-[#0E2F56]' : 'text-white'
              }`}>
              Evidence-based medicine.<br />
              <span className="text-[#E92932]">Research & Publications.</span>
            </h2>

            {/* Sub-headline Paragraph */}
            <p className={`text-sm sm:text-base font-medium leading-relaxed max-w-xl ${isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
              Dr. Sree Ranga P.C. maintains an active academic and research background in cardiology, contributing to medical literature and peer-reviewed publications across {PUBLISHED_RESEARCH_PAPERS.length} published articles & clinical case studies.
            </p>

            {/* 3 Horizontal Feature Pills */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-1 select-none">
              {/* Pill 1 */}
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${isLight
                    ? 'bg-red-50 border border-red-200 text-[#E92932]'
                    : 'bg-red-950/60 border border-red-900/40 text-red-400'
                  }`}>
                  <BookOpen size={18} />
                </div>
                <span className={`text-xs font-bold leading-snug ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  Original<br />Research
                </span>
              </div>

              {/* Pill 2 */}
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${isLight
                    ? 'bg-sky-50 border border-sky-200 text-[#0284C7]'
                    : 'bg-sky-950/60 border border-sky-900/40 text-sky-400'
                  }`}>
                  <FileText size={18} />
                </div>
                <span className={`text-xs font-bold leading-snug ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  Peer-reviewed<br />Publications
                </span>
              </div>

              {/* Pill 3 */}
              <div className="flex items-center gap-2.5">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-2xs ${isLight
                    ? 'bg-pink-50 border border-pink-200 text-pink-600'
                    : 'bg-pink-950/60 border border-pink-900/40 text-pink-400'
                  }`}>
                  <Users size={18} />
                </div>
                <span className={`text-xs font-bold leading-snug ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                  Advancing<br />Cardiac Care
                </span>
              </div>
            </div>

            {/* Quote Callout with Red Left Border */}
            <div className="border-l-4 border-[#E92932] pl-4 py-1.5 mt-6">
              <p className={`text-sm sm:text-base italic font-semibold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                "Research today for healthier tomorrows."
              </p>
              <p className="text-xs font-bold text-[#E92932] mt-1">
                — Dr. Sree Ranga P.C.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN: Selected Research Papers Elevated Card Container */}
          <div className="lg:col-span-6">
            <RevealItem delay={2}>
              <div className={`relative rounded-3xl border p-5 sm:p-7 shadow-2xl backdrop-blur-xl transition-all duration-300 ${isLight
                  ? 'border-slate-200/90 bg-white/95 text-slate-900 shadow-[0_20px_50px_rgba(15,23,42,0.08)]'
                  : 'border-white/15 bg-[#06192E]/95 text-white'
                }`}>

                {/* Card Header */}
                <div className={`flex items-center justify-between pb-4 border-b mb-4 ${isLight ? 'border-slate-200/80' : 'border-white/10'}`}>
                  <div className="flex items-center gap-2.5">
                    <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Selected Research Papers
                    </h3>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${isLight ? 'bg-red-100 text-[#E92932] border border-red-200' : 'bg-red-950/60 text-red-300 border border-red-900/40'
                      }`}>
                      {PUBLISHED_RESEARCH_PAPERS.length} Papers
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAllPapers(!showAllPapers)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#E92932] hover:text-[#FF4148] transition-colors cursor-pointer"
                  >
                    <span>{showAllPapers ? 'Show Featured 5' : `View All ${PUBLISHED_RESEARCH_PAPERS.length} Papers`}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                {/* Papers List Container */}
                <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
                  {displayedPapers.map((paper) => (
                    <div
                      key={paper.id}
                      className="py-3.5 first:pt-0 group hover:bg-slate-50/80 rounded-xl p-2 transition-colors cursor-pointer"
                      onClick={() => { setSelectedPaper(paper); setActiveTab('summary'); }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                        {/* Title & Metadata */}
                        <div className="flex-1 pr-2">
                          <h4 className={`text-xs sm:text-sm font-bold leading-snug transition-colors group-hover:text-[#E92932] ${isLight ? 'text-slate-900' : 'text-white'
                            }`}>
                            {paper.title}
                          </h4>
                          <div className={`text-[11px] sm:text-xs mt-1 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                            {paper.journal}
                          </div>
                          <div className={`text-[10px] mt-0.5 font-bold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            {paper.year} • {paper.type}
                          </div>
                        </div>

                        {/* Action Button: View PDF */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPaper(paper);
                            setActiveTab('pdf');
                          }}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 text-[#E92932] hover:bg-[#E92932] hover:text-white hover:border-[#E92932] text-xs font-bold px-3.5 py-2 transition-all shrink-0 cursor-pointer shadow-2xs group/btn"
                        >
                          <FileText size={14} className="text-[#E92932] group-hover/btn:text-white transition-colors" />
                          <span>View Full PDF</span>
                        </button>

                      </div>
                    </div>
                  ))}
                </div>

                {/* Card Footer Link */}
                <div className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-bold ${isLight ? 'border-slate-200/80' : 'border-white/10'
                  }`}>
                  <a
                    href="https://researchgate.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 transition-colors cursor-pointer ${isLight ? 'text-slate-800 hover:text-[#E92932]' : 'text-slate-200 hover:text-[#E92932]'
                      }`}
                  >
                    <ExternalLink size={14} className="text-[#E92932]" />
                    <span>View full profile on ResearchGate</span>
                    <ArrowRight size={13} />
                  </a>
                  {!showAllPapers && (
                    <button
                      type="button"
                      onClick={() => setShowAllPapers(true)}
                      className="text-[#E92932] hover:underline cursor-pointer"
                    >
                      + {PUBLISHED_RESEARCH_PAPERS.length - 5} More Papers
                    </button>
                  )}
                </div>

              </div>
            </RevealItem>
          </div>

        </div>
      </div>

      {/* Published Research Paper Full Content & PDF Viewer Modal */}
      {selectedPaper && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setSelectedPaper(null)}
        >
          <div
            className={`relative max-w-4xl w-full rounded-3xl p-5 sm:p-8 border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col ${isLight ? 'bg-white text-slate-900 border-slate-200' : 'bg-[#06192E] text-white border-white/15'
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 shrink-0">
              <div className="space-y-1 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-[#E92932]/10 text-[#E92932] border border-[#E92932]/20">
                    {selectedPaper.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Published {selectedPaper.year} • {selectedPaper.journal}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold leading-tight text-[#0E2F56]">
                  {selectedPaper.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPaper(null)}
                className="text-slate-400 hover:text-slate-900 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            {/* Modal Navigation Tabs & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-slate-100 shrink-0 bg-slate-50/50 px-1 rounded-xl my-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('summary')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeTab === 'summary'
                      ? 'bg-[#E92932] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                  Document Overview & Findings
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('pdf')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === 'pdf'
                      ? 'bg-[#E92932] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                >
                  <FileText size={13} /> Full PDF Page Viewer
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedPaper.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-50 border border-sky-200 text-[#0284C7] hover:bg-[#0284C7] hover:text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  <ExternalLink size={13} /> Open Full PDF in New Tab
                </a>
                <a
                  href={selectedPaper.pdfUrl}
                  download
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[#16A34A] hover:bg-[#16A34A] hover:text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  Download PDF
                </a>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto py-3 pr-1 space-y-5">
              {activeTab === 'summary' ? (
                <div className="space-y-5">
                  {/* Authors & Journal Meta */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs space-y-1">
                    <div>
                      <strong className="text-[#0E2F56]">Authors: </strong>
                      <span className="text-slate-700 font-medium">{selectedPaper.authors}</span>
                    </div>
                    <div>
                      <strong className="text-[#0E2F56]">Citation: </strong>
                      <span className="text-slate-600 font-mono">{selectedPaper.citation}</span>
                    </div>
                  </div>

                  {/* Abstract */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0E2F56] flex items-center gap-1.5">
                      <BookOpen size={15} className="text-[#E92932]" /> Study Abstract & Summary
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                      {selectedPaper.abstract}
                    </p>
                  </div>

                  {/* Key Findings */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0E2F56] flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-[#16A34A]" /> Key Clinical Findings & Procedural Insights
                    </h4>
                    <div className="space-y-2">
                      {selectedPaper.keyFindings.map((finding, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs sm:text-sm font-medium text-slate-800">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{finding}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Full Document Access CTA Banner */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0E2F56] to-[#1E3A8A] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                    <div>
                      <h5 className="font-bold text-sm">Need complete data tables & full manuscript?</h5>
                      <p className="text-xs text-slate-200">View embedded original PDF document or download for research reference.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('pdf')}
                      className="px-4 py-2 rounded-xl bg-[#E92932] hover:bg-[#FF4148] text-white text-xs font-bold shadow-sm transition-transform hover:scale-105 shrink-0 cursor-pointer"
                    >
                      View Full PDF Pages →
                    </button>
                  </div>
                </div>
              ) : (
                /* PDF Embedded Viewer Tab */
                <div className="w-full h-[66vh] rounded-2xl overflow-hidden border border-slate-300 shadow-inner bg-slate-900">
                  <iframe
                    src={selectedPaper.pdfUrl}
                    title={selectedPaper.title}
                    className="w-full h-full rounded-2xl"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200 shrink-0">
              <span className="text-xs text-slate-500 font-medium">
                Kanhaiya Chest Pain Clinic & Diagnostics — Research Registry
              </span>
              <button
                type="button"
                onClick={() => setSelectedPaper(null)}
                className="px-6 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

// ─── Patient Journey ──────────────────────────────────────────────────────────
function PatientJourneySection() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="patient-care" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-[#F8FAFC] border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
      }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-12">
          <div className="eyebrow mb-3">Your Cardiac Care Journey</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Structured, step-by-step<br />
            <em className="not-italic text-[#E92932]">cardiovascular care.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {PATIENT_JOURNEY.map((step, i) => (
            <RevealItem key={step.num} delay={i + 1}>
              <div className={`p-5 rounded-2xl border text-center flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg h-full ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'dark-glass-card text-white'
                }`}>
                <div className="w-12 h-12 rounded-full bg-[#E92932] text-white flex items-center justify-center font-bold text-lg shadow-md animate-pulse">
                  {step.num}
                </div>
                <h3 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{step.title}</h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{step.desc}</p>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Preventive Cardiology ───────────────────────────────────────────────────
function PreventiveCardiologySection() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#030C16]'
      }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Preventive Cardiology</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Don't Wait for a <em className="not-italic text-[#E92932]">Warning Sign.</em>
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-2xl mx-auto ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
            Heart health isn't only about treating disease. Regular cardiovascular evaluation can be especially important for individuals with risk factors:
          </p>
        </div>

        <RevealItem delay={1}>
          <div className={`mb-10 rounded-3xl overflow-hidden border shadow-2xl grid lg:grid-cols-2 items-center group ${isLight ? 'bg-slate-900 text-white border-slate-800' : 'dark-glass-card text-white border-white/15'
            }`}>
            <div className="p-8 lg:p-12 space-y-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#E92932]/20 text-[#FF4148] border border-[#E92932]/30">
                Advanced Biometric Screening
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">Proactive Risk Stratification</h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Our clinic utilizes structured diagnostic assessments to identify early cardiovascular changes before symptoms progress into critical cardiac events.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                {PREVENTIVE_RISKS.slice(0, 4).map(r => (
                  <span key={r} className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/15 text-slate-200">
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
              <img src={IMGS.aiPreventive} alt="AI 3D Cardiac Biometric Assessment" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden lg:block" />
            </div>
          </div>
        </RevealItem>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-10">
          {PREVENTIVE_RISKS.map((risk, i) => (
            <RevealItem key={risk} delay={(i % 4) + 1}>
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 ${isLight ? 'bg-[#F8FAFC] border-slate-200 text-slate-800 shadow-sm hover:border-[#E92932]' : 'dark-glass-card text-white hover:border-[#E92932]'
                }`}>
                <span className="w-2 h-2 rounded-full bg-[#E92932] animate-pulse" />
                <span>{risk}</span>
              </div>
            </RevealItem>
          ))}
        </div>

        <div className="text-center">
          <Link to="/book-appointment" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 btn-shine bg-[#E92932] shadow-[0_8px_30px_rgba(233,41,50,0.4)]">
            Take the First Step Towards Better Heart Health <ArrowRight size={16} color="white" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const headRef = useReveal();
  const [idx, setIdx] = useState(0);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const testimonials = [
    { initials: "RP", name: "Rajesh Pillai", category: "Coronary Angiography", text: "Dr. Sree Ranga explained every step of my angiography procedure clearly. He has this rare ability to make you feel calm even in a stressful situation. Highly recommend." },
    { initials: "SM", name: "Savitha Menon", category: "Preventive Cardiology", text: "I came for a routine checkup and left with a comprehensive understanding of my cardiac risk. The attention to detail here is exceptional — unlike any clinic I've visited." },
    { initials: "AK", name: "Arjun Kumar", category: "Arrhythmia Care", text: "After struggling with palpitations for years, Dr. Sree Ranga finally identified the root cause and designed a management plan that worked. Life-changing care." },
    { initials: "PD", name: "Priya Desai", category: "Echocardiography", text: "Prompt appointments, thorough evaluation, and a doctor who genuinely listens. Shri Kanhaiya Diagnostics is in a different league from other cardiac clinics in Bangalore." },
    { initials: "VN", name: "Vivek Nair", category: "Angioplasty / PCI", text: "Had a complex stenting procedure. Dr. Sree Ranga's confidence and skill were immediately apparent. Recovery went exactly as he described. Outstanding care." },
  ];

  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  return (
    <section className={`py-14 lg:py-16 px-6 lg:px-8 overflow-hidden relative z-10 transition-colors duration-300 ${isLight ? 'bg-[#F4F7FA] border-b border-slate-200/80' : 'bg-[#040E1B]/95 backdrop-blur-xl border-b border-white/10'
      }`}>
      <div className="max-w-5xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Patient Testimonials</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Heard from our patients.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold shadow-sm ${isLight ? 'bg-white border border-slate-200 text-slate-800' : 'dark-glass-card text-white'
              }`}>
              <GoogleIcon size={18} />
              <span>4.9 / 5.0 Rating based on 127+ Google Reviews</span>
              <div className="flex gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => <StarIcon key={i} size={12} filled />)}
              </div>
            </div>
            <a
              href={CLINIC_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4285F4]/20 hover:bg-[#4285F4]/30 border border-[#4285F4]/40 text-xs font-semibold text-[#4285F4] transition-colors cursor-pointer"
            >
              <GoogleIcon size={14} /> Write a Google Review
            </a>
          </div>
        </div>

        <RevealItem delay={1}>
          <div className="relative">
            <div className={`rounded-3xl p-8 lg:p-12 relative overflow-hidden transition-all duration-300 ${isLight ? 'bg-white/95 border border-slate-200/90 shadow-xl text-slate-900' : 'dark-glass-card text-white'
              }`}>
              <div className="absolute top-6 right-10 text-9xl font-bold leading-none select-none text-[#E92932]/10">"</div>
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} filled />)}
              </div>

              <p className={`text-lg lg:text-xl leading-relaxed font-medium mb-6 ${isLight ? 'text-slate-800' : 'text-white'}`}>
                "{testimonials[idx].text}"
              </p>

              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm bg-[#E92932] shadow-md">
                  {testimonials[idx].initials}
                </div>
                <div>
                  <div className={`font-semibold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{testimonials[idx].name}</div>
                  <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{testimonials[idx].category}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)} aria-label={`Go to slide ${i + 1}`} className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                    style={{ width: i === idx ? "32px" : "8px", background: i === idx ? "#E92932" : isLight ? "rgba(15,23,42,0.15)" : "rgba(255,255,255,0.2)" }} />
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={prev} aria-label="Previous testimonial" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${isLight ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100' : 'border-white/20 hover:bg-white/10 text-white'
                  }`}>
                  <ArrowLeft size={16} color={isLight ? "#0F172A" : "white"} />
                </button>
                <button onClick={next} aria-label="Next testimonial" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer bg-[#E92932] text-white shadow-md hover:scale-105">
                  <ArrowRight size={16} color="white" />
                </button>
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </section>
  );
}

// ─── Metrics ──────────────────────────────────────────────────────────────────
function Metrics() {
  const { count: years, ref: r1 } = useCounter(18, 1200);
  const { count: rating, ref: r3 } = useCounter(49, 1500);
  const { count: reviews, ref: r4 } = useCounter(127, 1600);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const metrics = [
    { ref: r1, value: years + "+", label: "Years in Cardiology", sub: "Interventional Practice" },
    { value: "BMCRI", label: "Professor", sub: "Cardiology Department" },
    { ref: r3, value: (rating / 10).toFixed(1) + "/5", label: "Google Maps Rating", sub: "Consistently 5-star care" },
    { ref: r4, value: reviews + "+", label: "Google Reviews", sub: "Verified Patients" },
  ];

  return (
    <section className={`py-12 lg:py-14 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-white border-y border-slate-200/80' : 'bg-[#030C16]'
      }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {metrics.map((m, i) => (
            <RevealItem key={m.label} delay={i + 1}>
              <div ref={m.ref} className="text-center transition-transform duration-300 hover:-translate-y-1">
                <div className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-1.5 text-[#E92932]">{m.value}</div>
                <div className={`text-sm font-semibold mb-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.label}</div>
                <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{m.sub}</div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const headRef = useReveal();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const row1 = CLINIC_GALLERY_IMAGES.filter((_, i) => i % 3 === 0);
  const row2 = CLINIC_GALLERY_IMAGES.filter((_, i) => i % 3 === 1);
  const row3 = CLINIC_GALLERY_IMAGES.filter((_, i) => i % 3 === 2);

  const rows = [
    { items: row1, duration: '40s' },
    { items: row2, duration: '34s' },
    { items: row3, duration: '44s' },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev < CLINIC_GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : CLINIC_GALLERY_IMAGES.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <section id="gallery" className={`py-12 sm:py-16 lg:py-20 relative z-10 transition-colors duration-300 overflow-hidden ${isLight ? 'bg-[#F8FAFC] border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div ref={headRef} className="reveal text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">
              Clinical Gallery
            </div>
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Explore our modern facility & diagnostic suites.
            </h2>
            <p className={`mt-2 text-sm sm:text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Take a look inside Shri Kanhaiya Diagnostics & Chest Pain Clinic in Nandini Layout.
            </p>
          </div>
          <div className={`hidden sm:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full shrink-0 border ${isLight ? 'bg-slate-200/60 text-slate-700 border-slate-300/70' : 'bg-white/10 text-slate-300 border-white/15'
            }`}>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Hover to pause • Click photo to view</span>
          </div>
        </div>
      </div>

      {/* 3 Infinite Rows Scrolling Left-to-Right */}
      <div className="relative w-full space-y-4 sm:space-y-6">
        {/* Soft edge fade overlays */}
        <div className={`absolute top-0 bottom-0 left-0 w-12 sm:w-28 md:w-40 z-20 pointer-events-none bg-gradient-to-r ${isLight ? 'from-[#F8FAFC] to-transparent' : 'from-[#051322] to-transparent'
          }`} />
        <div className={`absolute top-0 bottom-0 right-0 w-12 sm:w-28 md:w-40 z-20 pointer-events-none bg-gradient-to-l ${isLight ? 'from-[#F8FAFC] to-transparent' : 'from-[#051322] to-transparent'
          }`} />

        {rows.map((rowObj, rowIndex) => (
          <div key={rowIndex} className="marquee-container overflow-hidden w-full flex">
            <div
              className="animate-marquee-ltr flex gap-4 sm:gap-6 pr-4 sm:pr-6"
              style={{ '--marquee-speed': rowObj.duration }}
            >
              {[...rowObj.items, ...rowObj.items].map((img, i) => {
                const originalIndex = CLINIC_GALLERY_IMAGES.findIndex(item => item.src === img.src);
                return (
                  <GalleryItem
                    key={`${img.src}-${i}`}
                    img={img}
                    isLight={isLight}
                    onClick={() => setLightboxIndex(originalIndex >= 0 ? originalIndex : 0)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030C16]/95 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white cursor-pointer bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors z-50"
            onClick={() => setLightboxIndex(null)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>

          <button
            className="absolute left-2 sm:left-6 text-white/80 hover:text-white cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev > 0 ? prev - 1 : CLINIC_GALLERY_IMAGES.length - 1));
            }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button
            className="absolute right-2 sm:right-6 text-white/80 hover:text-white cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev < CLINIC_GALLERY_IMAGES.length - 1 ? prev + 1 : 0));
            }}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="max-w-4xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={CLINIC_GALLERY_IMAGES[lightboxIndex].src}
              alt={`Clinic Photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-[75vh] rounded-2xl object-contain mx-auto shadow-2xl border border-white/10 transition-all duration-300"
            />
            <div className="mt-4 flex flex-col items-center gap-1">
              <div className="text-xs text-slate-400">
                Photo {lightboxIndex + 1} of {CLINIC_GALLERY_IMAGES.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function GalleryItem({ img, onClick, isLight }) {
  return (
    <div
      className={`group relative shrink-0 rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${isLight
        ? 'border-slate-200/90 shadow-sm hover:shadow-xl hover:border-red-500/30'
        : 'border-white/10 shadow-lg hover:shadow-2xl hover:border-red-500/40'
        } w-64 sm:w-80 md:w-96 h-40 sm:h-52 md:h-56`}
      onClick={onClick}
    >
      <img
        src={img.src}
        alt="Clinic facility photo"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 bg-slate-950/0 group-hover:bg-slate-950/40 backdrop-blur-none group-hover:backdrop-blur-[2px]">
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0 flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/90 text-white text-xs font-semibold shadow-lg">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span>View Photo</span>
        </div>
      </div>
    </div>
  );
}

// ─── Video Section ("Our Story") ──────────────────────────────────────────────
function VideoSection() {
  const ref = useReveal();
  const [videoModal, setVideoModal] = useState(false);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const videoPath = "/shri-kanhaiya-clinic-tour.mp4";

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setVideoModal(false);
    };
    if (videoModal) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [videoModal]);

  return (
    <section id="our-story" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-[#F1F5F9]' : 'bg-[#030A14]'
      }`}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Our Story</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            See how compassionate cardiac<br />
            <em className="not-italic text-[#E92932]">care comes together.</em>
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Experience our clinic tour and learn more about Dr. Sree Ranga P.C. and our commitment to advanced heart health in Nandini Layout, Bengaluru.
          </p>
        </div>

        <RevealItem delay={1}>
          <div className={`relative rounded-3xl overflow-hidden cursor-pointer border shadow-2xl group ${isLight ? 'border-slate-200/90' : 'border-white/15'
            }`}
            onClick={() => setVideoModal(true)}>

            <video
              src={`${videoPath}#t=0.5`}
              muted
              playsInline
              preload="metadata"
              className="w-full h-72 sm:h-96 lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 group-hover:via-black/50">
              <div className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 bg-[#E92932] shadow-[0_0_30px_rgba(233,41,50,0.6)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(233,41,50,0.8)]">
                <svg width="30" height="30" fill="white" viewBox="0 0 24 24" className="ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="mt-4 text-white font-semibold text-lg sm:text-xl tracking-wide text-center px-4">
                Watch Our Story & Clinic Tour
              </div>
              <span className="mt-2 text-xs sm:text-sm text-slate-200 bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Click to play video
              </span>
            </div>
          </div>
        </RevealItem>
      </div>

      {videoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg transition-opacity duration-300" onClick={() => setVideoModal(false)}>
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden border border-white/20 bg-slate-950 shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center px-5 py-3 bg-slate-900 border-b border-white/10 text-white">
              <span className="font-semibold text-sm sm:text-base">Shri Kanhaiya Diagnostics — Our Story Video</span>
              <button className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer transition-colors" onClick={() => setVideoModal(false)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <video
                src={videoPath}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── FAQs Section ─────────────────────────────────────────────────────────────
function FAQsSection() {
  const headRef = useReveal();
  const [openIdx, setOpenIdx] = useState(0);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="faq" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-white border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
      }`}>
      <div className="max-w-4xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">FAQ</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Frequently Asked <em className="not-italic text-[#E92932]">Questions.</em>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <RevealItem key={faq.question} delay={(idx % 4) + 1}>
                <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isLight ? 'bg-white border-slate-200 shadow-sm hover:shadow-md' : 'dark-glass-card text-white'
                  }`}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-semibold text-base sm:text-lg flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className={isLight ? 'text-slate-900' : 'text-white'}>{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#E92932] text-white' : isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white'
                      }`}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className={`px-5 pb-5 text-sm sm:text-base leading-relaxed border-t pt-3 animate-fade-in ${isLight ? 'border-slate-100 text-slate-600 font-medium' : 'border-white/10 text-slate-300'
                      }`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}



// ─── Appointment ──────────────────────────────────────────────────────────────
function Appointment() {
  const ref = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="appointment" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#030C16]'
      }`}>
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`reveal rounded-3xl p-8 lg:p-12 border shadow-2xl transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.3)] ${isLight ? 'bg-gradient-to-br from-white via-red-50/40 to-white border-slate-200/90 text-slate-900' : 'dark-glass-card border-white/20 text-white'
          }`}>
          <div className="text-center mb-8">
            <div className="eyebrow mb-3">Book a Consultation</div>
            <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Your heart deserves attention<br />
              <em className="not-italic text-[#E92932]">before it demands it.</em>
            </h2>
            <p className={`text-base ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
              Book a consultation with Dr. Sree Ranga P.C. — available Monday through Sunday.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: <PhoneIcon size={18} color="#E92932" />, label: "Phone", val: CLINIC_INFO.phone },
              { icon: <MapPinIcon size={18} color="#E92932" />, label: "Location", val: "Nandini Layout, Bangalore" },
              { icon: <ClockIcon size={18} color="#E92932" />, label: "Timings", val: "Mon–Sat: 7am–10pm | Sun: 7am–1pm" },
            ].map(item => (
              <div key={item.label} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/10 bg-white/5'
                }`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#E92932]/15 animate-pulse">
                  {item.icon}
                </div>
                <div>
                  <div className={`text-xs font-medium mb-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{item.label}</div>
                  <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/book-appointment" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 btn-shine bg-[#E92932] shadow-[0_8px_30px_rgba(233,41,50,0.4)]">
              Book an Appointment <ArrowRight size={16} color="white" />
            </Link>
            <a href={`https://wa.me/${CLINIC_INFO.phoneTel.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-[#25D366]/40 text-[#25D366] bg-[#25D366]/10">
              <WhatsAppIcon size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const ref = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="contact" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${isLight ? 'bg-[#F8FAFC] border-t border-slate-200' : 'bg-[#040E1B]/90 backdrop-blur-xl border-t border-white/10'
      }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal mb-10">
          <div className="eyebrow mb-3">Find Us</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Shri Kanhaiya Diagnostics,<br />Nandini Layout.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <RevealItem delay={1}>
            <div className={`rounded-3xl overflow-hidden shadow-2xl border flex flex-col justify-between h-full min-h-[440px] ${isLight ? 'border-slate-200/90 bg-white' : 'border-white/15 dark-glass-card'
              }`}>
              <div className="px-5 py-3.5 bg-slate-950 text-white flex items-center justify-between shrink-0 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold tracking-wide">
                  <GoogleIcon size={18} />
                  <span>Google Maps Live Location</span>
                </div>
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#FF4148] hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  <span>Open Map</span>
                  <ArrowRight size={12} color="#FF4148" />
                </a>
              </div>

              <div className="relative flex-1 min-h-[340px] w-full">
                <iframe
                  title="Shri Kanhaiya Diagnostics and Chest Pain Clinic Google Maps Location"
                  src="https://maps.google.com/maps?q=SHRI+KANHAIYA+DIAGNOSTICS+AND+CHEST+PAIN+CLINIC,+446,+1st+Main+Rd,+Sreenivas+Nagar,+Nandini+Layout,+Bengaluru,+Karnataka+560096&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full absolute inset-0 filter saturate-[1.1]"
                />
              </div>

              <div className={`p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 ${isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#06192E] border-white/10 text-white'
                }`}>
                <div className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {CLINIC_INFO.address}
                </div>
                <a
                  href={CLINIC_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E92932] text-white text-xs font-semibold shadow-sm hover:bg-[#FF4148] hover:scale-105 transition-all shrink-0 cursor-pointer"
                >
                  <GoogleIcon size={14} />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </RevealItem>

          <div className="flex flex-col justify-between gap-3.5">
            {[
              { title: "ADDRESS", name: CLINIC_INFO.name, sub: CLINIC_INFO.address, icon: <MapPinIcon size={20} color="#E92932" /> },
              { title: "PHONE", name: CLINIC_INFO.phone, sub: CLINIC_INFO.phoneTel, icon: <PhoneIcon size={20} color="#E92932" />, tel: true },
              { title: "EMAIL", name: CLINIC_INFO.email, sub: "Response within 24 hours", icon: <MailIcon size={20} color="#E92932" />, mail: true },
              { title: "CLINIC HOURS", name: CLINIC_INFO.hours, sub: "Open 7 Days a Week", icon: <ClockIcon size={20} color="#E92932" /> },
            ].map((c, i) => (
              <RevealItem key={c.title} delay={i + 1}>
                <div className={`flex items-start gap-4 p-4.5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'dark-glass-card text-white'
                  }`}>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#E92932]/15 text-[#E92932] animate-pulse">
                    {c.icon}
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#E92932] mb-0.5">
                      {c.title}
                    </div>
                    {c.tel ? (
                      <div className={`flex flex-col text-sm font-semibold space-y-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        <a href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#E92932] transition-colors">{c.name}</a>
                        <a href={`tel:${CLINIC_INFO.phoneTel.replace(/\s+/g, '')}`} className="hover:text-[#E92932] transition-colors">{c.sub}</a>
                      </div>
                    ) : c.mail ? (
                      <div className={`flex flex-col text-sm font-semibold space-y-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-[#E92932] transition-colors">{c.name}</a>
                      </div>
                    ) : (
                      <>
                        <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{c.name}</div>
                        <div className={`text-xs leading-relaxed mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{c.sub}</div>
                      </>
                    )}
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Icon Components ──────────────────────────────────────────────────────────
function HeartIcon({ size = 24, color = "var(--red)", filled = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : "none"} stroke={color} strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function StarIcon({ size = 16, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "#F59E0B" : "none"} stroke="#F59E0B" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function GoogleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="shrink-0 inline-block">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}
function ArrowRight({ size = 16, color = "currentColor", className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" className={className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function ArrowLeft({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}
function ClockIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function ShieldIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function PhoneIcon({ size = 18, color = "var(--red)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.09a16 16 0 0 0 6 6l1.47-1.47a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke={color} />
    </svg>
  );
}
function MapPinIcon({ size = 18, color = "var(--red)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function MailIcon({ size = 14, color = "var(--red-accent)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}
function WhatsAppIcon({ size = 18, color = "#25D366" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── Main Home Page Component ─────────────────────────────────────────────────
export function Home() {
  return (
    <div className="min-h-full">
      <Hero />
      <BannerSlideshow />
      <StatsSection />
      <About />
      <ServicesSection />
      <WhyChooseUs />
      <ResearchAcademicSection />
      <PatientJourneySection />
      <PreventiveCardiologySection />
      <Testimonials />
      <Gallery />
      <VideoSection />
      <FAQsSection />
      <Appointment />
      <Contact />
    </div>
  );
}
