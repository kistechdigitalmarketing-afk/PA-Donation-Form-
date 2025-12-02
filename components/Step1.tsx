'use client';

import { DonationFormData } from '@/types';

interface Step1Props {
  formData: Partial<DonationFormData>;
  updateFormData: (data: Partial<DonationFormData>) => void;
}

export default function Step1({ formData, updateFormData }: Step1Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">1. Event Information</h2>
      
      <div className="mb-6">
        <div className="text-2xl font-bold mb-2">#Hike4UshagoTransformation</div>
        <div className="space-y-1 text-gray-700">
          <p><strong>Date:</strong> November 29th, 2025</p>
          <p><strong>Location:</strong> Ngong Road Forest Sanctuary</p>
        </div>
      </div>

      <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-4">
        <p className="text-gray-800">
          Welcome to our donation form! This event supports our mission to transform lives and advance our cause. 
          Your contribution makes a real difference.
        </p>
      </div>
    </div>
  );
}

