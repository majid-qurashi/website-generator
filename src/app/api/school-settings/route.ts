import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, domain } = await req.json();

    // 1. If checking custom domain or subdomain availability
    if (domain) {
      const domainPrefix = domain.split('.')[0].toLowerCase().trim();
      const result = await query(
        'SELECT id FROM schools WHERE subdomain = $1 OR custom_domain = $2 OR custom_domain = $3',
        [domainPrefix, domain, domain.replace(/^www\./i, '')]
      );
      
      if (result.rows.length > 0) {
        return NextResponse.json(
          { error: 'Domain or subdomain name is already registered.' },
          { status: 400 }
        );
      }
      
      return NextResponse.json(
        { success: true, message: 'Domain is available!' },
        { status: 404 } // Return 404 to signal 'not found' (meaning it is available for signup)
      );
    }

    // 2. Original email settings check
    if (!email) {
      return NextResponse.json(
        { error: 'School email is required.' },
        { status: 400 }
      );
    }

    const result = await query('SELECT * FROM schools WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, school: result.rows[0] });
  } catch (err: any) {
    console.error('❌ School Settings API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
