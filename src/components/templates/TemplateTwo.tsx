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
  name: "Future Stars International",
  tagline: "Discover Your True Potential",
  description: "Where creativity meets excellence. Join Future Stars school for a journey of lifelong learning.",
  logo: null,
  image: "https://picsum.photos/seed/school2/1200/800",
  template: "template2"
};

export default function TemplateTwo({ onSelect, data = defaultData, isFullPage = false }: TemplateProps) {
  const school = data || defaultData;

  return (
    <div className={`group relative flex flex-col bg-amber-50 dark:bg-slate-950 ${!isFullPage ? 'border-2 border-amber-200 dark:border-amber-900/50 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-700 ease-out transform hover:-translate-y-2' : 'min-h-screen'} font-sans overflow-x-hidden`}>
      
      {/* Playful Header (Only in Preview) */}
      {!isFullPage && (
        <div className="bg-amber-100 dark:bg-amber-900/30 px-6 py-3 flex justify-between items-center border-b-2 border-amber-200 dark:border-amber-900/50">
          <div className="text-[10px] font-black text-amber-800 dark:text-amber-500 tracking-wider uppercase italic">{school.name}</div>
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          </div>
        </div>
      )}

      {/* Template Content */}
      <div className={`${!isFullPage ? 'h-[400px] overflow-y-auto no-scrollbar relative select-none' : 'w-full'}`}>

        {/* Dynamic Nav */}
        <nav className={`flex justify-between items-center z-50 relative ${isFullPage ? 'px-6 py-6 md:px-12 max-w-7xl mx-auto w-full' : 'p-5'}`}>
          <div className="flex items-center space-x-3 group/logo cursor-pointer">
            {school.logo ? (
              <img src={school.logo} alt="Logo" className="w-10 h-10 md:w-14 md:h-14 rounded-2xl rotate-3 group-hover/logo:rotate-0 transition-transform shadow-lg" />
            ) : (
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-tl-[1.5rem] rounded-br-[1.5rem] bg-orange-500 flex items-center justify-center text-white font-black text-xl md:text-3xl shadow-xl shadow-orange-500/30 rotate-3 group-hover/logo:rotate-0 transition-transform">F</div>
            )}
            <span className={`font-black text-slate-900 dark:text-white tracking-widest uppercase italic ${isFullPage ? 'text-xl md:text-3xl' : 'text-sm'}`}>{school.name}</span>
          </div>
          <div className={`hidden md:flex items-center space-x-4`}>
             <div className="px-8 py-3 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-black text-sm shadow-xl shadow-slate-200/50 dark:shadow-none hover:bg-orange-500 hover:text-white transition-all cursor-pointer">Programs</div>
             <div className="px-8 py-3 rounded-full bg-orange-500 text-white font-black text-sm shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer">Contact Us</div>
          </div>
        </nav>

        {/* Creative Hero Section */}
        <header className={`${isFullPage ? 'px-4 md:px-8 py-4 md:py-10 max-w-7xl mx-auto w-full' : 'px-5 pb-6'}`}>
          <div className={`bg-white dark:bg-slate-900 rounded-[3.5rem] md:rounded-[5rem] shadow-2xl shadow-orange-500/5 border border-amber-100 dark:border-slate-800 flex flex-col items-center text-center relative overflow-hidden ${isFullPage ? 'p-10 md:p-32' : 'p-8'}`}>
            
            {/* Animated Floating Blobs */}
            <div className="absolute top-0 right-0 w-64 md:w-[500px] h-64 md:h-[500px] bg-yellow-300/20 dark:bg-yellow-900/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-48 md:w-[400px] h-48 md:h-[400px] bg-orange-400/20 dark:bg-orange-900/10 rounded-full blur-[80px] animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className={`bg-orange-100/80 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-black uppercase tracking-[0.3em] py-2 px-6 rounded-full mb-8 inline-block animate-bounce ${isFullPage ? 'text-xs md:text-sm' : 'text-[8px]'}`}>
                🌟 Admissions Open 2026/27
              </div>
              <h1 className={`text-slate-900 dark:text-white font-black leading-[1] mb-8 md:mb-10 ${isFullPage ? 'text-5xl md:text-8xl lg:text-9xl max-w-5xl' : 'text-3xl'}`}>
                {school.tagline?.split(' ').slice(0, -2).join(' ')} <br/>
                <span className="text-orange-500 underline decoration-yellow-400 decoration-8 underline-offset-[12px] italic">{school.tagline?.split(' ').slice(-2).join(' ')}</span>
              </h1>
              <p className={`text-slate-500 dark:text-slate-400 mx-auto mb-12 leading-relaxed font-bold ${isFullPage ? 'text-lg md:text-2xl max-w-3xl' : 'text-[10px] max-w-xs'}`}>
                {school.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className={`bg-orange-500 text-white font-black rounded-3xl shadow-2xl shadow-orange-500/40 hover:scale-110 active:scale-95 transition-all cursor-pointer ${isFullPage ? 'px-14 py-6 text-xl' : 'px-6 py-3 text-[10px]'}`}>
                  Enroll Today 🚀
                </div>
                <div className={`bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-black rounded-3xl hover:bg-slate-200 transition-all cursor-pointer ${isFullPage ? 'px-14 py-6 text-xl' : 'px-6 py-3 text-[10px]'}`}>
                  Watch Video 🎬
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Funky Grid Sections */}
        <section className={`gap-6 ${isFullPage ? 'columns-1 sm:columns-2 lg:columns-3 p-8 md:p-20 max-w-7xl mx-auto' : 'columns-2 px-5 pb-6 gap-3'} space-y-6 md:space-y-10`}>
          
          <div className="bg-rose-100 dark:bg-rose-900/30 p-10 md:p-14 rounded-[3.5rem] break-inside-avoid shadow-xl shadow-rose-200/20 hover:rotate-2 transition-transform cursor-pointer relative overflow-hidden group/item">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-bl-full translate-x-12 -translate-y-12 transition-transform group-hover/item:translate-x-6 group-hover/item:-translate-y-6"></div>
            <div className="w-16 h-16 rounded-3xl bg-white dark:bg-rose-800 mb-8 flex items-center justify-center text-4xl shadow-lg shadow-rose-500/20">🎨</div>
            <h3 className="font-black text-rose-950 dark:text-rose-100 text-2xl md:text-4xl mb-4">Creative Arts</h3>
            <p className="text-rose-900/60 dark:text-rose-300 font-bold leading-relaxed mb-6">Unleashing inner artists through modern digital tools and classic techniques.</p>
            <div className="w-full h-3 bg-white/50 rounded-full">
               <div className="w-3/4 h-full bg-rose-500 rounded-full"></div>
            </div>
          </div>

          <div className="bg-sky-100 dark:bg-sky-900/30 p-10 md:p-14 rounded-[3.5rem] break-inside-avoid shadow-xl shadow-sky-200/20 hover:-rotate-2 transition-transform cursor-pointer relative overflow-hidden group/item">
            <div className="w-16 h-16 rounded-3xl bg-white dark:bg-sky-800 mb-8 flex items-center justify-center text-4xl shadow-lg shadow-sky-500/20">🚀</div>
            <h3 className="font-black text-sky-950 dark:text-sky-100 text-2xl md:text-4xl mb-4">Space Tech</h3>
            <p className="text-sky-900/60 dark:text-sky-300 font-bold leading-relaxed">Exploring the final frontier with our new observational observatory.</p>
          </div>

          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-10 md:p-14 rounded-[3.5rem] break-inside-avoid shadow-xl shadow-emerald-200/20 hover:scale-105 transition-transform cursor-pointer overflow-hidden">
             <div className="w-16 h-16 rounded-3xl bg-white dark:bg-emerald-800 mb-8 flex items-center justify-center text-4xl">🌱</div>
             <h3 className="font-black text-emerald-950 dark:text-emerald-100 text-2xl md:text-4xl mb-4">Eco-Leaders</h3>
             <p className="text-emerald-900/60 font-bold">Leading the sustainability movement in local communities.</p>
          </div>
        </section>

        {/* Large Pattern Image (Only in Full) */}
        {isFullPage && school.image && (
          <section className="px-6 md:px-12 py-10 max-w-7xl mx-auto w-full">
             <div className="rounded-[4rem] md:rounded-[7rem] overflow-hidden h-[400px] md:h-[800px] shadow-2xl relative group/img">
                <img src={school.image} className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/img:scale-110" alt="School Banner" />
                <div className="absolute inset-0 bg-orange-500/20 mix-blend-overlay"></div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/80 backdrop-blur-xl p-10 md:p-20 rounded-[3rem] md:rounded-[5rem] shadow-2xl text-center md:text-left select-none animate-in slide-in-from-bottom-20 duration-1000">
                   <div className="text-orange-500 font-black tracking-widest uppercase mb-4">Campus Life</div>
                   <h2 className="text-3xl md:text-6xl font-black text-slate-800 mb-6 leading-tight">A second home <br/> for our stars.</h2>
                   <button className="bg-slate-900 text-white font-black px-12 py-4 rounded-3xl hover:bg-orange-500 transition-colors">Take Virtual Tour</button>
                </div>
             </div>
          </section>
        )}

        {/* Vibrant Sticky Banner */}
        <div className={`relative ${isFullPage ? 'max-w-7xl mx-auto px-6 md:px-12 py-24' : 'px-5 pb-10'}`}>
          <div className="bg-slate-900 text-white p-10 md:p-20 rounded-[4rem] md:rounded-[6rem] flex flex-col md:flex-row items-center justify-between relative overflow-hidden group/banner shadow-2xl">
            <div className="absolute right-0 top-0 w-[500px] h-full bg-orange-500 transform -skew-x-[30deg] translate-x-64 mix-blend-overlay group-hover/banner:translate-x-32 transition-transform duration-1000"></div>
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12 relative z-10 text-center md:text-left">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex-shrink-0 flex items-center justify-center text-5xl shadow-2xl rotate-12 group-hover/banner:rotate-[-12deg] transition-transform">🔔</div>
              <div>
                <div className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Sports Festival 2026</div>
                <div className="text-slate-400 text-lg md:text-xl font-bold max-w-lg">Join 500+ participants for three days of athletic glory. Early bird registration is open!</div>
              </div>
            </div>
            {isFullPage && (
              <div className="bg-orange-500 hover:bg-white hover:text-slate-950 text-white font-black px-12 py-5 rounded-3xl relative z-10 cursor-pointer shadow-xl transition-all active:scale-95 text-lg mt-12 md:mt-0">Register Now</div>
            )}
          </div>
        </div>

        {/* Iconic Footer */}
        <footer className={`bg-slate-950 text-white ${isFullPage ? 'py-32 px-12' : 'py-16'}`}>
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-12 animate-pulse">
              <div className="w-12 h-12 rounded-tl-[1.5rem] rounded-br-[1.5rem] bg-orange-500"></div>
              <span className="font-black text-4xl tracking-tighter italic uppercase">{school.name}</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left mb-20 w-full font-black uppercase tracking-widest text-[10px] md:text-xs">
              <div className="space-y-4">
                 <div className="text-orange-500">Nav</div>
                 <div className="text-slate-600 hover:text-white transition-colors cursor-pointer">Academics</div>
                 <div className="text-slate-600 hover:text-white transition-colors cursor-pointer">Faculty</div>
              </div>
              <div className="space-y-4">
                 <div className="text-orange-500">Legal</div>
                 <div className="text-slate-600 hover:text-white transition-colors cursor-pointer">Privacy</div>
                 <div className="text-slate-600 hover:text-white transition-colors cursor-pointer">Staff</div>
              </div>
               <div className="col-span-2 md:col-span-2 flex flex-col items-center md:items-end space-y-6">
                  <div className="text-slate-500 font-bold normal-case text-right">Join 5,000+ students on their journey to the stars.</div>
                  <div className="bg-white/5 p-4 rounded-[2rem] flex space-x-6">
                     <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all">IG</div>
                     <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all">YT</div>
                  </div>
               </div>
            </div>
            <p className="text-slate-700 text-[9px] font-black tracking-[1em] uppercase border-t border-slate-900 pt-12 text-center">
              © 2026 Majid Qurashi — Future Starts Today
            </p>
          </div>
        </footer>

        {/* Fade Out (Only in Preview) */}
        {!isFullPage && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-50 dark:from-slate-950 to-transparent z-20 pointer-events-none"></div>
        )}
      </div>

      {/* Select Button Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[200] flex flex-col items-center justify-center backdrop-blur-md rounded-[3rem]">
          <button
            onClick={onSelect}
            className="bg-orange-500 text-white font-black px-10 py-4 rounded-[1.5rem] transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-100 hover:bg-orange-600 shadow-2xl shadow-orange-500/40"
          >
            Select Style Two
          </button>
          <p className="text-orange-400 text-[10px] mt-6 font-black tracking-[0.4em] uppercase animate-pulse">Dynamic Creativity</p>
        </div>
      )}
    </div>
  );
}
