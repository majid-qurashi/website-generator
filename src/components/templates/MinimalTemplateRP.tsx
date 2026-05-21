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
  email: 'admin@rpschool.edu.in',
  name: "R.P SCHOOL",
  tagline: "Where The Journey Of Knowledge Begins",
  description: "R.P School is a premier educational institution dedicated to providing excellence in academic and personal development. We believe in nurturing young minds to become leaders of tomorrow through tradition, discipline, and modern innovation.",
  logo: null,
  image: "https://picsum.photos/seed/school_rp/1200/800",
  template: "template4"
};

export default function MinimalTemplateRP({ onSelect, data = defaultData, isFullPage = false, customTheme }: TemplateProps) {
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

    const navbarClass = `px-4 py-4 md:px-12 flex justify-between items-center relative z-50 border-b-4 border-theme-secondary/40 shadow-md bg-theme-primary`;

    return (
      <nav style={transitionSpeedStyle} className={navbarClass}>
        <div className={`flex items-center space-x-4 ${isCenter ? 'mx-auto flex-col text-center space-y-2' : ''}`}>
          {school.logo ? (
            <img src={school.logo} alt="Logo" className="w-10 h-10 md:w-14 md:h-14 bg-white p-1 rounded-lg object-contain shadow-sm" />
          ) : (
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white text-theme-primary rounded-lg flex items-center justify-center font-black text-2xl border-2 border-theme-border shadow-inner">RP</div>
          )}
          <div className="flex flex-col">
             <span 
               style={{ fontFamily: theme.typography.headingFont, color: theme.colors.secondary }}
               className="font-themeHeading font-black text-xl md:text-3xl tracking-wide uppercase italic leading-none drop-shadow-sm"
             >
               {school.name}
             </span>
             <span className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-[0.3em] mt-1 opacity-90">An Institutional Legacy</span>
          </div>
        </div>

        {/* Desktop Nav */}
        {!isCenter && (
          <div className="hidden lg:flex items-center space-x-8 text-xs font-black uppercase tracking-wider text-white">
             <span className="hover:text-theme-secondary transition-colors cursor-pointer border-b-2 border-transparent hover:border-theme-secondary pb-1">Academics</span>
             <span className="hover:text-theme-secondary transition-colors cursor-pointer border-b-2 border-transparent hover:border-theme-secondary pb-1">Admissions</span>
             <span className="hover:text-theme-secondary transition-colors cursor-pointer border-b-2 border-transparent hover:border-theme-secondary pb-1">Our Campus</span>
             <span className="hover:text-theme-secondary transition-colors cursor-pointer border-b-2 border-transparent hover:border-theme-secondary pb-1">Faculties</span>
          </div>
        )}

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 bg-black/25 rounded-lg border border-white/20">
          <div className="w-6 h-0.5 bg-theme-secondary mb-1"></div>
          <div className="w-6 h-0.5 bg-theme-secondary mb-1"></div>
          <div className="w-6 h-0.5 bg-theme-secondary"></div>
        </button>

         {/* Mobile Menu Overlay */}
         {isMenuOpen && isFullPage && (
          <div className="absolute top-full left-0 right-0 bg-theme-primary p-6 flex flex-col space-y-6 shadow-2xl lg:hidden text-white font-bold uppercase border-t-2 border-theme-secondary z-50">
             <span className="hover:text-theme-secondary cursor-pointer">Academics</span>
             <span className="hover:text-theme-secondary cursor-pointer">Admissions</span>
             <span className="hover:text-theme-secondary cursor-pointer">Campus</span>
             <span className="hover:text-theme-secondary cursor-pointer">Faculty</span>
          </div>
        )}
      </nav>
    );
  };

  const renderHero = () => (
    <section className="relative overflow-hidden">
      <div className={`${isFullPage ? 'h-[400px] md:h-[650px]' : 'h-[160px]'} w-full border-b-8 border-theme-secondary`}>
        <img 
          src={school.image || "https://picsum.photos/seed/school_rp/1200/800"} 
          alt="Campus" 
          className="w-full h-full object-cover transition-transform duration-[5000ms] hover:scale-105"
        />
        {isFullPage && <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-theme-primary/40 via-transparent to-transparent"></div>}
      </div>
      
      <div className={`bg-theme-primary text-theme-btnText p-6 md:p-12 ${textAlignmentClass} ${isFullPage ? 'p-8' : 'p-4'}`}>
        <h1 
          style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
          className={`font-themeHeading font-black italic uppercase leading-none tracking-tighter shadow-black/20 drop-shadow-2xl ${isFullPage ? 'text-4xl md:text-8xl' : 'text-xl'}`}
        >
          "{school.tagline}"
        </h1>
        <div className="w-24 md:w-48 h-1.5 md:h-2 bg-theme-secondary mx-auto mt-6 md:mt-10 rounded-full"></div>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className={`px-6 md:px-20 py-20 bg-theme-cardBg border-y-2 border-theme-border ${isFullPage ? 'mt-10' : 'p-6'}`}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center">
         <div className="md:w-1/3 text-center md:text-left">
            <h2 
              style={{ fontFamily: theme.typography.headingFont }}
              className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-theme-primary border-l-8 border-theme-secondary pl-6 border-b-2 md:border-b-0 pb-4 md:pb-0 font-themeHeading"
            >
              ABOUT <br className="hidden md:block"/> OUR INSTITUTE
            </h2>
         </div>
         <div className="md:w-2/3">
            <p 
              style={{ fontFamily: theme.typography.bodyFont }}
              className={`text-theme-textMuted leading-relaxed font-themeBody ${isFullPage ? 'text-xl md:text-2xl leading-[1.6]' : 'text-sm'}`}
            >
              {school.description}
            </p>
            {isFullPage && (
              <button 
                style={transitionSpeedStyle}
                className={`mt-12 bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black uppercase tracking-widest px-10 py-5 shadow-xl transition-all ${theme.components.buttonStyle} ${hoverAnimClass}`}
              >
                Read More 📜
              </button>
            )}
         </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-theme-footer text-theme-textMuted py-24 px-12 text-center border-t-8 border-theme-primary flex flex-col items-center">
       <div className="mb-12">
         <span className="text-3xl" style={{ color: theme.colors.secondary }}>🎓</span>
         <h4 
           style={{ fontFamily: theme.typography.headingFont, color: theme.colors.secondary }}
           className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] mt-4 font-themeHeading"
         >
           {school.name}
         </h4>
       </div>
       
       <p className="font-bold text-xs md:text-base tracking-[0.2em] uppercase max-w-lg mx-auto opacity-80 leading-relaxed text-theme-textMuted">
         Developed with excellence by <br className="md:hidden"/> <a href="https://qurashi.vercel.app" target="_blank" className="text-theme-primary hover:text-white transition-colors underline underline-offset-8 mt-4 inline-block font-black">Majid Qurashi</a>
       </p>
    </footer>
  );

  return (
    <div 
      style={{
        lineHeight: theme.typography.lineHeight,
        letterSpacing: theme.typography.letterSpacing === 'tight' ? '-0.025em' : theme.typography.letterSpacing === 'wide' ? '0.05em' : 'normal',
      }}
      className={`flex flex-col bg-theme-bg text-theme-text font-themeBody ${
        !isFullPage ? 'border border-theme-border rounded-xl overflow-hidden shadow-md h-[400px] relative' : 'min-h-screen'
      } transition-all duration-700 pb-20`}
    >
      
      {/* Top Banner (Contact) */}
      <div className={`hidden md:flex bg-theme-cardBg border-b border-theme-border py-1.5 px-8 justify-between text-[10px] font-bold uppercase tracking-widest text-theme-textMuted`}>
         <div className="flex space-x-6">
            <span>📞 +91 123 456 7890</span>
            <span>✉️ info@rpschool.edu.in</span>
         </div>
         <div className="flex space-x-4">
            <span className="hover:text-theme-primary cursor-pointer">Login</span>
            <span className="text-theme-secondary font-black">Online Registration</span>
         </div>
      </div>

      {/* Main Header */}
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

      {/* Select Overlay (Only in Preview Card) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-theme-footer/85 opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer pointer-events-none group z-[100] backdrop-blur-sm">
           <button 
             onClick={(e) => { e.stopPropagation(); onSelect(); }} 
             style={transitionSpeedStyle}
             className={`bg-theme-btnBg text-theme-btnText font-black px-10 py-4 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-all pointer-events-auto border-4 border-theme-border ${theme.components.buttonStyle} ${hoverAnimClass}`}
           >
             Select Excellence Style
           </button>
           <p className="text-theme-secondary text-[10px] mt-4 font-black tracking-[0.5em] animate-pulse">ACADEMIC LEGACY</p>
        </div>
      )}
    </div>
  );
}

