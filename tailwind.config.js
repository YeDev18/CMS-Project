/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        shadowColors: 'rgba(0, 0, 0, 0.2)',
        firstColors: 'rgb(255, 255, 255)',
        firstBlue: '#009FE3',
        grayBlack: '#000000',
      },
    },
  },
};
