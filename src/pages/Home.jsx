import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CLINIC_INFO } from "../data/clinicData";
import { useAppState } from "../context/AppContext";

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

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

// ─── Image URLs ───────────────────────────────────────────────────────────────
const IMGS = {
  doctorHero: "/hero-doctor.jpg",
  doctorAbout: "/about-doctor.jpg",
  ecgMonitor: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=900&h=600&fit=crop&auto=format",
  ecgScreen: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=900&h=600&fit=crop&auto=format",
  heartbeat: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=900&h=600&fit=crop&auto=format",
  medicalTools: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&h=600&fit=crop&auto=format",
  hospitalRoom: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&h=600&fit=crop&auto=format",
  waitingRoom: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&h=500&fit=crop&auto=format",
  ecgPaper: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&h=600&fit=crop&auto=format",
  medWorker: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&h=900&fit=crop&auto=format",
};

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
      {/* 1. Radial Deep Ambient Glow Gradient */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: isLight
          ? "radial-gradient(circle at 50% 20%, rgba(233,41,50,0.09) 0%, rgba(240,246,252,0.85) 50%, rgba(229,239,248,0.95) 85%)"
          : "radial-gradient(circle at 50% 35%, rgba(233,41,50,0.18) 0%, rgba(10,36,58,0.75) 48%, transparent 85%)"
      }} />

      {/* 2. Top-Right Crimson Medical Light Orb */}
      <div className={`animate-hero-glow absolute top-10 right-10 w-[550px] h-[550px] rounded-full pointer-events-none z-0 ${
        isLight ? 'bg-[#E92932]/14 blur-[140px]' : 'bg-[#E92932]/22 blur-[130px]'
      }`} />

      {/* 3. Top-Left Royal Cyan Light Orb */}
      <div className={`animate-hero-glow absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none z-0 ${
        isLight ? 'bg-[#0284C7]/16 blur-[160px]' : 'bg-[#0284C7]/18 blur-[150px]'
      }`} style={{ animationDelay: "4.5s" }} />

      {/* 4. Precision Grid Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-0 bg-medical-grid ${
        isLight ? 'opacity-[0.06]' : 'opacity-[0.07]'
      }`} />

      {/* 5. Glowing ECG Wave Lines */}
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

        {/* Left content */}
        <div className="space-y-8">
          {/* Status pill */}
          <div className={`pill-anim inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase ${
            isLight
              ? 'border-red-200/90 bg-white/95 text-[#E92932] shadow-[0_4px_20px_rgba(233,41,50,0.12)] backdrop-blur-md'
              : 'border-[#E92932]/40 bg-[#E92932]/08 text-[#FF4148]'
          }`}>
            <span className="w-2.5 h-2.5 rounded-full animate-pulse bg-[#E92932] shadow-[0_0_8px_rgba(233,41,50,0.8)]" />
            Accepting New Patients
          </div>

          {/* Headline */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            <span className="block h1-line-1">Heart care that</span>
            <span className="block h1-line-2 text-[#E92932] italic drop-shadow-[0_2px_10px_rgba(233,41,50,0.15)]">reads the whole</span>
            <span className="block h1-line-3">picture.</span>
          </h1>

          {/* Body */}
          <p className={`hero-body text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg ${
            isLight ? 'text-slate-700 font-medium' : 'text-slate-300'
          }`}>
            Dr. Sree Ranga P.C. has spent 18+ years in interventional cardiology, treating chest pain,
            arrhythmia and coronary disease at Shri Kanhaiya Diagnostics in Nandini Layout.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link to="/book-appointment" className="btn-shine inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 cursor-pointer w-full sm:w-auto bg-[#E92932] shadow-[0_10px_35px_rgba(233,41,50,0.4)]">
              Book an Appointment
              <ArrowRight size={16} color="white" />
            </Link>
            <a href="#about" className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto ${
              isLight
                ? 'text-slate-800 border-slate-300/90 bg-white hover:bg-slate-50 shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]'
                : 'text-white border-white/20 bg-white/5 hover:bg-white/10'
            }`}>
              Meet the Doctor
            </a>
          </div>

          {/* Stats */}
          <div className={`hero-stats grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4 border-t ${
            isLight ? 'border-slate-200/90' : 'border-white/10'
          }`}>
            {[
              { value: "18+", label: "Years in Cardiology" },
              { value: "12,000+", label: "Patients Treated" },
              { value: "4.9/5", label: "Patient Rating" },
              { value: "127+", label: "Reviews" },
            ].map(s => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-[#E92932]">{s.value}</div>
                <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Doctor image */}
        <div className="relative hero-img mt-4 lg:mt-0">
          <div className={`relative rounded-3xl overflow-hidden ${
            isLight
              ? 'shadow-[0_25px_60px_-10px_rgba(15,23,42,0.14),0_0_0_1px_rgba(203,213,225,0.8)] border border-slate-200/90 bg-white'
              : 'shadow-[0_40px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(220,228,234,0.1)]'
          }`}>
            <img src={IMGS.doctorHero} alt="Dr. Sree Ranga P.C., Interventional Cardiologist"
              className="w-full h-[360px] sm:h-[480px] lg:h-[580px] object-cover object-top" />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isLight ? 'from-slate-900/35 via-transparent to-transparent' : 'from-[#041220] via-transparent to-transparent'
            }`} />
          </div>

          {/* Experience floating card */}
          <div className={`float-card animate-float absolute bottom-3 left-3 sm:-bottom-4 sm:-left-4 lg:-left-8 flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 rounded-2xl z-20 ${
            isLight
              ? 'bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.12)] text-slate-900'
              : 'glass-medical-card text-white'
          }`}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 animate-heartbeat bg-[#E92932]/15">
              <HeartIcon size={18} color="#E92932" filled />
            </div>
            <div>
              <div className={`text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>18+</div>
              <div className={`text-[11px] sm:text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>Years Experience</div>
            </div>
          </div>

          {/* Rating card with Google Maps branding */}
          <a
            href="https://maps.google.com/?q=Shri+Kanhaiya+Diagnostics+Nandini+Layout+Bangalore"
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

      {/* Interactive Scroll Down Indicator (Desktop Only) */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-30">
        <button
          onClick={() => {
            const nextEl = document.getElementById("about") || document.getElementById("expertise");
            if (nextEl) nextEl.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="Scroll down to next section"
          className="group flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-105"
        >
          <span className={`text-[11px] font-semibold tracking-[0.25em] uppercase transition-colors drop-shadow-sm ${
            isLight ? 'text-slate-600 group-hover:text-slate-900' : 'text-slate-300 group-hover:text-white'
          }`}>
            Scroll Down
          </span>
          <div className={`relative grid h-10 w-6 place-items-center rounded-full border-2 backdrop-blur-md shadow-lg group-hover:border-[#E92932] group-hover:bg-[#E92932]/10 transition-all ${
            isLight ? 'border-slate-300 bg-white' : 'border-white/20 bg-white/5'
          }`}>
            <div className="h-2 w-1 rounded-full bg-[#E92932] animate-scroll-dot shadow-[0_0_8px_rgba(233,41,50,0.8)]" />
          </div>
        </button>
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
        {/* Image */}
        <div ref={leftRef} className="reveal relative group">
          {/* Top-Left Hollow Decorative Frame */}
          <div className={`absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-24 h-24 sm:w-36 sm:h-36 rounded-[28px] border-2 transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2 pointer-events-none z-0 ${
            isLight ? 'border-[#E92932]/30 bg-red-50/50' : 'border-[#E92932]/35 bg-[#E92932]/5'
          }`} />

          {/* Bottom-Right Filled Decorative Frame */}
          <div className="absolute -bottom-3 -right-3 sm:-bottom-6 sm:-right-6 w-36 h-36 sm:w-52 sm:h-52 rounded-[36px] bg-gradient-to-tr from-[#E92932]/25 via-[#FF4148]/15 to-[#E92932]/05 shadow-xl blur-[1px] transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2 pointer-events-none z-0" />

          {/* Main Image Frame */}
          <div className={`relative rounded-[28px] sm:rounded-[32px] overflow-hidden border z-10 transition-transform duration-500 ${
            isLight ? 'border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.1)] bg-white' : 'border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]'
          }`}>
            <img src={IMGS.doctorAbout} alt="Dr. Sree Ranga P.C. in consultation"
              className="w-full h-[340px] sm:h-[450px] lg:h-[540px] object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isLight ? 'from-slate-900/35 via-transparent to-transparent' : 'from-[#041220] via-[#041220]/20 to-transparent'
            }`} />

            {/* Floating Glass Doctor Info Card */}
            <div className={`absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-4 sm:p-5 rounded-2xl shadow-2xl ${
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
                    MBBS, MD, DM (Interventional Cardiology)
                  </div>
                </div>
                <div className="grid h-9 w-9 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-xl bg-[#E92932] text-white shadow-[0_0_15px_rgba(233,41,50,0.5)]">
                  <HeartIcon size={18} color="white" filled />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div ref={rightRef} className="reveal space-y-4 sm:space-y-5">
          <div className="eyebrow">Meet Your Cardiologist</div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            Experience that listens<br />
            <em className="not-italic text-[#E92932]">before it treats.</em>
          </h2>
          <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
            Dr. Sree Ranga P.C. is a leading interventional cardiologist with over 18 years of dedicated
            practice at Shri Kanhaiya Diagnostics, Nandini Layout, Bangalore. Trained in advanced cardiac
            interventions, he brings a rare combination of technical precision and genuine patient empathy
            to every consultation.
          </p>
          <p className={`text-base leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
            His practice philosophy centers on thorough evaluation — listening to the patient before reaching
            for the diagnostic toolkit. From complex coronary interventions to preventive cardiology,
            Dr. Sree Ranga approaches each case as a unique clinical story.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-3.5 py-2">
            {[
              { val: "18+", label: "Years Experience" },
              { val: "12,000+", label: "Patients" },
              { val: "4.9/5", label: "Rating" },
              { val: "127+", label: "Reviews" },
            ].map(s => (
              <div key={s.label} className={`flex items-center gap-3 p-3.5 rounded-xl ${
                isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'glass-medical-card text-white'
              }`}>
                <div className="w-1.5 h-7 rounded-full bg-[#E92932]" />
                <div>
                  <div className={`text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{s.val}</div>
                  <div className={`text-xs ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/book-appointment" className="inline-flex items-center gap-2 font-semibold transition-all duration-200 hover:gap-3 text-[#E92932]">
            Learn More About Dr. Sree Ranga <ArrowRight size={16} color="#E92932" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Expertise ────────────────────────────────────────────────────────────────
function Expertise() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const cards = [
    { title: "Preventive Cardiology", desc: "Comprehensive screening and risk stratification to stop heart disease before it starts.", img: IMGS.ecgPaper },
    { title: "Interventional Cardiology", desc: "Minimally invasive procedures including angioplasty, stenting, and complex PCI.", img: IMGS.heartbeat },
    { title: "Arrhythmia Care", desc: "Diagnosis and management of irregular heart rhythms from Holter to ablation planning.", img: IMGS.ecgScreen },
    { title: "Coronary Artery Disease", desc: "Expert management of CAD through medical therapy and advanced interventional techniques.", img: IMGS.ecgMonitor },
  ];

  return (
    <section id="expertise" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F4F7FA]' : 'bg-[#030C16]'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Clinical Expertise</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Advanced cardiac care,<br />
            <em className="not-italic text-[#E92932]">built around you.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <ExpertiseCard key={card.title} card={card} delay={i} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpertiseCard({ card, delay, isLight }) {
  const ref = useReveal();
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay + 1} group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-400 ${
      isLight
        ? 'bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.04)] text-slate-900 hover:shadow-[0_12px_35px_rgba(15,23,42,0.08)]'
        : 'glass-medical-card text-white'
    }`}
      style={{ transform: hovered ? "translateY(-6px)" : "translateY(0)" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative h-56 overflow-hidden">
        <img src={card.img} alt={card.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }} />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isLight ? 'from-white via-white/40 to-transparent' : 'from-[#041220] via-[#041220]/50 to-transparent'
        }`} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Red accent line */}
        <div className="h-0.5 mb-3 rounded-full transition-all duration-400 bg-[#E92932]" style={{ width: hovered ? "48px" : "32px" }} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-lg font-bold mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{card.title}</h3>
            <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>{card.desc}</p>
          </div>
          <div className="flex-shrink-0 transition-all duration-300" style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
            <ArrowRight size={20} color="#E92932" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const services = [
    { icon: <WaveIcon size={20} />, title: "ECG & Cardiac Evaluation", desc: "Comprehensive resting and dynamic electrocardiography." },
    { icon: <HeartIcon size={20} color="#E92932" />, title: "Echocardiography", desc: "2D, 3D and Doppler imaging of cardiac structure and function." },
    { icon: <ActivityIcon size={20} />, title: "TMT / Stress Testing", desc: "Exercise tolerance testing for ischemia detection." },
    { icon: <ClockIcon size={20} />, title: "Holter Monitoring", desc: "24–72 hour ambulatory cardiac rhythm recording." },
    { icon: <ScopeIcon size={20} />, title: "Coronary Angiography", desc: "Fluoroscopic imaging of coronary arterial anatomy." },
    { icon: <ZapIcon size={20} />, title: "Angioplasty / PCI", desc: "Balloon angioplasty and drug-eluting stent placement." },
    { icon: <WaveIcon size={20} />, title: "Arrhythmia Evaluation", desc: "Holter, event monitor, and tilt-table investigations." },
    { icon: <ShieldIcon size={20} />, title: "Preventive Heart Checkups", desc: "Risk-stratified cardiovascular screening packages." },
  ];

  return (
    <section id="services" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white/90 backdrop-blur-xl border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal mb-10">
          <div className="eyebrow mb-3">Our Services</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Cardiology services<br />that go the distance.
            </h2>
            <p className={`max-w-sm text-base ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
              From your first ECG to a complex coronary intervention — we handle every step with precision.
            </p>
          </div>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} delay={(i % 3) + 1} large={i === 0 || i === 5} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay, large, isLight }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} group relative flex flex-col gap-3.5 p-5 rounded-2xl cursor-pointer transition-all ${
      large ? "md:col-span-1" : ""
    } ${
      isLight
        ? 'bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#E92932]/40 text-slate-900'
        : 'glass-medical-card text-white'
    }`}>

      {/* Subtle top indicator line on hover */}
      <div className="h-0.5 w-0 group-hover:w-12 bg-[#E92932] rounded-full transition-all duration-300" />

      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
        isLight ? 'bg-red-50 text-[#E92932]' : 'bg-[#E92932]/15'
      }`}>
        {service.icon}
      </div>
      <div className="flex-1">
        <div className={`font-semibold mb-1 transition-colors duration-200 ${
          isLight ? 'text-slate-900 group-hover:text-[#E92932]' : 'text-white group-hover:text-[#FF4148]'
        }`}>{service.title}</div>
        <div className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{service.desc}</div>
      </div>
      <Link to="/book-appointment" className="flex items-center gap-1.5 text-sm font-medium transition-all duration-200 text-[#E92932]">
        <span>Explore</span>
        <ArrowRight size={14} color="#E92932" className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </Link>
    </div>
  );
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const reasons = [
    { num: "01", title: "Experienced Specialist", desc: "18+ years of focused interventional cardiology practice with complex case expertise." },
    { num: "02", title: "Patient-Centered Care", desc: "Each treatment plan is built around the individual — not a protocol sheet." },
    { num: "03", title: "Advanced Diagnostics", desc: "State-of-the-art imaging, ECG, echo, and cath lab under one roof." },
    { num: "04", title: "Clear Treatment Guidance", desc: "Transparent communication so you understand every step of your cardiac care." },
  ];

  return (
    <section className={`py-14 lg:py-16 px-6 lg:px-8 overflow-hidden relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F1F5F9] border-b border-slate-200/80' : 'bg-[#040E1B]/95 backdrop-blur-xl border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div ref={headRef} className="reveal">
          <div className="eyebrow mb-3">Why Choose Us</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Precision in diagnosis.<br />
            <em className="not-italic text-[#E92932]">Confidence in treatment.</em>
          </h2>
          <p className={`mt-4 text-base leading-relaxed ${isLight ? 'text-slate-600 font-medium' : 'text-slate-300'}`}>
            At Shri Kanhaiya Diagnostics, we combine clinical excellence with genuine compassion —
            so every patient walks out with answers, not just a prescription.
          </p>
        </div>

        <div className="space-y-3.5">
          {reasons.map((r, i) => (
            <ReasonItem key={r.num} reason={r} delay={i + 1} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReasonItem({ reason, delay, isLight }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} flex gap-4.5 p-4.5 rounded-2xl ${
      isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'glass-medical-card text-white'
    }`}>
      <div className="flex-shrink-0 text-3xl font-bold leading-none text-[#E92932]">
        {reason.num}
      </div>
      <div>
        <div className={`font-semibold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{reason.title}</div>
        <div className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{reason.desc}</div>
      </div>
    </div>
  );
}

// ─── Medical Technology ───────────────────────────────────────────────────────
function MedicalTech() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section className={`py-14 lg:py-16 px-6 lg:px-8 relative overflow-hidden z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC]' : 'bg-[#030A14]'
    }`}>
      {/* Scrolling ECG background */}
      <div className={`absolute bottom-0 left-0 right-0 h-20 overflow-hidden ${isLight ? 'opacity-15' : 'opacity-10'}`}>
        <div className="ecg-scroll flex">
          {[...Array(4)].map((_, i) => (
            <svg key={i} width="530" height="100" viewBox="0 0 530 100" fill="none" className="flex-shrink-0">
              <path d={ECG_PATH} stroke="#E92932" strokeWidth="1.5" fill="none" />
            </svg>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Technology</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Diagnosis-grade technology.<br />
            <em className="not-italic text-[#E92932]">Right here in Bangalore.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
          {[
            { img: IMGS.ecgMonitor, label: "Vital Signs Monitoring" },
            { img: IMGS.ecgScreen, label: "12-Lead ECG Analysis" },
            { img: IMGS.heartbeat, label: "Cardiac Rhythm Display" },
            { img: IMGS.medicalTools, label: "Diagnostic Equipment Suite" },
            { img: IMGS.hospitalRoom, label: "Clinical Workspace" },
            { img: IMGS.ecgPaper, label: "ECG Paper Interpretation" },
          ].map((item, i) => (
            <TechCard key={item.label} item={item} delay={(i % 3) + 1} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCard({ item, delay, isLight }) {
  const ref = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} relative rounded-2xl overflow-hidden cursor-pointer h-44 border ${
      isLight ? 'border-slate-200/90 shadow-sm' : 'border-white/10'
    }`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <img src={item.img} alt={item.label} className="w-full h-full object-cover transition-transform duration-500"
        style={{ transform: hov ? "scale(1.06)" : "scale(1)" }} />
      <div className="absolute inset-0 transition-all duration-300" style={{ background: hov ? "rgba(6,26,43,0.65)" : "rgba(6,26,43,0.35)" }} />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-sm font-medium text-white">{item.label}</div>
      </div>
    </div>
  );
}

