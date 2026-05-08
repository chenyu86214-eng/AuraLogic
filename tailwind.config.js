/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0D0A1A',
        deep: '#13102B',
        surface: '#1C1838',
        overlay: '#241F42',
        rim: '#2E2850',
        lavender: '#C4B0E8',
        lilac: '#9B84D4',
        violet: '#7055B8',
        amethyst: '#4E3A8E',
        dust: '#6B5FA0',
        gold: '#F2D97A',
        amber: '#E8C05A',
        cream: '#F8F0DC',
        'text-primary': '#EDE8F8',
        'text-secondary': '#A899CC',
        'text-muted': '#6B5F90',
        'text-ghost': '#3D3460',
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
        sans: ['Noto Sans SC', 'sans-serif'],
        display: ['Cinzel Decorative', 'serif'],
        chinese: ['Ma Shan Zheng', 'cursive'],
      },
      boxShadow: {
        'glow-violet': '0 0 40px rgba(112,85,184,0.5)',
        'glow-gold': '0 0 30px rgba(242,217,122,0.35)',
        'glow-soft': '0 0 60px rgba(150,120,220,0.2)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite alternate',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'bar-load': 'bar-load 1.2s cubic-bezier(0.4,0,0.2,1) forwards',
        'mandala-spin': 'mandala-spin 60s linear infinite',
        'orb-breathe': 'orb-breathe 4s ease-in-out infinite',
        'ring-expand': 'ring-expand 3s ease-out infinite',
        'wave': 'wave 1.2s ease-in-out infinite alternate',
        'page-in': 'page-in 0.5s cubic-bezier(0.2,0.8,0.3,1)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 'var(--min-op, 0.3)', transform: 'scale(1)' },
          '50%': { opacity: 'var(--max-op, 0.9)', transform: 'scale(1.4)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(var(--dx,30px), var(--dy,-20px)) scale(1.1)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        'bar-load': {
          from: { width: '0' },
          to: { width: 'var(--tw-bar-width, 72%)' },
        },
        'mandala-spin': {
          to: { transform: 'rotate(360deg)' },
        },
        'orb-breathe': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 40px rgba(112,85,184,0.6), 0 0 80px rgba(112,85,184,0.2)' },
          '50%': { transform: 'scale(1.06)', boxShadow: '0 0 60px rgba(112,85,184,0.8), 0 0 120px rgba(112,85,184,0.3)' },
        },
        'ring-expand': {
          '0%': { opacity: '0.6', transform: 'translate(-50%,-50%) scale(0.8)' },
          '100%': { opacity: '0', transform: 'translate(-50%,-50%) scale(1.3)' },
        },
        wave: {
          from: { height: '4px' },
          to: { height: 'var(--h,20px)' },
        },
        'page-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
