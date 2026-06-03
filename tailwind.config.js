/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        terra: {
          50:  '#fdf2ef',
          100: '#fae0d9',
          200: '#f5bcb0',
          300: '#ec8c77',
          400: '#e06046',
          500: '#CF4B2A',
          600: '#b83920',
          700: '#992e1b',
          800: '#7d281b',
          900: '#67251b',
        },
        navy: {
          50:  '#f0f4fb',
          100: '#dde6f5',
          200: '#c2d3ed',
          300: '#98b5e0',
          400: '#6892cf',
          500: '#4773bf',
          600: '#365baf',
          700: '#2e4a96',
          800: '#2b3f7a',
          900: '#0F1B35',
        },
        cream:  '#F9F4E8',
        gold:   '#D4A843',
        olive:  '#5C7A4E',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:    ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
