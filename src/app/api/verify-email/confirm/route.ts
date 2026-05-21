import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, otpCode, token } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }

    // 1. Fetch verification status from database
    const verifyRes = await query(
      'SELECT * FROM email_verifications WHERE email = $1',
      [email]
    );

    if (verifyRes.rows.length === 0) {
      return NextResponse.json(
        { error: 'Verification session not found for this email.' },
        { status: 400 }
      );
    }

    const verification = verifyRes.rows[0];

    // 2. Check if already verified
    if (verification.verified) {
      // Already verified, allow proceeding
      await query(
        'UPDATE onboarding_sessions SET current_step = 2, updated_at = CURRENT_TIMESTAMP WHERE email = $1',
        [email]
      );
      return NextResponse.json({
        success: true,
        message: 'Email already verified. Advancing onboarding.'
      });
    }

    // 3. Check expiration
    const now = new Date();
    const expiresAt = new Date(verification.expires_at);
    if (now > expiresAt) {
      return NextResponse.json(
        { error: 'Verification code has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // 4. Validate OTP or Token
    let isMatch = false;

    if (otpCode) {
      // Compare 6-digit OTP code
      isMatch = verification.otp_code === otpCode.trim();
    } else if (token) {
      // Compare Magic Link hex token
      isMatch = verification.token === token.trim();
    }

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid verification code or token. Please try again.' },
        { status: 400 }
      );
    }

    // 5. Update verification state to true
    await query(
      'UPDATE email_verifications SET verified = TRUE WHERE email = $1',
      [email]
    );

    // 6. Update onboarding session step to 2
    await query(
      `UPDATE onboarding_sessions 
       SET current_step = 2, 
           completed_steps = COALESCE(completed_steps, '[]'::jsonb) || '["1"]'::jsonb, 
           updated_at = CURRENT_TIMESTAMP 
       WHERE email = $1`,
      [email]
    );

    console.log(`✅ Email ${email} verified successfully. Onboarding advanced to Step 2.`);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully.'
    });
  } catch (err: any) {
    console.error('❌ Confirm verification API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
