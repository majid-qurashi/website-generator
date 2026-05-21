import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, themeSettings } = await req.json();

    if (!email || !themeSettings) {
      return NextResponse.json(
        { error: 'Email and themeSettings are required.' },
        { status: 400 }
      );
    }

    await query(
      'UPDATE schools SET theme_settings = $1 WHERE email = $2',
      [JSON.stringify(themeSettings), email]
    );

    console.log(`🎨 Theme settings updated in DB for ${email}`);

    return NextResponse.json({ success: true, message: 'Theme Settings Saved' });
  } catch (err: any) {
    console.error('❌ Save Theme Settings API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
