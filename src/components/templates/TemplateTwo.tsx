import React from 'react';

interface TemplateProps {
  onSelect: () => void;
}

export default function TemplateTwo({ onSelect }: TemplateProps) {
  return (
    <div className="group relative flex flex-col bg-amber-50 dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-900/50 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-500 ease-out transform hover:-translate-y-2">
      {/* Template Header / Window Bar */}
      <div className="bg-amber-100 dark:bg-amber-900/30 px-5 py-3 flex justify-between items-center border-b-2 border-amber-200 dark:border-amber-900/50">
        <div className="text-xs font-bold text-amber-800 dark:text-amber-500 tracking-wider uppercase">Future Stars Villagam</div>
        <div className="flex space-x-1.5">
          <div className="w-2.5 h-2.5 rounded bg-amber-300 dark:bg-amber-700"></div>
          <div className="w-2.5 h-2.5 rounded bg-amber-300 dark:bg-amber-700"></div>
          <div className="w-2.5 h-2.5 rounded bg-amber-300 dark:bg-amber-700"></div>
        </div>
      </div>

      {/* Template Preview Content */}
      <div className="h-[400px] overflow-y-auto no-scrollbar relative select-none">

        {/* Playful Nav */}
        <div className="flex justify-between items-center p-5">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-tl-xl rounded-br-xl bg-orange-500"></div>
            <span className="font-black text-slate-800 dark:text-white text-sm">F.Stars</span>
          </div>
          <div className="flex space-x-2">
            <div className="px-2 py-1 rounded-full bg-white dark:bg-slate-800 text-[9px] font-bold text-orange-600 shadow-sm">Home</div>
            <div className="px-2 py-1 rounded-full bg-transparent text-[9px] font-bold text-slate-500">Faculty</div>
            <div className="px-2 py-1 rounded-full bg-transparent text-[9px] font-bold text-slate-500">Contact</div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="px-5 pb-6 pt-2">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-amber-100 dark:border-slate-700 flex flex-col items-center text-center relative overflow-hidden">
            {/* Blob shape background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200 dark:bg-yellow-900/30 rounded-full blur-3xl opacity-50 transform translate-x-10 -translate-y-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200 dark:bg-orange-900/30 rounded-full blur-2xl opacity-50 transform -translate-x-10 translate-y-10"></div>

            <div className="relative z-10">
              <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[8px] font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-3 inline-block">Admissions Open 2026</span>
              <h1 className="text-slate-800 dark:text-white font-black text-2xl leading-tight mb-3">Discover Your<br /><span className="text-orange-500">True Potential</span></h1>
              <p className="text-slate-500 dark:text-slate-400 text-[10px] max-w-xs mx-auto mb-5 leading-relaxed">Where creativity meets excellence. Join Future Stars school for a journey of lifelong learning.</p>

              <div className="flex space-x-3 justify-center">
                <div className="bg-orange-500 text-white text-[10px] font-bold px-4 py-2 rounded-xl shadow-lg shadow-orange-500/30">Explore Programs</div>
                <div className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white text-[10px] font-bold px-4 py-2 rounded-xl">Watch Video</div>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry-style Course Cards */}
        <div className="px-5 pb-6 columns-2 gap-3 space-y-3">
          <div className="bg-rose-100 dark:bg-rose-900/20 p-4 rounded-2xl break-inside-avoid">
            <div className="w-8 h-8 rounded-full bg-rose-200 dark:bg-rose-800 mb-2 flex items-center justify-center text-xs">🎨</div>
            <div className="h-2 w-3/4 bg-rose-300 dark:bg-rose-700/50 rounded mb-1"></div>
            <div className="h-1.5 w-full bg-rose-200 dark:bg-rose-800/50 rounded"></div>
          </div>
          <div className="bg-emerald-100 dark:bg-emerald-900/20 p-4 rounded-2xl break-inside-avoid h-32">
            <div className="w-8 h-8 rounded-full bg-emerald-200 dark:bg-emerald-800 mb-2 flex items-center justify-center text-xs">🔬</div>
            <div className="h-2 w-3/4 bg-emerald-300 dark:bg-emerald-700/50 rounded mb-1"></div>
            <div className="h-1.5 w-full bg-emerald-200 dark:bg-emerald-800/50 rounded"></div>
          </div>
          <div className="bg-sky-100 dark:bg-sky-900/20 p-4 rounded-2xl break-inside-avoid h-24">
            <div className="w-8 h-8 rounded-full bg-sky-200 dark:bg-sky-800 mb-2 flex items-center justify-center text-xs">💻</div>
            <div className="h-2 w-3/4 bg-sky-300 dark:bg-sky-700/50 rounded mb-1"></div>
          </div>
        </div>

        {/* Notification Banner */}
        <div className="px-5 pb-6">
          <div className="bg-slate-800 text-white p-4 rounded-2xl flex items-center space-x-3 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-20 h-full bg-amber-400 transform -skew-x-12 translate-x-4 mix-blend-overlay"></div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex-shrink-0 flex items-center justify-center">🔔</div>
            <div>
              <div className="h-2 w-24 bg-white/50 rounded mb-1.5"></div>
              <div className="h-1.5 w-40 bg-white/30 rounded"></div>
            </div>
          </div>
        </div>

        {/* Fade Out */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-50 dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* Select Button Overlay */}
      <div className="absolute inset-0 bg-slate-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center backdrop-blur-sm rounded-[2rem]">
        <button
          onClick={onSelect}
          className="bg-orange-500 text-white font-bold px-8 py-3 rounded-2xl transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-75 hover:bg-orange-600 shadow-xl shadow-orange-500/30"
        >
          Select "Future Stars Villagam"
        </button>
        <p className="text-white/80 text-sm mt-4 font-medium transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-150">Vibrant, Playful & Creative</p>
      </div>
    </div>
  );
}
