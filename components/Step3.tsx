'use client';

import { useState } from 'react';
import { DonationFormData } from '@/types';

interface Step3Props {
  formData: Partial<DonationFormData>;
  updateFormData: (data: Partial<DonationFormData>) => void;
  onSubmit: () => void;
}

export default function Step3({ formData, updateFormData, onSubmit }: Step3Props) {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | ''>(
    (formData.paymentMethod as 'mpesa' | 'bank' | '') || ''
  );

  const handlePaymentMethodChange = (method: 'mpesa' | 'bank') => {
    setPaymentMethod(method);
    updateFormData({ paymentMethod: method });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">3. Payment Method</h2>

      <div className="bg-green-100 border border-green-200 rounded-lg p-4 mb-6">
        <p className="text-gray-800">
          Choose your preferred payment method to make your donation. (Every contribution, big or small, 
          goes a long way in transforming lives and advancing our cause.)
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          {/* M-Pesa Option */}
          <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="mpesa"
              checked={paymentMethod === 'mpesa'}
              onChange={() => handlePaymentMethodChange('mpesa')}
              className="mt-1 mr-4 w-5 h-5 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">M-Pesa</div>
              <div className="text-sm text-gray-600">Pay using M-Pesa mobile money</div>
            </div>
          </label>

          {/* Bank Transfer Option */}
          <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              checked={paymentMethod === 'bank'}
              onChange={() => handlePaymentMethodChange('bank')}
              className="mt-1 mr-4 w-5 h-5 text-primary focus:ring-primary"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-900">Bank Transfer</div>
              <div className="text-sm text-gray-600">Pay via bank transfer (ABSA Bank)</div>
            </div>
          </label>
        </div>
      </div>

      {/* M-Pesa Payment Information */}
      {paymentMethod === 'mpesa' && (
        <div className="mb-6">
          <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-5 mb-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">M-Pesa Payment Information</h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Paybill No.:</strong> 303030</p>
              <div className="flex items-center gap-2">
                <p><strong>Account Number:</strong> 2046221209</p>
                <button
                  onClick={() => copyToClipboard('2046221209')}
                  className="px-2 py-1 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <p className="text-sm italic text-gray-600 mt-2">
                The confirmation message will be from ABSA bank for Possibilities Africa Kenya Limited.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">M-Pesa Confirmation Message</h3>
            <textarea
              value={formData.confirmationMessage || ''}
              onChange={(e) => updateFormData({ confirmationMessage: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y min-h-[120px]"
              placeholder="Paste your complete M-Pesa confirmation message here..."
              required
            />
          </div>
        </div>
      )}

      {/* Bank Transfer Payment Information */}
      {paymentMethod === 'bank' && (
        <div className="mb-6">
          <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-5 mb-4">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">ABSA Bank Payment Information</h3>
            <div className="space-y-2 text-gray-800">
              <p><strong>Bank Name:</strong> ABSA Bank Kenya</p>
              <p><strong>Account Name:</strong> Possibilities Africa</p>
              <p><strong>Account Number:</strong> 2046221209</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Bank Transfer Confirmation</h3>
            <textarea
              value={formData.confirmationMessage || ''}
              onChange={(e) => updateFormData({ confirmationMessage: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-y min-h-[120px]"
              placeholder="Paste your bank transfer confirmation message or provide transfer details here..."
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}

