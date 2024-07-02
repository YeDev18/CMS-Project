/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        bgColors: '#EEEEEE',
        firstColors: '#EEEEEC',
        testColors: '#ea546c',
        testColors1: '#B4B4B4',
        shadowColors: '#B5B3AD',
        borderColor: '#313131',
        grayBlack: '#0A0A0A',

        firstBlue: '#009FE3',
        checkColors: '#008000',
        testBoder: '#ededec',
      },
    },
  },
  plugins: [],
};
