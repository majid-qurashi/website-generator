'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Sparkles, BookOpen, Trophy, HelpCircle, 
  Send, ArrowRight, ChevronRight, Phone, MapPin, Clock, 
  User, GraduationCap, Info, Calendar, X, Play, CheckCircle
} from 'lucide-react';
import { SchoolData } from '@/types/school';

interface VirtualReceptionProps {
  school: SchoolData;
  theme: any;
  isFullPage?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'visitor';
  text: string;
  timestamp: string;
  cta?: {
    label: string;
    action: string;
  };
  customContent?: React.ReactNode;
}

export default function VirtualReception({ school, theme, isFullPage = true }: VirtualReceptionProps) {
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'actions'>('chat');
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when assistant modal/drawer is open on mobile/desktop
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Generate beautiful, normalized school name fallback
  const schoolName = school.name || 'Heritage International Academy';
  const principalName = school.principal_name || 'Er. Majid Qurashi';
  const tagline = school.tagline || 'Excellence, Integrity, Innovation';

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: '1',
        sender: 'assistant',
        text: `Welcome to ${schoolName} 👋! I am your virtual front-desk assistant. How can I help you explore our campus and community today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [schoolName]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Suggestion tags
  const suggestions = [
    { label: '📚 Admission & Fees', query: 'admission' },
    { label: '🎓 Academics & Faculty', query: 'academics' },
    { label: '🏟️ Campus Facilities', query: 'facilities' },
    { label: '🏆 School Achievements', query: 'achievements' },
    { label: '📞 Contact Receptionist', query: 'contact' },
    { label: '✨ Watch Principal Welcome', query: 'principal' }
  ];

  // AI-style automated responses
  const getBotResponse = (query: string): { text: string; cta?: { label: string; action: string }; customContent?: React.ReactNode } => {
    const q = query.toLowerCase();
    
    if (q.includes('admission') || q.includes('enroll') || q.includes('fee')) {
      return {
        text: `Admissions are currently open for the academic session at ${schoolName}! We welcome students into our smart classrooms, biotech labs, and multi-sport arenas.`,
        cta: { label: 'Go to Admissions Portal', action: 'scroll-banner' },
        customContent: (
          <div className="mt-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-theme-accent">Quick Enrollment Info</h5>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-200">
              <div>• Curriculum: CBSE/IB Elite</div>
              <div>• Grade Levels: K-12</div>
              <div>• Scholarships: Up to 50%</div>
              <div>• Process: Online / Paperless</div>
            </div>
          </div>
        )
      };
    }
    
    if (q.includes('academic') || q.includes('faculty') || q.includes('teacher') || q.includes('curriculum')) {
      return {
        text: `At ${schoolName}, we drive a rigorous, future-focused curriculum blending standard sciences with robotics and computational thinking. 80% of our faculty hold advanced graduate degrees or Ph.D. status.`,
        cta: { label: 'Explore Principal\'s Message', action: 'scroll-principal' }
      };
    }
    
    if (q.includes('facilit') || q.includes('lab') || q.includes('turf') || q.includes('library') || q.includes('campus')) {
      return {
        text: `Our premium campus features advanced biotech and robotics sandboxes, an Olympic-standard synthetic turf track, Dolby acoustics auditorium, and a Next-Gen computer lab with industrial 3D printers.`,
        cta: { label: 'Explore Campus Map', action: 'scroll-interactive-campus' }
      };
    }
    
    if (q.includes('achieve') || q.includes('rank') || q.includes('trophy') || q.includes('medal')) {
      return {
        text: `We maintain a consistent 99.4% Board average. Our brilliant students have conquered international Olympiads and secured placements at global elite universities like Stanford, MIT, and IITs.`,
        cta: { label: 'Inspect Stats', action: 'scroll-stats' }
      };
    }

    if (q.includes('principal') || q.includes('director') || q.includes('majid')) {
      return {
        text: `${principalName} welcomes you personally! "We emphasize character, physical resilience, and digital literacy. Our modern infrastructure guarantees personalized growth for every child."`,
        customContent: (
          <button 
            onClick={() => setShowVideo(true)}
            className="mt-3 w-full py-3 bg-theme-primary hover:bg-theme-primaryHover text-theme-btnText font-black text-xs rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play Principal Welcome Address</span>
          </button>
        )
      };
    }

    if (q.includes('contact') || q.includes('address') || q.includes('phone') || q.includes('email')) {
      return {
        text: `You can reach our official front desk at ${school.contact_number || '+91 98765 43210'}. The physical campus is located at ${school.address || '12 Main Boulevard, Sector C, Srinagar, J&K'}.`,
        customContent: (
          <div className="mt-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2.5 text-xs text-slate-200">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-theme-accent" />
              <span>{school.contact_number || '+91 98765 43210'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-theme-accent" />
              <span className="leading-tight">{school.address || '12 Main Boulevard, Srinagar'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3.5 h-3.5 text-theme-accent" />
              <span>Mon - Sat: 8:00 AM - 4:00 PM</span>
            </div>
          </div>
        )
      };
    }

    // Default response
    return {
      text: `Interesting question! Let me check that with our academic registrar. Is there any particular area like Admissions, Facilities, or Faculty you'd like to inspect?`,
      customContent: (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {suggestions.slice(0, 3).map((tag, i) => (
            <button
              key={i}
              onClick={() => handleSuggestionClick(tag.query, tag.label)}
              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-[9px] font-bold text-slate-200 tracking-wide transition-all cursor-pointer"
            >
              {tag.label}
            </button>
          ))}
        </div>
      )
    };
  };

  // Triggers BOT reply
  const triggerAssistantReply = (query: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const response = getBotResponse(query);
      
      setMessages((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          sender: 'assistant',
          text: response.text,
          cta: response.cta,
          customContent: response.customContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  // Handles suggestions clicked
  const handleSuggestionClick = (query: string, label: string) => {
    // Add user bubble
    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        sender: 'visitor',
        text: label,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    
    triggerAssistantReply(query);
  };

  // Handles custom action card clicked (smooth scrolling)
  const handleActionClick = (action: string) => {
    const element = document.getElementById(action);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // General section IDs fallback
      const cleanAction = action.replace('scroll-', '');
      const mappedElement = document.getElementById(cleanAction);
      if (mappedElement) {
        mappedElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handles manual message submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');

    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        sender: 'visitor',
        text: userText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);

    triggerAssistantReply(userText);
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:h-screen flex items-center justify-center overflow-hidden bg-theme-bg py-16 sm:py-24 transition-colors duration-300">
      
      {/* 1. FUTURISTIC BACKGROUND GRID & MESH */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-theme-primary/5 z-10" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Soft Glowing Ambient Lights */}
        <div className="absolute top-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-theme-primary/10 blur-[130px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-theme-secondary/15 blur-[120px] animate-pulse" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        
        {/* 2. LEFT SIDE: IMMERSIVE WELCOME & QUICK ACTIONS */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-[48%] space-y-8 flex flex-col justify-center"
        >
          {/* Tagline Badge */}
          <div className="inline-flex self-start items-center space-x-2 px-4 py-2 rounded-full bg-theme-primary/10 border border-theme-primary/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-theme-accent animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-theme-accent">Interactive Front Desk</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-themeHeading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-theme-text">
              Welcome to <span className="text-theme-primary">{schoolName}</span>
            </h1>
            <p className="font-themeBody text-theme-textMuted text-sm sm:text-base leading-relaxed max-w-xl">
              {tagline}. How would you like to explore our academic legacy, elite sporting turfs, and digital classroom suites today?
            </p>
          </div>

          {/* Interactive Responsive Grid of Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Admission desk', target: 'scroll-banner', icon: BookOpen, color: 'group-hover:border-blue-500/40 text-blue-500' },
              { label: 'Campus Tour', target: 'scroll-interactive-campus', icon: Sparkles, color: 'group-hover:border-emerald-500/40 text-emerald-500' },
              { label: 'Principal Message', target: 'scroll-principal', icon: User, color: 'group-hover:border-violet-500/40 text-violet-500' },
              { label: 'Achievements', target: 'scroll-stats', icon: Trophy, color: 'group-hover:border-amber-500/40 text-amber-500' }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onClick={() => handleActionClick(card.target)}
                  className={`group p-5 bg-theme-cardBg/60 border border-theme-border/60 hover:border-theme-primary/45 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between h-[120px] backdrop-blur-md relative overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-radial from-theme-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="w-9 h-9 rounded-xl bg-theme-bg/90 border border-theme-border flex items-center justify-center text-theme-primary shadow-sm group-hover:bg-theme-primary group-hover:text-theme-btnText transition-all">
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex items-center justify-between text-theme-text relative z-10 pt-4">
                    <span className="font-themeHeading text-xs font-black uppercase tracking-wider">{card.label}</span>
                    <ChevronRight className="w-4 h-4 text-theme-textMuted group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-theme-textMuted font-bold uppercase tracking-wider pt-2">
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-theme-primary" />
              <span>CBSE / IB Curriculum</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-theme-primary" />
              <span>Interactive Smart Rooms</span>
            </span>
          </div>
        </motion.div>

        {/* 3. RIGHT SIDE: COMPACT FRONT DESK WELCOME CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-[52%] min-h-[340px] lg:min-h-[420px] bg-slate-950/45 dark:bg-slate-950/70 border border-slate-800/80 rounded-[2.5rem] shadow-2xl flex flex-col justify-between p-8 backdrop-blur-xl relative overflow-hidden group hover:border-theme-primary/35 transition-all duration-500"
        >
          {/* Subtle Background Glow behind Card */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-theme-primary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-theme-primary/10 transition-colors" />

          {/* Top Row: Avatar & Greeting */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center space-x-3.5">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-theme-primary flex items-center justify-center text-theme-btnText text-xl shadow-inner font-black select-none">
                  🤖
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                <div className="absolute -inset-0.5 rounded-full border border-theme-primary animate-ping opacity-35 pointer-events-none" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-themeHeading font-black text-sm text-slate-100 tracking-tight">Virtual Receptionist</span>
                  <span className="px-2 py-0.5 rounded-md bg-theme-primary/15 border border-theme-primary/20 text-[8px] font-black uppercase text-theme-accent tracking-wider">Online</span>
                </div>
                <p className="font-themeBody text-[10px] text-slate-400 font-semibold leading-tight">{schoolName}'s Digital Desk</p>
              </div>
            </div>
            
            <div className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 shadow-sm">
              <MessageSquare className="w-4.5 h-4.5" />
            </div>
          </div>

          {/* Middle Row: Information */}
          <div className="my-6 space-y-3.5 z-10">
            <h3 className="font-themeHeading text-xl font-black text-slate-100 leading-tight">
              Have questions about <span className="text-theme-accent">admissions</span>, <span className="text-theme-primary">fees</span>, or <span className="text-theme-secondary">campus life</span>?
            </h3>
            <p className="font-themeBody text-xs text-slate-300 leading-relaxed font-medium">
              Interact with our virtual receptionist assistant to explore detailed program curricula, principal guidelines, fee structures, and immediate campus contact information.
            </p>
          </div>

          {/* Bottom Row: Pulsing Action Button */}
          <button 
            onClick={() => setIsOpen(true)}
            className="w-full py-4 bg-theme-primary hover:bg-theme-primaryHover text-theme-btnText font-black text-xs rounded-2xl flex items-center justify-center space-x-3 transition-all shadow-xl hover:shadow-theme-primary/10 cursor-pointer group/btn z-10"
          >
            <Sparkles className="w-4 h-4 text-theme-accent animate-pulse group-hover/btn:scale-110 transition-transform" />
            <span className="tracking-wider uppercase">Start Chat Conversation</span>
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </motion.div>

      </div>

      {/* 5. FLOATING VIRTUAL ASSISTANT OVERLAY CONSOLE (Drawer/Modal) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Dark glass backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            {/* Chat Console Panel */}
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full h-[90vh] sm:h-[600px] sm:max-w-xl bg-slate-950 border-t sm:border border-slate-800/80 rounded-t-[2rem] sm:rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl z-10"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  {/* Glowing Avatar */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-theme-primary flex items-center justify-center text-theme-btnText text-base shadow-inner font-black">
                      🤖
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
                    <div className="absolute -inset-0.5 rounded-full border border-theme-primary animate-ping opacity-35 pointer-events-none" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="font-themeHeading font-black text-xs sm:text-sm text-slate-100 tracking-tight">Virtual Receptionist</span>
                      <span className="px-2 py-0.5 rounded-md bg-theme-primary/15 border border-theme-primary/20 text-[8px] font-black uppercase text-theme-accent tracking-wider">Online</span>
                    </div>
                    <p className="font-themeBody text-[9px] sm:text-[10px] text-slate-400 font-semibold leading-tight">Ask anything about admissions, facilities, or contacts</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-205 hover:bg-slate-850 hover:border-slate-700 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages list */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 no-scrollbar">
                {messages.map((msg) => {
                  const isAssistant = msg.sender === 'assistant';
                  return (
                    <div key={msg.id} className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} items-start space-x-3`}>
                      {isAssistant && (
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                          🎓
                        </div>
                      )}
                      
                      <div className="space-y-1 max-w-[80%]">
                        <div 
                          className={`p-4 rounded-[1.5rem] border text-xs leading-relaxed font-semibold ${
                            isAssistant 
                              ? 'bg-slate-900/90 border-slate-850 text-slate-200 rounded-tl-sm' 
                              : 'bg-theme-primary text-theme-btnText border-theme-primary/30 rounded-tr-sm shadow-md'
                          }`}
                        >
                          <p>{msg.text}</p>
                          
                          {/* Interactive CTA buttons inside bot responses */}
                          {msg.cta && (
                            <button
                              onClick={() => {
                                handleActionClick(msg.cta!.action);
                                setIsOpen(false); // Close when clicking CTA navigation
                              }}
                              className="mt-3 px-4 py-2 bg-theme-accent hover:bg-theme-accent/90 text-slate-950 font-black text-[10px] rounded-lg flex items-center space-x-1 cursor-pointer transition-colors shadow-sm"
                            >
                              <span>{msg.cta.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          
                          {msg.customContent}
                        </div>
                        <span className="block text-[8px] font-bold text-slate-500 text-right uppercase tracking-wider px-1">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                      🎓
                    </div>
                    <div className="p-4 rounded-[1.5rem] rounded-tl-sm bg-slate-900/90 border border-slate-850 flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Quick suggestions carousel */}
              <div className="px-5 sm:px-6 py-2.5 border-t border-slate-900 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
                {suggestions.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestionClick(tag.query, tag.label)}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-[10px] font-black text-slate-200 tracking-wider flex-shrink-0 transition-all duration-300 cursor-pointer shadow-sm"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>

              {/* Form input */}
              <form onSubmit={handleSubmit} className="p-4 bg-slate-900/40 border-t border-slate-800/80 flex items-center space-x-2">
                <input 
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me about fees, classes, principal, contact..."
                  className="flex-1 px-4 py-3 bg-slate-950/60 border border-slate-800/80 text-xs font-semibold text-slate-200 placeholder-slate-500 rounded-xl focus:outline-none focus:border-theme-primary/60 focus:bg-slate-950 transition-colors"
                />
                <button
                  type="submit"
                  className="w-10 h-10 bg-theme-primary hover:bg-theme-primaryHover text-theme-btnText rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 fill-current translate-x-px -translate-y-px" />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. PRINCIPAL VIDEO MESSAGE MODAL (Overlay) */}
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

              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="School Welcome Address Video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
