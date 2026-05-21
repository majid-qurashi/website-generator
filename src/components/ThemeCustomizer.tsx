'use client';

import React, { useState } from 'react';
import { useSchoolTheme, PRESETS } from './SchoolThemeProvider';
import { ThemeConfig, ThemeColors } from '@/types/theme';

const GOOGLE_FONTS = [
  'Inter',
  'Outfit',
  'Playfair Display',
  'Lora',
  'Cinzel',
  'Montserrat',
  'Plus Jakarta Sans',
  'Space Grotesk',
  'Roboto',
  'Poppins',
  'Merriweather',
  'Cabin',
];

export default function ThemeCustomizer({ school }: { school?: any }) {
  const {
    theme,
    setThemeSettings,
    applyPreset,
    undo,
    redo,
    canUndo,
    canRedo,
    contrastRating,
    importTheme,
    exportTheme,
    resetTheme,
    dirty,
  } = useSchoolTheme()!;

  const [searchQuery, setSearchQuery] = useState('');
  const [jsonInput, setJsonInput] = useState('');
  const [copied, setCopied] = useState(false);


  // Expanded folders state (when not searching)
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    presets: true,
    colors: false,
    typography: false,
    layout: false,
    branding: false,
    components: false,
    advanced: false,
    domain: false,
  });

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleColorChange = (key: keyof ThemeColors, val: string) => {
    setThemeSettings((prev: ThemeConfig) => {
      const nextColors = { ...prev.colors, [key]: val };
      if (key === 'primary') {
        nextColors.primaryHover = val + 'dd'; // dynamic hover
        nextColors.buttonBg = val;
      }
      return { ...prev, colors: nextColors };
    });
  };

  const handleTypographyChange = (key: keyof typeof theme.typography, val: string) => {
    setThemeSettings((prev: ThemeConfig) => ({
      ...prev,
      typography: { ...prev.typography, [key]: val },
    }));
  };

  const handleLayoutChange = (key: keyof typeof theme.layout, val: any) => {
    setThemeSettings((prev: ThemeConfig) => ({
      ...prev,
      layout: { ...prev.layout, [key]: val },
    }));
  };

  const handleBrandingChange = (key: keyof typeof theme.branding, val: any) => {
    setThemeSettings((prev: ThemeConfig) => ({
      ...prev,
      branding: { ...prev.branding, [key]: val },
    }));
  };

  const handleComponentChange = (key: keyof typeof theme.components, val: any) => {
    setThemeSettings((prev: ThemeConfig) => ({
      ...prev,
      components: { ...prev.components, [key]: val },
    }));
  };

  const toggleSection = (sectionId: string) => {
    setThemeSettings((prev: ThemeConfig) => {
      const nextVisibility = { ...prev.layout.sectionsVisibility };
      nextVisibility[sectionId] = !nextVisibility[sectionId];
      return {
        ...prev,
        layout: { ...prev.layout, sectionsVisibility: nextVisibility },
      };
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    setThemeSettings((prev: ThemeConfig) => {
      const order = [...prev.layout.sectionsOrder];
      const nextIndex = direction === 'up' ? index - 1 : index + 1;
      if (nextIndex < 0 || nextIndex >= order.length) return prev;

      const temp = order[index];
      order[index] = order[nextIndex];
      order[nextIndex] = temp;

      return {
        ...prev,
        layout: { ...prev.layout, sectionsOrder: order },
      };
    });
  };

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(exportTheme());
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${theme.preset}-theme-settings.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = () => {
    if (!jsonInput.trim()) return;
    const success = importTheme(jsonInput);
    if (success) {
      alert('🎉 Theme settings imported successfully!');
      setJsonInput('');
    } else {
      alert('⚠️ Invalid Theme Settings JSON format.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(exportTheme());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Directory meta mapping for the dynamic smart search & accordion system
  const folders = [
    {
      id: 'presets',
      title: 'Presets & Base Themes',
      icon: '🎨',
      labels: ['presets', 'base theme', 'modern blue', 'classic emerald', 'playful amber', 'minimal dark', 'crimson heritage'],
    },
    {
      id: 'colors',
      title: 'Color Palette',
      icon: '🌈',
      labels: ['primary brand color', 'secondary theme color', 'accent feature color', 'website background', 'card background', 'navbar background', 'footer background', 'primary text color', 'secondary text color', 'border trim lines'],
    },
    {
      id: 'typography',
      title: 'Typography & Fonts',
      icon: '✍️',
      labels: ['headings font family', 'body font family', 'line height', 'letter spacing', 'font weight', 'size'],
    },
    {
      id: 'layout',
      title: 'Layout & Spacings',
      icon: '📐',
      labels: ['logo position', 'logo alignment', 'sticky header', 'container radius shape', 'shadow intensity', 'arrange page sections', 'visibility'],
    },
    {
      id: 'branding',
      title: 'School Branding & Logos',
      icon: '🔖',
      labels: ['logo height size', 'hero dark overlay opacity', 'navbar backdrop blur'],
    },
    {
      id: 'components',
      title: 'Interactive Styling',
      icon: '⚡',
      labels: ['interactive button shape', 'grid card style', 'transitions speed', 'hover animation type'],
    },
    {
      id: 'advanced',
      title: 'Theme Profiles I/O',
      icon: '⚙️',
      labels: ['advanced', 'export', 'copy json', 'download config', 'import theme', 'reset'],
    },
    {
      id: 'domain',
      title: 'Domains & Hosting',
      icon: '🌐',
      labels: ['domain', 'hosting', 'custom domain', 'subdomain', 'godaddy', 'hostinger', 'namecheap', 'ssl', 'dns', 'buy domain', 'connect domain'],
    },
  ];

  // Helper selectors for folder expansion and visibility based on query matches
  const isFolderVisible = (id: string, title: string, labels: string[]) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return title.toLowerCase().includes(query) || labels.some(l => l.toLowerCase().includes(query));
  };

  const isFolderExpanded = (id: string, title: string, labels: string[]) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return title.toLowerCase().includes(query) || labels.some(l => l.toLowerCase().includes(query));
    }
    return !!expandedFolders[id];
  };

  const matchesSearch = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <aside className="w-full h-full bg-slate-900 border-r border-slate-800 flex flex-col text-slate-100 shadow-2xl relative select-none">
      
      {/* Quick Access Utility Actions */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🛠️</span>
          <h2 className="font-black text-xs tracking-widest uppercase text-slate-100">Visual Customizer</h2>
        </div>
        
        {/* Undo / Redo controls */}
        <div className="flex space-x-1.5">
          <button
            onClick={undo}
            disabled={!canUndo}
            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${canUndo ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'text-slate-600 bg-slate-900/50 cursor-not-allowed'}`}
            title="Undo"
          >
            ↩️
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${canRedo ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'text-slate-600 bg-slate-900/50 cursor-not-allowed'}`}
            title="Redo"
          >
            ↪️
          </button>
          <button
            onClick={resetTheme}
            className="p-2 bg-rose-950/80 hover:bg-rose-900 text-rose-350 rounded-xl text-xs font-bold transition-all cursor-pointer"
            title="Reset to defaults"
          >
            🔄
          </button>
        </div>
      </div>

      {/* WCAG Accessibility and Search Input */}
      <div className="p-5 bg-slate-950/40 border-b border-slate-800/80 space-y-4">
        
        {/* WCAG Contrast Rating */}
        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-bold text-slate-450 uppercase tracking-widest leading-none mb-1">WCAG Contrast Rating</div>
            <div className="text-xs font-black text-slate-200">Ratio: {contrastRating.ratio}:1</div>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
            contrastRating.score === 'AAA' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
            contrastRating.score === 'AA' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
            'bg-rose-500/20 text-rose-305 border border-rose-500/30 animate-pulse'
          }`}>
            {contrastRating.score} Pass
          </span>
        </div>

        {/* Dynamic Search Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search customization settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-9 text-xs text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium transition-all"
          />
          <span className="absolute left-3.5 top-3.5 text-xs opacity-40">🔍</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all text-[10px] cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Stacked Accordion Folders */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
        
        {/* FOLDER 1: Presets */}
        {isFolderVisible('presets', 'Presets & Base Themes', folders[0].labels) && (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFolder('presets')}
              className="w-full px-5 py-4 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-between text-left transition-all border-b border-slate-850/30 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">🎨</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">Presets & Base Themes</span>
              </div>
              <span className="text-[10px] opacity-40">{isFolderExpanded('presets', '', []) ? '▼' : '▶'}</span>
            </button>

            {isFolderExpanded('presets', '', []) && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-1 duration-200">
                <div className="grid grid-cols-1 gap-3.5">
                  {Object.values(PRESETS)
                    .filter(p => matchesSearch(p.name) || matchesSearch(p.description))
                    .map((p) => (
                      <button
                        key={p.id}
                        onClick={() => applyPreset(p.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between cursor-pointer ${
                          theme.preset === p.id 
                            ? 'border-indigo-500 bg-indigo-950/20 shadow-lg' 
                            : 'border-slate-800 bg-slate-950/30 hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <span className="font-black text-xs text-white">{p.name}</span>
                          <p className="text-[10px] text-slate-400 leading-normal">{p.description}</p>
                        </div>
                        <div className="flex space-x-1.5 flex-shrink-0 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: p.colors.primary }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: p.colors.background }} />
                          <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: p.colors.footer }} />
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOLDER 2: Color Palette */}
        {isFolderVisible('colors', 'Color Palette', folders[1].labels) && (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFolder('colors')}
              className="w-full px-5 py-4 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-between text-left transition-all border-b border-slate-850/30 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">🌈</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">Color Palette</span>
              </div>
              <span className="text-[10px] opacity-40">{isFolderExpanded('colors', '', []) ? '▼' : '▶'}</span>
            </button>

            {isFolderExpanded('colors', '', []) && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-1 duration-200">
                <div className="grid grid-cols-1 gap-3.5">
                  {[
                    { label: 'Primary Brand Color', key: 'primary', desc: 'Main brand theme & primary buttons' },
                    { label: 'Secondary Theme Color', key: 'secondary', desc: 'Highlight boxes, badges, & stats' },
                    { label: 'Accent Feature Color', key: 'accent', desc: 'Alert boxes & announcement triggers' },
                    { label: 'Website Background', key: 'background', desc: 'Main canvas layout background' },
                    { label: 'Card & Section Canvas', key: 'cardBg', desc: 'Subtle section blocks & grid backdrops' },
                    { label: 'Header/Navbar Canvas', key: 'navbar', desc: 'Top nav panel backdrop background' },
                    { label: 'Footer Canvas', key: 'footer', desc: 'Bottom copyright panel background' },
                    { label: 'Primary Text', key: 'text', desc: 'Headings, title texts & body contents' },
                    { label: 'Secondary Muted Text', key: 'textMuted', desc: 'Subtitles & minor descriptions' },
                    { label: 'Border Trim Lines', key: 'border', desc: 'Subtle dividing lines between sections' },
                  ]
                    .filter(item => matchesSearch(item.label) || matchesSearch(item.desc))
                    .map((item) => (
                      <div key={item.key} className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="pr-2">
                            <label className="text-[10px] font-black uppercase text-slate-200 tracking-wider leading-none">{item.label}</label>
                            <p className="text-[9px] text-slate-450 mt-1 leading-normal">{item.desc}</p>
                          </div>
                          
                          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
                            <input
                              type="color"
                              value={theme.colors[item.key as keyof ThemeColors] || '#ffffff'}
                              onChange={(e) => handleColorChange(item.key as keyof ThemeColors, e.target.value)}
                              className="w-7 h-7 rounded-md bg-transparent border-0 cursor-pointer outline-none flex-shrink-0"
                            />
                            <input
                              type="text"
                              value={theme.colors[item.key as keyof ThemeColors]?.toUpperCase() || ''}
                              onChange={(e) => handleColorChange(item.key as keyof ThemeColors, e.target.value)}
                              className="w-16 bg-transparent text-[10px] text-center border-0 text-slate-200 font-bold font-mono focus:ring-0 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOLDER 3: Typography & Fonts */}
        {isFolderVisible('typography', 'Typography & Fonts', folders[2].labels) && (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFolder('typography')}
              className="w-full px-5 py-4 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-between text-left transition-all border-b border-slate-850/30 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">✍️</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">Typography & Fonts</span>
              </div>
              <span className="text-[10px] opacity-40">{isFolderExpanded('typography', '', []) ? '▼' : '▶'}</span>
            </button>

            {isFolderExpanded('typography', '', []) && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-1 duration-200">
                
                {/* Heading Fonts */}
                {matchesSearch('headings font family') && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Heading Font family</label>
                    <select
                      value={theme.typography.headingFont}
                      onChange={(e) => handleTypographyChange('headingFont', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-bold cursor-pointer"
                    >
                      {GOOGLE_FONTS.map((font) => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Body Fonts */}
                {matchesSearch('body font family') && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Body Font family</label>
                    <select
                      value={theme.typography.bodyFont}
                      onChange={(e) => handleTypographyChange('bodyFont', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-bold cursor-pointer"
                    >
                      {GOOGLE_FONTS.map((font) => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Live Text Preview Box */}
                {matchesSearch('preview') && (
                  <div className="p-4 rounded-xl bg-white text-slate-900 border border-slate-200 space-y-1.5">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Font Live Preview</div>
                    <h4 style={{ fontFamily: theme.typography.headingFont, fontWeight: 700 }} className="text-xl font-bold tracking-tight">
                      Institutional Heritage
                    </h4>
                    <p style={{ fontFamily: theme.typography.bodyFont }} className="text-xs text-slate-600 leading-normal">
                      Nurturing young minds through legacy and modern science.
                    </p>
                  </div>
                )}

                {/* Typography Scale Slider */}
                <div className="space-y-4 pt-2">
                  {matchesSearch('line height') && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-355">
                        <span>Line Height</span>
                        <span>{theme.typography.lineHeight}</span>
                      </div>
                      <input
                        type="range"
                        min="1.2"
                        max="2.0"
                        step="0.1"
                        value={theme.typography.lineHeight}
                        onChange={(e) => handleTypographyChange('lineHeight', e.target.value)}
                        className="w-full accent-indigo-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
                      />
                    </div>
                  )}

                  {matchesSearch('letter spacing') && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-355">
                        <span>Letter Spacing</span>
                        <span className="capitalize">{theme.typography.letterSpacing}</span>
                      </div>
                      <select
                        value={theme.typography.letterSpacing}
                        onChange={(e) => handleTypographyChange('letterSpacing', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-bold cursor-pointer"
                      >
                        <option value="tight">Tight</option>
                        <option value="normal">Normal</option>
                        <option value="wide">Wide</option>
                      </select>
                    </div>
                  )}

                  {matchesSearch('font weight') && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-black uppercase text-slate-355">
                        <span>Font Weight</span>
                        <span>{theme.typography.fontWeight}</span>
                      </div>
                      <select
                        value={theme.typography.fontWeight}
                        onChange={(e) => handleTypographyChange('fontWeight', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-bold cursor-pointer"
                      >
                        <option value="300">Light (300)</option>
                        <option value="400">Regular (400)</option>
                        <option value="500">Medium (500)</option>
                        <option value="700">Bold (700)</option>
                        <option value="900">Black (900)</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* FOLDER 4: Layout & Spacings */}
        {isFolderVisible('layout', 'Layout & Spacings', folders[3].labels) && (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFolder('layout')}
              className="w-full px-5 py-4 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-between text-left transition-all border-b border-slate-850/30 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">📐</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">Layout & Spacings</span>
              </div>
              <span className="text-[10px] opacity-40">{isFolderExpanded('layout', '', []) ? '▼' : '▶'}</span>
            </button>

            {isFolderExpanded('layout', '', []) && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-1 duration-200">
                
                {/* Logo alignment options */}
                {matchesSearch('logo alignment') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Logo Position Alignment</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['left', 'center', 'right'].map((align) => (
                        <button
                          key={align}
                          onClick={() => handleLayoutChange('logoAlignment', align)}
                          className={`py-2 rounded-lg text-xs font-black capitalize transition-all cursor-pointer ${
                            theme.layout.logoAlignment === align ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950 text-slate-450 hover:bg-slate-850'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sticky Navbar checkbox */}
                {matchesSearch('sticky header') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-200 tracking-wider">Sticky Header Nav</span>
                      <p className="text-[9px] text-slate-450 mt-1">Locks navbar to page top on scroll</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={theme.layout.stickyNavbar}
                      onChange={(e) => handleLayoutChange('stickyNavbar', e.target.checked)}
                      className="w-4 h-4 rounded border-slate-800 bg-slate-950 accent-indigo-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* Border Radius buttons */}
                {matchesSearch('container radius shape') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Card Shapes (Border Radius)</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['none', 'rounded', 'extra-rounded'].map((radius) => (
                        <button
                          key={radius}
                          onClick={() => handleLayoutChange('borderRadius', radius)}
                          className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${
                            theme.layout.borderRadius === radius ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950 text-slate-450 hover:bg-slate-850'
                          }`}
                        >
                          {radius === 'none' ? 'Sharp' : radius === 'rounded' ? 'Sleek' : 'Soft'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shadow Intensity buttons */}
                {matchesSearch('shadow intensity') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Shadow Intensity</label>
                    <div className="grid grid-cols-4 gap-1">
                      {['none', 'light', 'medium', 'high'].map((shadow) => (
                        <button
                          key={shadow}
                          onClick={() => handleLayoutChange('shadowIntensity', shadow)}
                          className={`py-1.5 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${
                            theme.layout.shadowIntensity === shadow ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950 text-slate-455 hover:bg-slate-850'
                          }`}
                        >
                          {shadow}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drag & Drop Section arrangement */}
                {matchesSearch('arrange page sections') && (
                  <div className="space-y-2.5 pt-1">
                    <label className="text-[10px] font-black uppercase text-slate-300 tracking-wider block">Arrange Page Sections</label>
                    <div className="space-y-2">
                      {theme.layout.sectionsOrder.map((section: string, index: number) => {
                        const isVisible = theme.layout.sectionsVisibility[section] !== false;
                        return (
                          <div key={section} className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-850 rounded-xl">
                            <div className="flex items-center space-x-2.5">
                              <button
                                onClick={() => toggleSection(section)}
                                className={`text-xs p-1 rounded-lg hover:bg-slate-850 transition-colors cursor-pointer ${isVisible ? 'text-indigo-400' : 'text-slate-600'}`}
                                title={isVisible ? 'Hide Section' : 'Show Section'}
                              >
                                {isVisible ? '👁️' : '🙈'}
                              </button>
                              <span className={`text-[10px] font-black uppercase tracking-wider ${isVisible ? 'text-slate-200' : 'text-slate-600 line-through'}`}>
                                {section === 'hero' ? 'Hero Banner' :
                                 section === 'stats' ? 'Stats Stats' :
                                 section === 'about' ? 'About Story' :
                                 section === 'principal' ? "Principal's Desk" :
                                 section === 'banner' ? 'Registration' :
                                 'Footer Section'}
                              </span>
                            </div>
                            
                            <div className="flex space-x-0.5">
                              <button
                                onClick={() => moveSection(index, 'up')}
                                disabled={index === 0}
                                className={`p-1 text-[9px] hover:bg-slate-850 rounded transition-all cursor-pointer ${index === 0 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400'}`}
                              >
                                ▲
                              </button>
                              <button
                                onClick={() => moveSection(index, 'down')}
                                disabled={index === theme.layout.sectionsOrder.length - 1}
                                className={`p-1 text-[9px] hover:bg-slate-850 rounded transition-all cursor-pointer ${index === theme.layout.sectionsOrder.length - 1 ? 'text-slate-700 cursor-not-allowed' : 'text-slate-400'}`}
                              >
                                ▼
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* FOLDER 5: School Branding & Logos */}
        {isFolderVisible('branding', 'School Branding & Logos', folders[4].labels) && (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFolder('branding')}
              className="w-full px-5 py-4 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-between text-left transition-all border-b border-slate-850/30 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">🔖</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">School Branding & Logos</span>
              </div>
              <span className="text-[10px] opacity-40">{isFolderExpanded('branding', '', []) ? '▼' : '▶'}</span>
            </button>

            {isFolderExpanded('branding', '', []) && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-1 duration-200">
                
                {/* Logo Size */}
                {matchesSearch('logo height size') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-350">
                      <span>Logo Height Size</span>
                      <span>{theme.branding.logoSize}</span>
                    </div>
                    <input
                      type="range"
                      min="24"
                      max="80"
                      value={parseInt(theme.branding.logoSize) || 40}
                      onChange={(e) => handleBrandingChange('logoSize', `${e.target.value}px`)}
                      className="w-full accent-indigo-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                )}

                {/* Overlay Opacity */}
                {matchesSearch('hero dark overlay opacity') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-350">
                      <span>Hero Overlay Opacity</span>
                      <span>{Math.round(theme.branding.overlayOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={theme.branding.overlayOpacity * 100}
                      onChange={(e) => handleBrandingChange('overlayOpacity', parseFloat(e.target.value) / 100)}
                      className="w-full accent-indigo-500 bg-slate-950 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                )}

                {/* Background Blur */}
                {matchesSearch('navbar backdrop blur') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Navbar Backdrop Blur</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {['none', 'sm', 'md', 'lg'].map((blur) => (
                        <button
                          key={blur}
                          onClick={() => handleBrandingChange('bgBlur', blur)}
                          className={`py-2 rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                            theme.branding.bgBlur === blur ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-450 hover:bg-slate-850'
                          }`}
                        >
                          {blur}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* FOLDER 6: Interactive Styling */}
        {isFolderVisible('components', 'Interactive Styling', folders[5].labels) && (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFolder('components')}
              className="w-full px-5 py-4 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-between text-left transition-all border-b border-slate-850/30 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">⚡</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">Interactive Styling</span>
              </div>
              <span className="text-[10px] opacity-40">{isFolderExpanded('components', '', []) ? '▼' : '▶'}</span>
            </button>

            {isFolderExpanded('components', '', []) && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-1 duration-200">
                
                {/* Buttons shape */}
                {matchesSearch('interactive button shape') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Button Shape Style</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['rounded-none', 'rounded-xl', 'rounded-full'].map((btn) => (
                        <button
                          key={btn}
                          onClick={() => handleComponentChange('buttonStyle', btn)}
                          className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${
                            theme.components.buttonStyle === btn ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950 text-slate-450 hover:bg-slate-850'
                          }`}
                        >
                          {btn === 'rounded-none' ? 'Sharp' : btn === 'rounded-xl' ? 'Sleek' : 'Soft'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cards layout */}
                {matchesSearch('grid card style') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Grid Card Border style</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['square', 'rounded', 'playful'].map((card) => (
                        <button
                          key={card}
                          onClick={() => handleComponentChange('cardStyle', card)}
                          className={`py-2 rounded-lg text-[9px] font-black uppercase transition-all cursor-pointer ${
                            theme.components.cardStyle === card ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950 text-slate-455 hover:bg-slate-850'
                          }`}
                        >
                          {card}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transition speed slider */}
                {matchesSearch('transitions speed') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Interface Transition Speed</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['150ms', '300ms', '500ms'].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => handleComponentChange('transitionSpeed', speed)}
                          className={`py-2 rounded-lg text-xs font-black transition-all cursor-pointer ${
                            theme.components.transitionSpeed === speed ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-950 text-slate-450 hover:bg-slate-850'
                          }`}
                        >
                          {speed}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover Animations */}
                {matchesSearch('hover animation type') && (
                  <div className="p-3.5 bg-slate-950/40 border border-slate-850 rounded-xl space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider">Interactive Hover Animation</label>
                    <div className="grid grid-cols-4 gap-1">
                      {['none', 'scale-up', 'opacity', 'slide-up'].map((anim) => (
                        <button
                          key={anim}
                          onClick={() => handleComponentChange('hoverAnimation', anim)}
                          className={`py-2 rounded-lg text-[8px] font-black uppercase transition-all cursor-pointer ${
                            theme.components.hoverAnimation === anim ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-950 text-slate-450 hover:bg-slate-850'
                          }`}
                        >
                          {anim === 'scale-up' ? 'Zoom' : anim === 'slide-up' ? 'Float' : anim}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* FOLDER 7: Theme Profiles I/O */}
        {isFolderVisible('advanced', 'Theme Profiles I/O', folders[6].labels) && (
          <div className="bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleFolder('advanced')}
              className="w-full px-5 py-4 bg-slate-950/40 hover:bg-slate-950/60 flex items-center justify-between text-left transition-all border-b border-slate-850/30 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <span className="text-base">⚙️</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-200">Theme Profiles I/O</span>
              </div>
              <span className="text-[10px] opacity-40">{isFolderExpanded('advanced', '', []) ? '▼' : '▶'}</span>
            </button>

            {isFolderExpanded('advanced', '', []) && (
              <div className="p-5 space-y-4 animate-in slide-in-from-top-1 duration-200">
                <div className="space-y-3">
                  
                  {matchesSearch('download config') && (
                    <button
                      onClick={handleExport}
                      className="w-full bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] cursor-pointer text-xs"
                    >
                      <span>💾</span>
                      <span>Download JSON config</span>
                    </button>
                  )}

                  {matchesSearch('copy json') && (
                    <button
                      onClick={handleCopy}
                      className="w-full bg-slate-950 hover:bg-slate-850 text-slate-200 border border-slate-800 font-bold py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-[0.98] cursor-pointer text-xs"
                    >
                      <span>📋</span>
                      <span>{copied ? 'Copied! ✓' : 'Copy Theme Settings JSON'}</span>
                    </button>
                  )}

                  {matchesSearch('import theme') && (
                    <div className="border-t border-slate-800 pt-4 space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-350 tracking-wider block">Import Config File</label>
                      <textarea
                        placeholder="Paste backup config JSON content here..."
                        rows={5}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-[10px] font-mono focus:border-indigo-500 focus:ring-0 outline-none resize-none text-slate-205"
                      />
                      <button
                        onClick={handleImport}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer text-xs"
                      >
                        Import Theme Profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </aside>
  );
}
