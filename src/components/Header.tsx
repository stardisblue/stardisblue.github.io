import React from 'react';
import { TableOfContent, TOC } from './TableOfContent';
import { Links } from './ui';
import { Open_Sans, Tinos } from 'next/font/google';
import classNames from 'classnames';
const openSans = Open_Sans({ subsets: ['latin'] });
const tinos = Tinos({ weight: '400', subsets: ['latin'], style: 'italic' });

type Props = {
  subtitle: React.ReactNode;
  toc: TOC[];
};

export function Header({ subtitle, toc }: Props) {
  return (
    <header>
      <h1 className={classNames(openSans.className, 'text-3xl')}>Fati Chen</h1>
      <h2 className={classNames(tinos.className, 'text-2xl', 'mb-3')}>
        {subtitle}
      </h2>
      <div className="flex flex-wrap justify-between">
        <Links
          values={[
            { name: '🌐 stardis.blue', href: 'https://stardis.blue' },
            {
              name: '✉ chen.fati@gmail.com',
              href: 'mailto:chen.fati@gmail.com',
              title: 'chen.fati@gmail.com',
            },
            {
              kind: 'Github',
              href: 'https://github.com/stardisblue',
              name: 'stardisblue',
            },
            {
              kind: 'Observable',
              name: '@stardisblue',
              href: 'https://observablehq.com/@stardisblue',
            },
            {
              kind: 'Linkedin',
              name: 'Fati Chen',
              href: 'https://www.linkedin.com/in/fati-chen/',
              title: 'fati-chen',
            },
          ]}
        />
        <TableOfContent show={false} sections={toc} />
      </div>
    </header>
  );
}
