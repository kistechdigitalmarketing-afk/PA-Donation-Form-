import { DonationFormData } from '@/types';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DONATIONS_FILE = path.join(DATA_DIR, 'donations.json');

// Ensure data directory exists
if (typeof window === 'undefined') {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getDonations(): DonationFormData[] {
  if (typeof window !== 'undefined') {
    // Client-side: use localStorage
    const stored = localStorage.getItem('donations');
    return stored ? JSON.parse(stored) : [];
  }

  // Server-side: use file system
  if (!fs.existsSync(DONATIONS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DONATIONS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveDonation(donation: DonationFormData): void {
  if (typeof window !== 'undefined') {
    // Client-side: use localStorage
    const donations = getDonations();
    donations.push(donation);
    localStorage.setItem('donations', JSON.stringify(donations));
    return;
  }

  // Server-side: use file system
  const donations = getDonations();
  donations.push(donation);
  fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2));
}

// For API routes (server-side only)
export function getDonationsServer(): DonationFormData[] {
  if (!fs.existsSync(DONATIONS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(DONATIONS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveDonationServer(donation: DonationFormData): void {
  const donations = getDonationsServer();
  donations.push(donation);
  fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2));
}

