'use client';

import { useState, useEffect } from 'react';
import MinimalTemplateOne from '@/components/templates/MinimalTemplateOne';
import MinimalTemplateTwo from '@/components/templates/MinimalTemplateTwo';
import MinimalTemplateThree from '@/components/templates/MinimalTemplateThree';
import MinimalTemplateRP from '@/components/templates/MinimalTemplateRP';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';
import { SchoolData } from '@/types/school';

export default function PreviewPage() {
  const [data, setData] = useState<SchoolData | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('preview_school_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse preview data');
      }
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">No Preview Data Found</h1>
          <p className="text-slate-500">Please go back to the registration modal and click "Full Preview".</p>
        </div>
      </div>
    );
  }

  const renderTemplate = () => {
    const props = { data, isFullPage: true };
    switch (data.template) {
      case 'template1': return <TemplateOne {...props} />;
      case 'template2': return <TemplateTwo {...props} />;
      case 'template3': return <TemplateThree {...props} />;
      case 'minimal1': return <MinimalTemplateOne {...props} />;
      case 'minimal2': return <MinimalTemplateTwo {...props} />;
      case 'minimal3': return <MinimalTemplateThree {...props} />;
      case 'minimal4': return <MinimalTemplateRP {...props} />;
      default: 
        if (data.template?.startsWith('minimal')) return <MinimalTemplateOne {...props} />;
        return <TemplateOne {...props} />;
    }
  };

  return (
    <div className="relative">
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 h-10 bg-indigo-600 text-white flex items-center justify-center text-xs font-bold uppercase tracking-widest z-[9999] shadow-lg">
        ✨ Live Preview Mode — This is how your site will look! ✨
      </div>
      <div className="pt-10">
        {renderTemplate()}
      </div>
    </div>
  );
}
