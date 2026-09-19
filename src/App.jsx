import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Code-split non-critical booking page for faster initial load
const BookAppointment = lazy(() =>
  import('./pages/BookAppointment').then((module) => ({ default: module.BookAppointment }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);

// Smooth Fallback Component
function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030C16] text-white">
      <div className="w-10 h-10 border-3 border-[#E92932] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppProvider>
  );
}
