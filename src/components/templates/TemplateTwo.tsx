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
  name: "Future Stars International",
  tagline: "Discover Your True Potential",
  description: "Where creativity meets excellence. Join Future Stars school for a journey of lifelong learning.",
  logo: null,
  image: "https://picsum.photos/seed/school2/1200/800",
  template: "template2"
};

export default function TemplateTwo({ onSelect, data = defaultData, isFullPage = false, customTheme }: TemplateProps) {
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

  // Section Renders
  const renderNavbar = () => {
    const isCenter = theme.layout.logoAlignment === 'center';
    const isRight = theme.layout.logoAlignment === 'right';

    const navbarClass = `z-[100] transition-all w-full ${
      theme.layout.stickyNavbar ? 'sticky top-0' : 'relative'
    } ${
      theme.branding.bgBlur === 'sm' ? 'backdrop-blur-sm' :
      theme.branding.bgBlur === 'md' ? 'backdrop-blur-md' :
      theme.branding.bgBlur === 'lg' ? 'backdrop-blur-lg' : 'backdrop-blur-none'
    } px-6 py-5 md:px-12 bg-theme-navbar/90 border-b border-theme-border/60 shadow-sm flex items-center justify-between`;

    return (
      <nav style={transitionSpeedStyle} className={navbarClass}>
        <div className={`flex items-center ${isCenter ? 'mx-auto flex-col text-center space-y-2' : isRight ? 'ml-auto flex-row-reverse space-x-reverse' : 'space-x-3'} group/logo cursor-pointer`}>
          {school.logo ? (
            <img 
              src={school.logo} 
              alt="Logo" 
              style={{ height: theme.branding.logoSize }}
              className="rounded-2xl rotate-3 shadow-lg border border-theme-border/30" 
            />
          ) : (
            <div 
              style={{ width: theme.branding.logoSize, height: theme.branding.logoSize }}
              className="rounded-tl-[1.5rem] rounded-br-[1.5rem] bg-theme-primary text-theme-btnText flex items-center justify-center font-black text-xl shadow-xl rotate-3 select-none"
            >
              {(school.name || defaultData.name || 'S').charAt(0)}
            </div>
          )}
          <span className="font-themeHeading font-black text-theme-text tracking-widest uppercase italic text-xl md:text-2xl select-none">
            {school.name || defaultData.name}
          </span>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center space-x-4">
           <div className="px-6 py-2.5 rounded-full bg-theme-cardBg text-theme-text font-black text-xs shadow border border-theme-border/60 hover:bg-theme-primary hover:text-theme-btnText cursor-pointer transition-colors">
             Programs
           </div>
           <button 
             style={transitionSpeedStyle}
             className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black text-xs px-6 py-2.5 shadow-xl shadow-theme-primary/10 select-none ${theme.components.buttonStyle} ${hoverAnimClass}`}
           >
             Contact Us
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

        {/* Mobile Dropdown Drawer */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-theme-navbar border-b border-theme-border/60 shadow-xl px-6 py-4 flex flex-col space-y-3 z-[150] animate-fadeIn md:hidden">
            <span className="text-theme-text font-black text-sm hover:text-theme-primary transition-colors py-2.5 px-4 bg-theme-cardBg rounded-2xl cursor-pointer">Programs</span>
            <button 
              style={transitionSpeedStyle}
              className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black text-sm w-full py-3 shadow-xl shadow-theme-primary/10 ${theme.components.buttonStyle} ${hoverAnimClass}`}
            >
              Contact Us
            </button>
          </div>
        )}
      </nav>
    );
  };

  const renderHero = () => (
    <header className={`${isFullPage ? 'px-4 md:px-8 py-4 md:py-8 max-w-7xl mx-auto w-full' : 'px-5 pb-4'}`}>
      <div className={`bg-theme-cardBg rounded-[3.5rem] md:rounded-[5rem] shadow-theme border border-theme-border flex flex-col items-center relative overflow-hidden ${isFullPage ? 'p-10 md:p-24' : 'p-8'} ${textAlignmentClass}`}>
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 right-0 w-64 md:w-[400px] h-64 md:h-[400px] bg-theme-secondary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-48 md:w-[300px] h-48 md:h-[300px] bg-theme-primary/10 rounded-full blur-[80px]" />

        <div className="relative z-10 flex flex-col items-center w-full">
          <div className="bg-theme-primary/10 text-theme-primary font-black uppercase tracking-[0.3em] py-2 px-6 rounded-full mb-8 inline-block text-xs">
            🌟 Admissions Open 2026/27
          </div>
          
          <h1 
            style={{ fontFamily: theme.typography.headingFont, fontWeight: theme.typography.fontWeight }}
            className={`text-theme-text font-black leading-[1] mb-8 md:mb-10 ${isFullPage ? 'text-3xl sm:text-4xl md:text-6xl lg:text-8xl max-w-5xl' : 'text-3xl'}`}
          >
            {(school.tagline || defaultData.tagline || '').split(' ').slice(0, -2).join(' ')} <br/>
            <span className="text-theme-primary underline decoration-theme-secondary decoration-8 underline-offset-[12px] italic">
              {(school.tagline || defaultData.tagline || '').split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          
          <p 
            style={{ fontFamily: theme.typography.bodyFont }}
            className={`text-theme-textMuted mx-auto mb-10 leading-relaxed font-bold max-w-3xl ${isFullPage ? 'text-sm md:text-xl' : 'text-[10px] max-w-xs'}`}
          >
            {school.description || defaultData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              style={transitionSpeedStyle}
              className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black shadow-xl shadow-theme-primary/20 ${theme.components.buttonStyle} ${hoverAnimClass} ${isFullPage ? 'px-14 py-5 text-lg' : 'px-6 py-3 text-[10px]'}`}
            >
              Enroll Today 🚀
            </button>
            <button 
              style={transitionSpeedStyle}
              className={`bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-black hover:bg-slate-200 transition-all ${theme.components.buttonStyle} ${isFullPage ? 'px-14 py-5 text-lg' : 'px-6 py-3 text-[10px]'}`}
            >
              Watch Video 🎬
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const renderStats = () => (
    <section className={`gap-6 ${isFullPage ? 'columns-1 sm:columns-2 lg:columns-3 p-8 md:p-14 max-w-7xl mx-auto' : 'columns-2 px-5 pb-6 gap-3'} space-y-6 md:space-y-8`}>
      
      <div 
        style={transitionSpeedStyle}
        className={`bg-rose-100 dark:bg-rose-950/30 p-8 md:p-10 rounded-[3rem] break-inside-avoid shadow border border-rose-200/30 hover:rotate-2 relative overflow-hidden group/item cursor-pointer ${hoverAnimClass}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-rose-900 mb-6 flex items-center justify-center text-3xl shadow">🎨</div>
        <h3 className="font-themeHeading font-black text-rose-950 dark:text-rose-100 text-2xl md:text-3xl mb-3">Creative Arts</h3>
        <p className="text-rose-900/60 dark:text-rose-300 font-bold leading-normal mb-6 text-sm">Unleashing inner artists through modern digital tools and classic techniques.</p>
        <div className="w-full h-3 bg-white/50 rounded-full">
           <div className="w-3/4 h-full bg-rose-500 rounded-full" />
        </div>
      </div>

      <div 
        style={transitionSpeedStyle}
        className={`bg-sky-100 dark:bg-sky-950/30 p-8 md:p-10 rounded-[3rem] break-inside-avoid shadow border border-sky-200/30 hover:-rotate-2 relative overflow-hidden group/item cursor-pointer ${hoverAnimClass}`}
      >
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-sky-900 mb-6 flex items-center justify-center text-3xl shadow">🚀</div>
        <h3 className="font-themeHeading font-black text-sky-950 dark:text-sky-100 text-2xl md:text-3xl mb-3">Space Tech</h3>
        <p className="text-sky-900/60 dark:text-sky-300 font-bold leading-normal text-sm">Exploring the final frontier with our new observational observatory.</p>
      </div>

      <div 
        style={transitionSpeedStyle}
        className={`bg-emerald-100 dark:bg-emerald-950/30 p-8 md:p-10 rounded-[3rem] break-inside-avoid shadow border border-emerald-200/30 hover:scale-105 relative overflow-hidden group/item cursor-pointer ${hoverAnimClass}`}
      >
         <div className="w-16 h-16 rounded-2xl bg-white dark:bg-emerald-900 mb-6 flex items-center justify-center text-3xl shadow">🌱</div>
         <h3 className="font-themeHeading font-black text-emerald-950 dark:text-emerald-100 text-2xl md:text-3xl mb-3">Eco-Leaders</h3>
         <p className="text-emerald-900/60 dark:text-emerald-300 font-bold leading-normal text-sm">Leading the sustainability movement in local communities.</p>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section className="px-6 md:px-8 py-10 max-w-7xl mx-auto w-full">
       <div className="rounded-[4rem] overflow-hidden h-[400px] md:h-[650px] shadow-theme relative group/img border border-theme-border">
          <img 
            src={school.image || "https://picsum.photos/seed/school2/1200/800"} 
            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover/img:scale-110" 
            alt="School Banner" 
          />
          <div 
            style={{ opacity: theme.branding.overlayOpacity }}
            className="absolute inset-0 bg-theme-primary/30 mix-blend-overlay transition-opacity" 
          />
          <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 md:p-14 rounded-[2.5rem] shadow-2xl text-center md:text-left">
             <div className="text-theme-primary font-black tracking-widest uppercase mb-3 text-xs md:text-sm">Campus Life</div>
             <h2 
               style={{ fontFamily: theme.typography.headingFont }}
               className="text-2xl md:text-4xl lg:text-5xl font-black text-theme-text mb-4 leading-tight"
             >
               A second home <br/> for our stars.
             </h2>
             <button 
               style={transitionSpeedStyle}
               className={`bg-theme-btnBg hover:bg-theme-primaryHover text-theme-btnText font-black px-10 py-4 ${theme.components.buttonStyle} ${hoverAnimClass}`}
             >
               Take Virtual Tour
             </button>
          </div>
       </div>
    </section>
  );

  const renderPrincipal = () => {
    return (
      <section className="py-20 md:py-24 px-6 relative max-w-7xl mx-auto overflow-hidden w-full">
        {/* Playful background highlights */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-theme-primary/5 rounded-full blur-[90px]" />
        
        <div className="bg-theme-cardBg rounded-[4rem] p-10 md:p-16 border border-theme-border/60 shadow-theme grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-theme-secondary/5 rounded-full blur-3xl pointer-events-none" />
          
          {/* Left Column: Image in creative organic pill frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-xs">
              {/* Rotating behind highlight */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-theme-secondary to-theme-primary rounded-tr-[4rem] rounded-bl-[4rem] opacity-25 blur-md group-hover:rotate-6 transition duration-700" />
              
              <div className="relative rounded-tr-[3.5rem] rounded-bl-[3.5rem] overflow-hidden border-4 border-theme-border bg-theme-cardBg shadow-xl aspect-[4/5]">
                <img 
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600" 
                  className="object-cover w-full h-full transform transition duration-1000 group-hover:scale-105" 
                  alt="Principal Desk Portrait" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-primary/40 to-transparent mix-blend-multiply" />
              </div>
            </div>
          </div>

          {/* Right Column: Text & Quote */}
          <div className={`lg:col-span-7 ${textAlignmentClass}`}>
            <div className="inline-flex items-center space-x-2 py-2 px-6 rounded-full bg-theme-primary/10 text-theme-primary font-black text-xs uppercase tracking-widest mb-6">
              <span>💫</span> <span>Principal's Desk</span>
            </div>

            <h2 
              style={{ fontFamily: theme.typography.headingFont }}
              className="text-3xl md:text-5xl font-black text-theme-text mb-6 leading-none tracking-tight"
            >
              Inspiring Minds, <br/>
              <span className="text-theme-primary underline decoration-theme-secondary decoration-6 underline-offset-4 italic">
                Shaping Futures
              </span>
            </h2>

            <div className="relative mb-6">
              <span className="absolute -top-4 -left-4 text-7xl text-theme-secondary/20 pointer-events-none font-serif">“</span>
              <p 
                style={{ fontFamily: theme.typography.bodyFont }}
                className="text-base md:text-lg text-theme-textMuted leading-relaxed font-bold italic relative z-10 pl-4"
              >
                "At {school.name || 'our school'}, education extends far beyond textbooks. We spark creativity, build resilience, and encourage our kids to explore their passions. Together, we cultivate a community of brave thinkers and innovative leaders ready to impact the world."
              </p>
            </div>

            <p className="text-sm md:text-base text-theme-textMuted leading-relaxed mb-8">
              We look forward to partnering with parents and our local community to offer an incredible education that meets every student's individual talents. Feel free to connect with our administrative team for a campus tour.
            </p>

            {/* Playful Credentials */}
            <div className="flex flex-col items-start lg:items-center mt-4">
              <div className="font-serif text-2xl text-theme-primary italic rotate-[-1deg]">{school.principal_name || 'Dr. Sarah Jenkins'}</div>
              <div className="text-xs font-black uppercase tracking-widest text-theme-textMuted mt-1">{school.school_type ? `Principal, ${school.school_type}` : 'Head of School & Director'}</div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderBanner = () => (
    <div className={`relative ${isFullPage ? 'max-w-7xl mx-auto px-6 md:px-8 py-12' : 'px-5 pb-8'}`}>
      <div className="bg-slate-900 text-white p-8 md:p-16 rounded-[4rem] flex flex-col md:flex-row items-center justify-between relative overflow-hidden group/banner shadow-theme">
        <div className="absolute right-0 top-0 w-[500px] h-full bg-theme-primary transform -skew-x-[30deg] translate-x-64 mix-blend-overlay group-hover/banner:translate-x-32 transition-transform duration-1000" />
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 relative z-10 text-center md:text-left">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex-shrink-0 flex items-center justify-center text-3xl shadow rotate-12 group-hover/banner:rotate-[-12deg] transition-transform">🔔</div>
          <div>
            <div className="text-2xl md:text-4xl font-black mb-2 tracking-tighter">Sports Festival 2026</div>
            <div className="text-slate-400 text-sm md:text-base font-bold max-w-lg font-mono">Join 500+ participants for three days of athletic glory. Early bird registration is open!</div>
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
    <footer className="bg-slate-950 text-slate-350 py-20 px-8 border-t border-slate-900 w-full">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 rounded-tl-[1.2rem] rounded-br-[1.2rem] bg-theme-primary shadow" />
          <span className="font-themeHeading font-black text-white text-3xl tracking-tighter italic uppercase">{school.name || defaultData.name}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left mb-16 w-full font-black uppercase tracking-widest text-[10px] md:text-xs">
          <div className="space-y-3">
             <div className="text-theme-primary">Nav</div>
             <div className="text-slate-500 hover:text-white transition-colors cursor-pointer">Academics</div>
             <div className="text-slate-500 hover:text-white transition-colors cursor-pointer">Faculty</div>
          </div>
          <div className="space-y-3">
             <div className="text-theme-primary">Contact</div>
             <div className="text-slate-500 normal-case font-medium text-[11px] leading-relaxed">{school.address || '12 Main Boulevard, Sector C, Srinagar, J&K'}</div>
             <div className="text-slate-500 normal-case font-medium text-[11px]">{school.contact_number || '+91 98765 43210'}</div>
             <div className="text-theme-primary text-[10px] font-black tracking-widest uppercase">{school.school_type || 'High School'}</div>
          </div>
          <div className="space-y-3">
             <div className="text-theme-primary">Legal</div>
             <div className="text-slate-500 hover:text-white transition-colors cursor-pointer">Privacy</div>
             <div className="text-slate-500 hover:text-white transition-colors cursor-pointer">Staff</div>
          </div>
          <div className="col-span-2 flex flex-col items-center md:items-end space-y-4">
              <div className="text-slate-500 font-bold normal-case text-center md:text-right text-sm">Join 5,000+ students on their journey to the stars.</div>
              <div className="bg-white/5 p-3 rounded-[1.5rem] flex space-x-4">
                 <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-theme-primary cursor-pointer transition-colors text-xs font-bold select-none">IG</div>
                 <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-theme-primary cursor-pointer transition-colors text-xs font-bold select-none">YT</div>
              </div>
          </div>
        </div>
        <p className="text-slate-700 text-[9px] font-black tracking-[1em] uppercase border-t border-slate-900 pt-10 text-center w-full">
          © 2026 Majid Qurashi — Future Starts Today
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
      className={`group relative flex flex-col bg-theme-bg text-theme-text font-themeBody overflow-x-hidden ${
        !isFullPage ? 'border border-theme-border rounded-[2.5rem] overflow-hidden shadow-theme hover:shadow-2xl transition-all duration-700 ease-out transform hover:-translate-y-2' : 'min-h-screen'
      }`}
    >
      
      {/* Playful Header (Only in Preview) */}
      {!isFullPage && (
        <div className="bg-theme-cardBg px-6 py-3 flex justify-between items-center border-b border-theme-border">
          <div className="text-[10px] font-black text-theme-primary tracking-wider uppercase italic">{school.name || defaultData.name}</div>
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
        </div>
      )}

      {/* Sticky/Locked Navbar elements */}
      {renderNavbar()}

      {/* Template Dynamic Content */}
      <div className={`${!isFullPage ? 'h-[400px] overflow-y-auto no-scrollbar relative select-none' : 'w-full'}`}>
        
        {/* Render sections dynamically according to admin-specified order & visibilities */}
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
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-theme-bg to-transparent z-20 pointer-events-none" />
        )}
      </div>

      {/* Select Button Overlay (Only in Preview Modal) */}
      {!isFullPage && onSelect && (
        <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[200] flex flex-col items-center justify-center backdrop-blur-md rounded-[2.5rem]">
          <button
            onClick={onSelect}
            className="bg-theme-primary text-theme-btnText font-black px-10 py-4 rounded-[1.5rem] transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 hover:bg-theme-primaryHover shadow-2xl shadow-theme-primary/40 cursor-pointer"
          >
            Select Style Two
          </button>
          <p className="text-theme-primary text-[10px] mt-6 font-black tracking-[0.4em] uppercase animate-pulse">Dynamic Creativity</p>
        </div>
      )}
    </div>
  );
}
