'use client';

import { useState, useEffect } from 'react';
import SchoolRegistrationModal from './SchoolRegistrationModal';

export default function Hero() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <section id="home" className="pt-20 pb-32 bg-gradient-to-br from-blue-50 to-white" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" suppressHydrationWarning>
                {isMounted ? (
                  <span className="inline-block">
                    {['Build', 'Your', 'School', 'Website', 'in', 'Minutes'].map((word, wordIndex) => {
                      const colors = ['#2563eb', '#a855f7', '#f97316', '#0d9488', '#4f46e5', '#e11d48'];
                      return (
                        <span key={wordIndex} className="inline-block animate-word-appear" style={{animationDelay: `${wordIndex * 0.2}s`}}>
                          <span style={{color: colors[wordIndex]}}>{word[0]}</span>
                          <span>{word.slice(1)}</span>
                          {wordIndex < 5 && '\u00A0'}
                        </span>
                      );
                    })}
                  </span>
                ) : (
                  <span className="inline-block">
                    {['Build', 'Your', 'School', 'Website', 'in', 'Minutes'].map((word, wordIndex) => {
                      const colors = ['#2563eb', '#a855f7', '#f97316', '#0d9488', '#4f46e5', '#e11d48'];
                      return (
                        <span key={wordIndex} className="inline-block animate-word-appear-slow" style={{animationDelay: `${wordIndex * 0.4}s`}}>
                          <span style={{color: colors[wordIndex]}}>{word[0]}</span>
                          <span>{word.slice(1)}</span>
                          {wordIndex < 5 && '\u00A0'}
                        </span>
                      );
                    })}
                  </span>
                )}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                No coding required. Create a professional, modern website for your school in minutes. 
                Engage parents, showcase achievements, and manage your school's online presence effortlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsRegistrationOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 transform hover:scale-105 shadow-lg"
                >
                  School Registration
                </button>
                <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition duration-200">
                  Learn More
                </button>
              </div>
              {/* Trust Badges */}
              <div className="mt-12 text-sm text-gray-600">
                <p className="mb-3 font-semibold">Limited features available. Project under development.</p>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Free to start</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="rounded-2xl h-48 sm:h-64 md:h-96 overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300">
                <img
                  src="https://i.ibb.co/qMBVXr8w/file-000000004f1c71fa872d6a7534c2d24d.png"
                  alt="Website Builder Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes word-appear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-word-appear {
          animation: word-appear 0.6s ease-out forwards;
          display: inline-block;
        }

        .animate-word-appear-slow {
          animation: word-appear 1.2s ease-out forwards;
          display: inline-block;
        }
      `}</style>

      <SchoolRegistrationModal
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
      />
    </>
  );
}
