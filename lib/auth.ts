import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Default admin credentials (change in production!)
// Password: admin123
// Pre-computed hash for 'admin123' - in production, use environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
}

export async function verifyAdmin(email: string, password: string): Promise<AuthResult> {
  if (email !== ADMIN_EMAIL) {
    return { success: false, error: 'Invalid credentials' };
  }

  // For development: simple comparison. In production, use hashed passwords
  // For now, we'll compare directly (change this in production!)
  if (password !== ADMIN_PASSWORD) {
    return { success: false, error: 'Invalid credentials' };
  }

  const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  return { success: true, token };
}

export function verifyToken(token: string): { email: string; role: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    return decoded;
  } catch {
    return null;
  }
}

