import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();
    const fileData = new Uint8Array(buffer);

    // Try Supabase Storage first
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase-server');
      const supabase = getSupabaseAdmin();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${file.name.split('.').pop() || 'jpg'}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, fileData, { contentType: file.type, upsert: false });

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(filePath);

        return NextResponse.json({
          success: true,
          data: { url: publicUrl },
        });
      }
    } catch {
      // Supabase storage failed, try Cloudinary
    }

    // Fallback: Try Cloudinary
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    if (cloudName) {
      try {
        const uploadPreset = formData.get('upload_preset') as string || 'ml_default';
        const cloudFormData = new FormData();
        cloudFormData.append('file', new Blob([fileData]), file.name);
        cloudFormData.append('upload_preset', uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: 'POST', body: cloudFormData }
        );

        if (response.ok) {
          const result = await response.json();
          return NextResponse.json({
            success: true,
            data: { url: result.secure_url, publicId: result.public_id },
          });
        }
      } catch {
        // Cloudinary failed, return base64
      }
    }

    // Last resort: base64 data URL
    const base64 = Buffer.from(buffer).toString('base64');
    return NextResponse.json({
      success: true,
      data: { url: `data:${file.type};base64,${base64}` },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
