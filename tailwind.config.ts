import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#EEEAD9',
          'bg-light': '#F7F4EA',
          beige: '#D9D2BF',
          charcoal: '#3A3737',
          dark: '#2B2929',
          accent: '#EF4D30',
          'accent-h': '#FF6A47',
          gray: '#8D8782',
        },
      },
      fontFamily: {
        anton: ['var(--font-anton)'],
      },
    },
  },
};

export default config;
