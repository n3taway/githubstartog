/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        notion: {
          blue: '#2383E2',
          orange: '#FF6B35',
          gray: {
            50: '#F7F6F3',
            100: '#E9E9E7',
            200: '#CBCAC8',
            300: '#A0A0A0',
            400: '#6F6F6F',
            500: '#2F2F2F',
          }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'notion': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'notion-hover': '0 12px 48px rgba(0, 0, 0, 0.18)',
      },
      borderRadius: {
        'notion-sm': '8px',
        'notion-md': '12px',
        'notion-lg': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      transitionDuration: {
        '250': '250ms',
      },
    },
  },
  plugins: [],
}

