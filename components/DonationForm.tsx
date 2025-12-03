'use client';

import { useState } from 'react';
import { DonationFormData } from '@/types';

export default function DonationForm() {
  const [formData, setFormData] = useState<Partial<DonationFormData>>({
    fullName: '',
    email: '',
    phoneNumber: '',
    paymentMethod: '',
    confirmationMessage: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'bank' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (data: Partial<DonationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handlePaymentMethodChange = (method: 'mpesa' | 'bank') => {
    setPaymentMethod(method);
    updateFormData({ paymentMethod: method });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.fullName || !formData.email || !formData.phoneNumber || 
        !formData.paymentMethod || !formData.confirmationMessage) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    setIsSubmitting(true);

    const donation: DonationFormData = {
      id: Date.now().toString(),
      fullName: formData.fullName || '',
      email: formData.email || '',
      phoneNumber: formData.phoneNumber || '',
      paymentMethod: formData.paymentMethod as 'mpesa' | 'bank',
      confirmationMessage: formData.confirmationMessage || '',
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donation),
      });

      if (response.ok) {
        alert('Thank you for your donation! Your submission has been received.');
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          paymentMethod: '',
          confirmationMessage: '',
        });
        setPaymentMethod('');
      } else {
        const data = await response.json();
        alert(data.error || 'There was an error submitting your donation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('There was an error submitting your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.phoneNumber && 
                     formData.paymentMethod && formData.confirmationMessage;

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Donor Information */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Donor Information</h2>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-5 mb-5 shadow-sm">
              <p className="text-gray-800 text-base leading-relaxed">
                Thank you for choosing to support our cause! Please provide your details for our records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="fullName" className="block text-base font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName || ''}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-base font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
                <span className="text-sm text-gray-500 ml-1">(Required for M-Pesa)</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber || ''}
                onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                placeholder="0712 345 678"
                required
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Method</h2>

            <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-5 mb-5 shadow-sm">
              <p className="text-gray-800 text-base leading-relaxed">
                Choose your preferred payment method to make your donation.
                <br />
                <span className="text-gray-600">(Every contribution goes a long way in transforming lives and advancing our cause.)</span>
              </p>
            </div>

            <div className="mb-3">
              <div className="grid grid-cols-2 gap-4">
                {/* M-Pesa Card */}
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('mpesa')}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'mpesa'
                      ? 'border-primary bg-primary/10 shadow-lg scale-105'
                      : 'border-gray-300 bg-white hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      paymentMethod === 'mpesa' ? 'bg-primary/20' : 'bg-gray-100'
                    }`}>
                      <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-gray-900 mb-1">M-Pesa</div>
                      <div className="text-sm text-gray-600 mb-2">Pay using M-Pesa mobile money</div>
                      <div className="text-sm text-gray-500">Fast and secure mobile payment</div>
                    </div>
                    {paymentMethod === 'mpesa' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </button>

                {/* Bank Transfer Card */}
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('bank')}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'bank'
                      ? 'border-primary bg-primary/10 shadow-lg scale-105'
                      : 'border-gray-300 bg-white hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      paymentMethod === 'bank' ? 'bg-primary/20' : 'bg-gray-100'
                    }`}>
                      <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-gray-900 mb-1">Bank Transfer</div>
                      <div className="text-sm text-gray-600 mb-2">Pay via bank transfer (ABSA Bank)</div>
                      <div className="text-sm text-gray-500">Direct bank-to-bank transfer</div>
                    </div>
                    {paymentMethod === 'bank' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* M-Pesa Payment Information */}
            {paymentMethod === 'mpesa' && (
              <div className="mb-4">
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">M-Pesa Payment Information</h3>
                  <div className="space-y-2 text-gray-800 text-base">
                    <p><strong>Paybill No.:</strong> 303030</p>
                    <div className="flex items-center gap-2">
                      <p><strong>Account Number:</strong> 2046221209</p>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('2046221209')}
                        className="px-3 py-1.5 bg-white border border-gray-300 rounded text-sm hover:bg-gray-50 flex items-center gap-1"
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
                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none h-24 transition-all duration-200"
                    placeholder="Paste your complete M-Pesa confirmation message here..."
                    required
                  />
                </div>
              </div>
            )}

            {/* Bank Transfer Payment Information */}
            {paymentMethod === 'bank' && (
              <div className="mb-4">
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">ABSA Bank Payment Information</h3>
                  <div className="space-y-2 text-gray-800 text-base">
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
                    className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none h-24 transition-all duration-200"
                    placeholder="Paste your bank transfer confirmation message or provide transfer details here..."
                    required
                  />
                </div>
              </div>
            )}

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full px-6 py-4 rounded-lg transition-all font-semibold text-lg shadow-md ${
                !isFormValid || isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Donate Now'
              )}
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-6 pt-4">
            <p className="text-base text-gray-600 text-center">
              If you face any issue, you can reach out to us on{' '}
              <a href="mailto:karibu@possibilitiesafrica.org" className="text-primary hover:underline">
                karibu@possibilitiesafrica.org
              </a>
              {' '}or call us at{' '}
              <a href="tel:+254721238198" className="text-primary hover:underline">
                +254 721238198
              </a>
            </p>
          </div>

          {/* Security Badges */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center gap-3">
              <p className="text-base font-medium text-gray-700">🔒 Your donation is secure</p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Privacy Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
