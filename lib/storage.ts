import { DonationFormData } from '@/types';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Use /tmp directory for Vercel compatibility (writable in serverless functions)
const DATA_DIR = process.env.VERCEL ? path.join(os.tmpdir(), 'pa-donations') : path.join(process.cwd(), 'data');
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
  try {
    const donations = getDonationsServer();
    donations.push(donation);
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify(donations, null, 2));
  } catch (error) {
    console.error('Error saving donation to file system:', error);
    // On Vercel, file writes to /tmp work but don't persist between invocations
    // For production, consider using a database (PostgreSQL, MongoDB, etc.)
    throw error;
  }
}

