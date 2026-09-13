import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Stethoscope,
  Activity,
  Footprints,
  Radio,
  ClipboardCheck,
  ShieldPlus,
  Star,
  User,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  CircleCheck,
} from 'lucide-react';
import { CLINIC_INFO, SERVICES, TIME_SLOTS } from '../data/clinicData';
import { DatePickerCalendar } from '../components/DatePickerCalendar';
import { useAppState } from '../context/AppContext';

const stepsList = [
  'Choose Service',
  'Select Doctor',
  'Choose Date & Time',
  'Patient Information',
  'Confirmation',
];

const iconMap = {
  HeartPulse,
  Stethoscope,
  Activity,
  Footprints,
  Radio,
  ClipboardCheck,
  ShieldPlus,
};

function StepProgress({ step }) {
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <div>
      {/* Desktop Step Bar */}
      <div className="hidden md:flex items-center">
        {stepsList.map((label, idx) => {
          const num = idx + 1;
          const isDone = num < step;
          const isCurrent = num === step;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-2 w-fit">
                <div
                  className={`h-9 w-9 rounded-full grid place-items-center text-sm font-semibold shrink-0 transition-colors ${
                    isDone
                      ? 'bg-[#E92932] text-white shadow-sm'
                      : isCurrent
                      ? 'bg-[#E92932] text-white shadow-[0_0_15px_rgba(233,41,50,0.5)] ring-4 ring-[#E92932]/30'
                      : isLight
                      ? 'bg-slate-200 text-slate-600 border border-slate-300'
                      : 'bg-white/10 text-slate-400 border border-white/10'
                  }`}
                >
                  {isDone ? <Check className="h-4.5 w-4.5" /> : num}
                </div>
                <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                    isCurrent
                      ? isLight ? 'text-slate-900 font-bold' : 'text-white font-bold'
                      : isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {num < stepsList.length && (
                <div
                  className={`h-0.5 flex-1 mx-3 mb-5 transition-colors ${
                    isDone ? 'bg-[#E92932]' : isLight ? 'bg-slate-300' : 'bg-white/10'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Bar */}
      <div className="md:hidden">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Step {step} of {stepsList.length}
          </span>
          <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{stepsList[step - 1]}</span>
        </div>
        <div className={`h-1.5 w-full rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-white/10'}`}>
          <div
            className="h-full bg-[#E92932] rounded-full transition-all duration-300"
            style={{ width: `${(step / stepsList.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function FormInputGroup({ label, icon: IconComp, error, children }) {
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <div>
      <label className={`block text-sm font-semibold mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
        {label}
      </label>
      <div className="relative">
        {IconComp && (
          <IconComp className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`} />
        )}
        {children}
      </div>
      {error && <p className="mt-1 text-xs text-[#FF4148] font-semibold">{error}</p>}
    </div>
  );
}

const getInputClass = (isLight) =>
  `w-full rounded-xl border py-2.5 text-base sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#E92932]/40 focus:border-[#E92932] ${
    isLight
      ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 shadow-sm'
      : 'border-white/15 bg-white/5 text-white placeholder:text-slate-400'
  }`;

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  dob: '',
  gender: 'Male',
  address: '',
  reason: '',
  notes: '',
  agree: false,
};

export function BookAppointment() {
  const { addAppointment, bookedSlots, theme } = useAppState();
  const isLight = theme === 'light';

  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState('');
  const [doctorSelected, setDoctorSelected] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [form, setForm] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const selectedService = useMemo(
    () => SERVICES.find((s) => s.id === serviceId),
    [serviceId]
  );

  const unavailableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return bookedSlots(selectedDate);
  }, [selectedDate, bookedSlots]);

  const handleNext = () => {
    if (step === 4) {
      const errs = {};
      if (!form.fullName.trim()) errs.fullName = 'Full name is required.';
      if (!form.email.trim()) {
        errs.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
      if (!form.phone.trim()) {
        errs.phone = 'Phone number is required.';
      } else if (!/^[+\d][\d\s-]{7,14}$/.test(form.phone.trim())) {
        errs.phone = 'Please enter a valid phone number.';
      }
      if (!form.dob) errs.dob = 'Date of birth is required.';
      if (!form.address.trim()) errs.address = 'Address is required.';
      if (!form.reason.trim()) errs.reason = 'Please tell us the reason for your visit.';
      if (!form.agree) errs.agree = 'Please accept the appointment policy.';

      setErrors(errs);
      if (Object.keys(errs).length > 0) return;

      const created = addAppointment({
        patientName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        dateOfBirth: form.dob,
        gender: form.gender,
        address: form.address.trim(),
        reason: form.reason.trim(),
        notes: form.notes.trim(),
        service: selectedService?.name || '',
        date: selectedDate,
        time: selectedTime,
      });

      setConfirmedBooking(created);
      setStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setStep((s) => Math.min(5, s + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetAll = () => {
    setStep(1);
    setServiceId('');
    setDoctorSelected(true);
    setSelectedDate('');
    setSelectedTime('');
    setForm(initialFormData);
    setErrors({});
    setConfirmedBooking(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputClass = getInputClass(isLight);

  return (
    <section className={`min-h-[calc(100vh-72px)] pt-24 sm:pt-28 pb-12 sm:pb-16 relative z-10 transition-colors ${
      isLight ? 'bg-[#F8FAFC]' : 'bg-[#030C16]'
    }`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {step < 5 && (
          <div className="mb-8 sm:mb-10">
            <StepProgress step={step} />
          </div>
        )}

        <div className="rounded-3xl glass-medical-card p-4.5 sm:p-8 lg:p-10 shadow-2xl">
          {/* STEP 1: CHOOSE SERVICE */}
          {step === 1 && (
            <div>
              <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Choose a Service
              </h2>
              <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Select the type of cardiology service you require
              </p>

              <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {SERVICES.map((s) => {
                  const IconComp = iconMap[s.icon] || HeartPulse;
                  const isSelected = serviceId === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServiceId(s.id)}
                      className={`relative flex items-start gap-3.5 rounded-2xl border p-4.5 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#E92932] bg-[#E92932]/15 ring-2 ring-[#E92932]/40 shadow-lg'
                          : isLight
                          ? 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                          : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-[#E92932] text-white shadow-sm'
                            : isLight
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-white/10 text-slate-300'
                        }`}
                      >
                        <IconComp className="h-5 w-5" />
                      </span>
                      <div>
                        <span className={`block font-bold text-[15px] ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {s.name}
                        </span>
                        <span className={`block text-xs mt-0.5 leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                          {s.description}
                        </span>
                        <span className="block text-[11px] text-[#FF4148] mt-1.5 font-semibold">
                          Duration: {s.duration}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="absolute top-3.5 right-3.5 grid h-5 w-5 place-items-center rounded-full bg-[#E92932] text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: SELECT DOCTOR */}
          {step === 2 && (
            <div>
              <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Select Doctor
              </h2>
              <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Choose a doctor for your appointment
              </p>

              <button
                type="button"
                onClick={() => setDoctorSelected(true)}
                className={`relative mt-6 w-full sm:w-auto sm:min-w-[420px] flex items-center gap-4 rounded-2xl border p-5 text-left transition-all cursor-pointer ${
                  doctorSelected
                    ? 'border-[#E92932] bg-[#E92932]/15 ring-2 ring-[#E92932]/40 shadow-lg'
                    : isLight
                    ? 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                    : 'border-white/15 bg-white/5 hover:border-white/30'
                }`}
              >
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#E92932] text-white shrink-0 font-bold text-lg shadow-md">
                  SR
                </div>
                <div>
                  <div className={`font-bold text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {CLINIC_INFO.doctorName}
                  </div>
                  <div className="text-xs font-semibold text-[#FF4148] mt-0.5">{CLINIC_INFO.doctorDegrees}</div>
                  <div className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>{CLINIC_INFO.doctorTitle}</div>
                  <div className="flex items-center gap-1.5 mt-2 text-xs">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {CLINIC_INFO.rating}
                    </span>
                    <span className={`font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      ({CLINIC_INFO.reviewsCount} Google Reviews)
                    </span>
                  </div>
                </div>
                {doctorSelected && (
                  <span className="absolute top-4 right-4 grid h-6 w-6 place-items-center rounded-full bg-[#E92932] text-white">
                    <Check className="h-4 w-4" strokeWidth={3} />
                  </span>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: CHOOSE DATE & TIME */}
          {step === 3 && (
            <div>
              <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Choose Date & Time
              </h2>
              <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Select a convenient date and time slot
              </p>

              <div className="mt-6 grid gap-6 lg:grid-cols-[340px_1fr]">
                <DatePickerCalendar
                  value={selectedDate}
                  onChange={(d) => {
                    setSelectedDate(d);
                    setSelectedTime('');
                  }}
                />

                <div>
                  {selectedDate ? (
                    <>
                      <div className={`mb-4 p-3.5 rounded-xl border ${
                        isLight ? 'bg-slate-100 border-slate-200/80 text-slate-900' : 'bg-white/10 border-white/15 text-white'
                      }`}>
                        <span className={`text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-300'}`}>Selected date:</span>
                        <div className={`font-bold text-sm mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </div>
                      </div>

                      <h3 className={`text-sm font-bold mb-3 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Available Time Slots
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {TIME_SLOTS.map((slot) => {
                          const isTaken = unavailableSlots.includes(slot);
                          const isSelected = selectedTime === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={isTaken}
                              onClick={() => setSelectedTime(slot)}
                              className={`rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#E92932] bg-[#E92932] text-white shadow-lg'
                                  : isTaken
                                  ? isLight
                                    ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                                    : 'border-white/10 bg-white/5 text-slate-500 cursor-not-allowed line-through'
                                  : isLight
                                  ? 'border-slate-300 bg-white text-slate-800 hover:border-[#E92932] hover:bg-red-50 shadow-sm'
                                  : 'border-white/20 bg-white/5 text-white hover:border-[#E92932] hover:bg-[#E92932]/20'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className={`h-full min-h-[220px] rounded-2xl border border-dashed grid place-items-center text-sm text-center px-6 ${
                      isLight ? 'border-slate-300 bg-slate-50 text-slate-600' : 'border-white/20 bg-white/5 text-slate-300'
                    }`}>
                      Select a date on the calendar to see available time slots.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PATIENT INFORMATION */}
          {step === 4 && (
            <div>
              <h2 className={`text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Patient Information
              </h2>
              <p className={`text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Please provide your details for clinic registration
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <FormInputGroup label="Full Name" icon={User} error={errors.fullName}>
                  <input
                    className={`${inputClass} pl-10 pr-3.5 ${
                      errors.fullName ? 'border-[#E92932]' : isLight ? 'border-slate-300' : 'border-white/20'
                    }`}
                    placeholder="Ramesh Kumar"
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  />
                </FormInputGroup>

                <FormInputGroup label="Email Address" icon={Mail} error={errors.email}>
                  <input
                    type="email"
                    className={`${inputClass} pl-10 pr-3.5 ${
                      errors.email ? 'border-[#E92932]' : isLight ? 'border-slate-300' : 'border-white/20'
                    }`}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </FormInputGroup>

                <FormInputGroup label="Phone Number" icon={Phone} error={errors.phone}>
                  <input
                    className={`${inputClass} pl-10 pr-3.5 ${
                      errors.phone ? 'border-[#E92932]' : isLight ? 'border-slate-300' : 'border-white/20'
                    }`}
                    placeholder="+91 98868 34269"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </FormInputGroup>

                <FormInputGroup label="Date of Birth" icon={CalendarIcon} error={errors.dob}>
                  <input
                    type="date"
                    className={`${inputClass} pl-10 pr-3.5 ${
                      errors.dob ? 'border-[#E92932]' : isLight ? 'border-slate-300' : 'border-white/20'
                    }`}
                    value={form.dob}
                    max={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  />
                </FormInputGroup>

                <div>
                  <label className={`block text-sm font-semibold mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Gender
                  </label>
                  <div className="flex items-center gap-6 h-[42px]">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <label key={g} className={`inline-flex items-center gap-2 text-sm font-medium cursor-pointer ${
                        isLight ? 'text-slate-700' : 'text-slate-200'
                      }`}>
                        <input
                          type="radio"
                          name="gender"
                          checked={form.gender === g}
                          onChange={() => setForm({ ...form, gender: g })}
                          className="h-4 w-4 accent-[#E92932]"
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                <FormInputGroup label="Reason for Visit" error={errors.reason}>
                  <input
                    className={`${inputClass} px-3.5 ${
                      errors.reason ? 'border-[#E92932]' : isLight ? 'border-slate-300' : 'border-white/20'
                    }`}
                    placeholder="e.g. Chest discomfort, routine checkup"
                    value={form.reason}
                    onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  />
                </FormInputGroup>

                <div className="sm:col-span-2">
                  <FormInputGroup label="Address" icon={MapPin} error={errors.address}>
                    <input
                      className={`${inputClass} pl-10 pr-3.5 ${
                        errors.address ? 'border-[#E92932]' : isLight ? 'border-slate-300' : 'border-white/20'
                      }`}
                      placeholder="House / Street, Area, City, PIN"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                  </FormInputGroup>
                </div>

                <div className="sm:col-span-2">
                  <label className={`block text-sm font-semibold mb-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    className={`${inputClass} px-3.5 min-h-[90px] resize-none ${isLight ? 'border-slate-300' : 'border-white/20'}`}
                    placeholder="Any prior medical history or symptoms to share with the doctor"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
              </div>

              <label className={`mt-6 flex items-start gap-2.5 text-sm cursor-pointer ${isLight ? 'text-slate-700' : 'text-slate-200'}`}>
                <input
                  type="checkbox"
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded accent-[#E92932]"
                />
                <span>I agree to the clinic appointment policy and consent to treatment.</span>
              </label>
              {errors.agree && (
                <p className="mt-1 text-xs text-[#FF4148] font-semibold">{errors.agree}</p>
              )}
            </div>
          )}

          {/* STEP 5: CONFIRMATION SCREEN */}
          {step === 5 && confirmedBooking && (
            <div className="text-center max-w-xl mx-auto py-2">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500">
                <CircleCheck className="h-9 w-9 text-emerald-500" />
              </div>

              <h2 className={`mt-5 text-2xl sm:text-3xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Appointment Confirmed!
              </h2>
              <p className={`mt-1.5 text-sm ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                Your cardiology appointment has been successfully scheduled.
              </p>

              <div className={`mt-7 rounded-2xl border p-6 text-left shadow-xl backdrop-blur-md ${
                isLight ? 'border-slate-200/90 bg-slate-50/90 text-slate-900' : 'border-white/15 bg-white/5 text-white'
              }`}>
                <div className={`flex items-center gap-3.5 pb-4 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                  <div className="h-12 w-12 rounded-2xl bg-[#E92932] text-white grid place-items-center font-bold text-base shadow-md">
                    SR
                  </div>
                  <div>
                    <div className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {CLINIC_INFO.doctorName}
                    </div>
                    <div className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {CLINIC_INFO.doctorDegrees} — {CLINIC_INFO.doctorTitle}
                    </div>
                  </div>
                </div>

                <dl className="mt-4 space-y-3.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className={isLight ? 'text-slate-500' : 'text-slate-400'}>Service</dt>
                    <dd className={`font-semibold text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {confirmedBooking.service}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={`flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      <CalendarIcon className="h-3.5 w-3.5 text-[#FF4148]" /> Date
                    </dt>
                    <dd className={`font-semibold text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {new Date(confirmedBooking.date + 'T00:00:00').toLocaleDateString(
                        'en-IN',
                        { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
                      )}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={`flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      <Clock className="h-3.5 w-3.5 text-[#FF4148]" /> Time
                    </dt>
                    <dd className={`font-semibold text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {confirmedBooking.time}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={`flex items-center gap-1.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      <MapPin className="h-3.5 w-3.5 text-[#FF4148]" /> Location
                    </dt>
                    <dd className={`font-semibold text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {CLINIC_INFO.name}
                      <br />
                      <span className={`text-xs font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                        {CLINIC_INFO.address}
                      </span>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className={isLight ? 'text-slate-500' : 'text-slate-400'}>Patient</dt>
                    <dd className={`font-semibold text-right ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {confirmedBooking.patientName}
                    </dd>
                  </div>
                  <div className={`flex justify-between gap-4 pt-3 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                    <dt className={isLight ? 'text-slate-500' : 'text-slate-400'}>Booking ID</dt>
                    <dd className="font-mono font-bold text-[#FF4148] text-right">
                      {confirmedBooking.bookingId}
                    </dd>
                  </div>
                </dl>
              </div>

              <p className={`mt-4 flex items-center justify-center gap-1.5 text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                <Mail className="h-3.5 w-3.5 text-[#FF4148]" />
                A confirmation has been sent to {confirmedBooking.email}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E92932] px-6 py-3 text-sm font-bold text-white hover:bg-[#FF4148] transition-all cursor-pointer shadow-lg"
                >
                  Return to Home Page
                </Link>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                      : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          {step < 5 && (
            <div className={`mt-8 flex ${step === 1 ? 'justify-end' : 'justify-between'}`}>
              {step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors cursor-pointer ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-sm'
                      : 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !serviceId) ||
                  (step === 2 && !doctorSelected) ||
                  (step === 3 && (!selectedDate || !selectedTime))
                }
                className="inline-flex items-center gap-2 rounded-full bg-[#E92932] px-7 py-3 text-sm font-bold text-white hover:bg-[#FF4148] transition-all disabled:opacity-40 disabled:pointer-events-none shadow-[0_4px_15px_rgba(233,41,50,0.35)] cursor-pointer"
              >
                <span>{step === 4 ? 'Confirm Appointment' : 'Continue'}</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

