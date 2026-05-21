/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: 'rgb(var(--theme-primary-rgb, 37 99 235) / <alpha-value>)',
          primaryHover: 'rgb(var(--theme-primary-hover-rgb, 29 78 216) / <alpha-value>)',
          secondary: 'rgb(var(--theme-secondary-rgb, 79 70 229) / <alpha-value>)',
          accent: 'rgb(var(--theme-accent-rgb, 245 158 11) / <alpha-value>)',
          bg: 'rgb(var(--theme-bg-rgb, 255 255 255) / <alpha-value>)',
          cardBg: 'rgb(var(--theme-card-bg-rgb, 248 250 252) / <alpha-value>)',
          navbar: 'rgb(var(--theme-navbar-rgb, 255 255 255) / <alpha-value>)',
          footer: 'rgb(var(--theme-footer-rgb, 15 23 42) / <alpha-value>)',
          text: 'rgb(var(--theme-text-rgb, 15 23 42) / <alpha-value>)',
          textMuted: 'rgb(var(--theme-text-muted-rgb, 100 116 139) / <alpha-value>)',
          btnBg: 'rgb(var(--theme-btn-bg-rgb, 37 99 235) / <alpha-value>)',
          btnText: 'rgb(var(--theme-btn-text-rgb, 255 255 255) / <alpha-value>)',
          border: 'rgb(var(--theme-border-rgb, 226 232 240) / <alpha-value>)',
        }
      },
      fontFamily: {
        themeHeading: ['var(--theme-font-heading)', 'sans-serif'],
        themeBody: ['var(--theme-font-body)', 'sans-serif'],
      },
      borderRadius: {
        theme: 'var(--theme-radius, 1rem)',
      },
      boxShadow: {
        theme: 'var(--theme-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      },
      keyframes: {
        'word-appear': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'word-appear': 'word-appear 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

