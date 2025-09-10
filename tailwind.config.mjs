/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
      extend: {
        colors: {
          light: '#f3f3f3',
          dark: '#1f1d2c',
          accent: '#68f70b'
        },
        fontFamily: {
          'brutalist': ['Fredoka', 'Arial Black', 'sans-serif'],
        },
        backdropBlur: {
          xs: '2px',
        },
        animation: {
          'float': 'float 3s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' }
          },
          glow: {
            '0%': { boxShadow: '0 0 20px rgba(104, 247, 11, 0.3)' },
            '100%': { boxShadow: '0 0 30px rgba(104, 247, 11, 0.6)' }
          }
        }
      },
    },
    plugins: [],
  }