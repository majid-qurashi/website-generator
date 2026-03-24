'use client';

import { useState } from 'react';
import SchoolRegistrationModal from './SchoolRegistrationModal';

export default function CTA() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Elevate Your School's Online Presence?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl mx-auto">
            Join hundreds of schools that have successfully transformed their digital presence with School Website Builder. 
            Create a professional, engaging website for your institution today—no coding skills required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsRegistrationOpen(true)}
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 px-10 rounded-lg transition duration-200 transform hover:scale-105 shadow-xl text-lg"
            >
              Register Your School Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-10 rounded-lg transition duration-200 text-lg">
              Schedule a Demo
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-8">
            Every services are free to start.
          </p>
        </div>
      </section>

      <SchoolRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </>
  );
}
