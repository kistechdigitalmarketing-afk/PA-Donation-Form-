'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DonationFormData } from '@/types';

export default function AdminDashboard() {
  const [donations, setDonations] = useState<DonationFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations');
      if (response.status === 401) {
        router.push('/admin/login');
        return;
      }
      const data = await response.json();
      if (response.ok) {
        setDonations(data.donations || []);
      } else {
        setError(data.error || 'Failed to fetch donations');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-light p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-primary px-6 py-4 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <div className="flex gap-4 items-center">
            <a
              href="/"
              className="text-white hover:text-gray-200 transition-colors text-sm"
            >
              View Form
            </a>
            <button
              onClick={handleLogout}
              className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-lg shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Donation Submissions ({donations.length})
            </h2>
            <p className="text-gray-600 text-sm">
              View all donation submissions and payment confirmations
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {donations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No donations submitted yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Full Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount (KES)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confirmation Message
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => (
                    <tr key={donation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(donation.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {donation.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {donation.phoneNumber || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {donation.donationAmount ? `KES ${donation.donationAmount.toLocaleString()}` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          donation.paymentMethod === 'mpesa'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {donation.paymentMethod === 'mpesa' ? 'M-Pesa' : 'Bank Transfer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        <details className="cursor-pointer">
                          <summary className="truncate hover:text-primary">
                            {donation.confirmationMessage.length > 50
                              ? `${donation.confirmationMessage.substring(0, 50)}...`
                              : donation.confirmationMessage}
                          </summary>
                          <div className="mt-2 p-2 bg-gray-50 rounded text-xs whitespace-pre-wrap break-words">
                            {donation.confirmationMessage}
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

