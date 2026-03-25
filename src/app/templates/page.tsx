import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import TemplatesSection from '../../components/TemplatesSection';

export const metadata = {
  title: 'Website Templates | School Website Builder',
  description: 'Select beautiful, professionally designed website templates for your school.',
};

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 flex flex-col">
      <Navigation />
      
      <div className="flex-grow pt-10 pb-12">
        <TemplatesSection />
      </div>

      <Footer />
    </main>
  );
}
