import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { parseJsonFields } from '@/lib/supabase-utils';

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('pricing_plans')
    .select('*');

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  const parsed = Array.isArray(data)
    ? data.map((row) => parseJsonFields(row, ['features']))
    : data;

  return NextResponse.json({ success: true, data: parsed });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, price, originalPrice, features, highlight, badge } = body;

    if (!title || !price) {
      return NextResponse.json(
        { success: false, error: 'Title and price are required' },
        { status: 400 }
      );
    }

    const newPlan = {
      id: 'plan-' + Date.now().toString(36),
      title,
      price,
      original_price: originalPrice || null,
      features: features || [],
      highlight: highlight || false,
      badge: badge || null,
    };

    const { data, error } = await getSupabaseAdmin()
      .from('pricing_plans')
      .insert(newPlan)
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, price, originalPrice, features, highlight, badge } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Plan id is required' },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};
    if (title !== undefined) updates.title = title;
    if (price !== undefined) updates.price = price;
    if (originalPrice !== undefined) updates.original_price = originalPrice || null;
    if (features !== undefined) updates.features = features;
    if (highlight !== undefined) updates.highlight = highlight;
    if (badge !== undefined) updates.badge = badge || null;

    const { data, error } = await getSupabaseAdmin()
      .from('pricing_plans')
      .update(updates as never)
      .eq('id', id)
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

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { success: false, error: 'Plan id is required' },
      { status: 400 }
    );
  }

  const { error } = await getSupabaseAdmin()
    .from('pricing_plans')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
