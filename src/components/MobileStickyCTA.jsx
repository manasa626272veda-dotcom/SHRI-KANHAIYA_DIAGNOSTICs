import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck } from 'lucide-react';
import { useAppState } from '../context/AppContext';

export function MobileStickyCTA() {
  const { theme } = useAppState();
  const isLight = theme === 'light';

  return (
    <div className={`md:hidden fixed bottom-0 inset-x-0 z-40 p-3 backdrop-blur-xl transition-colors duration-300 ${
      isLight
        ? 'bg-white/95 border-t border-slate-200 shadow-[0_-5px_20px_rgba(0,0,0,0.08)]'
        : 'bg-[#061A2B]/95 border-t border-white/10 shadow-[0_-5px_20px_rgba(0,0,0,0.5)]'
    }`}>
      <Link
        to="/book-appointment"
        className="flex items-center justify-center gap-2 rounded-full bg-[#E92932] text-white font-semibold py-3 shadow-lg shadow-[#E92932]/40 hover:bg-[#FF4148] transition-colors"
      >
        <CalendarCheck className="h-4.5 w-4.5" />
        Book Appointment
      </Link>
    </div>
  );
}
