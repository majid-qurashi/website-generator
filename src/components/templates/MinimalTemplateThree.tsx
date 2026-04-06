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
  name: "City Central Public School",
  tagline: "Bold Thinking for a Bright Future",
  description: "A modern approach to education in the heart of the city. We prepare our students for the global challenges of the 21st century through innovation and critical thinking.",
  logo: null,
  image: "https://picsum.photos/seed/school3/1200/800",
  template: "template3"
};

export default function MinimalTemplateThree({ onSelect, data = defaultData, isFullPage = false }: TemplateProps) {
  const school = data || defaultData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`flex flex-col bg-slate-50 text-slate-900 ${!isFullPage ? 'border rounded-xl overflow-hidden shadow-sm h-[400px]' : 'min-h-screen'} font-sans`}>
      
      {/* Ultra Minimal Header */}
      <nav className="bg-white border-b border-gray-200 px-6 py-6 md:px-16 flex justify-between items-center relative z-50">
        <div className="flex items-center space-x-4">
          {school.logo ? (
            <img src={school.logo} alt="Logo" className="w-12 h-12 grayscale object-contain" />
          ) : (
            <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-black text-xl">C</div>
          )}
          <span className="font-black text-xl md:text-3xl tracking-tighter uppercase whitespace-nowrap">{school.name}</span>
        </div>

        {/* Minimalist Nav */}
        <div className="hidden md:flex space-x-12 text-sm font-black uppercase tracking-tighter text-slate-400">
           <span className="hover:text-slate-950 transition-colors cursor-pointer">Academics</span>
           <span className="hover:text-slate-950 transition-colors cursor-pointer">Community</span>
           <span className="hover:text-slate-950 transition-colors cursor-pointer">Login</span>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex flex-col space-y-1.5 p-2 bg-slate-50 rounded-lg">
           <div className="w-6 h-1 bg-slate-900"></div>
           <div className="w-6 h-1 bg-slate-900"></div>
        </button>

         {/* Mobile Menu Overlay */}
         {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-8 flex flex-col space-y-8 shadow-2xl md:hidden font-black uppercase">
             <span className="text-slate-950">Academics</span>
             <span className="text-slate-950">Community</span>
             <span className="text-slate-950">Login</span>
          </div>
        )}
      </nav>

      <div className={`${!isFullPage ? 'overflow-y-auto no-scrollbar' : ''}`}>
        {/* Simple Hero Section */}
        <section className={`transition-all ${isFullPage ? 'p-6 md:p-16' : 'p-4'}`}>
          <div className={`overflow-hidden rounded-3xl md:rounded-[4rem] group/hero ${isFullPage ? 'h-[400px] md:h-[700px]' : 'aspect-video shadow-xl'}`}>
            <img 
              src={school.image || "https://picsum.photos/seed/school3/1200/800"} 
              alt="School" 
              className="w-full h-full object-cover brightness-90 grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className={`mt-8 md:mt-16 ${isFullPage ? 'max-w-5xl mx-auto' : 'p-2'}`}>
            <h1 className={`font-black tracking-tighter leading-[0.9] mb-12 text-slate-950 uppercase italic ${isFullPage ? 'text-6xl md:text-9xl' : 'text-3xl'}`}>
              {school.tagline}
            </h1>
          </div>
        </section>

        {/* Minimal About Section */}
        <section className={`px-6 md:px-16 py-24 pb-48 max-w-7xl mx-auto ${isFullPage ? '' : 'p-8'}`}>
           <div className="flex flex-col md:flex-row gap-16 md:gap-32">
              <div className="md:w-1/3">
                 <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 mb-8 pb-4 border-b-8 border-slate-900">About</h2>
              </div>
              <div className="md:w-2/3">
                 <p className={`text-slate-600 leading-tight font-bold ${isFullPage ? 'text-2xl md:text-3xl' : 'text-base'}`}>
                    {school.description}
                 </p>
              </div>
           </div>
        </section>

        {/* Classic Footer */}
        <footer className="bg-white border-t border-slate-200 py-32 px-16">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
              <div className="text-4xl font-black italic tracking-tighter opacity-10">{school.name}</div>
              <p className="font-black text-xs md:text-base tracking-[0.5em] uppercase text-slate-400 text-center md:text-right">
                Developed by <br/> <a href="https://qurashi.vercel.app" target="_blank" className="text-slate-950 hover:text-blue-600 transition-colors underline underline-offset-8 mt-4 inline-block">Majid Qurashi</a>
              </p>
           </div>
        </footer>
      </div>

      {/* Select Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-slate-950/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none group">
           <button onClick={(e) => { e.stopPropagation(); onSelect(); }} className="bg-white text-slate-950 font-black px-12 py-5 rounded-2xl shadow-2xl transform scale-[0.8] group-hover:scale-100 transition-all pointer-events-auto">
             Select Minimal Style
           </button>
           <p className="text-slate-300 text-[10px] mt-6 font-black tracking-[0.5em] uppercase">PURE MINIMALISM</p>
        </div>
      )}
    </div>
  );
}
