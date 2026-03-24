'use client';

import { useEffect, useState } from 'react';

interface InaugurationPageProps {
  onComplete: () => void;
}

export default function InaugurationPage({ onComplete }: InaugurationPageProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted to prevent hydration mismatch
    setIsMounted(true);

    const timer = setTimeout(() => {
      setIsComplete(true);
      onComplete();
    }, 5000); // 5 seconds before transitioning

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Only render after hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <div
      suppressHydrationWarning
      className={`fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center justify-center z-50 transition-opacity duration-1000 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Logo Animation */}
        <div className="mb-8 animate-bounce-slow">
          <svg
            width="120"
            height="120"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto w-fit drop-shadow-2xl"
          >
            {/* School Building Logo */}
            <circle cx="20" cy="20" r="20" fill="white" opacity="0.1" />
            <path
              d="M20 6L8 14V34H32V14L20 6Z"
              fill="white"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M8 14L20 6L32 14"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="20" cy="5" r="1.5" fill="#fbbf24" />
            <line x1="20" y1="6.5" x2="20" y2="12" stroke="#fbbf24" strokeWidth="1.5" />
            <rect x="11" y="18" width="2.5" height="2.5" fill="white" rx="0.3" />
            <rect x="11" y="23" width="2.5" height="2.5" fill="white" rx="0.3" />
            <rect x="11" y="28" width="2.5" height="2.5" fill="white" rx="0.3" />
            <rect x="26.5" y="18" width="2.5" height="2.5" fill="white" rx="0.3" />
            <rect x="26.5" y="23" width="2.5" height="2.5" fill="white" rx="0.3" />
            <rect x="26.5" y="28" width="2.5" height="2.5" fill="white" rx="0.3" />
            <rect x="18.5" y="28" width="3" height="6" fill="white" rx="0.4" />
            <circle cx="21" cy="31" r="0.4" fill="#2563eb" />
          </svg>
        </div>

        {/* Main Title with Typing Animation */}
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in tracking-tight">
            School Website Builder
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-delay font-light">
          Building the Future of Educational Websites
        </p>

        {/* Status Badge */}
        <div className="inline-block mb-12 animate-pulse-slow">
          <div className="bg-white bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-full border border-white border-opacity-30">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
              <span className="text-black font-semibold">Project Under Development</span>
            </div>
          </div>
        </div>

        {/* Features Coming Soon */}
        <div className="grid grid-cols-3 gap-4 mb-12 max-w-md mx-auto">
          <div className="animate-fade-in-delay-1">
            <div className="text-2xl mb-2">🎨</div>
            <p className="text-sm text-blue-100">Beautiful Design</p>
          </div>
          <div className="animate-fade-in-delay-2">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-sm text-blue-100">Fast & Secure</p>
          </div>
          <div className="animate-fade-in-delay-3">
            <div className="text-2xl mb-2">🚀</div>
            <p className="text-sm text-blue-100">Easy to Use</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-xs mx-auto">
          <div className="h-1 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 animate-progress-bar"></div>
          </div>
          <p className="text-sm text-blue-100 mt-3">Loading...</p>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            setIsComplete(true);
            onComplete();
          }}
          className="text-blue-100 hover:text-white text-sm underline transition opacity-75 hover:opacity-100 animate-fade-in-delay-4"
        >
          Skip → Enter Now
        </button>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.2s backwards;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in-delay 1s ease-out 0.4s backwards;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in-delay 1s ease-out 0.6s backwards;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in-delay 1s ease-out 0.8s backwards;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in-delay 1s ease-out 1s backwards;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-progress-bar {
          animation: progress-bar 5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
