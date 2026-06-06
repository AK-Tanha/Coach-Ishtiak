import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { parseJsonFields } from '@/lib/supabase-utils';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  const parsed = Array.isArray(data)
    ? data.map((row) => parseJsonFields(row, ['specs']))
    : data;

  return NextResponse.json({ success: true, data: parsed });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, price, category, image, rating, description, specs } = body;

    if (!name || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Name and price are required' },
        { status: 400 }
      );
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      category: category || 'Equipment',
      image: image || 'https://picsum.photos/seed/invictus-gear/800/800',
      rating: rating ? parseFloat(rating) : 5.0,
      description: description || '',
      specs: specs || null,
    };

    const { data, error } = await supabaseAdmin
      .from('products')
      .insert(newProduct)
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
