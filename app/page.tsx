'use client';

import { useState } from 'react';
import DonationForm from '@/components/DonationForm';
import AdminLink from '@/components/AdminLink';

export default function Home() {
  return (
    <main 
      className="min-h-screen bg-cream-light relative bg-pattern" 
      style={{
        backgroundImage: 'url(/pa.jpg), linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(245, 245, 220, 0.1) 100%)',
        backgroundSize: 'cover, auto',
        backgroundPosition: 'center, center',
        backgroundRepeat: 'no-repeat, repeat',
        backgroundAttachment: 'fixed, scroll'
      }}
    >
      {/* Overlay for better readability - darker */}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center py-4">
        <AdminLink />
        <DonationForm />
      </div>
    </main>
  );
}

