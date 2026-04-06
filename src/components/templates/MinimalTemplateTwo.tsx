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
  name: "Green Fields Academy",
  tagline: "Cultivating Knowledge in Natural Spaces",
  description: "A community of learners where every student is encouraged to explore their potential and reach for excellence. Join us in a journey of lifelong learning.",
  logo: null,
  image: "https://picsum.photos/seed/school2/1200/800",
  template: "template2"
};

export default function MinimalTemplateTwo({ onSelect, data = defaultData, isFullPage = false }: TemplateProps) {
  const school = data || defaultData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`flex flex-col bg-stone-50 text-stone-900 ${!isFullPage ? 'border rounded-xl overflow-hidden shadow-sm h-[400px]' : 'min-h-screen'} font-serif`}>
      
      {/* Simple Centered Header */}
      <nav className="bg-white border-b border-stone-200 px-6 py-6 md:px-12 flex flex-col md:flex-row justify-between items-center relative z-50 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4 group cursor-pointer">
          {school.logo ? (
            <img src={school.logo} alt="Logo" className="w-10 h-10 rounded-full object-cover border border-emerald-100" />
          ) : (
            <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">G</div>
          )}
          <span className="font-black text-lg md:text-2xl tracking-tight text-emerald-900 uppercase italic underline decoration-emerald-200 underline-offset-4">{school.name}</span>
        </div>

        {/* Global Nav */}
        <div className="hidden md:flex items-center space-x-12 text-sm font-black uppercase tracking-widest text-stone-400">
           <span className="hover:text-emerald-600 cursor-pointer transition-colors">Campus</span>
           <span className="hover:text-emerald-600 cursor-pointer transition-colors">Admissions</span>
           <span className="hover:text-emerald-600 cursor-pointer transition-colors">Philosophy</span>
        </div>

        {/* Simple Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 border border-stone-200 rounded-lg flex items-center justify-center bg-stone-50">
           <div className={`w-4 h-4 rounded-sm transition-all ${isMenuOpen ? 'bg-emerald-600' : 'bg-stone-300'}`}></div>
        </button>

         {/* Mobile Menu Overlay */}
         {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-stone-100 p-6 flex flex-col space-y-6 shadow-2xl md:hidden text-center">
             <span className="font-black text-emerald-800">Campus</span>
             <span className="font-black text-emerald-800">Admissions</span>
             <span className="font-black text-emerald-800">Philosophy</span>
          </div>
        )}
      </nav>

      <div className={`${!isFullPage ? 'overflow-y-auto no-scrollbar' : ''}`}>
        {/* Simple Hero Section */}
        <header className="px-6 md:px-20 py-10 md:py-20">
          <div className={`relative overflow-hidden rounded-[2.5rem] md:rounded-[4rem] group/hero ${isFullPage ? 'h-[400px] md:h-[600px]' : 'aspect-video shadow-lg'}`}>
            <img 
              src={school.image || "https://picsum.photos/seed/school2/1200/800"} 
              alt="School" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/hero:scale-110"
            />
            <div className="absolute inset-0 bg-emerald-950/20 mix-blend-multiply"></div>
          </div>
          <div className={`mt-8 md:mt-16 ${isFullPage ? 'text-center max-w-4xl mx-auto' : 'p-2'}`}>
            <h1 className={`font-black tracking-tight leading-tight mb-8 text-emerald-950 ${isFullPage ? 'text-4xl md:text-8xl' : 'text-2xl'}`}>
              {school.tagline}
            </h1>
          </div>
        </header>

        {/* Minimal About Section */}
        <section className={`px-6 md:px-20 py-20 bg-stone-100 border-y border-stone-200 mt-20 ${isFullPage ? '' : 'p-6'}`}>
          <div className="max-w-4xl mx-auto">
            <span className="font-black uppercase tracking-[0.4em] text-emerald-600 text-[10px] mb-8 block">Our Story</span>
            <p className={`text-stone-700 leading-relaxed italic font-medium ${isFullPage ? 'text-xl md:text-3xl' : 'text-sm'}`}>
              "{school.description}"
            </p>
          </div>
        </section>

        {/* Classic Footer */}
        <footer className="bg-stone-900 text-stone-500 py-24 px-12 text-center flex flex-col items-center">
           <div className="w-12 h-0.5 bg-emerald-600 mb-12"></div>
           <p className="font-bold text-xs md:text-sm tracking-widest uppercase">
             Developed by <a href="https://qurashi.vercel.app" target="_blank" className="text-emerald-500 hover:text-white transition-colors underline underline-offset-8">Majid Qurashi</a>
           </p>
           <div className="mt-20 opacity-20 text-[10px] uppercase font-black tracking-[1em]">Eco Education 2026</div>
        </footer>
      </div>

      {/* Select Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-stone-900/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none group">
           <button onClick={(e) => { e.stopPropagation(); onSelect(); }} className="bg-emerald-600 text-white font-black px-10 py-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-all pointer-events-auto">
             Select Minimal Green
           </button>
           <p className="text-white text-[10px] mt-4 font-black tracking-widest animate-pulse">NATURAL SPACES</p>
        </div>
      )}
    </div>
  );
}