// ─── Patient Journey ──────────────────────────────────────────────────────────
function PatientJourney() {
  const headRef = useReveal();
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const steps = [
    { num: "01", title: "Consultation", desc: "A thorough discussion of your symptoms, history, and concerns." },
    { num: "02", title: "Diagnosis", desc: "Targeted investigations — ECG, echo, angiography — to pinpoint the issue." },
    { num: "03", title: "Treatment", desc: "A personalized care plan: medical therapy or interventional procedure." },
    { num: "04", title: "Follow-up", desc: "Ongoing monitoring and lifestyle guidance to support long-term recovery." },
  ];

  return (
    <section id="patient-care" className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white/90 backdrop-blur-xl border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Patient Journey</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            From first visit to<br />
            <em className="not-italic text-[#E92932]">full recovery.</em>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Connecting line (desktop) */}
          <div className={`hidden md:block absolute top-10 left-0 right-0 h-px ${isLight ? 'bg-slate-200' : 'bg-white/15'}`} style={{ zIndex: 0 }}>
            <div className="h-full w-full rounded-full bg-[#E92932]" />
          </div>

          {steps.map((step, i) => (
            <JourneyStep key={step.num} step={step} delay={i + 1} isLight={isLight} />
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyStep({ step, delay, isLight }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`reveal reveal-delay-${delay} relative flex flex-col items-center text-center gap-3.5`} style={{ zIndex: 1 }}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2 transition-all duration-300 ${
        isLight
          ? 'bg-white border-[#E92932] text-[#E92932] shadow-md'
          : 'bg-[#061A2B] border-[#E92932] text-[#FF4148] shadow-[0_0_20px_rgba(233,41,50,0.3)]'
      }`}>
        {step.num}
      </div>
      <div>
        <div className={`font-bold text-base mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{step.title}</div>
        <div className={`text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{step.desc}</div>
      </div>
    </div>
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
              href="https://maps.google.com/?q=Shri+Kanhaiya+Diagnostics+Nandini+Layout+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4285F4]/20 hover:bg-[#4285F4]/30 border border-[#4285F4]/40 text-xs font-semibold text-[#4285F4] dark:text-white transition-colors cursor-pointer"
            >
              <GoogleIcon size={14} /> Write a Google Review
            </a>
          </div>
        </div>

        <div className="relative">
          <div className={`rounded-3xl p-8 lg:p-12 relative overflow-hidden ${
            isLight ? 'bg-white/95 border border-slate-200/90 shadow-xl text-slate-900' : 'glass-medical-card text-white'
          }`}>
            {/* Large quote */}
            <div className="absolute top-6 right-10 text-9xl font-bold leading-none select-none text-[#E92932]/10">"</div>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} size={18} filled />)}
            </div>

            <p className={`text-lg lg:text-xl leading-relaxed font-medium mb-6 ${isLight ? 'text-slate-800' : 'text-white'}`}>
              "{testimonials[idx].text}"
            </p>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white text-sm bg-[#E92932]">
                {testimonials[idx].initials}
              </div>
              <div>
                <div className={`font-semibold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{testimonials[idx].name}</div>
                <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{testimonials[idx].category}</div>
              </div>
            </div>
          </div>

          {/* Controls */}
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
              <button onClick={next} aria-label="Next testimonial" className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer bg-[#E92932] text-white">
                <ArrowRight size={16} color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Metrics ──────────────────────────────────────────────────────────────────
function Metrics() {
  const { count: years, ref: r1 } = useCounter(18, 1200);
  const { count: patients, ref: r2 } = useCounter(12000, 2000);
  const { count: rating, ref: r3 } = useCounter(49, 1500);
  const { count: reviews, ref: r4 } = useCounter(127, 1600);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const metrics = [
    { ref: r1, value: years + "+", label: "Years of Experience", sub: "Interventional Cardiology" },
    { ref: r2, value: patients.toLocaleString() + "+", label: "Patients Treated", sub: "Across Bangalore" },
    { ref: r3, value: (rating / 10).toFixed(1) + "/5", label: "Google Maps Rating", sub: "Consistently 5-star care" },
    { ref: r4, value: reviews + "+", label: "Google Reviews", sub: "100% verified patients" },
  ];

  return (
    <section className={`py-12 lg:py-14 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-white border-y border-slate-200/80' : 'bg-[#030C16]'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {metrics.map((m) => (
            <div key={m.label} ref={m.ref} className="text-center">
              <div className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-1.5 text-[#E92932]">{m.value}</div>
              <div className={`text-sm font-semibold mb-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.label}</div>
              <div className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
function Gallery() {
  const headRef = useReveal();
  const [lightbox, setLightbox] = useState(null);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  const images = [
    { src: IMGS.doctorHero, label: "Dr. Sree Ranga P.C." },
    { src: IMGS.ecgMonitor, label: "Vital Signs Monitoring" },
    { src: IMGS.doctorAbout, label: "Patient Consultation" },
    { src: IMGS.ecgScreen, label: "ECG Analysis" },
    { src: IMGS.heartbeat, label: "Cardiac Rhythm" },
    { src: IMGS.hospitalRoom, label: "Clinical Environment" },
    { src: IMGS.medicalTools, label: "Diagnostic Equipment" },
    { src: IMGS.waitingRoom, label: "Clinic Waiting Area" },
    { src: IMGS.ecgPaper, label: "ECG Paper Report" },
  ];

  return (
    <section id="gallery" className={`py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F8FAFC] border-y border-slate-200/80' : 'bg-[#051322]/90 backdrop-blur-xl border-y border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div ref={headRef} className="reveal mb-8 sm:mb-10">
          <div className="eyebrow mb-2">
            Clinical Gallery
          </div>
          <h2 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Explore our modern facility & diagnostic suites.
          </h2>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
          {images.map((img, i) => (
            <GalleryItem key={img.label} img={img} delay={(i % 3) + 1} onClick={() => setLightbox(img)} isLight={isLight} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#030C16]/95 backdrop-blur-md"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white opacity-70 hover:opacity-100 cursor-pointer" onClick={() => setLightbox(null)}>
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <div className="max-w-4xl text-center" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.label} className="max-w-full max-h-[80vh] rounded-2xl object-contain mx-auto shadow-2xl" />
            <div className="mt-4 text-lg font-semibold text-white font-serif">{lightbox.label}</div>
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
    <div ref={ref} className={`reveal reveal-delay-${delay} relative rounded-xl overflow-hidden cursor-pointer mb-4 inline-block w-full border ${
      isLight ? 'border-slate-200/90 shadow-sm' : 'border-white/10'
    }`}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}>
      <img src={img.src} alt={img.label} className="w-full object-cover transition-transform duration-500"
        style={{ transform: hov ? "scale(1.05)" : "scale(1)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
        style={{ background: hov ? "rgba(6,26,43,0.75)" : "transparent" }}>
        {hov && (
          <>
            <svg width="36" height="36" fill="none" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" className="mb-2">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <div className="text-sm font-medium text-white px-3 text-center">{img.label}</div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Video Section ────────────────────────────────────────────────────────────
function VideoSection() {
  const ref = useReveal();
  const [hov, setHov] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <section className={`py-14 lg:py-16 px-6 lg:px-8 relative z-10 transition-colors duration-300 ${
      isLight ? 'bg-[#F1F5F9]' : 'bg-[#030A14]'
    }`}>
      <div className="max-w-5xl mx-auto">
        <div ref={ref} className="reveal text-center mb-10">
          <div className="eyebrow mb-3">Our Story</div>
          <h2 className={`text-3xl lg:text-4xl xl:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            See how compassionate cardiac<br />
            <em className="not-italic text-[#E92932]">care comes together.</em>
          </h2>
        </div>

        <div className={`relative rounded-3xl overflow-hidden cursor-pointer border shadow-2xl ${
          isLight ? 'border-slate-200/90' : 'border-white/15'
        }`}
          onClick={() => setVideoModal(true)}
          onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
          <img src={IMGS.ecgMonitor} alt="Cardiac care video" className="w-full h-64 lg:h-88 object-cover transition-transform duration-700"
            style={{ transform: hov ? "scale(1.03)" : "scale(1)" }} />
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300"
            style={{ background: hov ? "rgba(6,26,43,0.65)" : "rgba(6,26,43,0.45)" }}>
            <div className="w-18 h-18 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: "rgba(233,41,50,0.9)", transform: hov ? "scale(1.12)" : "scale(1)", boxShadow: hov ? "0 0 40px rgba(233,41,50,0.5)" : "0 0 20px rgba(233,41,50,0.3)" }}>
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24" style={{ marginLeft: "3px" }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {videoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" onClick={() => setVideoModal(false)}>
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden border border-white/20 bg-slate-950 aspect-video shadow-2xl p-8 flex flex-col items-center justify-center text-center" onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100 cursor-pointer" onClick={() => setVideoModal(false)}>
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <div className="w-16 h-16 rounded-full bg-[#E92932]/20 flex items-center justify-center text-[#E92932] mb-4">
              <svg width="32" height="32" fill="#E92932" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">Shri Kanhaiya Diagnostics Overview</h3>
            <p className="text-sm text-slate-300 max-w-md">Experience our modern cardiology facility and compassionate care philosophy under Dr. Sree Ranga P.C. in Nandini Layout, Bangalore.</p>
          </div>
        </div>
      )}
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
        <div ref={ref} className={`reveal rounded-3xl p-8 lg:p-12 border shadow-2xl ${
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
              { icon: <ClockIcon size={18} color="#E92932" />, label: "Timings", val: "Mon–Sat: 9am – 7pm" },
            ].map(item => (
              <div key={item.label} className={`flex items-center gap-3 p-3.5 rounded-xl border ${
                isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/10 bg-white/5'
              }`}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#E92932]/15">
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
            <Link to="/book-appointment" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-200 hover:scale-105 btn-shine bg-[#E92932] shadow-[0_8px_30px_rgba(233,41,50,0.4)]">
              Book an Appointment <ArrowRight size={16} color="white" />
            </Link>
            <a href="https://wa.me/919845011122" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold transition-all duration-200 hover:scale-105 border border-[#25D366]/40 text-[#25D366] bg-[#25D366]/10">
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
          {/* Real Google Maps Location Card */}
          <div className={`rounded-3xl overflow-hidden shadow-2xl border flex flex-col justify-between h-full min-h-[440px] ${
            isLight ? 'border-slate-200/90 bg-white' : 'border-white/15 glass-medical-card'
          }`}>
            {/* Header Bar */}
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

            {/* Map Frame */}
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

            {/* Bottom Directions Strip */}
            <div className={`p-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 ${
              isLight ? 'bg-slate-100 border-slate-200 text-slate-800' : 'bg-[#06192E] border-white/10 text-white'
            }`}>
              <div className={`text-xs font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                446, 1st Main Rd, Sreenivas Nagar, Nandini Layout, Bengaluru, Karnataka 560096
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

          {/* Contact Cards */}
          <div className="flex flex-col justify-between gap-3.5">
            {/* Address */}
            <div className={`flex items-start gap-4 p-4.5 rounded-2xl ${
              isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'glass-medical-card text-white'
            }`}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#E92932]/15 text-[#E92932]">
                <MapPinIcon size={20} color="#E92932" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#E92932] mb-0.5">
                  ADDRESS
                </div>
                <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{CLINIC_INFO.name}</div>
                <div className={`text-xs leading-relaxed mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                  {CLINIC_INFO.address}
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className={`flex items-start gap-4 p-4.5 rounded-2xl ${
              isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'glass-medical-card text-white'
            }`}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#E92932]/15 text-[#E92932]">
                <PhoneIcon size={20} color="#E92932" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#E92932] mb-0.5">
                  PHONE
                </div>
                <div className={`flex flex-col text-sm font-semibold space-y-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <a href={`tel:${CLINIC_INFO.phoneTel}`} className="hover:text-[#E92932] transition-colors">{CLINIC_INFO.phone}</a>
                  <a href="tel:+91 9845011122" className="hover:text-[#E92932] transition-colors">+91 98450 11122</a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className={`flex items-start gap-4 p-4.5 rounded-2xl ${
              isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'glass-medical-card text-white'
            }`}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#E92932]/15 text-[#E92932]">
                <MailIcon size={20} color="#E92932" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#E92932] mb-0.5">
                  EMAIL
                </div>
                <div className={`flex flex-col text-sm font-semibold space-y-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  <a href={`mailto:${CLINIC_INFO.email}`} className="hover:text-[#E92932] transition-colors">{CLINIC_INFO.email}</a>
                </div>
              </div>
            </div>

            {/* Clinic Hours */}
            <div className={`flex items-start gap-4 p-4.5 rounded-2xl ${
              isLight ? 'bg-white border border-slate-200/80 shadow-sm text-slate-900' : 'glass-medical-card text-white'
            }`}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 bg-[#E92932]/15 text-[#E92932]">
                <ClockIcon size={20} color="#E92932" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#E92932] mb-0.5">
                  CLINIC HOURS
                </div>
                <div className={`text-sm font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{CLINIC_INFO.hours}</div>
                <div className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Sunday: Emergency Screening Only</div>
              </div>
            </div>
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
function ArrowRight({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
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
function ChipIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <rect x="7" y="7" width="10" height="10" rx="1" />
      <path d="M7 9H4M7 12H4M7 15H4M17 9h3M17 12h3M17 15h3M9 7V4M12 7V4M15 7V4M9 17v3M12 17v3M15 17v3" />
    </svg>
  );
}
function UserHeartIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4" />
      <path d="M16 19l2 2 4-4" strokeWidth="2" />
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
function WaveIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <polyline points="2 12 6 4 10 20 14 8 18 14 22 12" />
    </svg>
  );
}
function ActivityIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function ScopeIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  );
}
function ZapIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.8">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
      <Expertise />
      <Services />
      <WhyChooseUs />
      <MedicalTech />
      <PatientJourney />
      <Testimonials />
      <Metrics />
      <Gallery />
      <VideoSection />
      <Appointment />
      <Contact />
    </div>
  );
}
