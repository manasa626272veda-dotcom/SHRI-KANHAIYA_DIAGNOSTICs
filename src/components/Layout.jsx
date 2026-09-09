import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MobileStickyCTA } from './MobileStickyCTA';
import { WhatsAppButton } from './WhatsAppButton';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isBookingPage = location.pathname === '/book-appointment';

  return (
    <div className="min-h-screen flex flex-col bg-[#030C16] text-[#F8FAFC] relative selection:bg-[#E92932] selection:text-white overflow-x-hidden">
      {/* ── Fixed Master Ambient Medical Canvas Background ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top Heartbeat Crimson Radial Aura */}
        <div className="animate-hero-glow absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-[#E92932]/12 blur-[160px]" />
        
        {/* Mid Diagnostic Aqua Aura */}
        <div className="animate-hero-glow absolute top-[35%] -right-40 w-[700px] h-[700px] rounded-full bg-[#0284C7]/09 blur-[180px]" style={{ animationDelay: '3s' }} />

        {/* Lower Crimson Rhythm Aura */}
        <div className="animate-hero-glow absolute bottom-20 -left-40 w-[750px] h-[750px] rounded-full bg-[#E92932]/10 blur-[170px]" style={{ animationDelay: '6s' }} />

        {/* Global Clinical Precision Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.035] bg-medical-grid" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        {!isBookingPage && <div className="h-16 md:hidden" />}
        {!isBookingPage && <MobileStickyCTA />}
        <WhatsAppButton />
      </div>
    </div>
  );
}
