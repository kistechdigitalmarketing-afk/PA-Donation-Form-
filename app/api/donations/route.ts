import { NextRequest, NextResponse } from 'next/server';
import { saveDonationServer } from '@/lib/storage';
import { DonationFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const donation: DonationFormData = await request.json();

    // Validate required fields
    if (!donation.fullName || !donation.email || !donation.phoneNumber || 
        !donation.paymentMethod || !donation.confirmationMessage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add ID and timestamp if not present
    if (!donation.id) {
      donation.id = Date.now().toString();
    }
    if (!donation.submittedAt) {
      donation.submittedAt = new Date().toISOString();
    }

    saveDonationServer(donation);

    return NextResponse.json({ success: true, donation }, { status: 201 });
  } catch (error) {
    console.error('Error saving donation:', error);
    return NextResponse.json(
      { error: 'Failed to save donation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { getDonationsServer } = await import('@/lib/storage');
    const donations = getDonationsServer();
    
    // Check for admin authentication
    const token = request.cookies.get('adminToken')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { verifyToken } = await import('@/lib/auth');
    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

