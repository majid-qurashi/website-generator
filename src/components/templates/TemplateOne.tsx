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
  name: "Qurashi's International School",
  tagline: "Excellence in Education",
  description: "Empowering the next generation of leaders with world-class facilities and expert faculty.",
  logo: null,
  image: "https://picsum.photos/seed/school1/1200/800",
  template: "template1"
};

export default function TemplateOne({ onSelect, data = defaultData, isFullPage = false }: TemplateProps) {
  const school = data || defaultData;

  return (
    <div className={`group relative flex flex-col bg-white dark:bg-gray-950 ${!isFullPage ? 'border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2' : 'min-h-screen'} font-sans selection:bg-indigo-100 selection:text-indigo-900`}>
      
      {/* OS Header / Window Bar (Only in Preview) */}
      {!isFullPage && (
        <div className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 flex items-center border-b border-gray-100 dark:border-gray-800">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
          </div>
          <div className="mx-auto text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{school.name}</div>
        </div>
      )}

      {/* Template Content */}
      <div className={`${!isFullPage ? 'h-[400px] overflow-y-auto no-scrollbar relative select-none' : 'w-full'}`}>

        {/* Premium Sticky Nav */}
        <nav className={`sticky top-0 z-[100] transition-all duration-500 ${isFullPage ? 'px-6 py-4 md:px-12 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-gray-100 dark:border-gray-800' : 'p-4'}`}>
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
               {school.logo ? (
                <img src={school.logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10 rounded-xl" />
              ) : (
                <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-sm md:text-lg shadow-lg shadow-indigo-600/30">Q</div>
              )}
              <div className={`font-black text-gray-900 dark:text-white tracking-tight ${isFullPage ? 'text-lg md:text-2xl' : 'text-sm'}`}>{school.name}</div>
            </div>
            <div className={`hidden md:flex items-center space-x-10 text-sm font-bold text-gray-500 dark:text-gray-400`}>
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Academics</span>
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">Admissions</span>
              <span className="hover:text-indigo-600 transition-colors cursor-pointer">About</span>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-95">Apply Now</button>
            </div>
          </div>
        </nav>

        {/* Dynamic Hero Section */}
        <header className={`${isFullPage ? 'px-4 md:px-8 py-6 md:py-12 max-w-7xl mx-auto w-full' : 'px-4'}`}>
          <div className={`relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-gray-100 dark:bg-gray-800 ${isFullPage ? 'h-[450px] md:h-[650px]' : 'aspect-video'} group/hero`}>
            <img
              src={school.image || "https://picsum.photos/seed/school1/1200/800"}
              alt={school.name || "School"}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover/hero:scale-110"
            />
            {/* Multi-layered Gradient for Depth */}
            <div className="absolute inset-0 bg-indigo-950/40 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/20 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 via-transparent to-transparent hidden md:block"></div>
            
            <div className={`absolute inset-0 z-10 flex flex-col justify-end ${isFullPage ? 'p-8 md:p-24' : 'p-6'}`}>
              <div className="max-w-3xl">
                <span className={`inline-block py-1 md:py-2 px-3 md:px-5 rounded-full bg-indigo-600/20 backdrop-blur-md border border-indigo-400/30 text-indigo-200 font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 ${isFullPage ? 'text-[10px] md:text-xs' : 'text-[6px]'}`}>
                  Est. 1998 — Top Rated Institution
                </span>
                <h1 className={`text-white font-black leading-[1.1] mb-6 md:mb-8 transition-all ${isFullPage ? 'text-4xl md:text-7xl lg:text-8xl' : 'text-xl'}`}>
                  {school.tagline || "Future Ready Education"}
                </h1>
                <p className={`text-gray-300 md:text-gray-200 mb-8 md:mb-12 leading-relaxed font-medium md:font-semibold ${isFullPage ? 'text-sm md:text-xl lg:text-2xl max-w-2xl' : 'text-[9px] max-w-[80%]'}`}>
                  {school.description}
                </p>
                <div className="flex space-x-4">
                  <div className={`bg-indigo-600 text-white font-black rounded-2xl shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-all cursor-pointer ${isFullPage ? 'px-10 py-5' : 'px-4 py-2 text-[8px]'}`}>
                    Get Started Today
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Refined Stats Block */}
        <section className={`grid gap-4 md:gap-8 max-w-7xl mx-auto ${isFullPage ? 'grid-cols-1 sm:grid-cols-3 p-8 md:p-16' : 'grid-cols-3 px-4 py-8'}`}>
          <div className="group/stat bg-slate-50 dark:bg-gray-900/40 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all hover:bg-indigo-600 hover:border-indigo-500">
             <div className="text-4xl md:text-6xl font-black text-indigo-600 group-hover/stat:text-white transition-colors mb-2">98%</div>
             <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 group-hover/stat:text-indigo-100 transition-colors">Career Success</div>
          </div>
          <div className="group/stat bg-slate-50 dark:bg-gray-900/40 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all hover:bg-emerald-600 hover:border-emerald-500">
             <div className="text-4xl md:text-6xl font-black text-emerald-600 group-hover/stat:text-white transition-colors mb-2">50+</div>
             <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 group-hover/stat:text-emerald-100 transition-colors">Global Awards</div>
          </div>
          <div className="group/stat bg-slate-50 dark:bg-gray-900/40 p-8 md:p-12 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all hover:bg-purple-600 hover:border-purple-500">
             <div className="text-4xl md:text-6xl font-black text-purple-600 group-hover/stat:text-white transition-colors mb-2">12k</div>
             <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 group-hover/stat:text-purple-100 transition-colors">Alumni Network</div>
          </div>
        </section>

        {/* Deeply Responsive About Section */}
        {isFullPage && (
          <section className="py-24 md:py-32 px-6 overflow-hidden relative">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 blur-[150px] -z-10"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="inline-block py-2 px-5 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-widest mb-6">Our Mission</div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 leading-tight">Shaping the leaders <br/> of tomorrow.</h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-10">
                  {school.description}
                  <br /><br />
                  Founded with a vision to provide quality education, our school has been a lighthouse for students for over two decades. We believe in holistic development and preparing students for the challenges of tomorrow.
                </p>
                <div className="grid grid-cols-2 gap-10">
                   <div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white mb-2 italic">Holistic</div>
                      <p className="text-sm text-gray-500">Focus on mental, physical and emotional growth.</p>
                   </div>
                   <div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white mb-2 italic">Innovative</div>
                      <p className="text-sm text-gray-500">Cutting-edge labs and world-class technology.</p>
                   </div>
                </div>
              </div>
              <div className="lg:order-2 grid grid-cols-2 gap-4">
                  <div className="h-64 md:h-[450px] rounded-[3rem] bg-indigo-500 overflow-hidden shadow-2xl shadow-indigo-500/20">
                    <img src="https://picsum.photos/seed/edu1/800/1200" className="object-cover w-full h-full" alt="Feature" />
                  </div>
                  <div className="h-64 md:h-[450px] rounded-[3rem] bg-blue-500 overflow-hidden shadow-2xl shadow-blue-500/20 translate-y-12">
                    <img src="https://picsum.photos/seed/edu2/800/1200" className="object-cover w-full h-full" alt="Feature" />
                  </div>
              </div>
            </div>
          </section>
        )}

        {/* Minimal Premium Footer */}
        <footer className={`bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 ${isFullPage ? 'py-24 px-8' : 'py-10 mt-8'}`}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-12 md:space-y-0">
             <div className="text-center md:text-left space-y-6">
                <div className={`font-black tracking-tighter text-gray-950 dark:text-white ${isFullPage ? 'text-4xl' : 'text-xl'}`}>{school.name}</div>
                <p className="text-gray-500 font-medium md:max-w-xs">{school.tagline}</p>
             </div>
             <div className={`grid ${isFullPage ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2'} gap-12 md:gap-24 text-sm font-bold`}>
                <div className="space-y-4">
                   <div className="text-gray-400 uppercase tracking-widest text-[10px]">Links</div>
                   <div className="text-gray-600 dark:text-gray-300 transition-colors">Home</div>
                   <div className="text-gray-600 dark:text-gray-300 transition-colors">Faculty</div>
                </div>
                <div className="space-y-4">
                   <div className="text-gray-400 uppercase tracking-widest text-[10px]">Resources</div>
                   <div className="text-gray-600 dark:text-gray-300 transition-colors">Support</div>
                   <div className="text-gray-600 dark:text-gray-300 transition-colors">Terms</div>
                </div>
             </div>
          </div>
          <div className="max-w-7xl mx-auto pt-20 text-center text-gray-400 text-[10px] font-bold tracking-[0.5em] uppercase">
             © 2026 Developed by Majid Qurashi <br/> The Future Starts Here
          </div>
        </footer>

        {/* Fade Out (Only in Preview) */}
        {!isFullPage && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-20 pointer-events-none"></div>
        )}
      </div>

      {/* Select Button Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[200] flex flex-col items-center justify-center backdrop-blur-sm">
          <button
            onClick={onSelect}
            className="bg-white text-indigo-600 font-black px-10 py-4 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 shadow-2xl hover:shadow-indigo-500/20"
          >
            Select Style One
          </button>
          <p className="text-white/80 text-[10px] sm:text-xs mt-4 font-bold uppercase tracking-[0.2em]">Sleek Professionalism</p>
        </div>
      )}
    </div>
  );
}
