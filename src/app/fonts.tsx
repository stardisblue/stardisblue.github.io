import { Fira_Code, Noto_Serif } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = localFont({
  src: './fonts/InterVariable.woff2',
  display: 'swap',
  variable: '--font-inter',
});
export const notoSerif = Noto_Serif({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-serif',
});
export const firaCode = Fira_Code({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-fira-code',
});
