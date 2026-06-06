import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const payload = requireAuth(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: { email: payload.email, role: payload.role },
  });
}

export async function POST(request: NextRequest) {
  const payload = requireAuth(request);
  if (!payload) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: { email: payload.email, role: payload.role },
  });
}
