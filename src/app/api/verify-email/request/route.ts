import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail } from '@/lib/mailer';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long.' },
        { status: 400 }
      );
    }

    // 1. Generate 6-digit secure numerical OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 2. Generate secure cryptographically random hex token
    const token = crypto.randomBytes(32).toString('hex');
    
    // 3. Set expiration to 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // 4. Save/update verification details in the database
    await query(`
      INSERT INTO email_verifications (email, token, otp_code, expires_at, verified)
      VALUES ($1, $2, $3, $4, FALSE)
      ON CONFLICT (email) 
      DO UPDATE SET 
        token = EXCLUDED.token, 
        otp_code = EXCLUDED.otp_code, 
        expires_at = EXCLUDED.expires_at, 
        verified = FALSE,
        created_at = CURRENT_TIMESTAMP;
    `, [email, token, otpCode, expiresAt]);

    // 5. Initialize/reset temporary onboarding session
    const initialFormData = { password };
    await query(`
      INSERT INTO onboarding_sessions (email, current_step, completed_steps, form_data)
      VALUES ($1, 1, '[]'::jsonb, $2::jsonb)
      ON CONFLICT (email)
      DO UPDATE SET
        current_step = 1,
        completed_steps = '[]'::jsonb,
        form_data = EXCLUDED.form_data,
        updated_at = CURRENT_TIMESTAMP;
    `, [email, JSON.stringify(initialFormData)]);

    // 6. Send verification email
    const verificationLink = `http://localhost:3000/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    
    const mailResult = await sendEmail({
      to: email,
      subject: `🏫 Verify Your School Email (OTP Code: ${otpCode})`,
      templateName: 'verify',
      templateData: {
        otpCode,
        verificationLink,
        expiresMinutes: 15
      }
    });

    // Clean response, optionally adding visual debugging aids for developers
    const responseData: Record<string, any> = {
      success: true,
      message: 'Verification code sent successfully.'
    };

    // If sandbox mode, make testing a absolute breeze by giving direct link
    if (mailResult.method === 'sandbox') {
      responseData.sandbox = true;
      responseData.previewUrl = mailResult.previewUrl;
      responseData.otpCode = otpCode; // Return OTP code in dev mode to make testing extremely fast
    }

    return NextResponse.json(responseData);
  } catch (err: any) {
    console.error('❌ Request verification API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
