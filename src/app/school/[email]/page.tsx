import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ email: string }>;
}

export default async function SchoolWebsitePage({ params }: PageProps) {
  const { email } = await params;
  
  // Decoding email in case it's URL encoded (e.g. %40 for @)
  const decodedEmail = decodeURIComponent(email);

  // Fetch school data from Supabase
  const { data: school, error } = await supabase
    .from('schools')
    .select('*')
    .eq('email', decodedEmail)
    .single();

  if (error || !school) {
    console.error('Error fetching school:', error);
    return notFound();
  }

  // Choose template based on school.template
  const renderTemplate = () => {
    const props = {
      data: school,
      isFullPage: true,
    };

    switch (school.template) {
      case 'template1':
        return <TemplateOne {...props} />;
      case 'template2':
        return <TemplateTwo {...props} />;
      case 'template3':
        return <TemplateThree {...props} />;
      default:
        // Fallback to TemplateOne if none selected or unknown
        return <TemplateOne {...props} />;
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {renderTemplate()}
      
      {/* Admin Floating Edit Button (Optional Bonus) */}
      <div className="fixed bottom-8 right-8 z-50">
        <a 
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-2xl flex items-center space-x-2 transition-all transform hover:scale-105"
        >
          <span>🏠 Return Home</span>
        </a>
      </div>
    </main>
  );
}
