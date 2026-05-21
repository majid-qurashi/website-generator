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
  name: "Green Valley High",
  tagline: "Tradition & Excellence",
  description: "Since 1924, Green Valley High has been committed to providing a holistic education rooted in timeless values.",
  logo: null,
  image: "https://picsum.photos/seed/school3/1200/800",
  template: "template3"
};

export default function TemplateThree({ onSelect, data = defaultData, isFullPage = false, customTheme }: TemplateProps) {
  const school = data || defaultData;
  
  const context = useSchoolTheme();
  const theme = customTheme || context?.theme || PRESETS['modern-blue'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isVisible = (sectionId: string) => theme.layout.sectionsVisibility[sectionId] !== false;

  // Alignments helper
  const textAlignmentClass = 
    theme.layout.mainTextAlignment === 'center' ? 'text-center' : 
    theme.layout.mainTextAlignment === 'right' ? 'text-right' : 'text-left';

  // Hover animations classes
  const hoverAnimClass = 
    theme.components.hoverAnimation === 'scale-up' ? 'hover:scale-105 transform transition-transform' :
    theme.components.hoverAnimation === 'opacity' ? 'hover:opacity-80 transition-opacity' :
    theme.components.hoverAnimation === 'slide-up' ? 'hover:-translate-y-2 transform transition-transform' : '';

  const transitionSpeedStyle = {
    transitionDuration: theme.components.transitionSpeed || '300ms'
  };

  const renderNavbar = () => {
    return (
      <nav className={`bg-theme-navbar text-theme-text border-b-[6px] border-theme-primary relative z-[100] ${
        theme.layout.stickyNavbar ? 'sticky top-0' : 'relative'
      } ${
        theme.branding.bgBlur === 'sm' ? 'backdrop-blur-sm' :
        theme.branding.bgBlur === 'md' ? 'backdrop-blur-md' :
        theme.branding.bgBlur === 'lg' ? 'backdrop-blur-lg' : 'backdrop-blur-none'
      } px-6 py-6 md:px-16 w-full shadow-md`}>
        
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-col items-center">
          <div className={`border-2 border-theme-primary rounded-full flex items-center justify-center mb-6 bg-theme-primary/10 shadow-2xl relative hover:scale-105 transition-transform ${isFullPage ? 'w-28 h-28 text-3xl' : 'w-16 h-16 text-lg'}`}>
            <div className="absolute inset-[-4px] border border-theme-primary/30 rounded-full animate-pulse"></div>
            {school.logo ? (
              <img src={school.logo} alt="Logo" className="w-full h-full rounded-full object-cover p-2" />
            ) : (
              <span className="text-theme-primary font-themeHeading lowercase italic font-black">
                {(school.name || defaultData.name || '').split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          
          <div 
            style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
            className={`font-themeHeading tracking-[0.15em] text-center mb-6 max-w-4xl text-theme-primary font-bold ${isFullPage ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-xl'}`}
          >
            {school.name || defaultData.name}
          </div>

          <div className={`flex justify-center flex-wrap gap-x-12 gap-y-4 font-sans tracking-[0.3em] font-black uppercase text-theme-textMuted pt-6 border-t border-theme-border w-full max-w-4xl ${isFullPage ? 'text-xs' : 'text-[9px]'}`}>
            <span className="hover:text-theme-primary cursor-pointer transition-colors">ACADEMICS</span>
            <span className="hover:text-theme-primary cursor-pointer transition-colors">STAFF</span>
            <span className="hover:text-theme-primary cursor-pointer transition-colors">ALUMNI</span>
            <span className="hover:text-theme-primary cursor-pointer transition-colors">ADMISSIONS</span>
            <span className="hover:text-theme-primary cursor-pointer transition-colors">CONTACT</span>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border border-theme-primary rounded-full flex items-center justify-center bg-theme-primary/10">
              {school.logo ? (
                <img src={school.logo} alt="Logo" className="w-full h-full rounded-full object-cover p-1" />
              ) : (
                <span className="text-theme-primary font-themeHeading lowercase italic font-black text-xs select-none">
                  {(school.name || defaultData.name || 'S').charAt(0)}
                </span>
              )}
            </div>
            <div className="font-themeHeading font-black text-theme-primary text-sm tracking-widest uppercase select-none">
              {school.name || defaultData.name}
            </div>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-theme-text p-2 hover:bg-theme-border/30 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-theme-navbar border-b-4 border-theme-primary shadow-xl px-6 py-5 flex flex-col space-y-4 z-[150] animate-fadeIn md:hidden">
            <span className="text-theme-text font-black text-xs tracking-[0.2em] uppercase hover:text-theme-primary transition-colors py-2.5 px-4 border-b border-theme-border/40 cursor-pointer">ACADEMICS</span>
            <span className="text-theme-text font-black text-xs tracking-[0.2em] uppercase hover:text-theme-primary transition-colors py-2.5 px-4 border-b border-theme-border/40 cursor-pointer">STAFF</span>
            <span className="text-theme-text font-black text-xs tracking-[0.2em] uppercase hover:text-theme-primary transition-colors py-2.5 px-4 border-b border-theme-border/40 cursor-pointer">ALUMNI</span>
            <span className="text-theme-text font-black text-xs tracking-[0.2em] uppercase hover:text-theme-primary transition-colors py-2.5 px-4 border-b border-theme-border/40 cursor-pointer">ADMISSIONS</span>
            <span className="text-theme-text font-black text-xs tracking-[0.2em] uppercase hover:text-theme-primary transition-colors py-2.5 px-4 cursor-pointer">CONTACT</span>
          </div>
        )}
      </nav>
    );
  };

  const renderHero = () => (
    <header className="relative">
      <div className={`bg-theme-cardBg relative overflow-hidden ${isFullPage ? 'h-[480px] md:h-[720px]' : 'aspect-video'}`}>
        <img
          src={school.image || "https://picsum.photos/seed/school3/1200/800"}
          alt="School Building"
          className="absolute inset-0 w-full h-full object-cover scale-110 grayscale brightness-50 sepia-[0.3]"
        />
        <div 
          style={{ opacity: theme.branding.overlayOpacity }}
          className="absolute inset-0 bg-theme-primary/30 mix-blend-multiply transition-opacity" 
        />
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
      </div>

      {/* Overlapping Intro Card - Highly Responsive */}
      <div className={`bg-theme-cardBg border border-theme-border relative z-50 text-center shadow-theme mx-auto ${isFullPage ? 'p-12 md:p-24 -mt-24 md:-mt-48 max-w-5xl rounded-theme' : 'p-8 mx-6 -mt-16 rounded-theme'} ${textAlignmentClass}`}>
        <span className="uppercase font-sans font-black tracking-[0.5em] text-theme-primary text-[10px] mb-6 block">Legacy of Excellence</span>
        <h2 
          style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
          className={`text-theme-text font-themeHeading font-black mb-8 leading-[1.1] ${isFullPage ? 'text-4xl md:text-7xl lg:text-8xl' : 'text-2xl'}`}
        >
          {school.tagline || defaultData.tagline}
        </h2>
        <div className="w-16 md:w-32 h-1 bg-theme-primary mx-auto mb-10"></div>
        <p 
          style={{ fontFamily: theme.typography.bodyFont }}
          className={`text-theme-textMuted font-themeBody leading-relaxed mb-12 mx-auto italic font-medium ${isFullPage ? 'text-xl md:text-3xl max-w-3xl' : 'text-xs max-w-xs'}`}
        >
          "{school.description || defaultData.description}"
        </p>
        <div className={`flex ${theme.layout.mainTextAlignment === 'center' ? 'justify-center' : theme.layout.mainTextAlignment === 'right' ? 'justify-end' : 'justify-start'}`}>
          <button 
            style={transitionSpeedStyle}
            className={`border-[3px] border-theme-primary bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-sans uppercase tracking-[0.4em] inline-block transition-all cursor-pointer font-black shadow-2xl ${theme.components.buttonStyle} ${hoverAnimClass} ${isFullPage ? 'px-16 py-6 text-sm md:px-20 md:py-8 md:text-lg' : 'px-6 py-3 text-[10px]'}`}
          >
            Admission Open
          </button>
        </div>
      </div>
    </header>
  );

  const renderStats = () => (
    <section className={`grid gap-12 md:gap-20 max-w-7xl mx-auto py-24 md:py-36 px-8 ${isFullPage ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' : 'grid-cols-2 p-6'}`}>
      <div className="text-center group/stat">
        <div className={`font-themeHeading font-black text-theme-text transition-all group-hover/stat:text-theme-primary ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>100%</div>
        <div className={`uppercase tracking-[0.3em] text-theme-textMuted font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Graduation Honor</div>
      </div>
      <div className="text-center group/stat">
        <div className={`font-themeHeading font-black text-theme-text transition-all group-hover/stat:text-theme-primary ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>Est.</div>
        <div className={`uppercase tracking-[0.3em] text-theme-textMuted font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Since 1924</div>
      </div>
      <div className="text-center group/stat">
        <div className={`font-themeHeading font-black text-theme-text transition-all group-hover/stat:text-theme-primary ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>50+</div>
        <div className={`uppercase tracking-[0.3em] text-theme-textMuted font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Faculty PhDs</div>
      </div>
      <div className="text-center group/stat">
        <div className={`font-themeHeading font-black text-theme-text transition-all group-hover/stat:text-theme-primary ${isFullPage ? 'text-6xl md:text-8xl' : 'text-3xl'}`}>Gold</div>
        <div className={`uppercase tracking-[0.3em] text-theme-textMuted font-sans font-black mt-4 ${isFullPage ? 'text-xs' : 'text-[8px]'}`}>Quality Standard</div>
      </div>
    </section>
  );

  const renderAbout = () => {
    return (
      <section className="py-24 md:py-32 px-8 bg-theme-bg border-b border-theme-border relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={textAlignmentClass}>
            <span className="uppercase font-sans font-black tracking-[0.5em] text-theme-primary text-[10px] mb-4 block">Centennial Heritage</span>
            <h2 
              style={{ fontFamily: theme.typography.headingFont }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-theme-text mb-8 leading-tight tracking-tight"
            >
              A Centennial Legacy <br/>of Scholar Achievement.
            </h2>
            <div className="w-16 h-0.5 bg-theme-primary mb-8"></div>
            <p 
              style={{ fontFamily: theme.typography.bodyFont }}
              className="text-base md:text-lg text-theme-textMuted leading-relaxed mb-8"
            >
              {school.description || defaultData.description}
              <br /><br />
              Since our founding in 1924, Green Valley High has been dedicated to cultivating an environment of intellectual depth, integrity, and honor. Our students go on to form the intellectual backbone of premium global institutions.
            </p>
            <div className={`grid grid-cols-2 gap-8 ${textAlignmentClass}`}>
               <div>
                  <div className="text-lg font-black text-theme-primary uppercase tracking-widest mb-2">Tradition</div>
                  <p className="text-xs text-theme-textMuted leading-relaxed">Deeply rooted in centennial scholastic honor and code of conducts.</p>
               </div>
               <div>
                  <div className="text-lg font-black text-theme-primary uppercase tracking-widest mb-2">Virtue</div>
                  <p className="text-xs text-theme-textMuted leading-relaxed">Educating not just the intellect, but the character of student bodies.</p>
               </div>
            </div>
          </div>
          
          <div className="relative group flex justify-center">
            {/* Double Border Framing */}
            <div className="absolute inset-[-8px] border-2 border-theme-primary/20 rounded-xl" />
            <div className="absolute inset-[-4px] border border-theme-primary/50 rounded-xl" />
            <div className="relative rounded-lg overflow-hidden border-2 border-theme-primary shadow-2xl h-80 md:h-[480px] w-full max-w-md">
              <img src="https://picsum.photos/seed/edu3/800/1200" className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition duration-1000" alt="Tradition Campus" />
              <div className="absolute inset-0 bg-theme-primary/10 mix-blend-color" />
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderPrincipal = () => {
    return (
      <section className="py-24 md:py-32 px-8 bg-theme-cardBg border-b border-theme-border relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Portrait with classic prestigious framing */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-xs w-full">
              {/* Double border academic framing */}
              <div className="absolute inset-[-8px] border-2 border-theme-primary/30 rounded-xl" />
              <div className="absolute inset-[-4px] border border-theme-primary/60 rounded-xl" />
              
              <div className="relative rounded-lg overflow-hidden border-2 border-theme-primary bg-theme-cardBg shadow-2xl aspect-[3/4]">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600" 
                  className="object-cover w-full h-full transform transition duration-[1200ms] group-hover:scale-103 grayscale hover:grayscale-0" 
                  alt="Principal Portrait" 
                />
                <div className="absolute inset-0 bg-theme-primary/10 mix-blend-color" />
              </div>
            </div>
          </div>
          
          {/* Right Column: Traditional address layout */}
          <div className={`lg:col-span-7 ${textAlignmentClass}`}>
            <span className="uppercase font-sans font-black tracking-[0.5em] text-theme-primary text-[10px] mb-4 block">The Principal's Address</span>
            
            <h2 
              style={{ fontFamily: theme.typography.headingFont }}
              className="text-3xl md:text-5xl lg:text-6xl font-black text-theme-text mb-8 leading-tight tracking-tight"
            >
              Academic Discipline & Leadership
            </h2>
            <div className="w-16 h-0.5 bg-theme-primary mb-8"></div>
            
            <div className="relative mb-8">
              <p 
                style={{ fontFamily: theme.typography.bodyFont }}
                className="text-base md:text-lg text-theme-textMuted leading-relaxed font-semibold italic pl-6 border-l-4 border-theme-primary"
              >
                "Our mission is to nurture critical thinkers, virtuous citizens, and resilient scholars who approach intellectual challenges with courage. We believe a rigorous curriculum combined with high standards of discipline yields the finest leaders of tomorrow."
              </p>
            </div>
            
            <p className="text-sm md:text-base text-theme-textMuted leading-relaxed mb-8">
              Welcome to a centennial legacy of scholastic greatness. Together, we continue to uphold these values of dedication and scholarly excellence that define Green Valley High.
            </p>
            
            {/* Signature & Seal */}
            <div className="flex flex-col items-start lg:items-center mt-6">
              <div className="font-serif text-3xl text-theme-primary italic tracking-wider">Dr. Sarah Jenkins</div>
              <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-theme-textMuted mt-2">Principal of the College</div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderBanner = () => (
    <section className={`bg-theme-cardBg border-y-4 border-theme-border ${isFullPage ? 'py-32 px-8' : 'p-8'}`}>
      <div className="max-w-6xl mx-auto">
        <h3 className={`font-themeHeading font-black italic tracking-widest text-theme-primary mb-20 text-center ${isFullPage ? 'text-3xl md:text-5xl' : 'text-base'}`}>Latest Institutional Bulletin</h3>
        
        <div className={`grid gap-12 ${isFullPage ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {[1,2,3].map((i) => (
            <div key={i} className="group cursor-pointer relative pb-10 border-b border-theme-border">
              <span className="font-sans font-black text-theme-secondary text-[10px] tracking-[0.4em] uppercase block mb-4">OCTOBER 2026</span>
              <h4 
                style={{ fontFamily: theme.typography.headingFont }}
                className="font-themeHeading font-black text-2xl md:text-3xl text-theme-text leading-tight group-hover:text-theme-primary transition-colors"
              >
                Building the Leaders of the 21st Century
              </h4>
              <div className="mt-8 h-12 w-12 border-2 border-theme-primary rounded-full flex items-center justify-center group-hover:bg-theme-primary group-hover:border-theme-primary text-theme-text group-hover:text-theme-btnText transition-all">
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-theme-footer text-theme-textMuted flex flex-col items-center py-32 px-12 border-t border-theme-border">
      <div 
        style={{ fontFamily: theme.typography.headingFont }}
        className="font-themeHeading font-black tracking-[0.2em] mb-12 text-center text-theme-primary text-4xl md:text-6xl lg:text-7xl"
      >
        {school.name || defaultData.name}
      </div>
      <div className="w-24 h-1 bg-theme-primary mb-12"></div>
      <p 
        style={{ fontFamily: theme.typography.bodyFont }}
        className="text-theme-text font-themeBody italic text-base md:text-xl text-center max-w-sm mb-16"
      >
        Institutional Excellence since 1924. Building the elite leaders of tomorrow.
      </p>
      <div className="flex flex-wrap justify-center gap-10 font-sans font-black text-[10px] tracking-[0.5em] mb-20 opacity-50">
        <span>POLICIES</span>
        <span>STAFF</span>
        <span>ALUMNI</span>
        <span>CAREERS</span>
      </div>
      <p className="border border-theme-border px-10 py-6 text-center text-[9px] tracking-[0.6em] uppercase font-bold text-theme-primary leading-loose">
        Developed for the elite by Majid Qurashi <br/>
        © 2026 Institutional Quality Certified
      </p>
    </footer>
  );

  return (
    <div 
      style={{
        lineHeight: theme.typography.lineHeight,
        letterSpacing: theme.typography.letterSpacing === 'tight' ? '-0.025em' : theme.typography.letterSpacing === 'wide' ? '0.05em' : 'normal',
      }}
      className={`group relative flex flex-col bg-theme-bg text-theme-text font-themeBody ${
        !isFullPage ? 'border border-theme-border rounded-theme overflow-hidden shadow-theme hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2' : 'min-h-screen'
      }`}
    >
      
      {/* Institutional Header (Only in Preview) */}
      {!isFullPage && (
        <div className="bg-theme-footer px-6 py-4 flex items-center justify-between border-b-2 border-theme-primary">
          <div className="flex space-x-3">
            <div className="w-2 h-2 rounded-full bg-theme-primary"></div>
            <div className="w-2 h-2 rounded-full bg-theme-secondary"></div>
          </div>
          <div className="text-[9px] font-sans tracking-[0.5em] text-theme-primary uppercase font-black">{school.name || defaultData.name}</div>
          <div className="w-10"></div>
        </div>
      )}

      {/* Header locked at the top */}
      {renderNavbar()}

      {/* Template Content */}
      <div className={`${!isFullPage ? 'h-[400px] overflow-y-auto no-scrollbar relative select-none' : 'w-full'}`}>
        
        {(() => {
          // Backwards compatibility injection
          const sections = [...theme.layout.sectionsOrder];
          if (!sections.includes('principal')) {
            const aboutIndex = sections.indexOf('about');
            if (aboutIndex !== -1) {
              sections.splice(aboutIndex + 1, 0, 'principal');
            } else {
              sections.splice(sections.length - 1, 0, 'principal');
            }
          }

          return sections.map((sectionId) => {
            if (!isVisible(sectionId)) return null;
            switch (sectionId) {
              case 'hero': return <React.Fragment key="hero">{renderHero()}</React.Fragment>;
              case 'stats': return <React.Fragment key="stats">{renderStats()}</React.Fragment>;
              case 'about': return <React.Fragment key="about">{renderAbout()}</React.Fragment>;
              case 'principal': return <React.Fragment key="principal">{renderPrincipal()}</React.Fragment>;
              case 'banner': return <React.Fragment key="banner">{renderBanner()}</React.Fragment>;
              case 'footer': return <React.Fragment key="footer">{renderFooter()}</React.Fragment>;
              default: return null;
            }
          });
        })()}

        {/* Fade Out (Only in Preview) */}
        {!isFullPage && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-theme-bg to-transparent z-20 pointer-events-none"></div>
        )}
      </div>

      {/* Select Button Overlay (Only in Preview) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-theme-footer/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[200] flex flex-col items-center justify-center backdrop-blur-sm rounded-theme">
          <button
            onClick={onSelect}
            className="bg-theme-primary text-theme-btnText font-themeHeading font-black tracking-[0.2em] px-12 py-5 transform scale-90 group-hover:scale-100 transition-all duration-500 hover:bg-theme-primaryHover shadow-[0_30px_60px_-15px_rgba(var(--theme-primary-rgb),0.3)] cursor-pointer"
          >
            Select Style Three
          </button>
          <p className="text-theme-primary text-[10px] sm:text-xs mt-6 font-themeHeading tracking-[0.5em] uppercase text-center font-bold">Prestigious & Traditional</p>
        </div>
      )}
    </div>
  );
}
