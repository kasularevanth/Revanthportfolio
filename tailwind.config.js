/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0c0a1d', 2: '#141130' },
        paper: '#f4f2ff',
        muted: '#a5a0c8',
        amber: '#ffb547',
        sky: '#7fd8ff',
        violet: '#a78bfa',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Geist', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      maxWidth: { content: '1200px' },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(6vw, -4vh) scale(1.08)' },
          '66%': { transform: 'translate(-4vw, 5vh) scale(0.95)' },
        },
        bar: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        ping: { '75%, 100%': { transform: 'scale(2.2)', opacity: '0' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        drift: 'drift 22s ease-in-out infinite',
        'drift-slow': 'drift 30s ease-in-out infinite reverse',
        bar: 'bar 1.1s ease-in-out infinite',
        ping: 'ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee 46s linear infinite reverse',
      },
    },
  },
  plugins: [],
}
