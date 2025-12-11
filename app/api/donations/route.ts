import { NextRequest, NextResponse } from 'next/server';
import { saveDonationServer, deleteDonationServer } from '@/lib/storage';
import { DonationFormData } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const donation: DonationFormData = await request.json();

    // Validate required fields
    if (!donation.fullName || !donation.email || !donation.phoneNumber || 
        !donation.paymentMethod) {
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
    // Check authentication for admin access
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      // Allow public access for form submissions, but you can restrict this
      // For now, we'll allow GET requests (dashboard will handle auth check)
      // In production, add proper authentication middleware
    }

    const { getDonationsServer } = await import('@/lib/storage');
    const donations = getDonationsServer();
    
    return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const session = request.cookies.get('admin_session');
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Donation ID is required' },
        { status: 400 }
      );
    }

    const deleted = deleteDonationServer(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Donation deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting donation:', error);
    return NextResponse.json(
      { error: 'Failed to delete donation' },
      { status: 500 }
    );
  }
}

