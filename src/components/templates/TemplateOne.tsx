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
  name: "Qurashi International School",
  tagline: "Excellence in Education",
  description: "Empowering the next generation of leaders with world-class facilities and expert faculty.",
  logo: null,
  image: "https://picsum.photos/seed/school1/1200/800",
  template: "template1"
};

export default function TemplateOne({ onSelect, data = defaultData, isFullPage = false, customTheme }: TemplateProps) {
  const school = data || defaultData;
  
  const context = useSchoolTheme();
  const theme = customTheme || context?.theme || PRESETS['modern-blue'];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    theme.components.hoverAnimation === 'slide-up' ? 'hover:-translate-y-2 transform transition-transform' : '';

  const transitionSpeedStyle = {
    transitionDuration: theme.components.transitionSpeed || '300ms'
  };

  // Section Renders
  const renderNavbar = () => {
    const isCenter = theme.layout.logoAlignment === 'center';
    const isRight = theme.layout.logoAlignment === 'right';

    const navbarContainerClass = isCenter
      ? "max-w-7xl mx-auto flex flex-col items-center space-y-4 text-center"
      : isRight
        ? "max-w-7xl mx-auto flex flex-row-reverse justify-between items-center"
        : "max-w-7xl mx-auto flex flex-row justify-between items-center";

    const logoInnerClass = isCenter
      ? "flex flex-col items-center space-y-2"
      : isRight
        ? "flex flex-row-reverse items-center space-x-3 space-x-reverse"
        : "flex items-center space-x-3";

    return (
      <nav 
        style={transitionSpeedStyle}
        className={`z-[100] transition-all w-full ${
          theme.layout.stickyNavbar ? 'sticky top-0' : 'relative'
        } ${
          theme.branding.bgBlur === 'sm' ? 'backdrop-blur-sm' :
          theme.branding.bgBlur === 'md' ? 'backdrop-blur-md' :
          theme.branding.bgBlur === 'lg' ? 'backdrop-blur-lg' : 'backdrop-blur-none'
        } px-6 py-4 md:px-12 bg-theme-navbar/90 border-b border-theme-border/80 shadow-sm`}
      >
        <div className={navbarContainerClass}>
          {/* Logo & Branding */}
          <div className={logoInnerClass}>
            {school.logo ? (
              <img 
                src={school.logo} 
                alt="Logo" 
                style={{ height: theme.branding.logoSize }}
                className="rounded-xl shadow-md border border-theme-border/40"
              />
            ) : (
              <div 
                style={{ width: theme.branding.logoSize, height: theme.branding.logoSize }}
                className="bg-theme-primary text-theme-btnText rounded-xl flex items-center justify-center font-black text-lg shadow-lg select-none"
              >
                {(school.name || defaultData.name || 'S').charAt(0)}
              </div>
            )}
            <div className="font-themeHeading font-black text-theme-text text-xl md:text-2xl tracking-tight select-none">
              {school.name || defaultData.name}
            </div>
          </div>
          
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-extrabold text-theme-textMuted">
            <span className="hover:text-theme-primary transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-theme-primary after:transition-all">Academics</span>
            <span className="hover:text-theme-primary transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-theme-primary after:transition-all">Admissions</span>
            <span className="hover:text-theme-primary transition-colors cursor-pointer relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-0.5 after:bg-theme-primary after:transition-all">About</span>
            <button 
              style={transitionSpeedStyle}
              className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText px-7 py-2.5 font-bold shadow-lg shadow-theme-primary/15 select-none ${theme.components.buttonStyle} ${hoverAnimClass}`}
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
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
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-theme-border/60 flex flex-col space-y-3 animate-fadeIn">
            <span className="text-theme-textMuted font-bold hover:text-theme-primary transition-colors py-2.5 px-3 hover:bg-theme-primary/5 rounded-lg cursor-pointer">Academics</span>
            <span className="text-theme-textMuted font-bold hover:text-theme-primary transition-colors py-2.5 px-3 hover:bg-theme-primary/5 rounded-lg cursor-pointer">Admissions</span>
            <span className="text-theme-textMuted font-bold hover:text-theme-primary transition-colors py-2.5 px-3 hover:bg-theme-primary/5 rounded-lg cursor-pointer">About</span>
            <button 
              style={transitionSpeedStyle}
              className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText w-full py-3 font-bold shadow-lg shadow-theme-primary/10 mt-2 ${theme.components.buttonStyle} ${hoverAnimClass}`}
            >
              Apply Now
            </button>
          </div>
        )}
      </nav>
    );
  };

  const renderHero = () => (
    <header className={`${isFullPage ? 'px-4 md:px-8 py-6 md:py-12 max-w-7xl mx-auto w-full' : 'px-4 py-2'}`}>
      <div className={`relative rounded-theme overflow-hidden bg-theme-cardBg shadow-theme ${isFullPage ? 'h-[480px] md:h-[600px]' : 'aspect-video'} group/hero`}>
        <img
          src={school.image || "https://picsum.photos/seed/school1/1200/800"}
          alt={school.name || "School"}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover/hero:scale-105"
        />
        
        {/* Customizable Overlay Opacity */}
        <div 
          style={{ opacity: theme.branding.overlayOpacity }}
          className="absolute inset-0 bg-slate-950 mix-blend-multiply transition-opacity" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        
        <div className={`absolute inset-0 z-10 flex flex-col justify-end ${isFullPage ? 'p-8 md:p-20' : 'p-6'} ${textAlignmentClass}`}>
          <div className="max-w-3xl">
            <span className={`inline-block py-1.5 md:py-2 px-4 md:px-5 rounded-full bg-theme-primary/25 backdrop-blur-md border border-theme-primary/45 text-theme-accent font-bold uppercase tracking-[0.2em] mb-4 md:mb-6 ${isFullPage ? 'text-[10px] md:text-xs' : 'text-[6px]'}`}>
              Est. 1998 — Top Rated Institution
            </span>
            <h1 
              style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
              className={`text-white font-black leading-[1.1] mb-6 md:mb-8 tracking-tight transition-all ${isFullPage ? 'text-3xl sm:text-4xl md:text-6xl lg:text-7.5xl' : 'text-xl'}`}
            >
              {school.tagline || "Future Ready Education"}
            </h1>
            <p 
              style={{ fontFamily: theme.typography.bodyFont }}
              className={`text-slate-200 mb-8 md:mb-10 leading-relaxed font-semibold ${isFullPage ? 'text-sm md:text-lg lg:text-xl max-w-2xl' : 'text-[9px] max-w-[80%]'}`}
            >
              {school.description}
            </p>
            <div className={`flex ${theme.layout.mainTextAlignment === 'center' ? 'justify-center' : theme.layout.mainTextAlignment === 'right' ? 'justify-end' : 'justify-start'}`}>
              <button 
                style={transitionSpeedStyle}
                className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black shadow-2xl shadow-theme-primary/20 ${theme.components.buttonStyle} ${hoverAnimClass} ${isFullPage ? 'px-10 py-5 text-base' : 'px-4 py-2 text-[8px]'}`}
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const renderStats = () => (
    <section className={`grid gap-4 md:gap-8 max-w-7xl mx-auto ${isFullPage ? 'grid-cols-1 sm:grid-cols-3 p-8 md:p-12' : 'grid-cols-3 px-4 py-4'}`}>
      <div 
        style={transitionSpeedStyle}
        className={`bg-theme-cardBg p-8 md:p-10 rounded-theme border border-theme-border/60 shadow-theme ${hoverAnimClass}`}
      >
         <div className="text-4xl md:text-6xl font-black text-theme-primary mb-2">98%</div>
         <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-theme-textMuted">Career Success</div>
      </div>
      <div 
        style={transitionSpeedStyle}
        className={`bg-theme-cardBg p-8 md:p-10 rounded-theme border border-theme-border/60 shadow-theme ${hoverAnimClass}`}
      >
         <div className="text-4xl md:text-6xl font-black text-theme-secondary mb-2">50+</div>
         <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-theme-textMuted">Global Awards</div>
      </div>
      <div 
        style={transitionSpeedStyle}
        className={`bg-theme-cardBg p-8 md:p-10 rounded-theme border border-theme-border/60 shadow-theme ${hoverAnimClass}`}
      >
         <div className="text-4xl md:text-6xl font-black text-theme-accent mb-2">12k</div>
         <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-theme-textMuted">Alumni Network</div>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="py-20 md:py-24 px-6 overflow-hidden relative max-w-7xl mx-auto">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-theme-primary/5 blur-[150px] -z-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className={`order-2 lg:order-1 ${textAlignmentClass}`}>
          <div className="inline-block py-2 px-5 rounded-xl bg-theme-primary/10 text-theme-primary font-black text-xs uppercase tracking-widest mb-6">
            Our Mission
          </div>
          <h2 
            style={{ fontFamily: theme.typography.headingFont }}
            className="text-3xl md:text-5xl font-black text-theme-text mb-6 leading-tight"
          >
            Shaping the leaders <br/> of tomorrow.
          </h2>
          <p 
            style={{ fontFamily: theme.typography.bodyFont }}
            className="text-base md:text-lg text-theme-textMuted leading-relaxed mb-8"
          >
            {school.description}
            <br /><br />
            Founded with a vision to provide quality education, our school has been a lighthouse for students for over two decades. We believe in holistic development and preparing students for the challenges of tomorrow.
          </p>
          <div className={`grid grid-cols-2 gap-8 ${textAlignmentClass}`}>
             <div>
                <div className="text-xl font-black text-theme-text mb-2 italic">Holistic</div>
                <p className="text-sm text-theme-textMuted">Focus on mental, physical and emotional growth.</p>
             </div>
             <div>
                <div className="text-xl font-black text-theme-text mb-2 italic">Innovative</div>
                <p className="text-sm text-theme-textMuted">Cutting-edge labs and world-class technology.</p>
             </div>
          </div>
        </div>
        <div className="lg:order-2 grid grid-cols-2 gap-4">
            <div className="h-64 md:h-[400px] rounded-theme bg-theme-primary overflow-hidden shadow-theme">
              <img src="https://picsum.photos/seed/edu1/800/1200" className="object-cover w-full h-full" alt="Feature" />
            </div>
            <div className="h-64 md:h-[400px] rounded-theme bg-theme-secondary overflow-hidden shadow-theme translate-y-8">
              <img src="https://picsum.photos/seed/edu2/800/1200" className="object-cover w-full h-full" alt="Feature" />
            </div>
        </div>
      </div>
    </section>
  );

  const renderPrincipal = () => {
    return (
      <section className="py-20 md:py-24 px-6 relative max-w-7xl mx-auto overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-theme-secondary/5 blur-[120px] -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Principal Image Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Decorative behind border */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-theme-primary to-theme-secondary rounded-[2rem] opacity-35 blur-lg group-hover:opacity-50 transition duration-700" />
              
              <div className="relative rounded-[2rem] overflow-hidden border-4 border-theme-cardBg bg-theme-cardBg shadow-2xl aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600" 
                  className="object-cover w-full h-full transform transition duration-750 group-hover:scale-105" 
                  alt="Principal Message" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="font-themeHeading text-xl font-bold tracking-tight">{school.principal_name || 'Dr. Sarah Jenkins'}</div>
                  <div className="text-white/80 text-xs font-semibold uppercase tracking-wider mt-1">{school.school_type ? `Principal, ${school.school_type}` : 'Ph.D. in Educational Leadership'}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Message Content */}
          <div className={`lg:col-span-7 ${textAlignmentClass} flex flex-col justify-center`}>
            <div className="inline-flex items-center space-x-2 py-2 px-5 rounded-xl bg-theme-secondary/10 text-theme-secondary font-black text-xs uppercase tracking-widest mb-6 self-start lg:self-auto">
              <span>✍️</span> <span>Principal's Desk</span>
            </div>
            
            <h2 
              style={{ fontFamily: theme.typography.headingFont }}
              className="text-3xl md:text-5xl font-black text-theme-text mb-6 leading-tight"
            >
              Welcome to Our Academic Journey
            </h2>
            
            <div className="relative">
              {/* Quote Mark Decoration */}
              <span className="absolute -top-6 -left-6 text-8xl text-theme-primary/10 select-none pointer-events-none font-serif">“</span>
              
              <p 
                style={{ fontFamily: theme.typography.bodyFont }}
                className="text-base md:text-lg text-theme-textMuted leading-relaxed mb-6 font-medium italic relative z-10"
              >
                "At {school.name || 'our school'}, we are committed to building a vibrant learning community where intellectual curiosity is sparked, and students are empowered to make a meaningful difference in the world. Our holistic approach ensures that each child is supported to achieve academic excellence and personal growth."
              </p>
            </div>
            
            <p className="text-sm md:text-base text-theme-textMuted leading-relaxed mb-8">
              We welcome you to explore our campus, discover our programs, and become a part of our legacy of excellence. Let us work together to give our children the best possible foundation for their lives.
            </p>
            
            {/* Signature & Credentials */}
            <div className="flex flex-col items-start lg:items-center mt-4">
              <div className="font-serif text-2xl text-theme-primary italic tracking-wide">{school.principal_name || 'Dr. Sarah Jenkins'}</div>
              <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-theme-textMuted mt-1">Principal & Executive Director</div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderBanner = () => (
    <div className={`relative ${isFullPage ? 'max-w-7xl mx-auto px-6 md:px-12 py-16' : 'px-4 pb-6'}`}>
      <div className="bg-theme-footer text-slate-100 p-8 md:p-14 rounded-theme flex flex-col md:flex-row items-center justify-between relative overflow-hidden group/banner shadow-theme">
        <div className="absolute right-0 top-0 w-[500px] h-full bg-theme-primary transform -skew-x-[30deg] translate-x-64 mix-blend-overlay group-hover/banner:translate-x-32 transition-transform duration-1000" />
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 relative z-10 text-center md:text-left">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex-shrink-0 flex items-center justify-center text-3xl shadow rotate-12 group-hover/banner:rotate-[-12deg] transition-transform">🔔</div>
          <div>
            <div className="text-2xl md:text-4xl font-black mb-2 tracking-tighter">Sports Festival 2026</div>
            <div className="text-slate-400 text-sm md:text-base font-bold max-w-lg">Join 500+ participants for three days of athletic glory. Early bird registration is open!</div>
          </div>
        </div>
        {isFullPage && (
          <button 
            style={transitionSpeedStyle}
            className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black px-10 py-4 rounded-xl relative z-10 cursor-pointer shadow-lg active:scale-95 transition-all mt-8 md:mt-0 ${theme.components.buttonStyle} ${hoverAnimClass}`}
          >
            Register Now
          </button>
        )}
      </div>
    </div>
  );

  const renderFooter = () => (
    <footer className="bg-theme-footer text-slate-300 border-t border-theme-border/60 py-16 px-8 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start space-y-10 md:space-y-0">
         <div className="text-center md:text-left space-y-4">
            <div className="font-themeHeading font-black tracking-tighter text-white text-3xl">{school.name || defaultData.name}</div>
            <p className="text-slate-400 font-medium md:max-w-xs">{school.tagline || defaultData.tagline}</p>
         </div>
         <div className="grid grid-cols-3 gap-8 md:gap-12 text-sm font-bold">
            <div className="space-y-3">
               <div className="text-slate-500 uppercase tracking-widest text-[10px]">Links</div>
               <div className="text-slate-400 hover:text-white transition-colors cursor-pointer">Home</div>
               <div className="text-slate-400 hover:text-white transition-colors cursor-pointer">Faculty</div>
            </div>
            <div className="space-y-3">
               <div className="text-slate-500 uppercase tracking-widest text-[10px]">Resources</div>
               <div className="text-slate-400 hover:text-white transition-colors cursor-pointer">Support</div>
               <div className="text-slate-400 hover:text-white transition-colors cursor-pointer">Terms</div>
            </div>
            <div className="space-y-3 col-span-3 md:col-span-1">
               <div className="text-slate-500 uppercase tracking-widest text-[10px]">Contact Us</div>
               <div className="text-slate-400 text-xs font-medium leading-relaxed">{school.address || '12 Main Boulevard, Sector C, Srinagar, J&K'}</div>
               <div className="text-slate-400 text-xs font-medium">{school.contact_number || '+91 98765 43210'}</div>
               <div className="text-theme-primary text-xs font-black uppercase tracking-widest">{school.school_type || 'High School'}</div>
            </div>
         </div>
      </div>
      <div className="max-w-7xl mx-auto pt-14 text-center text-slate-500 text-[10px] font-bold tracking-[0.5em] uppercase border-t border-slate-800/40 mt-10">
         © 2026 Developed by Majid Qurashi <br/> The Future Starts Here
      </div>
    </footer>
  );

  return (
    <div 
      style={{
        lineHeight: theme.typography.lineHeight,
        letterSpacing: theme.typography.letterSpacing === 'tight' ? '-0.025em' : theme.typography.letterSpacing === 'wide' ? '0.05em' : 'normal',
      }}
      className={`group relative flex flex-col bg-theme-bg text-theme-text font-themeBody ${
        !isFullPage ? 'border border-theme-border rounded-2xl overflow-hidden shadow-theme hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2' : 'min-h-screen'
      }`}
    >
      
      {/* OS Header / Window Bar (Only in Preview) */}
      {!isFullPage && (
        <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 flex items-center border-b border-theme-border">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <div className="mx-auto text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{school.name || defaultData.name}</div>
        </div>
      )}

      {/* Header element locked at the top */}
      {renderNavbar()}

      {/* Template Dynamic Content */}
      <div className={`${!isFullPage ? 'h-[400px] overflow-y-auto no-scrollbar relative select-none' : 'w-full'}`}>
        
        {/* Render sections dynamically according to admin-specified order & visibilities */}
        {(() => {
          // If 'principal' is missing from sectionsOrder for backwards compatibility, insert it right after 'about'
          const sections = [...theme.layout.sectionsOrder];
          if (!sections.includes('principal')) {
            const aboutIndex = sections.indexOf('about');
            if (aboutIndex !== -1) {
              sections.splice(aboutIndex + 1, 0, 'principal');
            } else {
              sections.splice(sections.length - 1, 0, 'principal'); // insert before footer
            }
          }

          return sections.map((sectionId) => {
            if (!isVisible(sectionId)) return null;
            switch (sectionId) {
              case 'hero': return <React.Fragment key="hero">{renderHero()}</React.Fragment>;
              case 'stats': return <React.Fragment key="stats">{renderStats()}</React.Fragment>;
              case 'interactive-campus': return <InteractiveCampus key="interactive-campus" school={school} theme={theme} isFullPage={isFullPage} />;
              case 'virtual-reception': return <VirtualReception key="virtual-reception" school={school} theme={theme} isFullPage={isFullPage} />;
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
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-theme-bg to-transparent z-20 pointer-events-none" />
        )}
      </div>

      {/* Select Button Overlay (Only in Preview Modal) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[200] flex flex-col items-center justify-center backdrop-blur-sm">
          <button
            onClick={onSelect}
            className="bg-white text-indigo-600 font-black px-10 py-4 rounded-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 shadow-2xl cursor-pointer"
          >
            Select Style One
          </button>
          <p className="text-white/80 text-[10px] sm:text-xs mt-4 font-bold uppercase tracking-[0.2em]">Sleek Professionalism</p>
        </div>
      )}
    </div>
  );
}
