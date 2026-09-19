import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Activity,
  Stethoscope,
  Building2,
  Sparkles,
  Users,
  Target,
  Compass,
  GraduationCap
} from 'lucide-react';
import { useAppState } from '../context/AppContext';

export function AboutPage() {
  const { theme } = useAppState();
  const isLight = theme === 'light';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen pt-24 pb-16 sm:pt-28 sm:pb-24 transition-colors duration-300 ${
      isLight ? 'bg-gradient-to-b from-[#F0F7FE] via-white to-[#F4F8FC] text-slate-800' : 'bg-[#030A14] text-slate-100'
    }`}>
      {/* Decorative Atmosphere */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#0284C7]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-20">

        {/* ─── Page Hero Banner ──────────────────────────────────────────────── */}
        <div className="text-center max-w-4xl mx-auto space-y-4 pt-4 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-[#E52323] text-xs font-bold tracking-widest uppercase shadow-2xs">
            <Sparkles size={14} className="animate-pulse" />
            Comprehensive Clinical Profile & Practice Foundation
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0E2F56] leading-tight">
            About <span className="text-[#E52323]">Dr. Sree Ranga P.C.</span> & Our Clinic
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Senior Interventional Cardiologist, Professor of Cardiology at BMCRI, and Founder of Shri Kanhaiya Chest Pain Clinic & Diagnostics.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/book-appointment"
              className="inline-flex items-center gap-2 bg-[#E52323] hover:bg-[#D01A1A] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-red-500/25 transition-all hover:scale-105"
            >
              Book Consultation <ArrowRight size={15} />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white border border-slate-300 hover:bg-slate-50 text-[#0E2F56] px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-2xs transition-all hover:scale-105"
            >
              <ArrowLeft size={15} /> Back to Home
            </Link>
          </div>
        </div>

        {/* ─── Profile Brief & Hero Card ──────────────────────────────────────── */}
        <div className={`rounded-3xl border p-6 sm:p-10 shadow-xl transition-all duration-300 ${
          isLight ? 'bg-white border-slate-200/90 shadow-slate-200/50' : 'bg-[#06192E] border-white/15'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] aspect-[4/4.2] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
                <img
                  src="/dr-sree-ranga-pc-about.jpg"
                  alt="Dr. Sree Ranga P.C."
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">
                    Lead Interventional Cardiologist
                  </span>
                  <h3 className="text-xl font-extrabold">Dr. Sree Ranga P.C.</h3>
                  <p className="text-xs text-slate-300">MBBS, MD (Gen Med), DM (Cardiology), FCSI</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0284C7] text-xs font-bold uppercase tracking-wider">
                <Stethoscope size={14} /> 18+ Years Dedicated Clinical Experience
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E2F56] leading-snug">
                Pioneering Evidence-Based Heart Care in Bengaluru
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                <strong className="text-slate-900 font-semibold">Shri Kanhaiya Chest Pain Clinic & Diagnostics</strong> stands as a premier center for adult cardiology, emergency chest pain triage, and preventative cardiovascular health in Bengaluru. Founded and directed by <strong className="text-slate-900 font-semibold">Dr. Sree Ranga P.C.</strong>, Professor of Cardiology at BMCRI, our practice combines academic rigor with empathetic patient care.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-red-50/80 border border-red-200/80 text-center">
                  <div className="text-2xl font-black text-[#E52323]">20,000+</div>
                  <div className="text-xs font-bold text-slate-700">Procedures Done</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/80 text-center">
                  <div className="text-2xl font-black text-[#0284C7]">5,000+</div>
                  <div className="text-xs font-bold text-slate-700">Angioplasties (PCI)</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-center">
                  <div className="text-2xl font-black text-[#16A34A]">BMCRI</div>
                  <div className="text-xs font-bold text-slate-700">Cardiology Professor</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── SECTION 1: KEY CLINICAL & PROCEDURAL EXPERTISE ───────────────── */}
        <section id="clinical-expertise" className="space-y-8">
          <div className="border-l-4 border-[#E52323] pl-4 sm:pl-6 space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E52323]">
              CLINICAL DOMAINS & PROCEDURES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0E2F56]">
              Key Clinical & Procedural Expertise
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Advanced Interventional Cardiology Domains
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-4xl">
            Over <strong className="text-slate-900 font-bold">20,000 diagnostic and interventional cardiac & vascular procedures</strong> performed across complex coronary, structural heart, and vascular conditions with exceptional clinical success.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Domain 1 */}
            <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-[#E52323] mb-4 font-bold text-lg">
                01
              </div>
              <h3 className="text-lg font-bold text-[#0E2F56] mb-1">
                Complex Coronary Interventions
              </h3>
              <div className="text-xs font-bold text-[#E52323] uppercase tracking-wider mb-2">
                High Complexity PCI
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Left main PCI, bifurcation stenting, chronic total occlusion (CTO) angioplasty and complex multivessel coronary interventions.
              </p>
            </div>

            {/* Domain 2 */}
            <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284C7] mb-4 font-bold text-lg">
                02
              </div>
              <h3 className="text-lg font-bold text-[#0E2F56] mb-1">
                Advanced Treatment of Calcified Coronary Arteries
              </h3>
              <div className="text-xs font-bold text-[#0284C7] uppercase tracking-wider mb-2">
                Rotablation & IVL
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Extensive experience with Rotational Atherectomy (Rotablation), Orbital Atherectomy, Laser Atherectomy and Intravascular Lithotripsy (IVL) for heavily calcified lesions.
              </p>
            </div>

            {/* Domain 3 */}
            <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#16A34A] mb-4 font-bold text-lg">
                03
              </div>
              <h3 className="text-lg font-bold text-[#0E2F56] mb-1">
                Structural & Valvular Heart Interventions
              </h3>
              <div className="text-xs font-bold text-[#16A34A] uppercase tracking-wider mb-2">
                TAVR / TAVI
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                TAVR/TAVI, balloon valvuloplasty and catheter-based interventions for structural heart defects and valvular heart disease.
              </p>
            </div>

            {/* Domain 4 */}
            <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4 font-bold text-lg">
                04
              </div>
              <h3 className="text-lg font-bold text-[#0E2F56] mb-1">
                Cardiac Rhythm Management
              </h3>
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">
                Pacemakers & CRT
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Implantation and management of permanent pacemakers, ICDs and CRT devices, including single- and dual-chamber systems.
              </p>
            </div>

            {/* Domain 5 */}
            <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 font-bold text-lg">
                05
              </div>
              <h3 className="text-lg font-bold text-[#0E2F56] mb-1">
                Peripheral Vascular Interventions
              </h3>
              <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">
                Vascular Stenting
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Angioplasty and stenting for peripheral arterial and vascular diseases, including complex peripheral vascular lesions.
              </p>
            </div>

            {/* Domain 6 */}
            <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${
              isLight ? 'bg-white border-slate-200/90 shadow-2xs' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4 font-bold text-lg">
                06
              </div>
              <h3 className="text-lg font-bold text-[#0E2F56] mb-1">
                Advanced Interventional Cardiology
              </h3>
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-2">
                Catheter-Based
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Comprehensive catheter-based management of patients with complex, high-risk and challenging cardiovascular disease.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: ACADEMIC & EDUCATIONAL LEADERSHIP ─────────────────── */}
        <section id="academic-leadership" className="space-y-8">
          <div className="border-l-4 border-[#0284C7] pl-4 sm:pl-6 space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0284C7]">
              TEACHING & MENTORSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0E2F56]">
              Academic & Educational Leadership
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Professor & Experienced Medical Educator — Training & Mentoring the Next Generation of Doctors
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Dr. Sree Ranga is an experienced and passionate medical educator with extensive experience in teaching and mentoring undergraduate and postgraduate medical students, cardiology trainees and young physicians. As a Professor of Cardiology, he has been actively involved in clinical teaching, bedside training, procedural education, academic discussions and postgraduate mentorship.
              </p>

              <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200 text-sky-950 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
                  <GraduationCap size={18} className="text-[#0284C7]" />
                  Educational Philosophy
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  His teaching philosophy emphasizes not only knowledge and technical skills, but also sound clinical judgment, ethical practice and compassionate patient care.
                </p>
              </div>

              {/* Institutional Appointments */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <Building2 size={16} className="text-[#E52323]" /> Institutional Appointments:
                </h3>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="font-bold text-[#E52323] text-sm sm:text-base">
                      Professor of Cardiology
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      Bangalore Medical College & Research Institute (BMCRI)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    Involvement in tertiary cardiovascular care, advanced interventions, postgraduate teaching and academic training.
                  </p>
                </div>

                <div className="p-4.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                    <span className="font-bold text-[#E52323] text-sm sm:text-base">
                      Formerly Associated
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm">
                      Sri Jayadeva Institute of Cardiovascular Sciences & Research
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    Previously associated with one of India's leading dedicated cardiovascular institutions, gaining extensive experience in complex cardiovascular disease.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Quote Callout */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0E2F56] to-[#06192E] text-white shadow-xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl" />
                
                <span className="text-4xl text-red-400 font-serif leading-none block">“</span>
                <p className="text-base sm:text-lg italic font-semibold leading-relaxed text-slate-100">
                  A clinician, interventionalist and educator, Dr. Sree Ranga combines extensive procedural experience with a passion for teaching, mentorship and the continuous advancement of cardiovascular care.
                </p>

                <div className="pt-4 border-t border-white/15">
                  <div className="font-bold text-white text-base">Dr. Sree Ranga P.C.</div>
                  <div className="text-xs text-red-400 font-medium">Senior Interventional Cardiologist & Professor of Cardiology</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: OUR FOUNDATION (Mission, Vision & Principles) ─────── */}
        <section id="our-foundation" className="space-y-10">
          <div className="border-l-4 border-emerald-600 pl-4 sm:pl-6 space-y-1">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              OUR FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0E2F56]">
              Mission, Vision & What We Stand For
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500">
              The foundational clinical principles and patient-first care goals that guide every consultation, diagnosis, and treatment plan.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Our Mission */}
            <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-sm space-y-5 ${
              isLight ? 'bg-white border-slate-200/90' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-50 border border-red-200 flex items-center justify-center text-[#E52323]">
                  <Target size={20} />
                </div>
                <h3 className="text-xl font-extrabold text-[#0E2F56]">Our Mission</h3>
              </div>

              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                Our mission is to provide accessible, evidence-based and patient-centered cardiac care while focusing on accurate diagnosis, appropriate treatment and prevention of cardiovascular disease.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Core Commitments:</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E52323] font-bold text-base leading-none">•</span>
                    <span>Understand each patient's individual cardiac concerns</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E52323] font-bold text-base leading-none">•</span>
                    <span>Provide thorough cardiovascular evaluation</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E52323] font-bold text-base leading-none">•</span>
                    <span>Promote early detection of heart disease</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E52323] font-bold text-base leading-none">•</span>
                    <span>Support patients in managing cardiovascular risk factors</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E52323] font-bold text-base leading-none">•</span>
                    <span>Explain diagnosis and treatment options clearly</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E52323] font-bold text-base leading-none">•</span>
                    <span>Encourage long-term heart-health awareness</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#E52323] font-bold text-base leading-none">•</span>
                    <span>Build lasting doctor-patient relationships</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Vision */}
            <div className={`lg:col-span-6 p-6 sm:p-8 rounded-3xl border shadow-sm space-y-5 ${
              isLight ? 'bg-white border-slate-200/90' : 'bg-[#06192E] border-white/15'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-[#0284C7]">
                  <Compass size={20} />
                </div>
                <h3 className="text-xl font-extrabold text-[#0E2F56]">Our Vision</h3>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80">
                <p className="text-base sm:text-lg italic font-bold text-[#0E2F56]">
                  "To be a trusted destination for comprehensive and compassionate cardiac care in Bengaluru."
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                Our vision is to contribute to a healthier community by combining medical expertise, clinical experience and patient education to help individuals make informed decisions about their cardiovascular health.
              </p>
            </div>
          </div>

          {/* What We Stand For (6 Principles) */}
          <div className="space-y-6 pt-4">
            <h3 className="text-xl font-extrabold text-[#0E2F56]">
              What We Stand For
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold -mt-4">
              Principles that guide every diagnosis, treatment, and patient interaction:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Principle 1 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#E52323] text-sm">
                  <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs font-black">1</span>
                  Patient First
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Every patient deserves time, attention and individualized care.
                </p>
              </div>

              {/* Principle 2 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#0284C7] text-sm">
                  <span className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center text-xs font-black">2</span>
                  Medical Excellence
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  We believe in applying current medical knowledge and evidence-based clinical practices.
                </p>
              </div>

              {/* Principle 3 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-600 text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-black">3</span>
                  Compassion
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Heart-related concerns can be stressful. We strive to provide care in a reassuring and respectful environment.
                </p>
              </div>

              {/* Principle 4 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-purple-600 text-sm">
                  <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-xs font-black">4</span>
                  Transparency
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Patients should understand their diagnosis, treatment options and next steps.
                </p>
              </div>

              {/* Principle 5 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-600 text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-xs font-black">5</span>
                  Prevention
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Early evaluation and management of cardiovascular risk factors can play an important role in protecting long-term heart health.
                </p>
              </div>

              {/* Principle 6 */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-rose-600 text-sm">
                  <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs font-black">6</span>
                  Continuous Learning
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Medical knowledge continues to evolve. Academic involvement and research help strengthen clinical understanding.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Bottom CTA Strip ───────────────────────────────────────────── */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0E2F56] via-[#1E3A8A] to-[#0E2F56] text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Schedule Your Heart Evaluation Today
            </h2>
            <p className="text-xs sm:text-base text-slate-200 font-medium">
              Consult with Professor Dr. Sree Ranga P.C. for expert, evidence-based cardiac diagnosis and personalized care.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Link
                to="/book-appointment"
                className="inline-flex items-center gap-2 bg-[#E52323] hover:bg-[#D01A1A] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
              >
                Book Appointment Now <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
