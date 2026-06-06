import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('gallery_images')
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
    const { url, title, category } = body;

    if (!url || !title || !category) {
      return NextResponse.json(
        { success: false, error: 'URL, title, and category are required' },
        { status: 400 }
      );
    }

    const { data, error } = await getSupabaseAdmin()
      .from('gallery_images')
      .insert({ url, title, category })
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

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Image id is required' },
      { status: 400 }
    );
  }

  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) {
    return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from('gallery_images')
    .delete()
    .eq('id', imageId);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
