import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import {
  User,
  Phone,
  Calendar as CalendarIcon,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  Send,
  Building2,
  Stethoscope,
} from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { useAppState } from '../context/AppContext';

export function BookAppointment() {
  const { addAppointment, theme } = useAppState();
  const isLight = theme === 'light';
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    age: '',
    gender: 'Male',
    service: 'Cardiology Consultation',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState(null);

  // Pre-fill selected service if passed via URL or navigation state
  useEffect(() => {
    const param = searchParams.get('service') || searchParams.get('test') || location.state?.serviceId;
    if (param) {
      const match = SERVICES.find(
        (s) => s.id === param || s.id.toLowerCase().includes(param.toLowerCase())
      );
      if (match) {
        setForm((prev) => ({ ...prev, service: match.name }));
      }
    }
  }, [searchParams, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = {};
    if (!form.fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!form.phone.trim()) {
      errs.phone = 'Please enter your mobile number.';
    } else if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) {
      errs.phone = 'Please enter a valid mobile number (e.g. 9876543210).';
    }
    if (!form.age.trim()) {
      errs.age = 'Please enter your age.';
    } else if (isNaN(form.age) || Number(form.age) <= 0 || Number(form.age) > 120) {
      errs.age = 'Please enter a valid age between 1 and 120.';
    }
    if (!form.service) {
      errs.service = 'Please select a service.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);

    try {
      const created = addAppointment({
        patientName: form.fullName.trim(),
        phone: form.phone.trim(),
        age: form.age.trim(),
        gender: form.gender,
        service: form.service,
        date: new Date().toISOString().split('T')[0],
        time: 'Immediate / Callback Requested',
        reason: `Contact request for ${form.service}`,
      });

      setSubmittedBooking(created);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({
      fullName: '',
      phone: '',
      age: '',
      gender: 'Male',
      service: 'Cardiology Consultation',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedBooking(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputClass = `w-full rounded-xl border py-3 px-4 text-sm sm:text-base transition-all focus:outline-none focus:ring-2 focus:ring-[#E92932]/40 focus:border-[#E92932] ${
    isLight
      ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 shadow-xs'
      : 'border-white/15 bg-white/5 text-white placeholder:text-slate-400'
  }`;

  return (
    <div className={`min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isLight ? 'bg-gradient-to-b from-slate-50 via-white to-slate-50' : 'bg-[#030C16]'
    }`}>
      <div className="mx-auto max-w-4xl">

        {/* ─── Confirmation Screen ────────────────────────────────────────── */}
        {isSubmitted ? (
          <div className={`rounded-3xl border p-6 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300 ${
            isLight ? 'bg-white border-slate-200/90 text-slate-900' : 'dark-glass-card border-white/15 text-white'
          }`}>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 size={36} className="text-emerald-600 animate-bounce" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                Submission Successful
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Thank You, <span className="text-[#E92932]">{form.fullName}</span>!
              </h2>
              <p className={`text-sm sm:text-base max-w-lg mx-auto ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Your details have been received by our clinic team. We will call you on <strong className="text-slate-900 font-bold">{form.phone}</strong> shortly to assist you.
              </p>
            </div>

            {/* Summary Details Box */}
            <div className={`max-w-md mx-auto p-4 sm:p-5 rounded-2xl border text-left space-y-2.5 text-xs sm:text-sm ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
            }`}>
              {submittedBooking?.bookingId && (
                <div className="flex justify-between border-b border-slate-200/70 pb-2">
                  <span className="text-slate-500 font-medium">Reference ID:</span>
                  <span className="font-mono font-bold text-[#E92932]">{submittedBooking.bookingId}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Patient Name:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{form.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Mobile Number:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{form.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Age & Gender:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{form.age} Yrs, {form.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Requested Service:</span>
                <span className="font-semibold text-[#0284C7]">{form.service}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-all cursor-pointer hover:scale-105"
              >
                Submit Another Request
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#E92932] hover:bg-[#D01A1A] text-white px-7 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-red-500/25 transition-all hover:scale-105 cursor-pointer"
              >
                Return to Home <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        ) : (
          /* ─── Simple Contact Form Screen ─────────────────────────────────── */
          <div className="space-y-6">
            
            {/* Header / Intro */}
            <div className="text-center max-w-2xl mx-auto space-y-2.5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/90 text-[#E52323] text-xs font-bold tracking-widest uppercase shadow-2xs">
                <Sparkles size={13} className="animate-pulse" />
                Get in Touch
              </div>
              <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
                isLight ? 'text-[#0E2F56]' : 'text-white'
              }`}>
                Contact Us
              </h1>
              <p className={`text-xs sm:text-sm md:text-base font-medium leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-slate-300'
              }`}>
                Fill out the quick form below. Our clinical care team and Dr. Sree Ranga P.C. will connect with you promptly.
              </p>
            </div>

            {/* Main Form Container */}
            <div className={`rounded-3xl border p-5 sm:p-8 lg:p-10 shadow-xl transition-all duration-300 ${
              isLight ? 'bg-white border-slate-200/90 shadow-slate-200/60' : 'dark-glass-card border-white/15 text-white'
            }`}>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                
                {/* Field 1: Full Name */}
                <div>
                  <label className={`block text-xs sm:text-sm font-bold mb-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                    Full Name <span className="text-[#E92932]">*</span>
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Enter patient's full name"
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                  {errors.fullName && <p className="mt-1.5 text-xs text-[#E92932] font-semibold">{errors.fullName}</p>}
                </div>

                {/* 2-Column Grid: Mobile Number & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  
                  {/* Field 2: Mobile Number */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-bold mb-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      Mobile Number <span className="text-[#E92932]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="e.g. 9876543210"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                    {errors.phone && <p className="mt-1.5 text-xs text-[#E92932] font-semibold">{errors.phone}</p>}
                  </div>

                  {/* Field 3: Age */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-bold mb-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      Age <span className="text-[#E92932]">*</span>
                    </label>
                    <div className="relative">
                      <CalendarIcon className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                      <input
                        type="number"
                        name="age"
                        min="1"
                        max="120"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="e.g. 45"
                        className={`${inputClass} pl-10`}
                      />
                    </div>
                    {errors.age && <p className="mt-1.5 text-xs text-[#E92932] font-semibold">{errors.age}</p>}
                  </div>

                </div>

                {/* 2-Column Grid: Gender & Service Choose */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  
                  {/* Field 4: Gender */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-bold mb-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      Gender <span className="text-[#E92932]">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, gender: g }))}
                          className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                            form.gender === g
                              ? 'bg-[#E92932] text-white border-[#E92932] shadow-sm ring-2 ring-red-300'
                              : isLight
                              ? 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                              : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field 5: Service Choose */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-bold mb-1.5 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      Service Choose <span className="text-[#E92932]">*</span>
                    </label>
                    <div className="relative">
                      <Stethoscope className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClass} pl-10 cursor-pointer appearance-none`}
                      >
                        <optgroup label="Consultations & Clinical Services">
                          <option value="Cardiology Consultation">Cardiology Consultation</option>
                          <option value="Heart Health Assessment">Heart Health Assessment</option>
                          <option value="Chest Pain Evaluation">Chest Pain Evaluation</option>
                          <option value="Hypertension Management">Hypertension Management</option>
                          <option value="Diabetes & Heart Risk Assessment">Diabetes & Heart Risk Assessment</option>
                          <option value="Cholesterol Management">Cholesterol Management</option>
                          <option value="Preventive Cardiology">Preventive Cardiology</option>
                        </optgroup>
                        <optgroup label="Diagnostic Tests & Investigations">
                          <option value="ECG (Electrocardiogram)">ECG (Electrocardiogram)</option>
                          <option value="ECHO (Echocardiography)">ECHO (Echocardiography)</option>
                          <option value="TMT (Treadmill Test)">TMT (Treadmill Test)</option>
                          <option value="Chest X-Ray">Chest X-Ray</option>
                          <option value="Blood Tests & Laboratory Investigations">Blood Tests & Laboratory Investigations</option>
                        </optgroup>
                      </select>
                    </div>
                    {errors.service && <p className="mt-1.5 text-xs text-[#E92932] font-semibold">{errors.service}</p>}
                  </div>

                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#E92932] hover:bg-[#D01A1A] text-white py-3.5 sm:py-4 px-8 rounded-2xl text-sm sm:text-base font-bold shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Submit
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* Quick Clinic Info Strip */}
            <div className={`rounded-2xl border p-4 sm:p-5 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left ${
              isLight ? 'bg-sky-50/90 border-sky-200/90 text-slate-800' : 'bg-white/5 border-white/10 text-slate-200'
            }`}>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#E92932] shrink-0" />
                <span className={isLight ? 'text-slate-800 font-semibold' : 'text-slate-200 font-medium'}>
                  Nandini Layout, Bengaluru, Karnataka 560096
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#E92932] shrink-0" />
                <a
                  href={`tel:${CLINIC_INFO.phone.replace(/\s+/g, '')}`}
                  className={`font-black text-sm sm:text-base tracking-wide transition-colors ${
                    isLight ? 'text-[#0E2F56] hover:text-[#E92932]' : 'text-white hover:text-red-400'
                  }`}
                >
                  {CLINIC_INFO.phone}
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
