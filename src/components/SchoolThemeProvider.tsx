'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, PresetTheme, ThemeColors } from '@/types/theme';
import { supabase } from '@/lib/supabaseClient';

// Core Presets List
export const PRESETS: Record<string, PresetTheme> = {
  'modern-blue': {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean professionalism with vibrant indigo accents and crisp typography.',
    colors: {
      primary: '#2563eb',
      primaryHover: '#1d4ed8',
      secondary: '#4f46e5',
      accent: '#3b82f6',
      background: '#ffffff',
      cardBg: '#f8fafc',
      navbar: '#ffffff',
      footer: '#0f172a',
      text: '#1e293b',
      textMuted: '#64748b',
      buttonBg: '#2563eb',
      buttonText: '#ffffff',
      border: '#e2e8f0',
    },
    typography: {
      fontFamily: 'Inter',
      headingFont: 'Outfit',
      bodyFont: 'Inter',
      fontSize: '16px',
      lineHeight: '1.6',
      letterSpacing: 'normal',
      fontWeight: '500',
    },
    layout: {
      logoAlignment: 'left',
      navbarAlignment: 'right',
      mainTextAlignment: 'left',
      heroLayout: 'banner',
      sectionSpacing: '80px',
      containerWidth: '1280px',
      borderRadius: 'rounded',
      shadowIntensity: 'medium',
      stickyNavbar: true,
      sectionsOrder: ['hero', 'stats', 'about', 'banner', 'footer'],
      sectionsVisibility: { hero: true, stats: true, about: true, banner: true, footer: true },
    },
    branding: {
      logoSize: '40px',
      logoPosition: 'left',
      overlayOpacity: 0.4,
      bgBlur: 'none',
    },
    components: {
      buttonStyle: 'rounded-xl',
      cardStyle: 'rounded',
      transitionSpeed: '300ms',
      hoverAnimation: 'scale-up',
    },
  },
  'elegant-dark': {
    id: 'elegant-dark',
    name: 'Elegant Dark',
    description: 'A premium, low-light aesthetic featuring soft gold accents and serif headings.',
    colors: {
      primary: '#d4af37',
      primaryHover: '#b8962e',
      secondary: '#f3e5ab',
      accent: '#ffffff',
      background: '#09090b',
      cardBg: '#18181b',
      navbar: '#121214',
      footer: '#08080a',
      text: '#f4f4f5',
      textMuted: '#a1a1aa',
      buttonBg: '#d4af37',
      buttonText: '#09090b',
      border: '#27272a',
    },
    typography: {
      fontFamily: 'Playfair Display',
      headingFont: 'Playfair Display',
      bodyFont: 'Lora',
      fontSize: '16px',
      lineHeight: '1.7',
      letterSpacing: 'wide',
      fontWeight: '400',
    },
    layout: {
      logoAlignment: 'left',
      navbarAlignment: 'right',
      mainTextAlignment: 'left',
      heroLayout: 'banner',
      sectionSpacing: '96px',
      containerWidth: '1200px',
      borderRadius: 'none',
      shadowIntensity: 'none',
      stickyNavbar: true,
      sectionsOrder: ['hero', 'stats', 'about', 'banner', 'footer'],
      sectionsVisibility: { hero: true, stats: true, about: true, banner: true, footer: true },
    },
    branding: {
      logoSize: '48px',
      logoPosition: 'left',
      overlayOpacity: 0.6,
      bgBlur: 'sm',
    },
    components: {
      buttonStyle: 'rounded-none',
      cardStyle: 'square',
      transitionSpeed: '300ms',
      hoverAnimation: 'opacity',
    },
  },
  'minimal-white': {
    id: 'minimal-white',
    name: 'Minimal White',
    description: 'High contrast monochrome styling with dynamic emerald indicators.',
    colors: {
      primary: '#000000',
      primaryHover: '#1c1c1c',
      secondary: '#10b981',
      accent: '#6b7280',
      background: '#ffffff',
      cardBg: '#ffffff',
      navbar: '#ffffff',
      footer: '#f9fafb',
      text: '#111827',
      textMuted: '#6b7280',
      buttonBg: '#000000',
      buttonText: '#ffffff',
      border: '#e5e7eb',
    },
    typography: {
      fontFamily: 'Plus Jakarta Sans',
      headingFont: 'Plus Jakarta Sans',
      bodyFont: 'Plus Jakarta Sans',
      fontSize: '15px',
      lineHeight: '1.5',
      letterSpacing: 'tight',
      fontWeight: '500',
    },
    layout: {
      logoAlignment: 'center',
      navbarAlignment: 'center',
      mainTextAlignment: 'center',
      heroLayout: 'split',
      sectionSpacing: '64px',
      containerWidth: '1140px',
      borderRadius: 'rounded',
      shadowIntensity: 'light',
      stickyNavbar: false,
      sectionsOrder: ['hero', 'stats', 'about', 'banner', 'footer'],
      sectionsVisibility: { hero: true, stats: true, about: true, banner: true, footer: true },
    },
    branding: {
      logoSize: '36px',
      logoPosition: 'center',
      overlayOpacity: 0.2,
      bgBlur: 'none',
    },
    components: {
      buttonStyle: 'rounded-xl',
      cardStyle: 'square',
      transitionSpeed: '150ms',
      hoverAnimation: 'scale-up',
    },
  },
  'green-campus': {
    id: 'green-campus',
    name: 'Green Campus',
    description: 'Academic forest greens coupled with natural warm colors.',
    colors: {
      primary: '#15803d',
      primaryHover: '#166534',
      secondary: '#0d9488',
      accent: '#f59e0b',
      background: '#fcfdf9',
      cardBg: '#f4f9f2',
      navbar: '#ffffff',
      footer: '#14532d',
      text: '#1f2937',
      textMuted: '#4b5563',
      buttonBg: '#15803d',
      buttonText: '#ffffff',
      border: '#e2e8f0',
    },
    typography: {
      fontFamily: 'Outfit',
      headingFont: 'Outfit',
      bodyFont: 'Inter',
      fontSize: '16px',
      lineHeight: '1.6',
      letterSpacing: 'normal',
      fontWeight: '500',
    },
    layout: {
      logoAlignment: 'left',
      navbarAlignment: 'right',
      mainTextAlignment: 'left',
      heroLayout: 'banner',
      sectionSpacing: '80px',
      containerWidth: '1280px',
      borderRadius: 'extra-rounded',
      shadowIntensity: 'medium',
      stickyNavbar: true,
      sectionsOrder: ['hero', 'stats', 'about', 'banner', 'footer'],
      sectionsVisibility: { hero: true, stats: true, about: true, banner: true, footer: true },
    },
    branding: {
      logoSize: '44px',
      logoPosition: 'left',
      overlayOpacity: 0.3,
      bgBlur: 'none',
    },
    components: {
      buttonStyle: 'rounded-full',
      cardStyle: 'playful',
      transitionSpeed: '300ms',
      hoverAnimation: 'slide-up',
    },
  },
  'premium-gold': {
    id: 'premium-gold',
    name: 'Premium Gold',
    description: 'An elite royal layout featuring rich navy panels and luxurious gold icons.',
    colors: {
      primary: '#b8860b',
      primaryHover: '#996515',
      secondary: '#1e3a8a',
      accent: '#e5c158',
      background: '#faf8f5',
      cardBg: '#fcfaf7',
      navbar: '#1e3a8a',
      footer: '#0f172a',
      text: '#111827',
      textMuted: '#4b5563',
      buttonBg: '#b8860b',
      buttonText: '#ffffff',
      border: '#e5e7eb',
    },
    typography: {
      fontFamily: 'Cinzel',
      headingFont: 'Cinzel',
      bodyFont: 'Montserrat',
      fontSize: '16px',
      lineHeight: '1.6',
      letterSpacing: 'wide',
      fontWeight: '500',
    },
    layout: {
      logoAlignment: 'left',
      navbarAlignment: 'right',
      mainTextAlignment: 'left',
      heroLayout: 'banner',
      sectionSpacing: '96px',
      containerWidth: '1280px',
      borderRadius: 'rounded',
      shadowIntensity: 'high',
      stickyNavbar: true,
      sectionsOrder: ['hero', 'stats', 'about', 'banner', 'footer'],
      sectionsVisibility: { hero: true, stats: true, about: true, banner: true, footer: true },
    },
    branding: {
      logoSize: '40px',
      logoPosition: 'left',
      overlayOpacity: 0.5,
      bgBlur: 'md',
    },
    components: {
      buttonStyle: 'rounded-xl',
      cardStyle: 'rounded',
      transitionSpeed: '500ms',
      hoverAnimation: 'scale-up',
    },
  },
  'sunset-glow': {
    id: 'sunset-glow',
    name: 'Sunset Glow',
    description: 'Deep dusk purples transitioning into energetic crimson-orange gradients.',
    colors: {
      primary: '#db2777',
      primaryHover: '#be185d',
      secondary: '#ea580c',
      accent: '#f43f5e',
      background: '#fffafb',
      cardBg: '#fff1f2',
      navbar: '#ffffff',
      footer: '#1e1b4b',
      text: '#1f2937',
      textMuted: '#6b7280',
      buttonBg: '#db2777',
      buttonText: '#ffffff',
      border: '#ffe4e6',
    },
    typography: {
      fontFamily: 'Space Grotesk',
      headingFont: 'Space Grotesk',
      bodyFont: 'Space Grotesk',
      fontSize: '16px',
      lineHeight: '1.5',
      letterSpacing: 'tight',
      fontWeight: '600',
    },
    layout: {
      logoAlignment: 'left',
      navbarAlignment: 'right',
      mainTextAlignment: 'left',
      heroLayout: 'split',
      sectionSpacing: '80px',
      containerWidth: '1200px',
      borderRadius: 'extra-rounded',
      shadowIntensity: 'medium',
      stickyNavbar: true,
      sectionsOrder: ['hero', 'stats', 'about', 'banner', 'footer'],
      sectionsVisibility: { hero: true, stats: true, about: true, banner: true, footer: true },
    },
    branding: {
      logoSize: '40px',
      logoPosition: 'left',
      overlayOpacity: 0.35,
      bgBlur: 'none',
    },
    components: {
      buttonStyle: 'rounded-full',
      cardStyle: 'playful',
      transitionSpeed: '300ms',
      hoverAnimation: 'slide-up',
    },
  },
  'lilac-dream': {
    id: 'lilac-dream',
    name: 'Lilac Dream',
    description: 'Soft pastel violet panels providing a sleek and imaginative interface.',
    colors: {
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      secondary: '#ec4899',
      accent: '#d946ef',
      background: '#fafafa',
      cardBg: '#f5f3ff',
      navbar: '#ffffff',
      footer: '#1e1b4b',
      text: '#1e293b',
      textMuted: '#64748b',
      buttonBg: '#8b5cf6',
      buttonText: '#ffffff',
      border: '#ede9fe',
    },
    typography: {
      fontFamily: 'Outfit',
      headingFont: 'Outfit',
      bodyFont: 'Outfit',
      fontSize: '16px',
      lineHeight: '1.6',
      letterSpacing: 'normal',
      fontWeight: '400',
    },
    layout: {
      logoAlignment: 'left',
      navbarAlignment: 'right',
      mainTextAlignment: 'left',
      heroLayout: 'banner',
      sectionSpacing: '80px',
      containerWidth: '1280px',
      borderRadius: 'rounded',
      shadowIntensity: 'light',
      stickyNavbar: true,
      sectionsOrder: ['hero', 'stats', 'about', 'banner', 'footer'],
      sectionsVisibility: { hero: true, stats: true, about: true, banner: true, footer: true },
    },
    branding: {
      logoSize: '40px',
      logoPosition: 'left',
      overlayOpacity: 0.25,
      bgBlur: 'none',
    },
    components: {
      buttonStyle: 'rounded-xl',
      cardStyle: 'rounded',
      transitionSpeed: '300ms',
      hoverAnimation: 'scale-up',
    },
  },
};

