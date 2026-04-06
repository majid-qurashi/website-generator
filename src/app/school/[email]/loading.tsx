import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-xl font-bold text-slate-800 dark:text-white animate-pulse">Generating your website...</div>
      <p className="text-slate-500 text-sm">Fetching school data from Supabase</p>
    </div>
  );
}
