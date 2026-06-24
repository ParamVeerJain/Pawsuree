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
        ice: '#D9F1FB',     // logo letter fill
        mist: '#EFF9FE',    // soft section wash
        pool: '#4A87C8',    // logo outline blue — primary
        poolsoft: '#5B94D3',// logo tagline blue
        deepsea: '#1D4E7E', // ink / outlines
        night: '#142E4C',   // footer / doorway
        biscuit: '#F6C453', // dog-biscuit accent (sparing)
        cream: '#FFFDF4',   // bone fill
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