const DEFAULT_THEME: ThemeConfig = {
  preset: 'modern-blue',
  colors: PRESETS['modern-blue'].colors,
  typography: PRESETS['modern-blue'].typography,
  layout: PRESETS['modern-blue'].layout,
  branding: PRESETS['modern-blue'].branding,
  components: PRESETS['modern-blue'].components,
};

interface ContrastRating {
  ratio: number;
  aaNormal: boolean;
  aaaNormal: boolean;
  aaLarge: boolean;
  aaaLarge: boolean;
  score: 'AAA' | 'AA' | 'FAIL';
}

interface SchoolThemeContextType {
  theme: ThemeConfig;
  setThemeSettings: (updater: Partial<ThemeConfig> | ((prev: ThemeConfig) => ThemeConfig)) => void;
  applyPreset: (presetId: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  contrastRating: ContrastRating;
  checkContrast: (bgHex: string, textHex: string) => ContrastRating;
  importTheme: (jsonStr: string) => boolean;
  exportTheme: () => string;
  saveTheme: (schoolEmail: string) => Promise<{ success: boolean; error?: string }>;
  resetTheme: () => void;
  loading: boolean;
  dirty: boolean;
  autoSaveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

const SchoolThemeContext = createContext<SchoolThemeContextType | undefined>(undefined);

// Google Fonts Dynamically Loaded in head
const loadGoogleFont = (fontFamily: string) => {
  if (typeof window === 'undefined' || !fontFamily) return;
  const normalized = fontFamily.replace(/\s+/g, '-').toLowerCase();
  const linkId = `google-font-${normalized}`;
  if (document.getElementById(linkId)) return;

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700;900&display=swap`;
  document.head.appendChild(link);
};

// Mathematically Correct WCAG 2.1 Contrast Ratio Calculator
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const getRelativeLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const a = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const calculateContrast = (hex1: string, hex2: string): ContrastRating => {
  const l1 = getRelativeLuminance(hex1);
  const l2 = getRelativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  const roundedRatio = Math.round(ratio * 100) / 100;
  const aaNormal = ratio >= 4.5;
  const aaaNormal = ratio >= 7.0;
  const aaLarge = ratio >= 3.0;
  const aaaLarge = ratio >= 4.5;

  let score: 'AAA' | 'AA' | 'FAIL' = 'FAIL';
  if (aaaNormal) score = 'AAA';
  else if (aaNormal) score = 'AA';

  return {
    ratio: roundedRatio,
    aaNormal,
    aaaNormal,
    aaLarge,
    aaaLarge,
    score,
  };
};

export function SchoolThemeProvider({
  children,
  initialThemeData,
  schoolEmail,
}: {
  children: React.ReactNode;
  initialThemeData?: any;
  schoolEmail?: string;
}) {
  const [theme, setThemeState] = useState<ThemeConfig>(DEFAULT_THEME);
  const [undoStack, setUndoStack] = useState<ThemeConfig[]>([]);
  const [redoStack, setRedoStack] = useState<ThemeConfig[]>([]);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [contrastRating, setContrastRating] = useState<ContrastRating>({
    ratio: 21.0,
    aaNormal: true,
    aaaNormal: true,
    aaLarge: true,
    aaaLarge: true,
    score: 'AAA',
  });

  // Load Initial Settings if supplied
  useEffect(() => {
    if (initialThemeData) {
      try {
        const parsed = typeof initialThemeData === 'string' 
          ? JSON.parse(initialThemeData) 
          : initialThemeData;
        
        if (parsed.colors && parsed.typography) {
          setThemeState(parsed);
        }
      } catch (err) {
        console.error('Failed to parse initial theme settings:', err);
      }
    } else {
      // Fallback: Check local storage drafts
      const savedDraft = localStorage.getItem('school_custom_theme_draft');
      if (savedDraft) {
        try {
          const parsed = JSON.parse(savedDraft);
          if (parsed.colors && parsed.typography) {
            setThemeState(parsed);
          }
        } catch (e) {}
      }
    }
  }, [initialThemeData]);

  // Sync Google Fonts on theme change
  useEffect(() => {
    if (theme.typography) {
      loadGoogleFont(theme.typography.fontFamily);
      loadGoogleFont(theme.typography.headingFont);
      loadGoogleFont(theme.typography.bodyFont);
    }

    // Run contrast checks for core settings (Text vs Background)
    if (theme.colors) {
      setContrastRating(calculateContrast(theme.colors.background, theme.colors.text));
    }
  }, [theme]);

  // Debounced Auto-save to Supabase & Postgres
  useEffect(() => {
    if (!dirty || !schoolEmail) return;

    setAutoSaveStatus('saving');

    const debouncedTimer = setTimeout(async () => {
      try {
        // 1. Silent Save to Supabase DB
        const { error: dbError } = await supabase
          .from('schools')
          .update({ theme_settings: theme })
          .eq('email', schoolEmail);

        if (dbError) throw dbError;

        // 2. Silent Sync to local Express backend (if active)
        try {
          await fetch('http://localhost:5000/save-theme-settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: schoolEmail, themeSettings: theme }),
          });
        } catch (e) {
          // Ignore offline local server logs
        }

        setAutoSaveStatus('saved');
        setDirty(false);
        localStorage.removeItem('school_custom_theme_draft');
      } catch (err) {
        console.error('Background auto-save error:', err);
        setAutoSaveStatus('error');
      }
    }, 2000); // 2-second debounce

    return () => clearTimeout(debouncedTimer);
  }, [theme, dirty, schoolEmail]);

  // Updater supporting functional or state updates
  const setThemeSettings = (
    updater: Partial<ThemeConfig> | ((prev: ThemeConfig) => ThemeConfig)
  ) => {
    setThemeState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      
      // Push history to undo stack
      setUndoStack((u) => [...u, prev]);
      setRedoStack([]); // Clear redo stack
      setDirty(true);
      setAutoSaveStatus('idle');

      // Save live draft to local storage
      localStorage.setItem('school_custom_theme_draft', JSON.stringify(next));
      return next;
    });
  };

  const applyPreset = (presetId: string) => {
    const selected = PRESETS[presetId];
    if (selected) {
      setThemeState((prev) => {
        setUndoStack((u) => [...u, prev]);
        setRedoStack([]);
        setDirty(true);
        setAutoSaveStatus('idle');
        const nextTheme: ThemeConfig = {
          preset: selected.id,
          colors: selected.colors,
          typography: selected.typography,
          layout: {
            ...selected.layout,
            sectionsOrder: prev.layout.sectionsOrder,
            sectionsVisibility: prev.layout.sectionsVisibility,
          },
          branding: selected.branding,
          components: selected.components,
        };
        localStorage.setItem('school_custom_theme_draft', JSON.stringify(nextTheme));
        return nextTheme;
      });
    }
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((u) => u.slice(0, -1));
    setRedoStack((r) => [...r, theme]);
    setThemeState(previous);
    setDirty(true);
    setAutoSaveStatus('idle');
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setRedoStack((r) => r.slice(0, -1));
    setUndoStack((u) => [...u, theme]);
    setThemeState(next);
    setDirty(true);
    setAutoSaveStatus('idle');
  };

  const checkContrast = (bgHex: string, textHex: string) => {
    return calculateContrast(bgHex, textHex);
  };

  const importTheme = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.colors && parsed.typography && parsed.layout) {
        setThemeSettings(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const exportTheme = (): string => {
    return JSON.stringify(theme, null, 2);
  };

  const saveTheme = async (schoolEmail: string): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      // 1. Save to Supabase DB
      const { error: dbError } = await supabase
        .from('schools')
        .update({ theme_settings: theme })
        .eq('email', schoolEmail);

      if (dbError) throw dbError;

      // 2. Local Backend PostgreSQL Syncing (if server is active)
      try {
        const res = await fetch('http://localhost:5000/save-theme-settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: schoolEmail, themeSettings: theme }),
        });
        if (!res.ok) console.warn('Local Postgres backend not responding, synched to Supabase only.');
      } catch (e) {
        console.log('Postgres server offline, saved successfully to Supabase cloud.');
      }

      setDirty(false);
      localStorage.removeItem('school_custom_theme_draft');
      return { success: true };
    } catch (err: any) {
      console.error('Failed to save theme settings:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resetTheme = () => {
    setThemeState((prev) => {
      setUndoStack((u) => [...u, prev]);
      setRedoStack([]);
      setDirty(true);
      setAutoSaveStatus('idle');
      localStorage.removeItem('school_custom_theme_draft');
      return DEFAULT_THEME;
    });
  };

  return (
    <SchoolThemeContext.Provider
      value={{
        theme,
        setThemeSettings,
        applyPreset,
        undo,
        redo,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
        contrastRating,
        checkContrast,
        importTheme,
        exportTheme,
        saveTheme,
        resetTheme,
        loading,
        dirty,
        autoSaveStatus,
      }}
    >
      <ThemeStyles theme={theme} />
      {children}
    </SchoolThemeContext.Provider>
  );
}

// Declarative Theme Style Tag Injector supporting Hex & RGB opacity channels
function ThemeStyles({ theme }: { theme: ThemeConfig }) {
  if (!theme || !theme.colors || !theme.typography) return null;
  const { colors, typography, layout } = theme;

  // Radius calculation
  let radiusVal = '1rem';
  if (layout.borderRadius === 'none') radiusVal = '0px';
  else if (layout.borderRadius === 'rounded') radiusVal = '0.75rem';
  else if (layout.borderRadius === 'extra-rounded') radiusVal = '2rem';

  // Shadow intensity
  let shadowVal = 'none';
  if (layout.shadowIntensity === 'light') shadowVal = '0 1px 3px rgba(0,0,0,0.05)';
  else if (layout.shadowIntensity === 'medium') shadowVal = '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)';
  else if (layout.shadowIntensity === 'high') shadowVal = '0 25px 50px -12px rgba(0,0,0,0.25)';

  // Helper to convert hex to space-separated RGB numbers
  const hexToRgbChannels = (hex: string, defaultVal: string) => {
    const rgb = hexToRgb(hex);
    return rgb ? `${rgb.r} ${rgb.g} ${rgb.b}` : defaultVal;
  };

  const css = `
    :root, .theme-preview-container {
      --theme-primary: ${colors.primary};
      --theme-primary-rgb: ${hexToRgbChannels(colors.primary, '37 99 235')};
      --theme-primary-hover: ${colors.primaryHover};
      --theme-primary-hover-rgb: ${hexToRgbChannels(colors.primaryHover, '29 78 216')};
      --theme-secondary: ${colors.secondary};
      --theme-secondary-rgb: ${hexToRgbChannels(colors.secondary, '79 70 229')};
      --theme-accent: ${colors.accent};
      --theme-accent-rgb: ${hexToRgbChannels(colors.accent, '245 158 11')};
      --theme-bg: ${colors.background};
      --theme-bg-rgb: ${hexToRgbChannels(colors.background, '255 255 255')};
      --theme-card-bg: ${colors.cardBg};
      --theme-card-bg-rgb: ${hexToRgbChannels(colors.cardBg, '248 250 252')};
      --theme-navbar: ${colors.navbar};
      --theme-navbar-rgb: ${hexToRgbChannels(colors.navbar, '255 255 255')};
      --theme-footer: ${colors.footer};
      --theme-footer-rgb: ${hexToRgbChannels(colors.footer, '15 23 42')};
      --theme-text: ${colors.text};
      --theme-text-rgb: ${hexToRgbChannels(colors.text, '15 23 42')};
      --theme-text-muted: ${colors.textMuted};
      --theme-text-muted-rgb: ${hexToRgbChannels(colors.textMuted, '100 116 139')};
      --theme-btn-bg: ${colors.buttonBg};
      --theme-btn-bg-rgb: ${hexToRgbChannels(colors.buttonBg, '37 99 235')};
      --theme-btn-text: ${colors.buttonText};
      --theme-btn-text-rgb: ${hexToRgbChannels(colors.buttonText, '255 255 255')};
      --theme-border: ${colors.border};
      --theme-border-rgb: ${hexToRgbChannels(colors.border, '226 232 240')};

      --theme-font-heading: "${typography.headingFont}", sans-serif;
      --theme-font-body: "${typography.bodyFont}", sans-serif;
      --theme-radius: ${radiusVal};
      --theme-shadow: ${shadowVal};
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

export function useSchoolTheme() {
  const context = useContext(SchoolThemeContext);
  return context;
}
