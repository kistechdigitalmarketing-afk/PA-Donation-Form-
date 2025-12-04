'use client';

import Header from '@/components/Header';
import DonationForm from '@/components/DonationForm';
import SupportPoints from '@/components/SupportPoints';

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <div className="flex flex-col">
        {/* Form Section */}
        <div className="bg-white p-3 sm:p-4 md:p-6 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <DonationForm />
          </div>
        </div>
        
        {/* Support Points Section - Below Form */}
        <div className="bg-amber-900 p-4 sm:p-6 md:p-8 lg:p-12 flex items-center">
          <div className="w-full">
            <SupportPoints />
          </div>
        </div>
      </div>
    </main>
  );
}
