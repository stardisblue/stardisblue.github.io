import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: [
          'var(--font-inter)',
          {
            fontFeatureSettings: '"ss01","ss04","ss03","cv06","cv11"',
          },
        ],
        serif: ['var(--font-noto-serif)'],
        mono: ['var(--font-fira-code)'],
      },
    },
  },
  plugins: [typography],
};

export default config;
