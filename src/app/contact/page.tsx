import React from 'react';
import ContactForm from '../../components/ContactForm';
import Navigation from '../../components/Navigation';

export const metadata = {
  title: 'Contact Us | School Website Builder',
  description: 'Get in touch with us. Send us an email and we will get back to you shortly.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us and our team will respond as soon as possible.
          </p>
        </div>
        
        <ContactForm />
      </div>
    </main>
  );
}
