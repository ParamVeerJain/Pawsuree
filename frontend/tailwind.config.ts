import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ice: '#D9F1FB',
        mist: '#EFF9FE',
        pool: '#4A87C8',
        poolsoft: '#5B94D3',
        deepsea: '#1D4E7E',
        night: '#142E4C',
        biscuit: '#F6C453',
        cream: '#FFFDF4',
      },
      fontFamily: {
        logo: ['var(--font-logo)'],
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      boxShadow: {
        sticker: '0 4px 0 0 rgba(29,78,126,0.18)',
        stickerLg: '0 10px 0 0 rgba(29,78,126,0.14)',
        lift: '0 18px 40px -18px rgba(29,78,126,0.45)',
      },
    },
  },
  plugins: [],
};
export default config;
