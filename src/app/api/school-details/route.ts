import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      name,
      tagline,
      description,
      logo,      // Logo URL or base64
      image,     // Hero image URL or base64
      schoolType,
      principalName,
      contactNumber,
      address,
      subdomain,
      customDomain
    } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and school name are required.' },
        { status: 400 }
      );
    }

    // Determine the subdomain and custom domain values to save
    let finalSubdomain = subdomain;
    let finalCustomDomain = customDomain;

    if (!finalSubdomain) {
      // Fallback: Generate professional name slug for subdomain update if not explicitly provided
      let nameSlug = name.toLowerCase().trim().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      if (!nameSlug) nameSlug = 'school';

      // Fetch current subdomain information
      const currentRes = await query('SELECT subdomain FROM schools WHERE email = $1', [email]);
      
      if (currentRes.rows.length > 0) {
        const currentSub = currentRes.rows[0].subdomain;
        const emailPrefix = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        
        // Update subdomain if it is currently set to the default email prefix
        if (!currentSub || currentSub === emailPrefix) {
          let uniqueSub = nameSlug;
          let suffix = 1;
          while (true) {
            const check = await query('SELECT id FROM schools WHERE subdomain = $1 AND email != $2', [uniqueSub, email]);
            if (check.rows.length === 0) {
              break;
            }
            uniqueSub = `${nameSlug}-${suffix}`;
            suffix++;
          }
          finalSubdomain = uniqueSub;
        } else {
          finalSubdomain = currentSub;
        }
      }
    }

    // Save school details, including subdomain and custom domain
    await query(`
      UPDATE schools 
      SET name = $1, tagline = $2, description = $3, 
          logo = COALESCE($4, logo), image = COALESCE($5, image), 
          subdomain = COALESCE($6, subdomain), school_type = $7, principal_name = $8,
          contact_number = $9, address = $10, custom_domain = COALESCE($11, custom_domain)
      WHERE email = $12
    `, [
      name, tagline, description, logo || null, image || null, 
      finalSubdomain || null, schoolType || null, principalName || null,
      contactNumber || null, address || null, finalCustomDomain || null, email
    ]);

    console.log(`✅ School details and domains updated for ${email}. Subdomain: ${finalSubdomain}, Custom Domain: ${finalCustomDomain || 'none'}`);

    return NextResponse.json({ success: true, message: 'School details and domain config updated successfully.' });
  } catch (err: any) {
    console.error('❌ School Details API Error:', err.message);
    return NextResponse.json(
      { error: 'Internal Server Error', details: err.message },
      { status: 500 }
    );
  }
}
