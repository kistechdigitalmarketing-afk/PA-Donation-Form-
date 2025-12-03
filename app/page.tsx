'use client';

import Header from '@/components/Header';
import DonationForm from '@/components/DonationForm';
import SupportPoints from '@/components/SupportPoints';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Support Points */}
        <div className="bg-amber-900 p-8 lg:p-12 flex items-center">
          <div className="w-full">
            <SupportPoints />
          </div>
        </div>
        
        {/* Right Side - White Panel with Form */}
        <div className="bg-white p-4 lg:p-6 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <DonationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
