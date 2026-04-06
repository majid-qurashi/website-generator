'use client';

import React from 'react';
import { SchoolData } from '@/types/school';

interface TemplateProps {
  onSelect?: () => void;
  data?: SchoolData;
  isFullPage?: boolean;
}

const defaultData: SchoolData = {
  email: 'admin@school.com',
  name: "Green Valley High",
  tagline: "Tradition & Excellence",
  description: "Since 1924, Green Valley High has been committed to providing a holistic education rooted in timeless values.",
  logo: null,
  image: "https://picsum.photos/seed/school3/1200/800",
  template: "template3"
};

export default function TemplateThree({ onSelect, data = defaultData, isFullPage = false }: TemplateProps) {
  const school = data || defaultData;

  return (
    <div className={`group relative flex flex-col bg-stone-50 dark:bg-stone-950 ${!isFullPage ? 'border border-stone-300 dark:border-stone-800 shadow-xl hover:shadow-stone-500/20 transition-all duration-700 ease-out transform hover:-translate-y-2' : 'min-h-screen'} font-serif selection:bg-amber-100 selection:text-amber-900`}>
      
      {/* Institutional Header (Only in Preview) */}
      {!isFullPage && (
        <div className="bg-stone-900 dark:bg-black px-6 py-4 flex items-center justify-between border-b-2 border-amber-800">
          <div className="flex space-x-3">
             <div className="w-2 h-2 rounded-full bg-amber-600"></div>
             <div className="w-2 h-2 rounded-full bg-amber-800"></div>
          </div>
          <div className="text-[9px] font-sans tracking-[0.5em] text-amber-500 uppercase font-black">{school.name}</div>
          <div className="w-10"></div>
        </div>
      )}

      {/* Template Content */}
      <div className={`${!isFullPage ? 'h-[400px] overflow-y-auto no-scrollbar relative select-none' : 'w-full'}`}>

        {/* Prestigious Nav */}
        <nav className={`bg-emerald-950 text-emerald-50 border-b-[6px] border-amber-600 flex flex-col items-center relative z-[100] ${isFullPage ? 'py-16 px-8 md:px-24' : 'p-6'}`}>
          <div className={`border-2 border-amber-600 rounded-full flex items-center justify-center mb-8 bg-emerald-900/50 shadow-2xl relative group-hover:scale-105 transition-transform ${isFullPage ? 'w-24 h-24 md:w-32 md:h-32 text-4xl' : 'w-12 h-12 text-lg'}`}>
             <div className="absolute inset-[-4px] border border-amber-600/30 rounded-full animate-pulse"></div>
            {school.logo ? (
              <img src={school.logo} alt="Logo" className="w-full h-full rounded-full object-cover p-2" />
            ) : (
              <span className="text-amber-500 font-serif lowercase italic font-black">
                {school.name?.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          <div className={`font-serif tracking-[0.1em] text-center mb-8 max-w-4xl text-amber-400 font-bold ${isFullPage ? 'text-4xl md:text-7xl lg:text-8xl' : 'text-xl'}`}>
            {school.name}
          </div>

          <div className={`flex justify-center flex-wrap gap-x-12 gap-y-4 font-sans tracking-[0.3em] font-black uppercase text-amber-100/50 pt-8 border-t border-amber-800/30 w-full max-w-5xl ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">ACADEMICS</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">STAFF</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">ALUMNI</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">ADMISSIONS</span>
            <span className="hover:text-amber-500 cursor-pointer transition-colors">CONTACT</span>
          </div>
        </nav>

        {/* Institutional Hero */}
        <header className="relative">
          <div className={`bg-stone-300 dark:bg-stone-900 relative overflow-hidden ${isFullPage ? 'h-[500px] md:h-[800px]' : 'aspect-video'}`}>
            <img
              src={school.image || "https://picsum.photos/seed/school3/1200/800"}
              alt="School Building"
              className="absolute inset-0 w-full h-full object-cover scale-110 grayscale brightness-50 sepia-[0.3]"
            />
            <div className="absolute inset-0 bg-emerald-950/60 mix-blend-multiply"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
          </div>

          {/* Overlapping Intro Card - Highly Responsive */}
          <div className={`bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 relative z-50 text-center shadow-[0_50px_100px_-20px_rgba(4,47,31,0.5)] mx-auto ${isFullPage ? 'p-12 md:p-24 -mt-24 md:-mt-48 max-w-5xl rounded-2xl md:rounded-[4rem]' : 'p-8 mx-6 -mt-16'}`}>
            <span className="uppercase font-sans font-black tracking-[0.5em] text-amber-600 text-[10px] mb-6 block">Legacy of Excellence</span>
            <h2 className={`text-emerald-950 dark:text-emerald-100 font-serif font-black mb-8 leading-[1.1] ${isFullPage ? 'text-4xl md:text-7xl lg:text-8xl' : 'text-2xl'}`}>
              {school.tagline}
            </h2>
            <div className="w-16 md:w-32 h-1 bg-amber-600 mx-auto mb-10"></div>
            <p className={`text-stone-600 dark:text-stone-400 font-serif leading-relaxed mb-12 mx-auto italic font-medium ${isFullPage ? 'text-xl md:text-3xl max-w-3xl' : 'text-xs max-w-xs'}`}>
              "{school.description}"
            </p>
            <div className={`border-[3px] border-amber-700 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-amber-500 font-sans uppercase tracking-[0.4em] inline-block hover:bg-amber-700 hover:text-white transition-all cursor-pointer font-black shadow-2xl ${isFullPage ? 'px-16 py-6 text-sm md:px-20 md:py-8 md:text-lg' : 'px-6 py-3 text-[10px]'}`}>
              Admission Open 2026
            </div>
          </div>
        </header>

        {/* Prestigious Stats Grid */}
        <section className={`grid gap-12 md:gap-20 max-w-7xl mx-auto py-24 md:py-48 px-8 ${isFullPage ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 p-6'}`}>
          <div className="text-center group/stat">
            <div className={`font-serif font-black text-emerald-950 dark:text-emerald-100 transition-all group-hover/stat:text-amber-600 ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>100%</div>
            <div className={`uppercase tracking-[0.3em] text-stone-400 font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Graduation Honor</div>
          </div>
          <div className="text-center group/stat">
            <div className={`font-serif font-black text-emerald-950 dark:text-emerald-100 transition-all group-hover/stat:text-amber-600 ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>Est.</div>
            <div className={`uppercase tracking-[0.3em] text-stone-400 font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Since 1924</div>
          </div>
          <div className="text-center group/stat">
            <div className={`font-serif font-black text-emerald-950 dark:text-emerald-100 transition-all group-hover/stat:text-amber-600 ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>50+</div>
            <div className={`uppercase tracking-[0.3em] text-stone-400 font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Faculty PhDs</div>
          </div>
          <div className="text-center group/stat">
            <div className={`font-serif font-black text-emerald-950 dark:text-emerald-100 transition-all group-hover/stat:text-amber-600 ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>Gold</div>
             <div className={`uppercase tracking-[0.3em] text-stone-400 font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Quality Standard</div>
          </div>
        </section>

        {/* Classy Institutional News */}
        <section className={`bg-stone-100 dark:bg-stone-900 border-y-4 border-stone-200 dark:border-stone-800 ${isFullPage ? 'py-32 px-8' : 'p-8'}`}>
          <div className="max-w-6xl mx-auto">
            <h3 className={`font-serif font-black italic tracking-widest text-emerald-950 dark:text-emerald-500 mb-20 text-center ${isFullPage ? 'text-3xl md:text-5xl' : 'text-base'}`}>Latest Institutional Bulletin</h3>
            
            <div className={`grid gap-12 ${isFullPage ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
               {[1,2,3].map((i) => (
                 <div key={i} className="group cursor-pointer relative pb-10 border-b border-stone-300 dark:border-stone-800">
                    <span className="font-sans font-black text-amber-700 text-[10px] tracking-[0.4em] uppercase block mb-4">OCTOBER 2026</span>
                    <h4 className="font-serif font-black text-2xl md:text-3xl text-emerald-950 dark:text-stone-100 leading-tight group-hover:text-amber-700 transition-colors">Building the Leaders of the 21st Century</h4>
                    <div className="mt-8 h-12 w-12 border-2 border-emerald-950 dark:border-emerald-500 rounded-full flex items-center justify-center group-hover:bg-amber-700 group-hover:border-amber-700 transition-all">
                       <span className="group-hover:text-white transition-colors">→</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </section>

        {/* Prestigious Footer */}
        <footer className={`bg-emerald-950 text-amber-500/50 flex flex-col items-center ${isFullPage ? 'py-32 px-12' : 'py-16'}`}>
          <div className={`font-serif font-black tracking-[0.2em] mb-12 text-center text-amber-600 ${isFullPage ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-2xl'}`}>
             {school.name}
          </div>
          <div className="w-24 h-1 bg-amber-800 mb-12"></div>
          <p className="text-emerald-100 font-serif italic text-base md:text-xl text-center max-w-sm mb-16">Institutional Excellence since 1924. Building the elite leaders of tomorrow.</p>
          <div className="flex flex-wrap justify-center gap-10 font-sans font-black text-[10px] tracking-[0.5em] mb-20 opacity-50">
             <span>POLICIES</span>
             <span>STAFF</span>
             <span>ALUMNI</span>
             <span>CAREERS</span>
          </div>
          <p className="border border-amber-800/30 px-10 py-6 text-center text-[9px] tracking-[0.6em] uppercase font-bold text-amber-700/60 leading-loose">
             Developed for the elite by Majid Qurashi <br/>
             © 2026 Institutional Quality Certified
          </p>
        </footer>

        {/* Fade Out (Only in Preview) */}
        {!isFullPage && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 dark:from-stone-950 to-transparent z-20 pointer-events-none"></div>
        )}
      </div>

      {/* Select Button Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[200] flex flex-col items-center justify-center backdrop-blur-md">
          <button
            onClick={onSelect}
            className="bg-amber-600 text-stone-950 font-serif font-black tracking-[0.2em] px-12 py-5 transform scale-90 group-hover:scale-100 transition-all duration-500 hover:bg-amber-500 shadow-[0_30px_60px_-15px_rgba(217,119,6,0.3)]"
          >
            Select Style Three
          </button>
          <p className="text-amber-200/50 text-[10px] sm:text-xs mt-6 font-serif tracking-[0.5em] uppercase text-center font-bold">Prestigious & Traditional</p>
        </div>
      )}
    </div>
  );
}
