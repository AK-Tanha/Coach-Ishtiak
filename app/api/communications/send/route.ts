import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const user = requireAuth(req);
  if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });

  try {
    const { channel, recipients, subject, message } = await req.json();

    if (!recipients?.length || !message?.trim()) {
      return NextResponse.json({ success: false, error: 'Recipients and message are required.' }, { status: 400 });
    }

    if (!['sms', 'email', 'whatsapp'].includes(channel)) {
      return NextResponse.json({ success: false, error: 'Invalid channel.' }, { status: 400 });
    }

    if (channel === 'email' && !subject?.trim()) {
      return NextResponse.json({ success: false, error: 'Subject is required for email.' }, { status: 400 });
    }

    let sentCount = 0;

    for (const recipient of recipients) {
      try {
        if (channel === 'email' && recipient.email && recipient.email !== 'N/A') {
          await sendEmail(recipient.email, subject!, message);
          sentCount++;
        } else if (channel === 'sms' && recipient.phone) {
          await sendSms(recipient.phone, message);
          sentCount++;
        } else if (channel === 'whatsapp' && recipient.phone) {
          await sendWhatsApp(recipient.phone, message);
          sentCount++;
        }
      } catch (err) {
        console.warn(`Failed to send ${channel} to ${recipient.name}:`, err);
      }
    }

    return NextResponse.json({
      success: true,
      sentCount,
      totalRecipients: recipients.length,
    });
  } catch (err) {
    console.error('Communications API error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}

async function sendEmail(to: string, subject: string, body: string) {
  const apiKey = process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.warn('No email API key configured. Email would be sent to:', to);
    return;
  }

  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'admin@invictusmma.com',
        to,
        subject,
        text: body,
      }),
    });
    if (!res.ok) throw new Error(`Resend error: ${res.status}`);
  }
}

async function sendSms(to: string, body: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) {
    console.warn('No Twilio credentials configured. SMS would be sent to:', to);
    return;
  }

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      To: to.startsWith('+') ? to : `+88${to}`,
      From: process.env.TWILIO_PHONE_NUMBER || '',
      Body: body,
    }),
  });
  if (!res.ok) throw new Error(`Twilio SMS error: ${res.status}`);
}

async function sendWhatsApp(to: string, body: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!accountSid || !authToken) {
    console.warn('No Twilio credentials configured. WhatsApp would be sent to:', to);
    return;
  }

  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      To: `whatsapp:${to.startsWith('+') ? to : `+88${to}`}`,
      From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER || process.env.TWILIO_PHONE_NUMBER || ''}`,
      Body: body,
    }),
  });
  if (!res.ok) throw new Error(`Twilio WhatsApp error: ${res.status}`);
}
