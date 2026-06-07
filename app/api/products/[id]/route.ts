import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { requireAuth } from '@/lib/auth';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, price, category, image, rating, description, specs } = body;

    const updates: Record<string, unknown> = {};
    if (name !== undefined) updates.name = name;
    if (price !== undefined) updates.price = parseFloat(price);
    if (category !== undefined) updates.category = category;
    if (image !== undefined) updates.image = image;
    if (rating !== undefined) updates.rating = parseFloat(rating);
    if (description !== undefined) updates.description = description;
    if (specs !== undefined) updates.specs = specs;

    const productId = parseInt(id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ success: false, error: 'Invalid product id' }, { status: 400 });
    }

    const { data, error } = await getSupabaseAdmin()
      .from('products')
      .update(updates as never)
      .eq('id', productId)
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

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = requireAuth(_request);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  const { id } = await params;

  const productId = parseInt(id, 10);
  if (isNaN(productId)) {
    return NextResponse.json({ success: false, error: 'Invalid product id' }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
