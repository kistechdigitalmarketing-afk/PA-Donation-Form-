'use client';

import Header from '@/components/Header';
import DonationForm from '@/components/DonationForm';
import SupportPoints from '@/components/SupportPoints';

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col overflow-hidden">
      {/* Fixed header inside iframe */}
      <Header />

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Form Section */}
        <div className="bg-white p-3 sm:p-4 md:p-6 flex justify-center">
          <div className="w-full max-w-4xl">
            <DonationForm />
          </div>
        </div>

        {/* Support Points Section */}
        <div className="bg-amber-900 p-4 sm:p-6 md:p-8 lg:p-12">
          <SupportPoints />
        </div>
      </div>
    </main>
  );
}
