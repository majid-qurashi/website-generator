import React from 'react';

interface TemplateProps {
  onSelect: () => void;
}

export default function TemplateOne({ onSelect }: TemplateProps) {
  return (
    <div className="group relative flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2">
      {/* Template Header / Window Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide">Qurashi's International School</div>
      </div>

      {/* Template Preview Content (Miniature styling) */}
      <div className="h-[400px] overflow-y-auto no-scrollbar relative select-none">

        {/* Nav */}
        <div className="flex justify-between items-center p-4">
          <div className="font-bold text-indigo-600 text-sm">QS.</div>
          <div className="flex space-x-3 text-[10px] text-gray-500 font-medium">
            <span>Home</span>
            <span>Faculty</span>
            <span>Courses</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative mx-4 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-video flex items-center justify-center group-hover:shadow-lg transition-shadow">
          <img
            src="https://picsum.photos/seed/school1/800/600"
            alt="School Hero"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent"></div>
          <div className="relative z-10 w-full px-6 py-8">
            <h1 className="text-white font-bold text-xl leading-tight mb-2">Excellence in<br />Education</h1>
            <p className="text-indigo-100 text-[10px] max-w-[60%] mb-4">Empowering the next generation of leaders with world-class facilities and expert faculty.</p>
            <div className="bg-white text-indigo-900 text-[10px] font-bold px-3 py-1.5 rounded-full inline-block">Enroll Now</div>
          </div>
        </div>

        {/* Highlights / Features */}
        <div className="px-4 py-6 grid grid-cols-3 gap-2">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
            <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-800 mb-2"></div>
            <div className="h-2 w-full bg-indigo-200 dark:bg-indigo-700/50 rounded mb-1"></div>
            <div className="h-2 w-2/3 bg-indigo-100 dark:bg-indigo-800/50 rounded"></div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-800 mb-2"></div>
            <div className="h-2 w-full bg-blue-200 dark:bg-blue-700/50 rounded mb-1"></div>
            <div className="h-2 w-2/3 bg-blue-100 dark:bg-blue-800/50 rounded"></div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl border border-purple-100 dark:border-purple-800/30">
            <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-800 mb-2"></div>
            <div className="h-2 w-full bg-purple-200 dark:bg-purple-700/50 rounded mb-1"></div>
            <div className="h-2 w-2/3 bg-purple-100 dark:bg-purple-800/50 rounded"></div>
          </div>
        </div>

        {/* Faculty Mini Section */}
        <div className="px-4 pb-6">
          <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-3">Expert Faculty</div>
          <div className="flex space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-1 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-8 h-8 rounded-full mb-2 object-cover" alt="Faculty" />
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-600 rounded mb-1"></div>
                <div className="h-1.5 w-1/2 bg-gray-100 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact/Footer Placeholder */}
        <div className="bg-gray-900 p-6 mt-4 flex flex-col items-center">
          <div className="h-3 w-1/3 bg-gray-700 rounded mb-4"></div>
          <div className="w-full h-12 bg-gray-800 rounded mb-2 border border-gray-700"></div>
          <div className="w-1/2 h-6 bg-indigo-500 rounded mt-2"></div>
        </div>

        {/* Fade Out Overlay to encourage selection */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent z-20 pointer-events-none"></div>
      </div>

      {/* Select Button Overlay inside the card */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex flex-col items-center justify-center backdrop-blur-sm">
        <button
          onClick={onSelect}
          className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-indigo-500/20"
        >
          Select "Qurashi's International School"
        </button>
        <p className="text-white/80 text-sm mt-4 font-medium">Clean, Minimal & Modern</p>
      </div>
    </div>
  );
}
