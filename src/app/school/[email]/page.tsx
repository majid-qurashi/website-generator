import React from 'react';
import { supabase } from '@/lib/supabaseClient';
import MinimalTemplateOne from '@/components/templates/MinimalTemplateOne';
import MinimalTemplateTwo from '@/components/templates/MinimalTemplateTwo';
import MinimalTemplateThree from '@/components/templates/MinimalTemplateThree';
import MinimalTemplateRP from '@/components/templates/MinimalTemplateRP';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import { SchoolThemeProvider } from '@/components/SchoolThemeProvider';
import { notFound } from 'next/navigation';

import { query } from '@/lib/db';

interface PageProps {
  params: Promise<{ email: string }>;
}

export default async function SchoolWebsitePage({ params }: PageProps) {
  const { email } = await params;
  
  // Decoding email in case it's URL encoded (e.g. %40 for @)
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
    console.error('Error: School profile not found.');
    return notFound();
  }

  // Choose template based on school.template
  const renderTemplate = () => {
    const props = {
      data: school,
      isFullPage: true,
      customTheme: school.theme_settings,
    };

    switch (school.template) {
      case 'template1':
        return <TemplateOne {...props} />;
      case 'template2':
        return <TemplateTwo {...props} />;
      case 'template3':
        return <TemplateThree {...props} />;
      case 'minimal1':
        return <MinimalTemplateOne {...props} />;
      case 'minimal2':
        return <MinimalTemplateTwo {...props} />;
      case 'minimal3':
        return <MinimalTemplateThree {...props} />;
      case 'minimal4':
        return <MinimalTemplateRP {...props} />;
      default:
        // Fallback logic
        if (school.template?.startsWith('minimal')) return <MinimalTemplateOne {...props} />;
        return <TemplateOne {...props} />;
    }
  };

  return (
    <SchoolThemeProvider initialThemeData={school.theme_settings}>
      <main className="min-h-screen bg-theme-bg text-theme-text transition-colors duration-300">
        {renderTemplate()}
        
        {/* Admin Floating actions */}
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex items-center space-x-2.5 sm:space-x-3">
          <a 
            href={`/school/${email}/customize`}
            title="Customize Theme"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold w-11 h-11 sm:w-auto sm:h-auto py-3 px-3 sm:py-3 sm:px-5 md:py-3.5 md:px-6 rounded-full shadow-2xl flex items-center justify-center sm:space-x-2 transition-all transform hover:scale-105 border border-indigo-400/20 text-base sm:text-sm md:text-base"
          >
            <span>🎨</span>
            <span className="hidden sm:inline">Customize Theme</span>
          </a>
          <a 
            href="/admin/login"
            title="Admin Login"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold w-11 h-11 sm:w-auto sm:h-auto py-3 px-3 sm:py-3 sm:px-5 md:py-3.5 md:px-6 rounded-full shadow-2xl flex items-center justify-center sm:space-x-2 transition-all transform hover:scale-105 border border-slate-700/30 text-base sm:text-sm md:text-base"
          >
            <span>🔑</span>
            <span className="hidden sm:inline">Admin Login</span>
          </a>
        </div>
      </main>
    </SchoolThemeProvider>
  );
}

