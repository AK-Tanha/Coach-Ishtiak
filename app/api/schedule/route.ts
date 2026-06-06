import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { parseJsonFields } from '@/lib/supabase-utils';

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('schedules')
    .select('*')
    .order('day');

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  const parsed = Array.isArray(data)
    ? data.map((row) => parseJsonFields(row, ['classes']))
    : data;

  return NextResponse.json({ success: true, data: parsed });
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Expect an array of ScheduleDay objects
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, error: 'Expected an array of schedule days' },
        { status: 400 }
      );
    }

    // Delete all existing schedules and re-insert
    const { error: deleteError } = await getSupabaseAdmin()
      .from('schedules')
      .delete()
      .neq('day', '');

    if (deleteError) {
      return NextResponse.json({ success: false, error: deleteError.message }, { status: 500 });
    }

    const rows = body.map((day: { day: string; classes: unknown[] }) => ({
      day: day.day,
      classes: day.classes,
    }));

    if (rows.length > 0) {
      const { data, error: insertError } = await getSupabaseAdmin()
        .from('schedules')
        .insert(rows)
        .select();

      if (insertError) {
        return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: true, data: [] });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
