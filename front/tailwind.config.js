/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    minWidth: {
      'modal': '40vw'
    },
    extend: {
      fontFamily: {
        'sans': ['ui-sans-serif', 'system-ui'],
        'serif': ['ui-serif', 'Georgia'],
        'mono': ['ui-monospace', 'SFMono-Regular'],
        'logo': ['"Trajan Pro"'],
        'heading': ['"Kumbh Sans"'],
        'main': ['"Open Sans"']
      },
      width: {
        'long': ['1024px']
      },
      fontSize: {
        'xl': ['24px'],
        '2xl': ['32px']
      },
      colors: {
        steam: {
          '900': '#1D2839'
        },
        gray: {
          '900': '#333333',
          '800': '#4F4F4F',
          '700': '#828282',
          '600': '#AFAFAF',
          '500': '#BDBDBD',
          '400': '#E0E0E0',
          '300': '#F2F2F2',
        },
        xp: '#5B0B79',
        gp: '#2D9CDB',
        im: '#219653',
        bn: '#F2994A',
        blue: {
          '1' : '#2F80ED',
        },
        green: {
          '2' : '#27AE60'
        }
      },
    },
  },
  plugins: [],
}
