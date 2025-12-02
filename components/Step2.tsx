'use client';

import { DonationFormData } from '@/types';

interface Step2Props {
  formData: Partial<DonationFormData>;
  updateFormData: (data: Partial<DonationFormData>) => void;
}

export default function Step2({ formData, updateFormData }: Step2Props) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">2. Donor Information</h2>
      
      <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 mb-4">
        <p className="text-gray-800">
          Thank you for choosing to support our cause! Please provide your name for our records.
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={formData.fullName || ''}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter your full name"
          required
        />
      </div>
    </div>
  );
}

