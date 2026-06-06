import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('orders')
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
    const { athleteName, phone, email, address, items, totalPrice, paymentMethod } = body;

    if (!athleteName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Athlete name and phone are required' },
        { status: 400 }
      );
    }

    const newOrder = {
      id: 'ord-' + Date.now().toString(36),
      athlete_name: athleteName,
      phone,
      email: email || 'N/A',
      address: address || '',
      items: items || '',
      total_price: parseFloat(totalPrice) || 0,
      status: 'Pending',
      payment_method: paymentMethod || 'bKash',
      date: new Date().toISOString().split('T')[0],
    };

    const { data, error } = await getSupabaseAdmin()
      .from('orders')
      .insert(newOrder)
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
