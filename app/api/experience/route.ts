import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('experiences')
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
    const { role, company, period, description } = body;

    if (!role || !company) {
      return NextResponse.json(
        { success: false, error: 'Role and company are required' },
        { status: 400 }
      );
    }

    const newEntry = {
      id: 'exp-' + Date.now().toString(36),
      role,
      company,
      period: period || '',
      description: description || '',
    };

    const { data, error } = await supabaseAdmin
      .from('experiences')
      .insert(newEntry)
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
