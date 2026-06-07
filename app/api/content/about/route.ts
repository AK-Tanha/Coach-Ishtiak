import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await getSupabaseAdmin()
    .from('about_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}

export async function PUT(request: NextRequest) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json();
    const { badge, heading, subheading, para1, para2, image } = body;

    const updates: Record<string, unknown> = {};
    if (badge !== undefined) updates.badge = badge;
    if (heading !== undefined) updates.heading = heading;
    if (subheading !== undefined) updates.subheading = subheading;
    if (para1 !== undefined) updates.para1 = para1;
    if (para2 !== undefined) updates.para2 = para2;
    if (image !== undefined) updates.image = image;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await getSupabaseAdmin()
      .from('about_settings')
      .update(updates as never)
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
