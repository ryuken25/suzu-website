import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        cream: 'var(--suzu-cream)',
        blush: 'var(--suzu-blush)',
        petal: 'var(--suzu-petal)',
        rose: 'var(--suzu-rose)',
        lavender: 'var(--suzu-lavender)',
        violet: 'var(--suzu-violet)',
        sky: 'var(--suzu-sky)',
        mint: 'var(--suzu-mint)',
        butter: 'var(--suzu-butter)',
        peach: 'var(--suzu-peach)',
        ink: 'var(--suzu-ink)',
        mocha: 'var(--suzu-ink-soft)',
        muted: 'var(--suzu-muted)',
        pink: {
          DEFAULT: 'var(--suzu-petal)',
          soft: 'var(--suzu-blush)',
          deep: 'var(--suzu-rose)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      boxShadow: {
        soft: 'var(--suzu-shadow)',
        strong: 'var(--suzu-shadow-strong)',
      },
    },
  },
  plugins: [],
};
export default config;
