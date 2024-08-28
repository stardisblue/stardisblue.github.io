import classNames from 'classnames';
import { Open_Sans, Tinos } from 'next/font/google';
import React from 'react';

import { TableOfContent, TOC } from './TableOfContent';
import { Links } from './ui';
import { links } from '@/locales/links';

const openSans = Open_Sans({ subsets: ['latin'] });
const tinos = Tinos({ weight: '400', subsets: ['latin'], style: 'italic' });

export function Header() {
  return (
    <header>
      <h1 className={classNames(openSans.className, 'text-3xl')}>Fati Chen</h1>
      <h2 className={classNames(tinos.className, 'text-2xl', 'mb-3')}>
        DataScience &amp; Dev. Fullstack
      </h2>
      <div className="flex flex-wrap justify-between">
        <Links values={links} />
        <TableOfContent show={false} />
      </div>
    </header>
  );
}
