import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import { fontFamily } from 'tailwindcss/defaultTheme';

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
          ['var(--font-inter)', ...fontFamily.sans],
          {
            fontFeatureSettings: '"ss01","ss04","ss03","cv06","cv11"',
          },
        ],
        serif: ['var(--font-noto-serif)', ...fontFamily.serif],
        mono: ['var(--font-fira-code)', ...fontFamily.mono],
      },
    },
  },
  plugins: [typography],
};

export default config;
