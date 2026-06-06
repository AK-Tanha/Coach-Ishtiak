import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { parseJsonFields } from '@/lib/supabase-utils';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('hero_settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data: parseJsonFields(data, ['images']) });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { badge, subheading, title, name, description, images } = body;

    const updates: Record<string, unknown> = {};
    if (badge !== undefined) updates.badge = badge;
    if (subheading !== undefined) updates.subheading = subheading;
    if (title !== undefined) updates.title = title;
    if (name !== undefined) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (images !== undefined) updates.images = images;
    updates.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin
      .from('hero_settings')
      .update(updates)
      .eq('id', 1)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: parseJsonFields(data, ['images']) });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
