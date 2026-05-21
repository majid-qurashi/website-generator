'use client';

import React, { useState } from 'react';
import { SchoolData } from '@/types/school';
import { useSchoolTheme, PRESETS } from '@/components/SchoolThemeProvider';
import { ThemeConfig } from '@/types/theme';
import InteractiveCampus from '@/components/templates/InteractiveCampus';
import VirtualReception from '@/components/templates/VirtualReception';

interface TemplateProps {
  onSelect?: () => void;
  data?: SchoolData;
  isFullPage?: boolean;
  customTheme?: ThemeConfig;
}

const defaultData: SchoolData = {
  email: 'admin@school.com',
  name: "Sample Public School",
  tagline: "Excellence in Every Lesson",
  description: "Providing a nurturing environment where students can thrive academically and socially. We focus on holistic development and community values.",
  logo: null,
  image: "https://picsum.photos/seed/school1/1200/800",
  template: "template1"
};

export default function MinimalTemplateOne({ onSelect, data = defaultData, isFullPage = false, customTheme }: TemplateProps) {
  const school = data || defaultData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const context = useSchoolTheme();
  const theme = customTheme || context?.theme || PRESETS['modern-blue'];

  const isVisible = (sectionId: string) => theme.layout.sectionsVisibility[sectionId] !== false;

  // Alignments helper
  const textAlignmentClass = 
    theme.layout.mainTextAlignment === 'center' ? 'text-center' : 
    theme.layout.mainTextAlignment === 'right' ? 'text-right' : 'text-left';

  const logoAlignClass = 
    theme.layout.logoAlignment === 'center' ? 'mx-auto flex-col text-center' :
    theme.layout.logoAlignment === 'right' ? 'ml-auto flex-row-reverse space-x-reverse' : 'flex-row';

  const hoverAnimClass = 
    theme.components.hoverAnimation === 'scale-up' ? 'hover:scale-105 transform transition-transform' :
    theme.components.hoverAnimation === 'opacity' ? 'hover:opacity-80 transition-opacity' :
    theme.components.hoverAnimation === 'slide-up' ? 'hover:-translate-y-1 transform transition-transform' : '';

  const transitionSpeedStyle = {
    transitionDuration: theme.components.transitionSpeed || '300ms'
  };

  const renderNavbar = () => {
    const isCenter = theme.layout.logoAlignment === 'center';
    const isRight = theme.layout.logoAlignment === 'right';

    const navbarClass = `z-[100] transition-all bg-theme-navbar border-b border-theme-border px-4 py-3 md:px-8 flex items-center relative ${
      theme.layout.stickyNavbar ? 'sticky top-0' : 'relative'
    } ${
      isCenter 
        ? 'flex-col justify-center space-y-4 text-center' 
        : isRight 
          ? 'flex-col md:flex-row-reverse justify-between space-y-4 md:space-y-0' 
          : 'flex-col md:flex-row justify-between space-y-4 md:space-y-0'
    }`;

    const logoAlignClass = isCenter
      ? "flex flex-col items-center space-y-2"
      : "flex items-center space-x-3";

    return (
      <nav style={transitionSpeedStyle} className={navbarClass}>
        <div className={logoAlignClass}>
          {school.logo ? (
            <img src={school.logo} alt="Logo" style={{ height: theme.branding.logoSize }} className="rounded-md object-cover animate-fade-in" />
          ) : (
            <div 
              style={{ width: theme.branding.logoSize, height: theme.branding.logoSize }}
              className="bg-theme-primary text-theme-btnText rounded-md flex items-center justify-center font-bold text-xs shadow"
            >
              S
            </div>
          )}
          <span className="font-themeHeading font-bold text-theme-text text-sm md:text-lg tracking-tight select-none">
            {school.name}
          </span>
        </div>

        {/* Navigation menu */}
        <div className="hidden md:flex space-x-6 text-sm font-medium text-theme-textMuted">
           <span className="hover:text-theme-primary transition-colors cursor-pointer">Home</span>
           <span className="hover:text-theme-primary transition-colors cursor-pointer">About</span>
           <span className="hover:text-theme-primary transition-colors cursor-pointer">Contact</span>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-1">
          <div className="w-6 h-0.5 bg-slate-600 mb-1"></div>
          <div className="w-6 h-0.5 bg-slate-600 mb-1"></div>
          <div className="w-6 h-0.5 bg-slate-600"></div>
        </button>

        {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-theme-navbar border-b border-theme-border p-4 flex flex-col space-y-4 shadow-xl md:hidden z-[110]">
             <span className="font-bold text-theme-text hover:text-theme-primary transition-colors cursor-pointer">Home</span>
             <span className="font-bold text-theme-text hover:text-theme-primary transition-colors cursor-pointer">About</span>
             <span className="font-bold text-theme-text hover:text-theme-primary transition-colors cursor-pointer">Contact</span>
          </div>
        )}
      </nav>
    );
  };

  const renderHero = () => (
    <section className="relative">
      <div className={`${isFullPage ? 'h-[300px] md:h-[500px]' : 'h-[150px]'} w-full overflow-hidden relative`}>
        <img 
          src={school.image || "https://picsum.photos/seed/school1/1200/800"} 
          alt="School" 
          className="w-full h-full object-cover"
        />
        <div 
          style={{ opacity: theme.branding.overlayOpacity }}
          className="absolute inset-0 bg-slate-950/60 mix-blend-multiply" 
        />
      </div>
      <div 
        style={transitionSpeedStyle}
        className={`bg-theme-primary text-theme-btnText p-6 md:p-12 ${textAlignmentClass} ${isFullPage ? 'p-8' : 'p-4'}`}
      >
        <h1 
          style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
          className={`font-black leading-tight mb-2 ${isFullPage ? 'text-3xl md:text-5xl' : 'text-lg'}`}
        >
          {school.tagline}
        </h1>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className={`p-6 md:p-16 max-w-4xl mx-auto ${textAlignmentClass} ${isFullPage ? '' : 'p-4'}`}>
      <h2 
        style={{ fontFamily: theme.typography.headingFont }}
        className="text-xl md:text-2xl font-bold mb-4 border-b-2 border-theme-primary inline-block text-theme-text pb-1"
      >
        About Our School
      </h2>
      <p 
        style={{ fontFamily: theme.typography.bodyFont }}
        className="text-theme-textMuted leading-relaxed text-sm md:text-base"
      >
        {school.description}
      </p>
    </section>
  );

  const renderFooter = () => (
    <footer className="mt-auto bg-theme-cardBg border-t border-theme-border p-8 select-none text-center">
       <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4 mb-6">
          <p className="text-theme-text font-semibold text-xs md:text-sm tracking-wide">{school.address || '12 Main Boulevard, Sector C, Srinagar, J&K'}</p>
          <p className="text-theme-primary font-bold text-xs md:text-sm">{school.contact_number || '+91 98765 43210'}</p>
          <p className="text-theme-secondary font-black text-[10px] uppercase tracking-widest">{school.school_type || 'High School'}</p>
       </div>
       <p className="text-theme-textMuted text-xs md:text-sm font-bold border-t border-theme-border/40 pt-6">
         Developed by <a href="#" className="text-theme-primary font-black hover:underline">Majid Qurashi</a>
       </p>
    </footer>
  );

  return (
    <div 
      style={{
        lineHeight: theme.typography.lineHeight,
        letterSpacing: theme.typography.letterSpacing === 'tight' ? '-0.025em' : theme.typography.letterSpacing === 'wide' ? '0.05em' : 'normal',
      }}
      className={`flex flex-col bg-theme-bg text-theme-text font-themeBody relative ${
        !isFullPage ? 'border border-theme-border rounded-xl overflow-hidden shadow-sm h-[400px]' : 'min-h-screen'
      }`}
    >
      
      {renderNavbar()}

      <div className={`${!isFullPage ? 'overflow-y-auto no-scrollbar relative' : 'w-full flex-1 flex flex-col'}`}>
        
        {theme.layout.sectionsOrder.map((sectionId) => {
          if (!isVisible(sectionId)) return null;
          switch (sectionId) {
            case 'hero': return <React.Fragment key="hero">{renderHero()}</React.Fragment>;
            case 'interactive-campus': return <InteractiveCampus key="interactive-campus" school={school} theme={theme} isFullPage={isFullPage} />;
            case 'virtual-reception': return <VirtualReception key="virtual-reception" school={school} theme={theme} isFullPage={isFullPage} />;
            case 'about': return <React.Fragment key="about">{renderAbout()}</React.Fragment>;
            case 'footer': return <React.Fragment key="footer">{renderFooter()}</React.Fragment>;
            default: return null;
          }
        })}

        {/* Fade out (Only in Preview) */}
        {!isFullPage && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-theme-bg to-transparent pointer-events-none" />
        )}
      </div>

      {/* Select Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-slate-950/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-[100] backdrop-blur-sm">
           <button 
             onClick={(e) => { e.stopPropagation(); onSelect(); }} 
             style={transitionSpeedStyle}
             className={`bg-theme-primary text-theme-btnText font-black px-6 py-2.5 rounded-lg shadow-lg pointer-events-auto ${hoverAnimClass}`}
           >
             Select Minimal Blue
           </button>
        </div>
      )}
    </div>
  );
}
