'use client';

import React from 'react';
import TemplateOne from './templates/TemplateOne';
import TemplateTwo from './templates/TemplateTwo';
import TemplateThree from './templates/TemplateThree';

export default function TemplatesSection() {
  const handleSelectTemplate = (templateName: string) => {
    // In a real app, this would update global state, cookie, or API
    console.log(`Selected Template: ${templateName}`);
    alert(`You selected the "${templateName}" template!\n\nThis template will be applied to your school website.`);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-200" id="templates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-blue-600 dark:text-blue-400 font-semibold tracking-wide uppercase">
            Website Templates
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Choose your school's new look
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 mx-auto">
            Select from our visually stunning, professionally designed layouts tailored specifically for educational institutions.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <TemplateOne onSelect={() => handleSelectTemplate("Qurashi's School (Minimal)")} />
          <TemplateTwo onSelect={() => handleSelectTemplate("Future Stars (Vibrant)")} />
          <TemplateThree onSelect={() => handleSelectTemplate("Green Valley High (Classic)")} />
        </div>

        {/* Postscript */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Need a custom design instead?{' '}
            <a href="/contact" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
              Contact our designers
            </a>.
          </p>
        </div>

      </div>
    </section>
  );
}
