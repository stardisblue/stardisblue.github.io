import type { Metadata } from 'next';
import './globals.css';
import classNames from 'classnames';
import { firaCode, inter, notoSerif } from './fonts';

export const metadata: Metadata = {
  title: 'Fati Chen',
  description: 'My personal webpage',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={classNames(
        firaCode.variable,
        notoSerif.variable,
        inter.variable
      )}
    >
      <body>{children}</body>
    </html>
  );
}
