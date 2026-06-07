import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await getSupabaseAdmin()
    .from('experiences')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
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

    const { data, error } = await getSupabaseAdmin()
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
