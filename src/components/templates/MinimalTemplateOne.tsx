'use client';

import React, { useState } from 'react';
import { SchoolData } from '@/types/school';

interface TemplateProps {
  onSelect?: () => void;
  data?: SchoolData;
  isFullPage?: boolean;
}

const defaultData: SchoolData = {
  email: 'admin@school.com',
  name: "Sample Public School",
  tagline: "Excellence in Every Lesson",
  description: "Providing a nurturing environment where students can thrive academically and socially. We focus on holistic development and community values.",
  logo: null,
  image: "https://picsum.photos/seed/school1/1200/800",
  template: "template1"
};

export default function MinimalTemplateOne({ onSelect, data = defaultData, isFullPage = false }: TemplateProps) {
  const school = data || defaultData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`flex flex-col bg-white text-slate-900 ${!isFullPage ? 'border rounded-xl overflow-hidden shadow-sm h-[400px]' : 'min-h-screen'} font-sans`}>
      
      {/* Simple Header */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3 md:px-8 flex justify-between items-center relative z-50">
        <div className="flex items-center space-x-3">
          {school.logo ? (
            <img src={school.logo} alt="Logo" className="w-8 h-8 rounded-md object-cover" />
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs">S</div>
          )}
          <span className="font-bold text-sm md:text-lg tracking-tight">{school.name}</span>
        </div>

        {/* Hamburger Menu (Desktop Hidden) */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
           <span className="hover:text-blue-600 cursor-pointer">Home</span>
           <span className="hover:text-blue-600 cursor-pointer">About</span>
           <span className="hover:text-blue-600 cursor-pointer">Contact</span>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-1">
          <div className="w-6 h-0.5 bg-slate-600 mb-1"></div>
          <div className="w-6 h-0.5 bg-slate-600 mb-1"></div>
          <div className="w-6 h-0.5 bg-slate-600"></div>
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-4 flex flex-col space-y-4 shadow-xl md:hidden">
             <span className="font-bold text-slate-700">Home</span>
             <span className="font-bold text-slate-700">About</span>
             <span className="font-bold text-slate-700">Contact</span>
          </div>
        )}
      </nav>

      <div className={`${!isFullPage ? 'overflow-y-auto no-scrollbar' : ''}`}>
        {/* Simple Hero Section */}
        <section className="relative">
          <div className={`${isFullPage ? 'h-[300px] md:h-[500px]' : 'h-[150px]'} w-full overflow-hidden`}>
            <img 
              src={school.image || "https://picsum.photos/seed/school1/1200/800"} 
              alt="School" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className={`bg-blue-600 text-white p-6 md:p-12 ${isFullPage ? 'text-center' : 'p-4'}`}>
            <h1 className={`font-bold leading-tight mb-2 ${isFullPage ? 'text-3xl md:text-5xl' : 'text-lg'}`}>
              {school.tagline}
            </h1>
          </div>
        </section>

        {/* About Section */}
        <section className={`p-6 md:p-16 max-w-4xl mx-auto ${isFullPage ? '' : 'p-4'}`}>
          <h2 className="text-xl md:text-2xl font-bold mb-4 border-b-2 border-blue-600 inline-block">About Our School</h2>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            {school.description}
          </p>
        </section>

        {/* Classic Footer */}
        <footer className="mt-auto bg-slate-50 border-t border-gray-100 p-8 text-center">
           <p className="text-slate-400 text-xs md:text-sm">
             Developed by <a href="https://qurashi.vercel.app" target="_blank" className="text-blue-600 font-bold hover:underline">Majid Qurashi</a>
           </p>
        </footer>
      </div>

      {/* Select Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
           <button onClick={(e) => { e.stopPropagation(); onSelect(); }} className="bg-white text-blue-600 font-bold px-6 py-2 rounded-lg shadow-lg pointer-events-auto">
             Select Minimal Blue
           </button>
        </div>
      )}
    </div>
  );
}
