'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SchoolThemeProvider, useSchoolTheme } from '@/components/SchoolThemeProvider';
import ThemeCustomizer from '@/components/ThemeCustomizer';
import { SchoolData } from '@/types/school';

// Templates
import MinimalTemplateOne from '@/components/templates/MinimalTemplateOne';
import MinimalTemplateTwo from '@/components/templates/MinimalTemplateTwo';
import MinimalTemplateThree from '@/components/templates/MinimalTemplateThree';
import MinimalTemplateRP from '@/components/templates/MinimalTemplateRP';
import TemplateOne from '@/components/templates/TemplateOne';
import TemplateTwo from '@/components/templates/TemplateTwo';
import TemplateThree from '@/components/templates/TemplateThree';

interface ClientProps {
  school: SchoolData;
}

function CustomizerDashboard({ school }: ClientProps) {
  const { theme, saveTheme, loading, dirty, autoSaveStatus } = useSchoolTheme()!;
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Dynamic device responsive auto-scaling logic
  useEffect(() => {
    if (viewport === 'desktop' || !canvasRef.current) {
      setScale(1);
      return;
    }

    const updateScale = () => {
      if (!canvasRef.current) return;
      const padding = 64; // horizontal & vertical padding margins
      const canvasWidth = canvasRef.current.clientWidth - padding;
      const canvasHeight = canvasRef.current.clientHeight - padding;
      
      const targetWidth = viewport === 'tablet' ? 768 : 375;
      const targetHeight = viewport === 'tablet' ? 1024 : 750;

      const scaleX = canvasWidth / targetWidth;
      const scaleY = canvasHeight / targetHeight;
      const scaleFactor = Math.min(1, Math.min(scaleX, scaleY));
      setScale(scaleFactor);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    
    // ResizeObserver captures layout reflows when sidebar toggles
    const observer = new ResizeObserver(updateScale);
    if (canvasRef.current) observer.observe(canvasRef.current);

    return () => {
      window.removeEventListener('resize', updateScale);
      observer.disconnect();
    };
  }, [viewport, sidebarOpen]);

  const handlePublish = async () => {
    setSaveStatus('idle');
    const result = await saveTheme(school.email);
    if (result.success) {
      setSaveStatus('success');
      setTimeout(() => {
        setSaveStatus('idle');
        window.location.href = `/school/${school.email}`;
      }, 1500);
    } else {
      setSaveStatus('error');
      alert(`⚠️ Failed to publish: ${result.error}`);
    }
  };

  const renderTemplate = () => {
    const props = {
      data: {
        ...school,
        name: school.name,
        tagline: school.tagline,
        description: school.description,
        logo: school.logo,
        image: school.image,
      },
      isFullPage: true,
      customTheme: theme,
    };

    switch (school.template) {
      case 'template1': return <TemplateOne {...props} />;
      case 'template2': return <TemplateTwo {...props} />;
      case 'template3': return <TemplateThree {...props} />;
      case 'minimal1': return <MinimalTemplateOne {...props} />;
      case 'minimal2': return <MinimalTemplateTwo {...props} />;
      case 'minimal3': return <MinimalTemplateThree {...props} />;
      case 'minimal4': return <MinimalTemplateRP {...props} />;
      default: return <TemplateOne {...props} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans select-none">
      
      {/* Visual Workspace Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-20 select-none">
        
        {/* Toggle Sidebar & School Info */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-850 hover:bg-slate-800 border border-slate-750 text-slate-200 rounded-xl transition-all cursor-pointer"
            title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          >
            {sidebarOpen ? '📂' : '📁'}
          </button>
          
          <div className="hidden sm:block">
            <h1 className="text-sm font-black text-white leading-tight uppercase tracking-widest">{school.name}</h1>
            <p className="text-[10px] text-slate-400 tracking-wider">Visual Customizer Studio</p>
          </div>
        </div>

        {/* Viewport Toggles (Desktop, Tablet, Mobile) */}
        <div className="hidden md:flex items-center bg-slate-950/60 p-1 rounded-2xl border border-slate-800/80 space-x-0.5 shadow-inner">
          <button
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${viewport === 'desktop' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span>🖥️</span> <span className="hidden md:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${viewport === 'tablet' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span>📟</span> <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center space-x-1.5 transition-all cursor-pointer ${viewport === 'mobile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <span>📱</span> <span className="hidden md:inline">Mobile</span>
          </button>
        </div>

        {/* Cloud Persistence Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Status Indicator Lights */}
          <div 
            title={autoSaveStatus === 'saving' ? "Saving..." : autoSaveStatus === 'saved' ? "All changes saved" : autoSaveStatus === 'error' ? "Error saving changes" : dirty ? "You have unsaved changes" : "All changes synced"}
            className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1.5 sm:px-3 sm:py-2 rounded-full bg-slate-950 border border-slate-800 transition-all duration-300"
          >
            {autoSaveStatus === 'saving' ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_8px_#6366f1]" />
                <span className="text-indigo-400 animate-pulse hidden sm:inline">Saving...</span>
              </>
            ) : autoSaveStatus === 'saved' ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                <span className="text-emerald-400 hidden sm:inline">Saved</span>
              </>
            ) : autoSaveStatus === 'error' ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-bounce" />
                <span className="text-rose-450 hidden sm:inline">Save Failed</span>
              </>
            ) : dirty ? (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-amber-400 font-bold hidden sm:inline">Unsaved Changes</span>
              </>
            ) : (
              <>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-emerald-400 hidden sm:inline">Synced</span>
              </>
            )}
          </div>

          <button
            onClick={handlePublish}
            disabled={loading}
            className={`px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-xl active:scale-[0.98] ${
              loading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : saveStatus === 'success'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/10'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
            }`}
          >
            {loading ? 'Publishing...' : saveStatus === 'success' ? 'Published! ✓' : 'Publish'}
          </button>
        </div>
      </header>

      {/* Main visual panel layout */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Side: Dynamic Customizer Controls */}
        <div className={`transition-all duration-300 ease-in-out flex-shrink-0 h-full overflow-hidden ${
          sidebarOpen ? 'w-full lg:w-[420px]' : 'w-0'
        }`}>
          <ThemeCustomizer school={school} />
        </div>

        {/* Right Side: Virtualized Viewports preview canvas */}
        <main 
          ref={canvasRef} 
          className="flex-1 bg-slate-950 p-6 flex items-center justify-center overflow-hidden relative border-t lg:border-t-0 border-slate-800 transition-all duration-300"
        >
          {/* Animated Viewport container */}
          <div 
            style={{
              width: viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '768px' : '375px',
              height: viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '1024px' : '750px',
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
            className={`transition-all duration-500 ease-out flex items-center justify-center relative flex-shrink-0 ${
              viewport === 'desktop' ? 'w-full h-full' : ''
            }`}
          >
            
            {/* Device Mockup Shell wrapper */}
            <div className={`w-full h-full bg-white relative transition-all duration-500 flex flex-col overflow-hidden ${
              viewport === 'desktop' ? 'rounded-2xl border-4 border-slate-850 shadow-2xl' :
              viewport === 'tablet' ? 'rounded-[2.8rem] border-[16px] border-slate-900 shadow-2xl ring-4 ring-indigo-500/10' :
              'rounded-[3.2rem] border-[14px] border-slate-900 shadow-2xl ring-4 ring-indigo-500/10'
            }`}>
              
              {/* Dynamic device notches */}
              {viewport === 'mobile' && (
                <>
                  {/* Camera notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-32 bg-slate-900 rounded-b-2xl z-[9999] flex items-center justify-center">
                    <div className="w-10 h-1 bg-slate-800 rounded-full mb-0.5" />
                    <div className="w-2.5 h-2.5 bg-slate-950 rounded-full border border-slate-850 ml-3" />
                  </div>
                  {/* Speaker notch */}
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-slate-950 rounded-full z-[9999]" />
                </>
              )}

              {viewport === 'tablet' && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-3.5 w-24 bg-slate-900 rounded-b-xl z-[9999] flex items-center justify-center">
                  <div className="w-8 h-1 bg-slate-950 rounded-full" />
                </div>
              )}

              {/* Viewport Frame with theme-preview-container class */}
              <div className="flex-1 overflow-y-auto no-scrollbar relative w-full h-full rounded-inherit theme-preview-container bg-white">
                {renderTemplate()}
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function CustomizerClientView({ school }: ClientProps) {
  return (
    <SchoolThemeProvider initialThemeData={school.theme_settings} schoolEmail={school.email}>
      <CustomizerDashboard school={school} />
    </SchoolThemeProvider>
  );
}
