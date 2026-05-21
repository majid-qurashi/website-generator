'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  BookOpen, FlaskConical, Presentation, Trophy, 
  Monitor, Bus, Utensils, Theater, Play, X, CheckCircle, 
  Sun, Award, Calendar, ArrowRight, Quote, Sparkles
} from 'lucide-react';
import { SchoolData } from '@/types/school';
import { ThemeConfig } from '@/types/theme';

interface InteractiveCampusProps {
  school: SchoolData;
  theme: any;
  isFullPage?: boolean;
}

// Rolling Counter Component
function RollingCounter({ value, duration = 2 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Extract number and suffix (e.g., "98%" -> 98, "%" or "25+" -> 25, "+")
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = numericValue;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 16);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 40); // Increment step
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref} className="font-mono">
      {isInView ? `${count}${suffix}` : `0${suffix}`}
    </span>
  );
}

export default function InteractiveCampus({ school, theme, isFullPage = true }: InteractiveCampusProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  // Parallax background scroll effect using framer-motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroBgY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Showcase Areas Data
  const campusAreas = [
    {
      id: 'library',
      name: 'Central Library',
      icon: BookOpen,
      shortDesc: 'A sanctuary of knowledge housing over 50,000 volumes, digital archives, and quiet study alcoves.',
      image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
      facilities: ['50k+ Books & Journals', 'Digital Research Portal', 'Collaborative Study Rooms', 'Audiobook Lounges'],
      accentColor: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'group-hover:border-blue-500/50'
    },
    {
      id: 'labs',
      name: 'Advanced Science Labs',
      icon: FlaskConical,
      shortDesc: 'State-of-the-art physics, chemistry, and biology stations designed for hand-on empirical experiments.',
      image: 'https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=800&q=80',
      facilities: ['Advanced Biotech Stations', 'Robotics & IoT Sandbox', 'Chemical Safety Hoods', 'Data Modeling Terminal'],
      accentColor: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'group-hover:border-emerald-500/50'
    },
    {
      id: 'classrooms',
      name: 'Smart Classrooms',
      icon: Presentation,
      shortDesc: 'Collaborative workspaces equipped with interactive boards, ergonomic seats, and hybrid learning tools.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
      facilities: ['4K Interactive Boards', 'Hybrid Video Cameras', 'Ergonomic Desk Systems', 'Acoustic Soundproofing'],
      accentColor: 'from-violet-500/20 to-purple-500/20',
      borderColor: 'group-hover:border-violet-500/50'
    },
    {
      id: 'playground',
      name: 'Athletic Turf & Arena',
      icon: Trophy,
      shortDesc: 'Multi-sport high-grade Olympic synthetic fields for football, basketball courts, and athletics tracking.',
      image: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
      facilities: ['Olympic-Standard Turf', 'Indoor Basketball Arena', 'All-Weather Athletics Track', 'Professional Fitness Club'],
      accentColor: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'group-hover:border-amber-500/50'
    },
    {
      id: 'auditorium',
      name: 'Grand Auditorium',
      icon: Theater,
      shortDesc: '1,200 capacity state-of-the-art concert hall equipped with professional stage acoustics and digital lights.',
      image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
      facilities: ['1200 Cushion Seating', 'Dolby Atmos Acoustics', 'LED Digital Stage Backdrops', 'Broadcast Control Room'],
      accentColor: 'from-rose-500/20 to-pink-500/20',
      borderColor: 'group-hover:border-rose-500/50'
    },
    {
      id: 'complab',
      name: 'Next-Gen Computer Lab',
      icon: Monitor,
      shortDesc: 'High-speed desktop workstations equipped with AI software suites, VR headsets, and 3D printing pods.',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
      facilities: ['RTX-Powered AI PCs', 'Oculus VR Testing Pods', 'Industrial 3D Printers', 'Gigabit Fiber Network'],
      accentColor: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'group-hover:border-cyan-500/50'
    },
    {
      id: 'transport',
      name: 'Safe Transport Fleet',
      icon: Bus,
      shortDesc: 'All-route air-conditioned buses equipped with real-time GPS tracking systems and safety attendants.',
      image: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=800&q=80',
      facilities: ['AC Fleet with GPS tracking', 'Real-Time App Notifications', 'First-Aid Onboard Kits', 'Certified Safe Drivers'],
      accentColor: 'from-teal-500/20 to-emerald-500/20',
      borderColor: 'group-hover:border-teal-500/50'
    },
    {
      id: 'cafeteria',
      name: 'Gourmet Cafeteria',
      icon: Utensils,
      shortDesc: 'A bright hygienic dining space serving nutritionist-certified balanced organic meals and snacks.',
      image: 'https://images.unsplash.com/photo-1576972405668-2d020a01cbfa?auto=format&fit=crop&w=800&q=80',
      facilities: ['Nutritionist-Approved Menu', '100% Organic & Fresh Supply', 'Hygienic Smart Kitchen', 'Zero-Waste Bio-Recycling'],
      accentColor: 'from-lime-500/20 to-amber-500/20',
      borderColor: 'group-hover:border-lime-500/50'
    }
  ];

  // Timeline Data
  const timelineStages = [
    {
      time: '08:00 AM',
      title: 'Morning Assembly & Mindfulness',
      desc: 'The campus wakes up to serene prayer, morning yoga, news analysis, and interactive student-led theme discussions.',
      icon: Sun,
      color: 'border-amber-400 bg-amber-500/10 text-amber-500'
    },
    {
      time: '09:00 AM',
      title: 'Deep Core Academics',
      desc: 'Smart classrooms activate. Students engage in rigorous interdisciplinary inquiry, logic, mathematics, and collaborative projects.',
      icon: BookOpen,
      color: 'border-blue-400 bg-blue-500/10 text-blue-500'
    },
    {
      time: '11:30 AM',
      title: 'Empirical Labs & Biotech Research',
      desc: 'Theory transforms into action. Hand-on laboratory sessions in high-tech biotech, chemical modeling, and robotics suites.',
      icon: FlaskConical,
      color: 'border-emerald-400 bg-emerald-500/10 text-emerald-500'
    },
    {
      time: '01:30 PM',
      title: 'Athletics & Physical Resilience',
      desc: 'Team spirit and physical conditioning on the synthetic turf, track lanes, basketball courts, and gymnastic training systems.',
      icon: Trophy,
      color: 'border-orange-400 bg-orange-500/10 text-orange-500'
    },
    {
      time: '03:00 PM',
      title: 'Clubs & Creative Arts Showcase',
      desc: 'A vibrant explosion of expression: theatrical dramatics in the grand auditorium, AI code compilation, painting, and vocal music.',
      icon: Calendar,
      color: 'border-rose-400 bg-rose-500/10 text-rose-500'
    },
    {
      time: '05:00 PM',
      title: 'Olympiad Training & Achievements',
      desc: 'Mentoring young geniuses for international mathematics, scientific, and computing championships under elite expert faculty.',
      icon: Sparkles,
      color: 'border-violet-400 bg-violet-500/10 text-violet-500'
    },
    {
      time: '06:00 PM',
      title: 'Graduation & Legacy Launch',
      desc: 'Nurturing global citizens ready to dominate Stanford, MIT, IITs, and become empathetic future leaders of global scale.',
      icon: Award,
      color: 'border-cyan-400 bg-cyan-500/10 text-cyan-500'
    }
  ];

  // Stats Data
  const achievements = [
    { label: 'Board Examination Results', value: '99.4%', description: 'Sustained top district average score' },
    { label: 'Olympiad Gold Medals', value: '18+', description: 'Representing country on global scale' },
    { label: 'Ivy League & Elite Placements', value: '250+', description: 'Graduates at global premier universities' },
    { label: 'State & National Trophies', value: '45+', description: 'Championships in athletics and debating' },
    { label: 'Doctoral Faculty Experts', value: '80%', description: 'Teachers holding advanced post-grad/Ph.D.' }
  ];

  const currentArea = campusAreas.find(a => a.id === activeArea);

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden bg-theme-bg text-theme-text transition-colors duration-300">
      
      {/* 1. PREMIUM FULLSCREEN HERO SECTION */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Parallax Background Canvas */}
        <motion.div 
          style={{ y: heroBgY }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-theme-bg z-10" />
          <img 
            src={school.image || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80"} 
            alt={school.name || "School"}
            className="w-full h-full object-cover scale-105"
          />
        </motion.div>

        {/* Floating Abstract Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-theme-primary/10 blur-[120px] animate-pulse" />
          <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] rounded-full bg-theme-secondary/15 blur-[120px] animate-pulse" />
        </div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-6 text-center z-20 flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-theme-primary/10 backdrop-blur-md border border-theme-primary/20 text-theme-accent font-black text-[10px] sm:text-xs uppercase tracking-[0.25em] mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>Interactive Campus Experience</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-themeHeading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white max-w-5xl mb-8"
          >
            {school.tagline || "Where Excellence Meets Infinite Innovation"}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-themeBody text-slate-200 text-sm sm:text-lg md:text-xl max-w-3xl leading-relaxed font-medium mb-12"
          >
            {school.description || `Welcome to ${school.name || "Heritage International Academy"}. Embark on an immersive digital walkthrough of our premium infrastructure, scholarly achievements, and daily flow.`}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-md"
          >
            <a 
              href="#showcase"
              className="w-full sm:w-auto px-8 py-4.5 bg-theme-primary text-theme-btnText hover:bg-theme-primaryHover font-black text-center text-sm shadow-2xl rounded-full transform hover:scale-[1.03] transition-all hover:shadow-theme-primary/20 cursor-pointer"
            >
              Explore Campus Map
            </a>
            <button 
              onClick={() => setShowVideo(true)}
              className="w-full sm:w-auto px-8 py-4.5 bg-white/10 hover:bg-white/20 text-white font-black text-center text-sm border border-white/25 rounded-full flex items-center justify-center space-x-2 backdrop-blur-md transform hover:scale-[1.03] transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-white fill-white" />
              <span>Watch Digital Tour</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
          <span className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-bold mb-2">Scroll to Walkthrough</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE CAMPUS SHOWCASE */}
      <section id="showcase" className="py-24 sm:py-32 max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-theme-primary font-black text-xs uppercase tracking-[0.25em] block mb-4">World-Class Infrastructure</span>
          <h2 className="font-themeHeading text-3xl sm:text-5xl font-black tracking-tight text-theme-text mb-6">
            Interactive Digital Campus Explorer
          </h2>
          <p className="font-themeBody text-theme-textMuted text-sm sm:text-base leading-relaxed">
            Click on any area below to inspect modern spaces, academic amenities, laboratory instrumentation, and dedicated student facilities.
          </p>
        </div>

        {/* Blueprint Explorer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {campusAreas.map((area, index) => {
            const IconComp = area.icon;
            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveArea(area.id)}
                className={`group relative overflow-hidden bg-theme-cardBg rounded-[2rem] border border-theme-border/80 shadow-md hover:shadow-2xl hover:border-theme-primary/40 transform hover:-translate-y-2.5 transition-all duration-500 cursor-pointer p-8 flex flex-col justify-between h-[320px]`}
              >
                {/* Background Gradient Glowing Mesh */}
                <div className={`absolute inset-0 bg-gradient-to-br ${area.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-theme-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="space-y-4 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-theme-primary/10 text-theme-primary group-hover:bg-theme-primary group-hover:text-theme-btnText flex items-center justify-center transition-all duration-500 shadow-inner">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="font-themeHeading font-black text-xl text-theme-text group-hover:text-theme-primary transition-colors tracking-tight">
                    {area.name}
                  </h3>
                  <p className="font-themeBody text-theme-textMuted group-hover:text-theme-text text-xs leading-relaxed line-clamp-3 transition-colors">
                    {area.shortDesc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-theme-border/40 relative z-10">
                  <span className="text-[10px] font-black uppercase text-theme-primary group-hover:text-theme-accent tracking-widest transition-colors">
                    View Facility Details
                  </span>
                  <div className="w-8 h-8 rounded-full border border-theme-border/80 flex items-center justify-center text-theme-textMuted group-hover:text-theme-primary group-hover:border-theme-primary/40 group-hover:bg-theme-bg transition-all duration-500">
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* DETAIL DIALOG PORTAL (MODAL) */}
      <AnimatePresence>
        {activeArea && currentArea && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArea(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Content Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="bg-theme-bg border border-theme-border max-w-4xl w-full rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row h-auto max-h-[90vh] md:h-[550px]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveArea(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-slate-950/40 hover:bg-slate-950/60 text-white flex items-center justify-center backdrop-blur-md z-50 transition-colors border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side Picture */}
              <div className="w-full md:w-1/2 h-[200px] md:h-full relative flex-shrink-0 bg-slate-900">
                <img 
                  src={currentArea.image} 
                  alt={currentArea.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white max-w-[80%] hidden md:block">
                  <span className="text-[10px] font-black uppercase text-theme-accent tracking-widest">Heritage Quality Campus</span>
                  <h4 className="font-themeHeading text-xl font-bold mt-1 leading-tight">{currentArea.name}</h4>
                </div>
              </div>

              {/* Right Side Content */}
              <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar h-auto md:h-full">
                <div className="space-y-6">
                  <div>
                    <span className="text-theme-primary text-[10px] font-black uppercase tracking-widest">Walkthrough Area</span>
                    <h3 className="font-themeHeading text-2xl sm:text-3xl font-black text-theme-text tracking-tight mt-1">
                      {currentArea.name}
                    </h3>
                  </div>

                  <p className="font-themeBody text-theme-textMuted text-xs sm:text-sm leading-relaxed font-semibold">
                    {currentArea.shortDesc}
                  </p>

                  <div className="space-y-3.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block border-b border-theme-border/60 pb-2">
                      Key Facilities & Amenities
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentArea.facilities.map((fac, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-theme-primary flex-shrink-0" />
                          <span className="font-themeBody text-theme-text text-xs font-bold leading-none">{fac}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-theme-border/40 mt-8 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <a 
                    href="/admissions"
                    onClick={() => setActiveArea(null)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-theme-primary hover:bg-theme-primaryHover text-theme-btnText font-black text-xs text-center rounded-xl shadow-lg transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Schedule Field Tour
                  </a>
                  <button 
                    onClick={() => setActiveArea(null)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-theme-cardBg hover:bg-theme-border/30 text-theme-textMuted font-black text-xs text-center border border-theme-border/65 rounded-xl transition-all cursor-pointer"
                  >
                    Close Explorer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. “DAY AT OUR SCHOOL” TIMELINE */}
      <section className="py-24 sm:py-32 bg-theme-cardBg/45 border-y border-theme-border/45 relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
            <span className="text-theme-primary font-black text-xs uppercase tracking-[0.25em] block mb-4">Journey of Growth</span>
            <h2 className="font-themeHeading text-3xl sm:text-5xl font-black tracking-tight text-theme-text mb-6">
              A Day in Our Academic Life
            </h2>
            <p className="font-themeBody text-theme-textMuted text-sm sm:text-base leading-relaxed">
              Witness the rhythmic sequence of active inquiry, scientific experimentation, physical growth, and creative expression.
            </p>
          </div>

          {/* Vertical Scroll-Connected Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* SVG Connecting Track Line */}
            <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-1 bg-theme-border rounded-full overflow-hidden">
              <motion.div 
                style={{ scaleY: scrollYProgress, originY: 0 }}
                className="w-full h-full bg-gradient-to-b from-theme-primary to-theme-secondary shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.5)]"
              />
            </div>

            {/* Timeline Nodes */}
            <div className="space-y-12 sm:space-y-20 relative z-10">
              {timelineStages.map((stage, index) => {
                const StageIcon = stage.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    {/* Node Pointer */}
                    <div className="absolute left-[8px] md:left-1/2 md:-translate-x-1/2 w-[28px] h-[28px] rounded-full border-4 border-theme-bg bg-theme-primary text-theme-btnText shadow-lg z-20 flex items-center justify-center font-bold text-[9px] mt-1.5 transition-transform duration-500 hover:scale-125">
                      {index + 1}
                    </div>

                    {/* Left Space (Hidden on mobile) */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Timeline Card */}
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10"
                    >
                      <div className="bg-theme-bg border border-theme-border/80 shadow-md hover:shadow-xl rounded-2xl p-6 sm:p-8 transform hover:scale-[1.01] hover:border-theme-primary/30 transition-all duration-300 relative group">
                        {/* Time Chip */}
                        <div className="absolute -top-3 left-6 sm:left-8 px-4 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-100 font-mono text-[9px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                          {stage.time}
                        </div>

                        <div className="flex items-start space-x-4 pt-2">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${stage.color}`}>
                            <StageIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-themeHeading font-black text-base sm:text-lg text-theme-text tracking-tight group-hover:text-theme-primary transition-colors">
                              {stage.title}
                            </h3>
                            <p className="font-themeBody text-theme-textMuted text-xs sm:text-sm leading-relaxed font-semibold">
                              {stage.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRINCIPAL’S INTERACTIVE MESSAGE */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 relative z-20">
        <div className="bg-theme-cardBg border border-theme-border/85 rounded-[3rem] p-8 sm:p-14 lg:p-20 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
          {/* Glowing Ambient Backdrop */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-theme-primary/10 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Avatar and Video Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-[45%] flex-shrink-0 relative group"
          >
            <div className="aspect-square sm:aspect-[4/3] lg:aspect-square w-full rounded-2xl sm:rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl border-4 border-white/15 relative">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&h=800&q=80" 
                alt="Er. Majid Qurashi" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
              />
              
              {/* Play Video Trigger Overlay */}
              <div 
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 bg-slate-950/40 hover:bg-slate-950/50 flex flex-col items-center justify-center cursor-pointer transition-all duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white hover:bg-theme-accent text-slate-950 hover:text-slate-950 flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-[0.97] transition-all cursor-pointer border-4 border-white/20">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                </div>
                <span className="text-[10px] text-white font-black uppercase tracking-[0.25em] mt-4 drop-shadow-md">
                  Watch Video Message
                </span>
              </div>
            </div>
          </motion.div>

          {/* Letter Content */}
          <div className="w-full lg:w-[55%] space-y-6 sm:space-y-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-1">
                <Quote className="w-8 h-8 text-theme-primary opacity-30" />
                <span className="text-theme-primary font-black text-xs uppercase tracking-[0.25em]">Principal's Address</span>
              </div>
              <h3 className="font-themeHeading text-3xl sm:text-4.5xl font-black text-theme-text tracking-tight leading-tight">
                Nurturing Global Innovators with Rooted Character
              </h3>
            </div>

            <p className="font-themeBody text-theme-textMuted text-xs sm:text-base leading-relaxed font-semibold italic border-l-4 border-theme-primary/40 pl-6 py-1">
              "We believe that education must transcend raw textbooks. Our digital campus model blends rigorous world-class scientific inquiry, biotechnology laboratory practices, athletic testing, and leadership values to mold the future pioneers."
            </p>

            <p className="font-themeBody text-theme-textMuted text-xs sm:text-sm leading-relaxed font-semibold">
              At Heritage Academy, we emphasize character, physical resilience, and digital dexterity. Our premium, modern infrastructure supports personalized growth, allowing each child to scale their potential and conquer global universities.
            </p>

            {/* Signature & Author Block */}
            <div className="flex items-center space-x-6 pt-6 border-t border-theme-border/60">
              <div className="space-y-1">
                <h4 className="font-themeHeading font-black text-base sm:text-lg text-theme-text leading-none">
                  Er. Majid Qurashi
                </h4>
                <p className="font-themeBody text-theme-primary text-xs font-bold uppercase tracking-wider">
                  Principal & Director Academic Advisory
                </p>
              </div>
              
              {/* SVGs Draw path Signature */}
              <div className="h-12 w-32 flex-shrink-0 flex items-center justify-center opacity-70">
                <svg className="w-full h-full text-theme-primary" viewBox="0 0 120 40" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {/* Premium mock-designed signature path */}
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M10 20C20 10 30 15 35 25C40 35 30 38 28 20C26 5 45 8 50 15C55 22 53 30 60 22C67 15 70 8 72 20C74 32 80 32 85 22C90 12 95 15 105 18" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
                    d="M20 28 L95 24"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO MESSAGE OVERLAY MODAL */}
      <AnimatePresence>
        {showVideo && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVideo(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-black rounded-3xl overflow-hidden aspect-video shadow-2xl z-10 border border-white/10"
            >
              {/* Close button */}
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 cursor-pointer z-[1000]"
              >
                <X className="w-5 h-5" />
              </button>

              {/* YouTube / Vimeo Premium Embed Box (Placeholder elegant school welcome animation video) */}
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="School Principal Message" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. ACHIEVEMENT SHOWCASE */}
      <section className="py-24 sm:py-32 bg-theme-bg relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
            <span className="text-theme-primary font-black text-xs uppercase tracking-[0.25em] block mb-4">Scholarly Legacy</span>
            <h2 className="font-themeHeading text-3xl sm:text-5xl font-black tracking-tight text-theme-text mb-6">
              Our Record-Breaking Achievements
            </h2>
            <p className="font-themeBody text-theme-textMuted text-sm sm:text-base leading-relaxed">
              We cultivate excellence. Review our consistent records across state boards, athletic competitions, and university launches.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
            {achievements.map((ach, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-[2rem] bg-theme-cardBg border border-theme-border/80 shadow-md hover:shadow-2xl hover:border-theme-primary/30 transform hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-[230px] relative overflow-hidden"
              >
                {/* Glowing glow effect on card hover */}
                <div className="absolute inset-0 bg-radial from-theme-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="space-y-2">
                  <h4 className="font-themeHeading text-[10px] font-black uppercase text-theme-textMuted group-hover:text-theme-primary tracking-widest transition-colors leading-relaxed">
                    {ach.label}
                  </h4>
                  <p className="font-themeBody text-theme-textMuted text-xs font-semibold leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="font-mono text-4xl sm:text-5xl font-black text-theme-primary group-hover:text-theme-accent tracking-tight leading-none transition-colors mt-6 flex items-center">
                  <RollingCounter value={ach.value} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
