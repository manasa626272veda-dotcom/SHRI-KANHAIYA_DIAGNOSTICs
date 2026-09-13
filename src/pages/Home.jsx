import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  CLINIC_INFO,
  MISSION,
  VISION,
  CORE_VALUES,
  SERVICES,
  CONDITIONS_ADDRESSED,
  WHY_CHOOSE_US,
  RESEARCH_ACADEMIC,
  PATIENT_JOURNEY,
  PREVENTIVE_RISKS,
  FAQS,
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
    if (!el) return;
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
  doctorHero: "/dr-sree-ranga-pc.png",
  doctorAbout: "/dr-sree-ranga-pc.png",
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

// ─── ECG SVG Path ─────────────────────────────────────────────────────────────
const ECG_PATH = "M0,50 L40,50 L50,20 L60,80 L70,50 L120,50 L130,15 L140,85 L150,50 L200,50 L210,25 L220,75 L230,50 L280,50 L290,30 L300,70 L310,50 L360,50 L370,10 L380,90 L390,50 L440,50 L450,50 L460,25 L470,75 L480,50 L530,50";

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="home" className={`relative min-h-screen flex flex-col justify-center overflow-hidden transition-colors duration-300 ${
      isLight ? 'bg-gradient-to-br from-[#FFFFFF] via-[#F1F6FB] to-[#E5EFF8]' : 'bg-transparent'
    }`}>
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: isLight
          ? "radial-gradient(circle at 50% 20%, rgba(233,41,50,0.09) 0%, rgba(240,246,252,0.85) 50%, rgba(229,239,248,0.95) 85%)"
          : "radial-gradient(circle at 50% 35%, rgba(233,41,50,0.18) 0%, rgba(10,36,58,0.75) 48%, transparent 85%)"
      }} />

      <div className={`animate-hero-glow absolute top-10 right-10 w-[550px] h-[550px] rounded-full pointer-events-none z-0 ${
        isLight ? 'bg-[#E92932]/14 blur-[140px]' : 'bg-[#E92932]/22 blur-[130px]'
      }`} />

      <div className={`animate-hero-glow absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none z-0 ${
        isLight ? 'bg-[#0284C7]/16 blur-[160px]' : 'bg-[#0284C7]/18 blur-[150px]'
      }`} style={{ animationDelay: "4.5s" }} />

      <div className={`absolute inset-0 pointer-events-none z-0 bg-medical-grid ${
        isLight ? 'opacity-[0.06]' : 'opacity-[0.07]'
      }`} />

      <div className={`absolute bottom-20 left-0 right-0 h-24 overflow-hidden pointer-events-none z-0 ${
        isLight ? 'opacity-35' : 'opacity-25'
      }`}>
        <div className="ecg-scroll flex">
          {[...Array(4)].map((_, i) => (
            <svg key={i} width="530" height="100" viewBox="0 0 530 100" fill="none" className="flex-shrink-0 filter drop-shadow-[0_0_12px_rgba(233,41,50,0.85)]">
              <path d={ECG_PATH} stroke="#E92932" strokeWidth="2.5" fill="none" />
            </svg>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">

        <div className="space-y-8">
          <div className={`pill-anim inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 ${
            isLight
              ? 'border-red-200/90 bg-white/95 text-[#E92932] shadow-[0_4px_20px_rgba(233,41,50,0.12)] backdrop-blur-md'
              : 'border-[#E92932]/40 bg-[#E92932]/08 text-[#FF4148]'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#E92932] shadow-[0_0_8px_rgba(233,41,50,0.8)]" />
            Professor (BMCRI) & Consultant Cardiologist
          </div>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            <span className="block h1-line-1">Comprehensive Heart Care</span>
            <span className="block h1-line-2 text-[#E92932] italic drop-shadow-[0_2px_10px_rgba(233,41,50,0.15)]">in Bengaluru</span>
          </h1>

          <p className={`hero-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg ${
            isLight ? 'text-slate-700 font-medium' : 'text-slate-300'
          }`}>
            Expert cardiac evaluation and personalized care focused on your heart health under Dr. Sree Ranga P.C. — Professor of Cardiology at BMCRI.
          </p>

          <div className="hero-ctas flex flex-wrap gap-3 sm:gap-4">
            <Link to="/book-appointment" className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer bg-[#E92932] shadow-[0_10px_35px_rgba(233,41,50,0.4)]">
              Book an Appointment
              <ArrowRight size={16} color="white" />
            </Link>
            <a href={`tel:${CLINIC_INFO.phoneTel}`} className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              isLight
                ? 'text-slate-800 border-slate-300/90 bg-white hover:bg-slate-50 shadow-sm'
                : 'text-white border-white/20 bg-white/5 hover:bg-white/10'
            }`}>
              <PhoneIcon size={16} color="#E92932" /> Call Clinic
            </a>
            <a href={CLINIC_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              isLight
                ? 'text-slate-800 border-slate-300/90 bg-white hover:bg-slate-50 shadow-sm'
                : 'text-white border-white/20 bg-white/5 hover:bg-white/10'
            }`}>
              <MapPinIcon size={16} color="#E92932" /> Get Directions
            </a>
          </div>

          <div className={`hero-stats grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t ${
            isLight ? 'border-slate-200/90' : 'border-white/10'
          }`}>
            {[
              { value: "BMCRI", label: "Professor" },
              { value: "18+", label: "Years Experience" },
              { value: "4.9/5", label: "Patient Rating" },
              { value: "127+", label: "Verified Reviews" },
            ].map(s => (
              <div key={s.label} className="transition-transform duration-300 hover:-translate-y-1">
                <div className="text-xl sm:text-2xl font-bold text-[#E92932]">{s.value}</div>
                <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hero-img mt-4 lg:mt-0">
          <div className={`relative rounded-3xl overflow-hidden group ${
            isLight
              ? 'shadow-[0_25px_60px_-10px_rgba(15,23,42,0.14),0_0_0_1px_rgba(203,213,225,0.8)] border border-slate-200/90 bg-white'
              : 'shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(220,228,234,0.1)]'
          }`}>
            <img src={IMGS.doctorHero} alt="Dr. Sree Ranga P.C., Professor & Consultant Cardiologist"
              className="w-full h-[360px] sm:h-[480px] lg:h-[580px] object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isLight ? 'from-slate-900/35 via-transparent to-transparent' : 'from-[#041220] via-transparent to-transparent'
            }`} />
          </div>

          <div className={`float-card animate-float absolute bottom-3 left-3 sm:-bottom-4 sm:-left-4 lg:-left-8 flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-2xl z-20 ${
            isLight
              ? 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.12)] text-slate-900'
              : 'glass-medical-card text-white'
          }`}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 animate-heartbeat bg-[#E92932]/15">
              <HeartIcon size={18} color="#E92932" filled />
            </div>
            <div>
              <div className={`text-sm sm:text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Academic Cardiology</div>
              <div className={`text-[11px] sm:text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>BMCRI Professor</div>
            </div>
          </div>

          <a
            href={CLINIC_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Google Reviews"
            className={`float-card animate-float absolute top-3 right-3 sm:top-6 sm:-right-4 lg:-right-8 flex items-center gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl z-20 hover:scale-105 transition-all group cursor-pointer ${
              isLight
                ? 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.12)] text-slate-900'
                : 'glass-medical-card text-white'
            }`}
            style={{ animationDelay: "1s" }}
          >
            <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-xl bg-slate-100 shadow-sm shrink-0 border border-slate-200/80">
              <GoogleIcon size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`text-sm sm:text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} size={10} filled={i < 5} />)}
                </div>
              </div>
              <div className={`text-[10px] sm:text-[11px] font-medium transition-colors ${
                isLight ? 'text-slate-600 group-hover:text-[#E92932]' : 'text-slate-300 group-hover:text-white'
              }`}>
                Google Reviews (127+)
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── About Doctor ─────────────────────────────────────────────────────────────
function About() {
  const leftRef = useReveal();
  const rightRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="about" className={`py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white border-b border-slate-200/80 shadow-[0_10px_30px_rgba(15,23,42,0.02)]' : 'bg-[#040E1B]/90 backdrop-blur-xl border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div ref={leftRef} className="reveal relative group">
          <div className={`absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-24 h-24 sm:w-36 sm:h-36 rounded-[28px] border-2 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 pointer-events-none z-0 ${
            isLight ? 'border-[#E92932]/30 bg-red-50/50' : 'border-[#E92932]/35 bg-[#E92932]/5'
          }`} />

          <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-36 h-36 sm:w-52 sm:h-52 rounded-[36px] bg-gradient-to-tr from-[#E92932]/25 via-[#FF4148]/15 to-[#E92932]/05 shadow-xl blur-[1px] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none z-0" />

          <div className={`relative rounded-[28px] sm:rounded-[32px] overflow-hidden border z-10 transition-transform duration-500 ${
            isLight ? 'border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.1)] bg-white' : 'border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]'
          }`}>
            <img src={IMGS.doctorAbout} alt="Dr. Sree Ranga P.C. in consultation"
              className="w-full h-[340px] sm:h-[450px] lg:h-[540px] object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isLight ? 'from-slate-900/35 via-transparent to-transparent' : 'from-[#041220] via-[#041220]/20 to-transparent'
            }`} />

            <div className={`absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl shadow-2xl transition-all duration-300 group-hover:translate-y-[-4px] ${
              isLight ? 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 text-slate-900 shadow-[0_10px_35px_rgba(15,23,42,0.12)]' : 'glass-medical-card text-white'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className={`font-bold text-sm sm:text-base tracking-tight flex items-center gap-2 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    <span>Dr. Sree Ranga P.C.</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9.5px] sm:text-[10px] font-semibold bg-[#E92932]/15 text-[#E92932] border border-[#E92932]/30">
                      Cardiologist
                    </span>
                  </div>
                  <div className={`text-[11px] sm:text-xs font-medium mt-0.5 ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    Professor (BMCRI) | DM Cardiology, MBBS
                  </div>
                </div>
                <div className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-[#E92932] text-white shadow-[0_0_15px_rgba(233,41,50,0.5)] animate-pulse">
                  <HeartIcon size={18} color="white" filled />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={rightRef} className="reveal space-y-4 sm:space-y-5">
          <div className="eyebrow">About Us</div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Dedicated to Comprehensive<br />
            <em className="not-italic text-[#E92932]">Heart Care.</em>
          </h2>
          <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
            Heart health requires more than treating symptoms. It requires careful evaluation, accurate diagnosis,
            appropriate treatment and continued attention to the factors that influence cardiovascular health.
          </p>
          <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
            Dr. Sree Ranga P.C. is a cardiologist in Bengaluru with an academic association with the Department of Cardiology,
            Bangalore Medical College & Research Institute (BMCRI). Published medical literature identifies him as a Professor
            of Cardiology at BMCRI. His involvement in medical research reflects a deep interest in clinical evaluation,
            echocardiographic studies, and coronary angiography.
          </p>

          <div className="grid grid-cols-2 gap-3.5 py-2">
            {[
              { val: "Patient-Focused", label: "Individualized care plans" },
              { val: "Evidence-Based", label: "Academic cardiology principles" },
              { val: "Thorough", label: "Detailed diagnostic evaluation" },
              { val: "Preventive", label: "Long-term heart risk management" },
            ].map((s, i) => (
              <RevealItem key={s.val} delay={i + 1}>
                <div className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900 hover:border-[#E92932]/30' : 'glass-medical-card text-white'
                }`}>
                  <div className="w-1.5 h-7 rounded-full bg-[#E92932]" />
                  <div>
                    <div className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{s.val}</div>
                    <div className={`text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>{s.label}</div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>

          <Link to="/book-appointment" className="inline-flex items-center gap-2 font-semibold transition-all duration-300 hover:gap-3 text-[#E92932] group">
            <span>Book a Consultation</span>
            <ArrowRight size={16} color="#E92932" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Mission, Vision & Core Values ────────────────────────────────────────────
function MissionVisionValues() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] border-b border-slate-200/80' : 'bg-[#030A14] border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-12">
          <div className="eyebrow mb-3">Our Foundation</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Mission, Vision & <em className="not-italic text-[#E92932]">What We Stand For.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <RevealItem delay={1}>
            <div className={`p-8 rounded-3xl border transition-all duration-400 hover:-translate-y-1.5 relative overflow-hidden h-full ${
              isLight ? 'bg-white border-slate-200/90 shadow-lg hover:shadow-xl text-slate-900' : 'glass-medical-card border-white/15 text-white'
            }`}>
              <div className="absolute inset-0 pointer-events-none z-0">
                <img 
                  src={IMGS.aiMissionBg} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isLight ? 'opacity-70 sm:opacity-80' : 'opacity-75 sm:opacity-85'
                  }`} 
                />
                <div className={`absolute inset-0 transition-colors duration-500 ${
                  isLight 
                    ? 'bg-gradient-to-t from-white/90 via-white/65 to-white/35' 
                    : 'bg-gradient-to-t from-[#040E1B] via-[#040E1B]/75 to-[#040E1B]/25'
                }`} />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-[#E92932]/15 text-[#E92932] flex items-center justify-center font-bold text-xl mb-5 animate-pulse">
                  <ShieldIcon size={24} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>{MISSION.title}</h3>
                <p className={`text-base leading-relaxed mb-6 ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
                  {MISSION.statement}
                </p>
                <div className="space-y-2.5">
                  {MISSION.pillars.map((pillar, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#E92932] mt-2 shrink-0 animate-pulse" />
                      <span className={`text-sm ${isLight ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>{pillar}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealItem>

          <RevealItem delay={2}>
            <div className={`p-8 rounded-3xl border transition-all duration-400 hover:-translate-y-1.5 relative overflow-hidden h-full ${
              isLight ? 'bg-gradient-to-br from-white via-red-50/30 to-white border-slate-200/90 shadow-lg hover:shadow-xl text-slate-900' : 'glass-medical-card border-white/15 text-white'
            }`}>
              <div className="absolute inset-0 pointer-events-none z-0">
                <img 
                  src={IMGS.aiVisionBg} 
                  alt="" 
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isLight ? 'opacity-70 sm:opacity-80' : 'opacity-75 sm:opacity-85'
                  }`} 
                />
                <div className={`absolute inset-0 transition-colors duration-500 ${
                  isLight 
                    ? 'bg-gradient-to-t from-white/90 via-white/65 to-white/35' 
                    : 'bg-gradient-to-t from-[#040E1B] via-[#040E1B]/75 to-[#040E1B]/25'
                }`} />
              </div>

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E92932]/15 text-[#E92932] flex items-center justify-center font-bold text-xl mb-5 animate-heartbeat">
                    <HeartIcon size={24} color="#E92932" filled />
                  </div>
                  <h3 className={`text-2xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>{VISION.title}</h3>
                  <p className={`text-lg font-semibold leading-relaxed mb-4 text-[#E92932]`}>
                    "{VISION.statement}"
                  </p>
                  <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
                    {VISION.description}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-red-500/20 flex items-center justify-between">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Cardiovascular Care Goal</span>
                  <span className="text-xs font-bold text-[#E92932] px-3 py-1 rounded-full bg-[#E92932]/10 border border-[#E92932]/20">Bengaluru & Beyond</span>
                </div>
              </div>
            </div>
          </RevealItem>
        </div>

        <div className="mb-6 text-center">
          <h3 className={`text-xl sm:text-2xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>What We Stand For</h3>
          <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Principles that guide every diagnosis, treatment, and consultation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORE_VALUES.map((val, i) => (
            <RevealItem key={val.title} delay={(i % 3) + 1}>
              <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg h-full ${
                isLight ? 'bg-white border-slate-200/80 shadow-sm hover:border-[#E92932]/30' : 'glass-medical-card text-white'
              }`}>
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E92932] animate-pulse" />
                  <h4 className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{val.title}</h4>
                </div>
                <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>{val.desc}</p>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const getServiceBg = (serviceId) => {
    switch (serviceId) {
      case 'cardiology-consultation':
      case 'heart-health-assessment':
        return IMGS.aiConsultationBg;
      case 'hypertension-management':
      case 'cholesterol-management':
        return IMGS.aiHypertensionBg;
      case 'palpitations-rhythm':
      case 'breathlessness-evaluation':
        return IMGS.aiRhythmBg;
      case 'chest-pain-evaluation':
        return IMGS.aiInterventional;
      case 'diabetes-heart-risk':
        return IMGS.aiPreventive;
      default:
        return IMGS.aiServicesBg;
    }
  };

  return (
    <section id="services" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 overflow-hidden ${
      isLight ? 'bg-[#F8FAFC] border-y border-slate-200/80' : 'bg-[#051322] border-y border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headRef} className="reveal mb-10">
          <div className="eyebrow mb-3">Cardiology Services</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Cardiology services<br />focused on your care.
            </h2>
            <p className={`max-w-md text-base ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
              Comprehensive cardiovascular evaluations, preventive screening, and symptom assessment under Dr. Sree Ranga P.C.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SERVICES.map((s, i) => {
            const cardBg = getServiceBg(s.id);
            return (
              <RevealItem key={s.name} delay={(i % 3) + 1}>
                <div 
                  className={`group relative flex flex-col justify-between gap-3.5 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 h-full overflow-hidden ${
                    isLight
                      ? 'bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm hover:shadow-lg hover:border-[#E92932]/40 text-slate-900'
                      : 'glass-medical-card text-white'
                  }`}
                >
                  {/* Content-Specific Background Image Overlay for Card */}
                  <div className="absolute inset-0 pointer-events-none z-0 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
                    <img src={cardBg} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>

                  <div className="relative z-10 h-0.5 w-0 group-hover:w-12 bg-[#E92932] rounded-full transition-all duration-300" />
                  <div className="relative z-10">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 mb-3 group-hover:scale-110 ${
                      isLight ? 'bg-red-50 text-[#E92932]' : 'bg-[#E92932]/15'
                    }`}>
                      <HeartIcon size={20} color="#E92932" />
                    </div>
                    <h3 className={`font-bold text-lg mb-1.5 transition-colors duration-200 ${
                      isLight ? 'text-slate-900 group-hover:text-[#E92932]' : 'text-white group-hover:text-[#FF4148]'
                    }`}>{s.name}</h3>
                    <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{s.description}</p>
                  </div>
                  <Link to="/book-appointment" className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200 text-[#E92932] mt-2">
                    <span>Book Consultation</span>
                    <ArrowRight size={14} color="#E92932" className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </RevealItem>
            );
          })}
        </div>

        <RevealItem delay={1}>
          <div className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-xl ${
            isLight ? 'bg-[#F8FAFC] border-slate-200' : 'glass-medical-card border-white/10 text-white'
          }`}>
            <div className="text-center mb-6">
              <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>Conditions We Address</h3>
              <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Evaluating & managing a wide spectrum of heart and vascular conditions.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2.5">
              {CONDITIONS_ADDRESSED.map((cond) => (
                <span key={cond} className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-105 ${
                  isLight ? 'bg-white border-slate-200 text-slate-800 shadow-sm hover:border-[#E92932]' : 'bg-white/5 border-white/15 text-slate-200 hover:border-[#E92932]'
                }`}>
                  {cond}
                </span>
              ))}
            </div>
          </div>
        </RevealItem>
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
    <section className={`py-14 lg:py-16 px-6 lg:px-8 overflow-hidden relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F1F5F9] border-b border-slate-200/80' : 'bg-[#040E1B]/95 backdrop-blur-xl border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref={headRef} className="reveal">
          <div className="eyebrow mb-3">Why Choose Dr. Sreeranga P.C.</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Precision in diagnosis.<br />
            <em className="not-italic text-[#E92932]">Confidence in care.</em>
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
            Combining academic experience at Bangalore Medical College & Research Institute (BMCRI) with patient-focused clinical evaluation in Nandini Layout.
          </p>
        </div>

        <div className="space-y-3.5">
          {WHY_CHOOSE_US.map((r, i) => (
            <RevealItem key={r.num} delay={i + 1}>
              <div className={`flex gap-4.5 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900 hover:border-[#E92932]/30' : 'glass-medical-card text-white'
              }`}>
                <div className="flex-shrink-0 text-2xl font-bold leading-none text-[#E92932]">
                  {r.num}
                </div>
                <div>
                  <div className={`font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{r.title}</div>
                  <div className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{r.desc}</div>
                </div>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Research & Academic Contributions ───────────────────────────────────────
function ResearchAcademicSection() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="research" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 overflow-hidden ${
      isLight ? 'bg-white border-y border-slate-200/80' : 'bg-[#040E1B] border-y border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Academic & Research</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Evidence-based medicine.<br />
            <em className="not-italic text-[#E92932]">Backing every consultation.</em>
          </h2>
          <p className={`mt-3 text-sm sm:text-base max-w-2xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {RESEARCH_ACADEMIC.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            {RESEARCH_ACADEMIC.highlights.map((item, i) => (
              <RevealItem key={item.title} delay={i + 1}>
                <div className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isLight ? 'bg-[#F8FAFC] border-slate-200 shadow-sm hover:border-[#E92932]/40' : 'glass-medical-card text-white'
                }`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E92932]/15 text-[#E92932] flex items-center justify-center font-bold text-xs">
                      0{i + 1}
                    </div>
                    <h3 className={`font-bold text-base sm:text-lg ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.title}</h3>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed pl-11 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{item.detail}</p>
                </div>
              </RevealItem>
            ))}
          </div>

          <div className="lg:col-span-5">
            <RevealItem delay={2}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-white/15 min-h-[340px] group">
                <img src={IMGS.aiInterventional} alt="3D Coronary Stenting & Angiography Visualization" className="w-full h-full object-cover min-h-[340px] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs uppercase font-bold tracking-widest text-[#FF4148] mb-1">Angiography Research</span>
                  <div className="font-serif text-lg sm:text-xl font-bold">Coronary Vessel Mapping</div>
                  <div className="text-xs text-slate-300 mt-1">Peer-reviewed publications on CAD pattern evaluation & echocardiography</div>
                </div>
              </div>
            </RevealItem>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Patient Journey ──────────────────────────────────────────────────────────
function PatientJourneySection() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section id="patient-care" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
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
              <div className={`p-5 rounded-2xl border text-center flex flex-col items-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg h-full ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'glass-medical-card text-white'
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
    <section className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white' : 'bg-[#030C16]'
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
          <div className={`mb-10 rounded-3xl overflow-hidden border shadow-2xl grid lg:grid-cols-2 items-center group ${
            isLight ? 'bg-slate-900 text-white border-slate-800' : 'glass-medical-card text-white border-white/15'
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
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                isLight ? 'bg-[#F8FAFC] border-slate-200 text-slate-800 shadow-sm hover:border-[#E92932]' : 'glass-medical-card text-white hover:border-[#E92932]'
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
    <section className={`py-14 lg:py-16 px-6 lg:px-8 overflow-hidden relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F4F7FA] border-b border-slate-200/80' : 'bg-[#040E1B]/95 backdrop-blur-xl border-b border-white/10'
    }`}>
      <div className="max-w-5xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Patient Testimonials</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Heard from our patients.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
            <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold shadow-sm ${
              isLight ? 'bg-white border border-slate-200 text-slate-800' : 'glass-medical-card text-white'
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4285F4]/20 hover:bg-[#4285F4]/30 border border-[#4285F4]/40 text-xs font-semibold text-[#4285F4] dark:text-white transition-colors cursor-pointer"
            >
              <GoogleIcon size={14} /> Write a Google Review
            </a>
          </div>
        </div>

        <RevealItem delay={1}>
          <div className="relative">
            <div className={`rounded-3xl p-8 lg:p-12 relative overflow-hidden transition-all duration-300 ${
              isLight ? 'bg-white/95 border border-slate-200/90 shadow-xl text-slate-900' : 'glass-medical-card text-white'
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
                <button onClick={prev} aria-label="Previous testimonial" className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                  isLight ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100' : 'border-white/20 hover:bg-white/10 text-white'
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
    <section className={`py-12 lg:py-14 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white border-y border-slate-200/80' : 'bg-[#030C16]'
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
  const [showAll, setShowAll] = useState(false);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const visibleImages = showAll ? CLINIC_GALLERY_IMAGES : CLINIC_GALLERY_IMAGES.slice(0, 12);

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
    <section id="gallery" className={`py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal mb-8 sm:mb-10 text-center sm:text-left">
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

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {visibleImages.map((img, i) => (
            <GalleryItem
              key={img.src}
              img={img}
              delay={(i % 4) + 1}
              onClick={() => setLightboxIndex(showAll ? i : CLINIC_GALLERY_IMAGES.findIndex(item => item.src === img.src))}
              isLight={isLight}
            />
          ))}
        </div>

        {CLINIC_GALLERY_IMAGES.length > 12 && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer ${
                isLight
                  ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
              }`}
            >
              {showAll ? (
                <>Show Less</>
              ) : (
                <>View All {CLINIC_GALLERY_IMAGES.length} Clinic Photos ({CLINIC_GALLERY_IMAGES.length - 12} More)</>
              )}
            </button>
          </div>
        )}
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

function GalleryItem({ img, delay, onClick, isLight }) {
  const ref = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} relative rounded-xl overflow-hidden cursor-pointer mb-4 inline-block w-full border transition-all duration-300 ${
      isLight ? 'border-slate-200/90 shadow-sm hover:shadow-lg' : 'border-white/10'
    }`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}>
      <img src={img.src} alt="Clinic facility photo" className="w-full object-cover transition-transform duration-700" loading="lazy" decoding="async"
        style={{ transform: hov ? "scale(1.08)" : "scale(1)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
        style={{ background: hov ? "rgba(6,26,43,0.6)" : "transparent" }}>
        {hov && (
          <div className="animate-fade-in flex flex-col items-center">
            <svg width="36" height="36" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        )}
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

  return (
    <section id="our-story" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F1F5F9]' : 'bg-[#030A14]'
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
          <div className={`relative rounded-3xl overflow-hidden cursor-pointer border shadow-2xl group ${
            isLight ? 'border-slate-200/90' : 'border-white/15'
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
    <section id="faq" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
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
                <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isLight ? 'bg-white border-slate-200 shadow-sm hover:shadow-md' : 'glass-medical-card text-white'
                }`}>
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-5 font-semibold text-base sm:text-lg flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className={isLight ? 'text-slate-900' : 'text-white'}>{faq.question}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#E92932] text-white' : isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-white'
                    }`}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className={`px-5 pb-5 text-sm sm:text-base leading-relaxed border-t pt-3 animate-fade-in ${
                      isLight ? 'border-slate-100 text-slate-600 font-medium' : 'border-white/10 text-slate-300'
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
    <section id="appointment" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white' : 'bg-[#030C16]'
    }`}>
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`reveal rounded-3xl p-8 lg:p-12 border shadow-2xl transition-all duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.3)] ${
          isLight ? 'bg-gradient-to-br from-white via-red-50/40 to-white border-slate-200/90 text-slate-900' : 'glass-medical-card border-white/20 text-white'
        }`}>
          <div className="text-center mb-8">
            <div className="eyebrow mb-3">Book a Consultation</div>
            <h2 className={`text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Your heart deserves attention<br />
              <em className="not-italic text-[#E92932]">before it demands it.</em>
            </h2>
            <p className={`text-base ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
              Book a consultation with Dr. Sree Ranga P.C. — available Monday through Saturday.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { icon: <PhoneIcon size={18} color="#E92932" />, label: "Phone", val: "+91 8023456789" },
              { icon: <MapPinIcon size={18} color="#E92932" />, label: "Location", val: "Nandini Layout, Bangalore" },
              { icon: <ClockIcon size={18} color="#E92932" />, label: "Timings", val: "Mon–Sat: 9am – 8pm" },
            ].map(item => (
              <div key={item.label} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/10 bg-white/5'
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
            <a href="https://wa.me/919845011122" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 border border-[#25D366]/40 text-[#25D366] bg-[#25D366]/10">
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
    <section id="contact" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] border-t border-slate-200' : 'bg-[#040E1B]/90 backdrop-blur-xl border-t border-white/10'
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
            <div className={`rounded-3xl overflow-hidden shadow-2xl border flex flex-col justify-between h-full min-h-[440px] ${
              isLight ? 'border-slate-200/90 bg-white' : 'border-white/15 glass-medical-card'
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

              <div className={`p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 ${
                isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#06192E] border-white/10 text-white'
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
              { title: "PHONE", name: CLINIC_INFO.phone, sub: "+91 98450 11122", icon: <PhoneIcon size={20} color="#E92932" />, tel: true },
              { title: "EMAIL", name: CLINIC_INFO.email, sub: "Response within 24 hours", icon: <MailIcon size={20} color="#E92932" />, mail: true },
              { title: "CLINIC HOURS", name: CLINIC_INFO.hours, sub: "Sunday: Emergency Screening Only", icon: <ClockIcon size={20} color="#E92932" /> },
            ].map((c, i) => (
              <RevealItem key={c.title} delay={i + 1}>
                <div className={`flex items-start gap-4 p-4.5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                  isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'glass-medical-card text-white'
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
                        <a href={`tel:${CLINIC_INFO.phoneTel}`} className="hover:text-[#E92932] transition-colors">{c.name}</a>
                        <a href="tel:+91 9845011122" className="hover:text-[#E92932] transition-colors">{c.sub}</a>
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
      <About />
      <MissionVisionValues />
      <ServicesSection />
      <WhyChooseUs />
      <ResearchAcademicSection />
      <PatientJourneySection />
      <PreventiveCardiologySection />
      <Testimonials />
      <Metrics />
      <Gallery />
      <VideoSection />
      <FAQsSection />
      <Appointment />
      <Contact />
    </div>
  );
}
