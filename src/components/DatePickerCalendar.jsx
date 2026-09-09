import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_NAMES = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

export function DatePickerCalendar({ value, onChange }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = value ? new Date(value + 'T00:00:00') : today;

  const [year, setYear] = useState(selected.getFullYear());
  const [month, setMonth] = useState(selected.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 60);

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      day: prevMonthDays - i,
      iso: '',
      inMonth: false,
      disabled: true,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    d.setHours(0, 0, 0, 0);
    const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const isSunday = d.getDay() === 0;
    const disabled = d < today || d > maxDate || isSunday;

    cells.push({
      day: i,
      iso,
      inMonth: true,
      disabled,
      isToday: d.getTime() === today.getTime(),
    });
  }

  while (cells.length % 7 !== 0) {
    cells.push({
      day: cells.length,
      iso: '',
      inMonth: false,
      disabled: true,
    });
  }

  const canPrev = new Date(year, month + 1, 0) >= today;

  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <div className="rounded-2xl border border-white/15 bg-[#06192E]/90 backdrop-blur-xl p-4 sm:p-5 shadow-xl text-white">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canPrev}
          className="grid h-8 w-8 place-items-center rounded-full text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </button>
        <span className="font-display font-bold text-white text-base">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="grid h-8 w-8 place-items-center rounded-full text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <ChevronRight className="h-4.5 w-4.5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-[#FF4148] tracking-wider mb-2">
        {DAY_NAMES.map((name) => (
          <div key={name}>{name}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, idx) => {
          if (!cell.inMonth) return <div key={idx} />;
          const isSelected = cell.iso === value;
          return (
            <button
              key={idx}
              type="button"
              disabled={cell.disabled}
              onClick={() => onChange(cell.iso)}
              className={`aspect-square rounded-full text-sm font-semibold grid place-items-center transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#E92932] text-white shadow-[0_0_15px_rgba(233,41,50,0.6)] font-bold scale-105'
                  : cell.disabled
                  ? 'text-slate-500 cursor-not-allowed opacity-35'
                  : cell.isToday
                  ? 'ring-2 ring-[#E92932] text-white hover:bg-white/15'
                  : 'text-slate-200 hover:bg-white/15 hover:text-white'
              }`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-300 text-center sm:text-left font-medium border-t border-white/10 pt-3">
        Closed on Sundays • Bookable up to 60 days ahead
      </p>
    </div>
  );
}
