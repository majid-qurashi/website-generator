'use client';

import React, { useState } from 'react';
import { SchoolData } from '@/types/school';
import { useSchoolTheme, PRESETS } from '@/components/SchoolThemeProvider';
import { ThemeConfig } from '@/types/theme';

interface TemplateProps {
  onSelect?: () => void;
  data?: SchoolData;
  isFullPage?: boolean;
  customTheme?: ThemeConfig;
}

const defaultData: SchoolData = {
  email: 'admin@school.com',
  name: "City Central Public School",
  tagline: "Bold Thinking for a Bright Future",
  description: "A modern approach to education in the heart of the city. We prepare our students for the global challenges of the 21st century through innovation and critical thinking.",
  logo: null,
  image: "https://picsum.photos/seed/school3/1200/800",
  template: "template3"
};

export default function MinimalTemplateThree({ onSelect, data = defaultData, isFullPage = false, customTheme }: TemplateProps) {
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

  // Hover animations classes
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

    const navbarClass = `z-50 transition-all ${
      theme.layout.stickyNavbar ? 'sticky top-0' : 'relative'
    } ${
      theme.branding.bgBlur === 'sm' ? 'backdrop-blur-sm' :
      theme.branding.bgBlur === 'md' ? 'backdrop-blur-md' :
      theme.branding.bgBlur === 'lg' ? 'backdrop-blur-lg' : 'backdrop-blur-none'
    } bg-theme-navbar border-b border-theme-border px-6 py-6 md:px-16 flex items-center justify-between`;

    return (
      <nav style={transitionSpeedStyle} className={navbarClass}>
        <div className={`flex items-center space-x-4 ${isCenter ? 'mx-auto' : ''}`}>
          {school.logo ? (
            <img src={school.logo} alt="Logo" style={{ height: theme.branding.logoSize }} className="object-contain" />
          ) : (
            <div 
              style={{ width: theme.branding.logoSize, height: theme.branding.logoSize }}
              className="bg-theme-primary text-theme-btnText flex items-center justify-center font-black text-xl"
            >
              {school.name ? school.name[0] : 'C'}
            </div>
          )}
          <span 
            style={{ fontFamily: theme.typography.headingFont }}
            className="font-themeHeading font-black text-xl md:text-3xl tracking-tighter uppercase whitespace-nowrap text-theme-text"
          >
            {school.name}
          </span>
        </div>

        {/* Minimalist Nav */}
        {!isCenter && (
          <div className="hidden md:flex space-x-12 text-sm font-black uppercase tracking-tighter text-theme-textMuted">
             <span className="hover:text-theme-primary transition-colors cursor-pointer">Academics</span>
             <span className="hover:text-theme-primary transition-colors cursor-pointer">Community</span>
             <span className="hover:text-theme-primary transition-colors cursor-pointer">Login</span>
          </div>
        )}

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden flex flex-col space-y-1.5 p-2 bg-theme-cardBg rounded-lg">
           <div className="w-6 h-1 bg-theme-text"></div>
           <div className="w-6 h-1 bg-theme-text"></div>
        </button>

         {/* Mobile Menu Overlay */}
         {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-theme-navbar border-b border-theme-border p-8 flex flex-col space-y-8 shadow-2xl md:hidden font-black uppercase z-50">
             <span className="text-theme-text hover:text-theme-primary cursor-pointer">Academics</span>
             <span className="text-theme-text hover:text-theme-primary cursor-pointer">Community</span>
             <span className="text-theme-text hover:text-theme-primary cursor-pointer">Login</span>
          </div>
        )}
      </nav>
    );
  };

  const renderHero = () => (
    <section className={`transition-all ${isFullPage ? 'p-6 md:p-16' : 'p-4'}`}>
      <div className={`overflow-hidden rounded-theme group/hero ${isFullPage ? 'h-[400px] md:h-[700px]' : 'aspect-video shadow-theme'}`}>
        <img 
          src={school.image || "https://picsum.photos/seed/school3/1200/800"} 
          alt="School" 
          className="w-full h-full object-cover transition-all duration-1000"
        />
      </div>
      <div className={`mt-8 md:mt-16 ${isFullPage ? 'max-w-5xl mx-auto' : 'p-2'} ${textAlignmentClass}`}>
        <h1 
          style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
          className={`font-themeHeading font-black tracking-tighter leading-[0.9] mb-12 text-theme-text uppercase italic ${isFullPage ? 'text-6xl md:text-9xl' : 'text-3xl'}`}
        >
          {school.tagline}
        </h1>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className={`px-6 md:px-16 py-24 pb-48 max-w-7xl mx-auto ${isFullPage ? '' : 'p-8'} ${textAlignmentClass}`}>
       <div className="flex flex-col md:flex-row gap-16 md:gap-32">
          <div className="md:w-1/3">
             <h2 
               style={{ fontFamily: theme.typography.headingFont }}
               className="text-4xl font-black uppercase tracking-tighter text-theme-text mb-8 pb-4 border-b-8 border-theme-primary font-themeHeading"
             >
               About
             </h2>
          </div>
          <div className="md:w-2/3">
             <p 
               style={{ fontFamily: theme.typography.bodyFont }}
               className={`text-theme-textMuted leading-tight font-bold font-themeBody ${isFullPage ? 'text-2xl md:text-3xl' : 'text-base'}`}
             >
                {school.description}
             </p>
          </div>
       </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-theme-navbar border-t border-theme-border py-32 px-16">
       <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-12 md:space-y-0">
          <div 
            style={{ fontFamily: theme.typography.headingFont }}
            className="text-4xl font-black italic tracking-tighter opacity-10 text-theme-text font-themeHeading"
          >
            {school.name}
          </div>
          <p className="font-black text-xs md:text-base tracking-[0.5em] uppercase text-theme-textMuted text-center md:text-right">
            Developed by <br/> <a href="https://qurashi.vercel.app" target="_blank" className="text-theme-primary hover:text-theme-primaryHover transition-colors underline underline-offset-8 mt-4 inline-block">Majid Qurashi</a>
          </p>
       </div>
    </footer>
  );

  return (
    <div 
      style={{
        lineHeight: theme.typography.lineHeight,
        letterSpacing: theme.typography.letterSpacing === 'tight' ? '-0.025em' : theme.typography.letterSpacing === 'wide' ? '0.05em' : 'normal',
      }}
      className={`flex flex-col bg-theme-bg text-theme-text font-themeBody ${
        !isFullPage ? 'border border-theme-border rounded-theme overflow-hidden shadow-theme h-[400px] relative' : 'min-h-screen'
      }`}
    >
      
      {/* Ultra Minimal Header */}
      {renderNavbar()}

      <div className={`${!isFullPage ? 'overflow-y-auto no-scrollbar relative' : 'w-full flex-1 flex flex-col'}`}>
        
        {theme.layout.sectionsOrder.map((sectionId) => {
          if (!isVisible(sectionId)) return null;
          switch (sectionId) {
            case 'hero': return <React.Fragment key="hero">{renderHero()}</React.Fragment>;
            case 'about': return <React.Fragment key="about">{renderAbout()}</React.Fragment>;
            case 'footer': return <React.Fragment key="footer">{renderFooter()}</React.Fragment>;
            default: return null;
          }
        })}

        {/* Fade Out (Only in Preview) */}
        {!isFullPage && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-theme-bg to-transparent pointer-events-none" />
        )}
      </div>

      {/* Select Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-theme-footer/85 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none group z-[100] backdrop-blur-sm">
           <button 
             onClick={(e) => { e.stopPropagation(); onSelect(); }} 
             style={transitionSpeedStyle}
             className={`bg-theme-btnBg text-theme-btnText font-black px-12 py-5 shadow-2xl transform scale-[0.8] group-hover:scale-100 transition-all pointer-events-auto ${theme.components.buttonStyle} ${hoverAnimClass}`}
           >
             Select Minimal Style
           </button>
           <p className="text-theme-primary text-[10px] mt-6 font-black tracking-[0.5em] uppercase animate-pulse">PURE MINIMALISM</p>
        </div>
      )}
    </div>
  );
}

