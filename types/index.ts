export interface DonationFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  donationAmount?: number;
  paymentMethod: 'mpesa' | 'bank' | '';
  confirmationMessage: string;
  submittedAt: string;
  id: string;
}

export interface AdminUser {
  email: string;
  password: string;
}

