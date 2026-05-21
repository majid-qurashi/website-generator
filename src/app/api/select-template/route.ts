import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, template, features } = await req.json();

    if (!email || !template) {
      return NextResponse.json(
        { error: 'Email and template name are required.' },
        { status: 400 }
      );
    }

    // 1. Update template and features checklist in the database
    await query(
      `UPDATE schools 
       SET template = $1, features = $2::jsonb 
       WHERE email = $3`,
      [template, JSON.stringify(features || []), email]
    );

    // 2. Advance onboarding session step to Step 4 Completed (Advancing to Step 5 Launch)
    await query(
      `UPDATE onboarding_sessions 
       SET current_step = 4,
           completed_steps = COALESCE(completed_steps, '[]'::jsonb) || '["3"]'::jsonb,
           updated_at = CURRENT_TIMESTAMP 
       WHERE email = $1`,
      [email]
    );

    console.log(`✅ Template '${template}' selected for ${email}. Features: ${JSON.stringify(features || [])}`);

    return NextResponse.json({ success: true, message: 'Template and features selected successfully.' });
  } catch (err: any) {
    console.error('❌ Select Template API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
