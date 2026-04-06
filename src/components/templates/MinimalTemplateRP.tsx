'use client';

import React, { useState } from 'react';
import { SchoolData } from '@/types/school';

interface TemplateProps {
  onSelect?: () => void;
  data?: SchoolData;
  isFullPage?: boolean;
}

const defaultData: SchoolData = {
  email: 'admin@rpschool.edu.in',
  name: "R.P SCHOOL",
  tagline: "Where The Journey Of Knowledge Begins",
  description: "R.P School is a premier educational institution dedicated to providing excellence in academic and personal development. We believe in nurturing young minds to become leaders of tomorrow through tradition, discipline, and modern innovation.",
  logo: null,
  image: "https://picsum.photos/seed/school_rp/1200/800",
  template: "template4"
};

export default function MinimalTemplateRP({ onSelect, data = defaultData, isFullPage = false }: TemplateProps) {
  const school = data || defaultData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // RP School Colors
  const primaryGreen = "#498406";
  const secondaryGold = "#FFF200";

  return (
    <div className={`flex flex-col bg-white text-slate-800 ${!isFullPage ? 'border rounded-xl overflow-hidden shadow-md h-[400px]' : 'min-h-screen'} font-serif transition-all duration-700 pb-20`}>
      
      {/* Top Banner (Contact) */}
      <div className={`hidden md:flex bg-slate-100 border-b border-gray-200 py-1 px-8 justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500`}>
         <div className="flex space-x-6">
            <span>📞 +91 123 456 7890</span>
            <span>✉️ info@rpschool.edu.in</span>
         </div>
         <div className="flex space-x-4">
            <span className="hover:text-emerald-600 cursor-pointer">Login</span>
            <span className="text-red-600 font-black">Online Registration</span>
         </div>
      </div>

      {/* Main Header (R.P School Style) */}
      <nav 
        className="px-4 py-4 md:px-12 flex justify-between items-center relative z-50 border-b-4 border-emerald-700 shadow-md"
        style={{ backgroundColor: primaryGreen }}
      >
        <div className="flex items-center space-x-4">
          {school.logo ? (
            <img src={school.logo} alt="Logo" className="w-10 h-10 md:w-14 md:h-14 bg-white p-1 rounded-lg object-contain shadow-sm" />
          ) : (
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white text-emerald-800 rounded-lg flex items-center justify-center font-black text-2xl border-2 border-slate-200 shadow-inner">RP</div>
          )}
          <div className="flex flex-col">
             <span className="font-black text-xl md:text-3xl tracking-wide uppercase italic leading-none drop-shadow-sm" style={{ color: secondaryGold }}>
               {school.name}
             </span>
             <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-[0.3em] mt-1 opacity-90">An Institutional Legacy</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-white">
           <span className="hover:text-yellow-400 transition-colors cursor-pointer border-b-2 border-transparent hover:border-yellow-400 pb-1">Academics</span>
           <span className="hover:text-yellow-400 transition-colors cursor-pointer border-b-2 border-transparent hover:border-yellow-400 pb-1">Admissions</span>
           <span className="hover:text-yellow-400 transition-colors cursor-pointer border-b-2 border-transparent hover:border-yellow-400 pb-1">Our Campus</span>
           <span className="hover:text-yellow-400 transition-colors cursor-pointer border-b-2 border-transparent hover:border-yellow-400 pb-1">Faculties</span>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 bg-emerald-800/50 rounded-lg border border-white/20">
          <div className="w-6 h-0.5 bg-yellow-400 mb-1"></div>
          <div className="w-6 h-0.5 bg-yellow-400 mb-1"></div>
          <div className="w-6 h-0.5 bg-yellow-400"></div>
        </button>

         {/* Mobile Menu Overlay */}
         {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-emerald-900 p-6 flex flex-col space-y-6 shadow-2xl lg:hidden text-white font-bold uppercase border-t-2 border-yellow-500">
             <span className="hover:text-yellow-400">Academics</span>
             <span className="hover:text-yellow-400">Admissions</span>
             <span className="hover:text-yellow-400">Campus</span>
             <span className="hover:text-yellow-400">Faculty</span>
          </div>
        )}
      </nav>

      <div className={`${!isFullPage ? 'overflow-y-auto no-scrollbar' : ''}`}>
        {/* Academic Hero Section */}
        <section className="relative overflow-hidden">
          <div className={`${isFullPage ? 'h-[400px] md:h-[650px]' : 'h-[160px]'} w-full border-b-8 border-yellow-500`}>
            <img 
              src={school.image || "https://picsum.photos/seed/school_rp/1200/800"} 
              alt="Campus" 
              className="w-full h-full object-cover transition-transform duration-[5000ms] hover:scale-105"
            />
            {isFullPage && <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent"></div>}
          </div>
          
          <div className={`bg-emerald-800 text-white p-6 md:p-12 ${isFullPage ? 'text-center' : 'p-4'}`}>
            <h1 className={`font-black italic uppercase leading-none font-serif tracking-tighter shadow-black/20 drop-shadow-2xl ${isFullPage ? 'text-4xl md:text-8xl' : 'text-xl'}`}>
              "{school.tagline}"
            </h1>
            <div className="w-24 md:w-48 h-1.5 md:h-2 bg-yellow-400 mx-auto mt-6 md:mt-10 rounded-full"></div>
          </div>
        </section>

        {/* Academic Dividier (Graduation Cap Icon) */}
        <div className={`flex justify-center -mt-8 relative z-10 ${!isFullPage ? 'hidden' : ''}`}>
           <div className="bg-yellow-400 p-4 md:p-6 rounded-full shadow-2xl border-8 border-white ring-4 ring-emerald-50 text-3xl md:text-5xl">
             🎓
           </div>
        </div>

        {/* Traditional About Section */}
        <section className={`px-6 md:px-20 py-20 bg-stone-50 border-y-2 border-stone-100 ${isFullPage ? 'mt-10' : 'p-6'}`}>
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
             <div className="md:w-1/3 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-emerald-900 border-l-8 border-yellow-500 pl-6 border-b-2 md:border-b-0 pb-4 md:pb-0">ABOUT <br className="hidden md:block"/> OUR INSTITUTE</h2>
             </div>
             <div className="md:w-2/3">
                <p className={`text-stone-600 leading-relaxed font-serif ${isFullPage ? 'text-xl md:text-2xl leading-[1.6]' : 'text-sm'}`}>
                  {school.description}
                </p>
                {isFullPage && (
                  <button className="mt-12 bg-red-600 hover:bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-sm shadow-xl transition-all transform hover:-translate-y-1">
                    Read More 📜
                  </button>
                )}
             </div>
          </div>
        </section>

        {/* Classic Footer (R.P School Style) */}
        <footer className={`bg-emerald-950 text-emerald-500 py-24 px-12 text-center border-t-8 border-emerald-900`}>
           <div className="mb-12">
             <span className="text-3xl" style={{ color: secondaryGold }}>🎓</span>
             <h4 className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] mt-4" style={{ color: secondaryGold }}>{school.name}</h4>
           </div>
           
           <p className="font-bold text-xs md:text-base tracking-[0.2em] uppercase max-w-lg mx-auto opacity-80 leading-relaxed">
             Developed with excellence by <br className="md:hidden"/> <a href="https://qurashi.vercel.app" target="_blank" className="text-yellow-400 hover:text-white transition-colors underline underline-offset-8 mt-4 inline-block font-black">Majid Qurashi</a>
           </p>
        </footer>
      </div>

      {/* Select Overlay (Only in Preview Card) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-emerald-900/60 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer pointer-events-none group">
           <button onClick={(e) => { e.stopPropagation(); onSelect(); }} className="bg-yellow-400 text-emerald-900 font-black px-10 py-4 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-all pointer-events-auto border-4 border-white">
             Select Excellence Style
           </button>
           <p className="text-yellow-400 text-[10px] mt-4 font-black tracking-[0.5em] animate-pulse">ACADEMIC LEGACY</p>
        </div>
      )}
    </div>
  );
}
