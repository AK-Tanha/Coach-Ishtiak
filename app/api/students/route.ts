import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('students')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, course, status, image } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    const newStudent = {
      id: 'st-' + Date.now().toString(36),
      name,
      email: email || 'N/A',
      phone,
      course: course || '3 Months Course',
      status: status || 'Pending',
      enrolled_date: new Date().toISOString().split('T')[0],
      image: image || '',
    };

    const { data, error } = await supabaseAdmin
      .from('students')
      .insert(newStudent)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
