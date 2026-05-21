import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { sendEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required to launch.' },
        { status: 400 }
      );
    }

    // 1. Fetch school details from database
    const schoolRes = await query('SELECT * FROM schools WHERE email = $1', [email]);
    if (schoolRes.rows.length === 0) {
      return NextResponse.json(
        { error: 'School registration details not found.' },
        { status: 404 }
      );
    }

    const school = schoolRes.rows[0];

    // 2. Determine domain dynamically based on incoming request headers
    const host = req.headers.get('host') || 'localhost:3000';
    const proto = req.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${proto}://${host}`;
    
    const websiteUrl = `${baseUrl}/school/${encodeURIComponent(email)}`;
    const adminDashboardUrl = `${baseUrl}/school/${encodeURIComponent(email)}/customize`;

    // 3. Mark onboarding session as completed (Step 5)
    await query(
      `UPDATE onboarding_sessions 
       SET current_step = 5,
           completed_steps = COALESCE(completed_steps, '[]'::jsonb) || '["4"]'::jsonb,
           updated_at = CURRENT_TIMESTAMP 
       WHERE email = $1`,
      [email]
    );

    // 4. Send the Gorgeous Premium Branded Welcome Email
    console.log(`✉️ Triggering premium welcome email for: ${email}`);
    const mailResult = await sendEmail({
      to: email,
      subject: `🎉 Congratulations! ${school.name || 'Your School'} Website is Live!`,
      templateName: 'welcome',
      templateData: {
        schoolName: school.name || 'Your School',
        email: email,
        websiteUrl: websiteUrl,
        adminDashboardUrl: adminDashboardUrl,
        subdomain: school.subdomain || 'school'
      }
    });

    console.log(`🚀 School website launched successfully for: ${email}`);

    const responseData: Record<string, any> = {
      success: true,
      message: 'Website launched successfully and welcome email triggered.',
      websiteUrl,
      adminDashboardUrl
    };

    if (mailResult.method === 'sandbox') {
      responseData.sandbox = true;
      responseData.previewUrl = mailResult.previewUrl;
    }

    return NextResponse.json(responseData);
  } catch (err: any) {
    console.error('❌ Launch API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
