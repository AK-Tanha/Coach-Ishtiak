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

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = formData.get('upload_preset') as string || 'ml_default';

    if (!cloudName) {
      // Fallback: return a base64 data URL if Cloudinary is not configured
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const mimeType = file.type;
      return NextResponse.json({
        success: true,
        data: { url: `data:${mimeType};base64,${base64}` },
      });
    }

    // Upload to Cloudinary
    const buffer = await file.arrayBuffer();
    const fileData = new Uint8Array(buffer);

    const formDataCloudinary = new FormData();
    formDataCloudinary.append('file', new Blob([fileData]), file.name);
    formDataCloudinary.append('upload_preset', uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formDataCloudinary,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: result.error?.message || 'Upload failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { url: result.secure_url, publicId: result.public_id },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}
