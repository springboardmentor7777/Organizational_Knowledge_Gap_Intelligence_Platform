/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        darkBg:     '#050508',
        darkCard:   'rgba(12, 12, 24, 0.85)',
        neonTeal:   '#06b6d4',
        neonIndigo: '#6366f1',
        neonViolet: '#8b5cf6',
      },
      animation: {
        'fade-up':    'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':    'fade-in 0.4s ease both',
        'float':      'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}
