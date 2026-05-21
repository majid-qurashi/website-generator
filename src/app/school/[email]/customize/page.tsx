import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import CustomizerClientView from './CustomizerClientView';

import { query } from '@/lib/db';

interface PageProps {
  params: Promise<{ email: string }>;
}

export default async function CustomizePage({ params }: PageProps) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  let school = null;
  
  try {
    const res = await query('SELECT * FROM schools WHERE email = $1', [decodedEmail]);
    if (res && res.rows && res.rows.length > 0) {
      school = res.rows[0];
    }
  } catch (err) {
    console.error('Error fetching school via direct query:', err);
  }

  if (!school) {
    const { data, error } = await supabase
      .from('schools')
      .select('*')
      .eq('email', decodedEmail)
      .single();
      
    if (!error && data) {
      school = data;
    }
  }

  if (!school) {
    console.error('Error fetching school profile:', school);
    return notFound();
  }

  return (
    <CustomizerClientView school={school} />
  );
}
