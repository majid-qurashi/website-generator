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
  name: "Green Fields Academy",
  tagline: "Cultivating Knowledge in Natural Spaces",
  description: "A community of learners where every student is encouraged to explore their potential and reach for excellence. Join us in a journey of lifelong learning.",
  logo: null,
  image: "https://picsum.photos/seed/school2/1200/800",
  template: "template2"
};

export default function MinimalTemplateTwo({ onSelect, data = defaultData, isFullPage = false, customTheme }: TemplateProps) {
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
    } bg-theme-navbar border-b border-theme-border px-6 py-6 md:px-12 flex ${
      isCenter 
        ? 'flex-col items-center space-y-4 text-center' 
        : isRight 
          ? 'flex-col md:flex-row-reverse justify-between items-center space-y-4 md:space-y-0' 
          : 'flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'
    }`;

    const logoGroupClass = `flex items-center space-x-4 cursor-pointer select-none ${
      isCenter ? 'flex-col items-center space-y-2' : ''
    }`;

    return (
      <nav style={transitionSpeedStyle} className={navbarClass}>
        <div className={logoGroupClass}>
          {school.logo ? (
            <img 
              src={school.logo} 
              alt="Logo" 
              style={{ height: theme.branding.logoSize }}
              className="rounded-full object-cover border border-theme-border" 
            />
          ) : (
            <div 
              style={{ width: theme.branding.logoSize, height: theme.branding.logoSize }}
              className="bg-theme-primary text-theme-btnText rounded-full flex items-center justify-center font-bold text-sm shadow"
            >
              {school.name ? school.name[0] : 'G'}
            </div>
          )}
          <span 
            style={{ fontFamily: theme.typography.headingFont }}
            className="font-themeHeading font-black text-lg md:text-2xl tracking-tight text-theme-primary uppercase italic underline decoration-theme-secondary/35 underline-offset-4"
          >
            {school.name}
          </span>
        </div>

        {/* Global Nav */}
        <div className="hidden md:flex items-center space-x-12 text-sm font-black uppercase tracking-widest text-theme-textMuted">
           <span className="hover:text-theme-primary cursor-pointer transition-colors">Campus</span>
           <span className="hover:text-theme-primary cursor-pointer transition-colors">Admissions</span>
           <span className="hover:text-theme-primary cursor-pointer transition-colors">Philosophy</span>
        </div>

        {/* Simple Mobile Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-10 h-10 border border-theme-border rounded-lg flex items-center justify-center bg-theme-cardBg">
           <div className={`w-4 h-4 rounded-sm transition-all ${isMenuOpen ? 'bg-theme-primary' : 'bg-theme-textMuted/40'}`}></div>
        </button>

         {/* Mobile Menu Overlay */}
         {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-theme-navbar border-b border-theme-border p-6 flex flex-col space-y-6 shadow-2xl md:hidden text-center z-50">
             <span className="font-black text-theme-primary hover:text-theme-primaryHover cursor-pointer">Campus</span>
             <span className="font-black text-theme-primary hover:text-theme-primaryHover cursor-pointer">Admissions</span>
             <span className="font-black text-theme-primary hover:text-theme-primaryHover cursor-pointer">Philosophy</span>
          </div>
        )}
      </nav>
    );
  };

  const renderHero = () => (
    <header className="px-6 md:px-20 py-10 md:py-20">
      <div className={`relative overflow-hidden rounded-theme group/hero ${isFullPage ? 'h-[400px] md:h-[600px]' : 'aspect-video shadow-theme'}`}>
        <img 
          src={school.image || "https://picsum.photos/seed/school2/1200/800"} 
          alt="School" 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/hero:scale-110"
        />
        <div 
          style={{ opacity: theme.branding.overlayOpacity }}
          className="absolute inset-0 bg-slate-950 mix-blend-multiply transition-opacity"
        />
      </div>
      <div className={`mt-8 md:mt-16 ${isFullPage ? 'max-w-4xl mx-auto' : 'p-2'} ${textAlignmentClass}`}>
        <h1 
          style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
          className={`font-themeHeading font-black tracking-tight leading-tight mb-8 text-theme-text uppercase ${isFullPage ? 'text-4xl md:text-8xl' : 'text-2xl'}`}
        >
          {school.tagline}
        </h1>
      </div>
    </header>
  );

  const renderAbout = () => (
    <section className={`px-6 md:px-20 py-20 bg-theme-cardBg border-y border-theme-border mt-20 ${isFullPage ? '' : 'p-6'} ${textAlignmentClass}`}>
      <div className="max-w-4xl mx-auto">
        <span 
          style={{ fontFamily: theme.typography.headingFont }}
          className="font-themeHeading font-black uppercase tracking-[0.4em] text-theme-primary text-[10px] mb-8 block"
        >
          Our Story
        </span>
        <p 
          style={{ fontFamily: theme.typography.bodyFont }}
          className={`text-theme-textMuted leading-relaxed italic font-medium font-themeBody ${isFullPage ? 'text-xl md:text-3xl' : 'text-sm'}`}
        >
          "{school.description}"
        </p>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-theme-footer text-theme-textMuted py-24 px-12 text-center flex flex-col items-center border-t border-theme-border">
       <div className="w-12 h-0.5 bg-theme-primary mb-12"></div>
       <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4 mb-12 text-center">
          <p className="text-theme-text font-semibold text-xs md:text-sm tracking-wide">{school.address || '12 Main Boulevard, Sector C, Srinagar, J&K'}</p>
          <p className="text-theme-primary font-bold text-xs md:text-sm">{school.contact_number || '+91 98765 43210'}</p>
          <p className="text-theme-secondary font-black text-[10px] uppercase tracking-widest">{school.school_type || 'High School'}</p>
       </div>
       <p className="font-bold text-xs md:text-sm tracking-widest uppercase text-theme-textMuted">
         Developed by <a href="https://qurashi.vercel.app" target="_blank" className="text-theme-primary hover:text-white transition-colors underline underline-offset-8 font-black">Majid Qurashi</a>
       </p>
       <div className="mt-20 opacity-20 text-[10px] uppercase font-black tracking-[1em] text-theme-text">Eco Education 2026</div>
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
      
      {/* Centered Header */}
      {renderNavbar()}

      <div className={`${!isFullPage ? 'overflow-y-auto no-scrollbar relative' : 'w-full flex-1 flex flex-col'}`}>
        {/* Dynamic section ordering and rendering */}
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
        <div className="absolute inset-0 bg-theme-footer/85 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-none group z-[100] backdrop-blur-sm">
           <button 
             onClick={(e) => { e.stopPropagation(); onSelect(); }} 
             style={transitionSpeedStyle}
             className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black px-10 py-4 shadow-2xl transform scale-75 group-hover:scale-100 transition-all pointer-events-auto ${theme.components.buttonStyle} ${hoverAnimClass}`}
           >
             Select Minimal Green
           </button>
           <p className="text-theme-primary text-[10px] mt-4 font-black tracking-widest animate-pulse">NATURAL SPACES</p>
        </div>
      )}
    </div>
  );
}

