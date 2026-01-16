import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || 're_W8fWonjN_82Mk65eDVS4VNT5RZ4t8SZhv';
const resend = new Resend(resendApiKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, brief } = body;

    // Basit validasyon
    if (!name || !email || !brief) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email format validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Email gönder
    const { data, error } = await resend.emails.send({
      from: 'Cervus Labs <onboarding@resend.dev>', // Resend'de domain verify etmeniz gerekecek
      to: process.env.CONTACT_EMAIL || 'duhanbayrak6@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111827; border-bottom: 2px solid #111827; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong style="color: #111827;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #111827;">Email:</strong> <a href="mailto:${email}" style="color: #111827;">${email}</a></p>
            <p style="margin: 10px 0;"><strong style="color: #111827;">Company:</strong> ${company || 'Not provided'}</p>
            <div style="margin-top: 20px;">
              <strong style="color: #111827;">Project Brief:</strong>
              <p style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; white-space: pre-wrap; color: #374151;">
${brief}
              </p>
            </div>
          </div>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            This email was sent from the Cervus Labs contact form.
          </p>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}

Project Brief:
${brief}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
