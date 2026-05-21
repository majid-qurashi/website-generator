export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  accent: string;
  background: string;
  cardBg: string;
  navbar: string;
  footer: string;
  text: string;
  textMuted: string;
  buttonBg: string;
  buttonText: string;
  border: string;
}

export interface ThemeTypography {
  fontFamily: string;
  headingFont: string;
  bodyFont: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
}

export interface ThemeLayout {
  logoAlignment: 'left' | 'center' | 'right';
  navbarAlignment: 'left' | 'center' | 'right';
  mainTextAlignment: 'left' | 'center' | 'right';
  heroLayout: 'banner' | 'split' | 'minimal';
  sectionSpacing: string;
  containerWidth: string;
  borderRadius: 'none' | 'rounded' | 'extra-rounded';
  shadowIntensity: 'none' | 'light' | 'medium' | 'high';
  stickyNavbar: boolean;
  sectionsOrder: string[];
  sectionsVisibility: Record<string, boolean>;
}

export interface ThemeBranding {
  logoSize: string;
  logoPosition: 'left' | 'center' | 'right';
  overlayOpacity: number;
  bgBlur: 'none' | 'sm' | 'md' | 'lg';
}

export interface ThemeComponents {
  buttonStyle: 'rounded-none' | 'rounded-xl' | 'rounded-full';
  cardStyle: 'square' | 'rounded' | 'playful';
  transitionSpeed: string;
  hoverAnimation: 'none' | 'scale-up' | 'opacity' | 'slide-up';
}

export interface ThemeConfig {
  preset: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  branding: ThemeBranding;
  components: ThemeComponents;
}

export interface PresetTheme {
  id: string;
  name: string;
  description: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  layout: ThemeLayout;
  branding: ThemeBranding;
  components: ThemeComponents;
}
