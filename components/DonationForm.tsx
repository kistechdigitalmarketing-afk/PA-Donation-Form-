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
  const [showSuccess, setShowSuccess] = useState(false);
  const [successName, setSuccessName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormData = (data: Partial<DonationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handlePaymentMethodChange = (method: 'mpesa' | 'bank') => {
    setPaymentMethod(method);
    updateFormData({ paymentMethod: method });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here if needed
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.fullName || !formData.email || !formData.phoneNumber || 
        !formData.paymentMethod) {
      setErrorMessage('Please fill in all required fields before submitting.');
      return;
    }

    setErrorMessage('');
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
        // Show success message with name
        setSuccessName(formData.fullName || '');
        setShowSuccess(true);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          paymentMethod: '',
          confirmationMessage: '',
        });
        setPaymentMethod('');
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'There was an error submitting your donation. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      setErrorMessage('There was an error submitting your donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName && formData.email && formData.phoneNumber && 
                     formData.paymentMethod;

  return (
    <div className="w-full">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-lg animate-fade-in">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                Thank you for your support, {successName}!
              </h3>
              <p className="text-base sm:text-lg text-green-700">
                Your donation submission has been received successfully. We appreciate your generosity!
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-4 flex-shrink-0 text-green-500 hover:text-green-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-base text-red-700">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage('')}
              className="ml-4 flex-shrink-0 text-red-500 hover:text-red-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg sm:rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Donor Information */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Donor Information</h2>
            
            <div className="bg-orange-50 border-l-4 border-orange-400 rounded-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 shadow-sm">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                Thank you for choosing to support our cause! Please provide your details for our records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <label htmlFor="fullName" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName || ''}
                  onChange={(e) => updateFormData({ fullName: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ''}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="phoneNumber" className="block text-sm sm:text-base font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  placeholder="0712 345 678"
                  required
                />
              </div>
              <div></div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">Payment Method</h2>

            <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 shadow-sm">
              <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                Choose your preferred payment method to make your donation.
                <br />
                <span className="text-gray-600">(Every contribution goes a long way in transforming lives and advancing our cause.)</span>
              </p>
            </div>

            <div className="mb-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* M-Pesa Card */}
                <button
                  type="button"
                  onClick={() => handlePaymentMethodChange('mpesa')}
                  className={`relative w-full p-4 md:p-5 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'mpesa'
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={paymentMethod === 'mpesa'}
                        onChange={() => handlePaymentMethodChange('mpesa')}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                    </div>
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      paymentMethod === 'mpesa' ? 'bg-primary/20' : 'bg-gray-100'
                    }`}>
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="font-bold text-base md:text-lg text-gray-900 mb-1">M-Pesa</div>
                      <div className="text-sm text-gray-600 mb-1.5">Pay using M-Pesa mobile money</div>
                      <div className="text-xs text-gray-500">Fast and secure mobile payment</div>
                    </div>
                    {paymentMethod === 'mpesa' && (
                      <div className="absolute top-3 right-3 flex-shrink-0">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
                  className={`relative w-full p-4 md:p-5 rounded-xl border-2 transition-all text-left ${
                    paymentMethod === 'bank'
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-gray-300 bg-white hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={paymentMethod === 'bank'}
                        onChange={() => handlePaymentMethodChange('bank')}
                        className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                      />
                    </div>
                    <div className={`p-2 rounded-lg flex-shrink-0 ${
                      paymentMethod === 'bank' ? 'bg-primary/20' : 'bg-gray-100'
                    }`}>
                      <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="font-bold text-base md:text-lg text-gray-900 mb-1">Bank Transfer</div>
                      <div className="text-sm text-gray-600 mb-1.5">Pay via bank transfer (ABSA Bank)</div>
                      <div className="text-xs text-gray-500">Direct bank-to-bank transfer</div>
                    </div>
                    {paymentMethod === 'bank' && (
                      <div className="absolute top-3 right-3 flex-shrink-0">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
              <div className="mb-3 sm:mb-4">
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">M-Pesa Payment Information</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-800 text-sm sm:text-base">
                    <p><strong>Paybill No.:</strong> 303030</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <p className="break-all"><strong>Account Number:</strong> 2046221209</p>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('2046221209')}
                        className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-white border border-gray-300 rounded text-xs sm:text-sm hover:bg-gray-50 flex items-center gap-1 self-start sm:self-auto"
                      >
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm italic text-gray-600 mt-2">
                      The confirmation message will be from ABSA bank for Possibilities Africa Kenya Limited.
                    </p>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-3 sm:p-4">
                  <p className="text-sm sm:text-base text-gray-800">
                    Thank you for your generosity <span className="font-semibold">( please submit the form after making payment )</span>
                  </p>
                </div>
              </div>
            )}

            {/* Bank Transfer Payment Information */}
            {paymentMethod === 'bank' && (
              <div className="mb-3 sm:mb-4">
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-gray-900">ABSA Bank Payment Information</h3>
                  <div className="space-y-1.5 sm:space-y-2 text-gray-800 text-sm sm:text-base">
                    <p><strong>Bank Name:</strong> ABSA Bank Kenya</p>
                    <p><strong>Account Name:</strong> Possibilities Africa</p>
                    <p><strong>Account Number:</strong> 2046221209</p>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 rounded-lg p-3 sm:p-4">
                  <p className="text-sm sm:text-base text-gray-800">
                    Thank you for your generosity <span className="font-semibold">( please submit the form after making payment )</span>
                  </p>
                </div>
              </div>
            )}

          {/* Submit Button */}
          <div className="pt-4 sm:pt-5 md:pt-6">
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-lg transition-all font-semibold text-base sm:text-lg shadow-md ${
                !isFormValid || isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-xl transform hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          <div className="mt-4 sm:mt-5 md:mt-6 pt-3 sm:pt-4">
            <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
              If you face any issue, you can reach out to us on{' '}
              <a href="mailto:karibu@possibilitiesafrica.org" className="text-primary hover:underline break-all">
                karibu@possibilitiesafrica.org
              </a>
              {' '}or call us at{' '}
              <a href="tel:+254721238198" className="text-primary hover:underline">
                +254 721238198
              </a>
            </p>
          </div>

          {/* Security Badges */}
          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <p className="text-sm sm:text-base font-medium text-gray-700">🔒 Your donation is secure</p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
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
