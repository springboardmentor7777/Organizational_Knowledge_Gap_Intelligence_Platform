/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
      boxShadow: {
        'card':          '0 1px 3px 0 rgba(0,0,0,0.05), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-hover':    '0 6px 16px -2px rgba(0,0,0,0.10), 0 2px 6px -1px rgba(0,0,0,0.06)',
        'card-elevated': '0 10px 28px -4px rgba(0,0,0,0.10), 0 4px 10px -2px rgba(0,0,0,0.06)',
        'card-xl':       '0 20px 48px -8px rgba(0,0,0,0.12), 0 8px 16px -4px rgba(0,0,0,0.06)',
        'nav':           '0 1px 2px 0 rgba(0,0,0,0.06)',
        'btn':           '0 1px 2px 0 rgba(0,0,0,0.06)',
        'btn-primary':   '0 2px 10px 0 rgba(37,99,235,0.28)',
        'toast':         '0 8px 28px rgba(0,0,0,0.12)',
        'inner-card':    'inset 0 1px 3px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInFast: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        progressFill: {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--progress-width)' },
        },
      },
      animation: {
        fadeIn:      'fadeIn 0.35s ease-out both',
        fadeInFast:  'fadeInFast 0.15s ease-out both',
        slideInLeft: 'slideInLeft 0.30s ease-out both',
        slideUp:     'slideUp 0.30s ease-out both',
        scaleIn:     'scaleIn 0.20s ease-out both',
        shimmer:     'shimmer 1.6s linear infinite',
        spinSlow:    'spinSlow 0.9s linear infinite',
        pulse2:      'pulse2 2s ease-in-out infinite',
        float:       'float 4s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(var(--tw-gradient-stops))',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
