import { DonationFormData, AdminUser } from '@/types';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Use /tmp directory for Vercel compatibility (writable in serverless functions)
const DATA_DIR = process.env.VERCEL ? path.join(os.tmpdir(), 'pa-donations') : path.join(process.cwd(), 'data');
const DONATIONS_FILE = path.join(DATA_DIR, 'donations.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');

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

export function deleteDonationServer(id: string): boolean {
  try {
    const donations = getDonationsServer();
    const filteredDonations = donations.filter(d => d.id !== id);
    fs.writeFileSync(DONATIONS_FILE, JSON.stringify(filteredDonations, null, 2));
    return filteredDonations.length < donations.length; // Return true if deletion was successful
  } catch (error) {
    console.error('Error deleting donation from file system:', error);
    throw error;
  }
}

// Admin functions
export function getAdminsServer(): AdminUser[] {
  if (!fs.existsSync(ADMINS_FILE)) {
    // Initialize with default admin if file doesn't exist
    const defaultAdmin: AdminUser = {
      email: 'admin@example.com',
      password: 'admin123' // In production, this should be hashed
    };
    saveAdminsServer([defaultAdmin]);
    return [defaultAdmin];
  }
  const data = fs.readFileSync(ADMINS_FILE, 'utf-8');
  return JSON.parse(data);
}

export function saveAdminsServer(admins: AdminUser[]): void {
  try {
    fs.writeFileSync(ADMINS_FILE, JSON.stringify(admins, null, 2));
  } catch (error) {
    console.error('Error saving admins to file system:', error);
    throw error;
  }
}

export function verifyAdmin(email: string, password: string): boolean {
  const admins = getAdminsServer();
  const admin = admins.find(a => a.email === email);
  return admin ? admin.password === password : false;
}

