import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import CustomizerClientView from './CustomizerClientView';

interface PageProps {
  params: Promise<{ email: string }>;
}

export default async function CustomizePage({ params }: PageProps) {
  const { email } = await params;
  const decodedEmail = decodeURIComponent(email);

  // Fetch school details from database
  const { data: school, error } = await supabase
    .from('schools')
    .select('*')
    .eq('email', decodedEmail)
    .single();

  if (error || !school) {
    console.error('Error fetching school profile:', error);
    return notFound();
  }

  return (
    <CustomizerClientView school={school} />
  );
}
