import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { INITIAL_APPOINTMENTS, CLINIC_INFO } from '../data/clinicData';
import { sendAppointmentToGoogleSheet } from '../services/googleSheetService';

const AppContext = createContext(null);

const generateBookingId = () => {
  const d = new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `SKD-${day}${month}${year}-${rand}`;
};


const parseDateTime = (dateStr, timeStr) => {
  if (!dateStr) return 0;
  if (!timeStr) return new Date(dateStr + 'T00:00:00').getTime();
  const parts = timeStr.trim().split(' ');
  if (parts.length < 2) return new Date(dateStr + 'T00:00:00').getTime();
  let [hours, minutes] = parts[0].split(':').map(Number);
  const period = parts[1].toUpperCase();
  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  const d = new Date(dateStr + 'T00:00:00');
  d.setHours(hours || 0, minutes || 0, 0, 0);
  return d.getTime();
};

export function AppProvider({ children }) {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('skd_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse appointments", e);
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [session, setSession] = useState(() => {
    const saved = localStorage.getItem('skd_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse session", e);
      }
    }
    return { patientName: null, doctorLoggedIn: false };
  });

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    localStorage.setItem('skd_theme', 'light');
    const root = document.documentElement;
    root.classList.add('light');
    root.classList.remove('dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme('light');
  }, []);

  useEffect(() => {
    localStorage.setItem('skd_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('skd_session', JSON.stringify(session));
  }, [session]);

  const addAppointment = useCallback((data) => {
    const newBooking = {
      id: `appt-${Date.now()}`,
      bookingId: generateBookingId(),
      patientName: data.patientName,
      email: data.email,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      address: data.address,
      service: data.service,
      doctor: CLINIC_INFO.doctorName,
      date: data.date,
      time: data.time,
      reason: data.reason,
      notes: data.notes || "",
      status: "Confirmed",
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [newBooking, ...prev]);
    setSession((prev) => ({ ...prev, patientName: data.patientName }));

    // Send to Google Sheet & trigger Gmail notification asynchronously
    sendAppointmentToGoogleSheet(newBooking).catch((err) => {
      console.error('Failed to trigger Google Sheet webhook:', err);
    });

    return newBooking;
  }, []);

  const updateStatus = useCallback((id, status) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  }, []);

  const reschedule = useCallback((id, date, time) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, date, time } : item))
    );
  }, []);

  const bookedSlots = useCallback(
    (date) => {
      return appointments
        .filter((item) => item.date === date && item.status !== "Cancelled")
        .map((item) => item.time);
    },
    [appointments]
  );

  const loginPatient = useCallback((name) => {
    setSession((prev) => ({ ...prev, patientName: name }));
  }, []);

  const loginDoctor = useCallback(() => {
    setSession((prev) => ({ ...prev, doctorLoggedIn: true }));
  }, []);

  const logoutPatient = useCallback(() => {
    setSession((prev) => ({ ...prev, patientName: null }));
  }, []);

  const logoutDoctor = useCallback(() => {
    setSession((prev) => ({ ...prev, doctorLoggedIn: false }));
  }, []);

  const activePatientAppointment = useMemo(() => {
    if (!session.patientName) return null;
    const list = appointments.filter(
      (a) =>
        a.patientName === session.patientName &&
        a.status !== "Cancelled" &&
        a.status !== "Completed"
    );
    if (list.length === 0) return null;
    return [...list].sort((a, b) => parseDateTime(a.date, a.time) - parseDateTime(b.date, b.time))[0];
  }, [appointments, session.patientName]);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        appointments,
        addAppointment,
        updateStatus,
        reschedule,
        bookedSlots,
        session,
        loginPatient,
        loginDoctor,
        logoutPatient,
        logoutDoctor,
        activePatientAppointment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return ctx;
}
