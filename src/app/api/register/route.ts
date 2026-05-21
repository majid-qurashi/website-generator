import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // 1. SECURITY REQUIREMENT: Allow only verified users to continue
    const verifyRes = await query(
      'SELECT verified FROM email_verifications WHERE email = $1',
      [email]
    );

    if (verifyRes.rows.length === 0 || !verifyRes.rows[0].verified) {
      return NextResponse.json(
        { error: 'Security Exception: Email address is not verified. Please verify your email before registering.' },
        { status: 403 }
      );
    }

    // 2. Check if school already exists
    const existing = await query('SELECT * FROM schools WHERE email = $1', [email]);
    let schoolRow;

    if (existing.rows.length > 0) {
      // Update password
      const result = await query(
        'UPDATE schools SET password = $1 WHERE email = $2 RETURNING *',
        [password, email]
      );
      schoolRow = result.rows[0];
    } else {
      // 3. Generate a unique subdomain based on email prefix
      let defaultSubdomain = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!defaultSubdomain) defaultSubdomain = 'school';

      let uniqueSub = defaultSubdomain;
      let suffix = 1;
      while (true) {
        const check = await query('SELECT id FROM schools WHERE subdomain = $1', [uniqueSub]);
        if (check.rows.length === 0) {
          break;
        }
        uniqueSub = `${defaultSubdomain}${suffix}`;
        suffix++;
      }

      const result = await query(
        'INSERT INTO schools (email, password, subdomain) VALUES ($1, $2, $3) RETURNING *',
        [email, password, uniqueSub]
      );
      schoolRow = result.rows[0];
    }

    // 4. Update onboarding session step to 2 completed, advancing to Step 2 Details
    await query(
      `UPDATE onboarding_sessions 
       SET current_step = 2,
           completed_steps = COALESCE(completed_steps, '[]'::jsonb) || '["1"]'::jsonb,
           updated_at = CURRENT_TIMESTAMP 
       WHERE email = $1`,
      [email]
    );

    return NextResponse.json(schoolRow);
  } catch (err: any) {
    console.error('❌ Register API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
