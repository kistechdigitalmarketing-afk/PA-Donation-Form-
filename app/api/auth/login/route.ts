import { NextRequest, NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await verifyAdmin(email, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('adminToken', result.token!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Failed to process login' },
      { status: 500 }
    );
  }
}


