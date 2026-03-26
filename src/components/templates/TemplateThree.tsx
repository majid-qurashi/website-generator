import React from 'react';

interface TemplateProps {
  onSelect: () => void;
}

export default function TemplateThree({ onSelect }: TemplateProps) {
  return (
    <div className="group relative flex flex-col bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-md hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2">
      {/* Template Header / Window Bar */}
      <div className="bg-stone-800 dark:bg-black px-4 py-2 flex items-center justify-between border-b border-stone-700">
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-stone-600"></div>
        </div>
        <div className="text-[10px] font-serif tracking-widest text-stone-400 uppercase">Green Valley High</div>
        <div className="w-10"></div> {/* Spacer for symmetry */}
      </div>

      {/* Template Preview Content */}
      <div className="h-[400px] overflow-y-auto no-scrollbar relative select-none font-serif">

        {/* Classic Nav */}
        <div className="bg-emerald-900 text-emerald-50 p-4 border-b-4 border-emerald-700 flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-emerald-400 rounded-full flex items-center justify-center mb-2">
            <span className="text-emerald-400 font-bold text-xs mt-1">GV</span>
          </div>
          <div className="font-bold text-lg tracking-widest uppercase mb-3">Kupwara Public School</div>

          <div className="flex justify-center space-x-4 text-[10px] font-sans tracking-widest border-t border-emerald-800/50 pt-3 w-full">
            <span className="hover:text-emerald-300">HOME</span>
            <span className="hover:text-emerald-300">ACADEMICS</span>
            <span className="hover:text-emerald-300">FACULTY</span>
            <span className="hover:text-emerald-300">CONTACT</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative">
          <div className="aspect-[21/9] bg-stone-300 dark:bg-stone-800 relative">
            <img
              src="https://picsum.photos/seed/school3/800/400"
              alt="Classic School Building"
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-50 contrast-125 mix-blend-multiply dark:mix-blend-screen"
            />
            <div className="absolute inset-0 bg-emerald-900/40"></div>
          </div>

          {/* Overlapping Intro Card */}
          <div className="bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 p-6 mx-5 -mt-10 relative z-10 text-center shadow-lg">
            <h2 className="text-stone-800 dark:text-stone-200 text-xl font-bold mb-2">Tradition & Excellence</h2>
            <p className="text-stone-500 text-[10px] font-sans leading-relaxed mb-4">
              Since 1924, Green Valley High has been committed to providing a holistic education rooted in timeless values.
            </p>
            <div className="border border-emerald-700 text-emerald-800 dark:text-emerald-400 px-4 py-1.5 text-[9px] uppercase tracking-widest inline-block hover:bg-emerald-700 hover:text-white transition-colors cursor-pointer">
              Apply Now
            </div>
          </div>
        </div>

        {/* Info Grid (Courses/Stats) */}
        <div className="p-5 grid grid-cols-2 gap-4 mt-2">
          <div className="border-l-2 border-emerald-600 pl-3">
            <div className="text-2xl font-bold text-stone-800 dark:text-stone-200">100%</div>
            <div className="text-[9px] uppercase tracking-wider text-stone-500 font-sans">Graduation Rate</div>
          </div>
          <div className="border-l-2 border-emerald-600 pl-3">
            <div className="text-2xl font-bold text-stone-800 dark:text-stone-200">45+</div>
            <div className="text-[9px] uppercase tracking-wider text-stone-500 font-sans">AP Courses</div>
          </div>
          <div className="border-l-2 border-emerald-600 pl-3">
            <div className="text-2xl font-bold text-stone-800 dark:text-stone-200">12:1</div>
            <div className="text-[9px] uppercase tracking-wider text-stone-500 font-sans">Student/Teacher</div>
          </div>
          <div className="border-l-2 border-emerald-600 pl-3">
            <div className="text-2xl font-bold text-stone-800 dark:text-stone-200">1924</div>
            <div className="text-[9px] uppercase tracking-wider text-stone-500 font-sans">Established</div>
          </div>
        </div>

        {/* Announcements section */}
        <div className="bg-stone-100 dark:bg-stone-800/50 p-5 border-y border-stone-200 dark:border-stone-700">
          <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-500 mb-4 text-center">Latest News</h3>
          <div className="space-y-3">
            <div className="flex space-x-3 items-start">
              <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 flex-shrink-0 flex flex-col items-center justify-center border border-stone-300 dark:border-stone-600">
                <span className="text-[8px] uppercase font-sans text-stone-500">Oct</span>
                <span className="text-sm font-bold text-stone-800 dark:text-stone-300 leading-none">12</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200">Fall Concert Series Begins</div>
                <div className="text-[9px] font-sans text-stone-500 mt-0.5">Join us in the grand auditorium.</div>
              </div>
            </div>
            <div className="flex space-x-3 items-start">
              <div className="w-10 h-10 bg-stone-200 dark:bg-stone-700 flex-shrink-0 flex flex-col items-center justify-center border border-stone-300 dark:border-stone-600">
                <span className="text-[8px] uppercase font-sans text-stone-500">Oct</span>
                <span className="text-sm font-bold text-stone-800 dark:text-stone-300 leading-none">18</span>
              </div>
              <div>
                <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200">Parent-Teacher Conferences</div>
                <div className="text-[9px] font-sans text-stone-500 mt-0.5">Please schedule via the portal.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Fade Out */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-stone-50 dark:from-stone-900 to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* Select Button Overlay */}
      <div className="absolute inset-0 bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center backdrop-blur-sm">
        <button
          onClick={onSelect}
          className="bg-emerald-600 text-stone-50 font-serif tracking-wide border border-emerald-400 px-8 py-3 transform -translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-500 shadow-2xl"
        >
          Select "KPS"
        </button>
        <p className="text-emerald-200/80 text-sm mt-4 font-serif tracking-widest uppercase text-[10px]">Classic & Traditional</p>
      </div>
    </div>
  );
}
