import classNames from 'classnames';
import { Open_Sans, Tinos } from 'next/font/google';
import React from 'react';

import { LinkType } from '@/model';
import { TableOfContent, TOC } from './TableOfContent';
import { Links } from './ui';

const openSans = Open_Sans({ subsets: ['latin'] });
const tinos = Tinos({ weight: '400', subsets: ['latin'], style: 'italic' });

type Props = {
  subtitle: React.ReactNode;
  toc: TOC[];
  links: LinkType[];
};

export function Header({ subtitle, toc, links }: Props) {
  return (
    <header>
      <h1 className={classNames(openSans.className, 'text-3xl')}>Fati Chen</h1>
      <h2 className={classNames(tinos.className, 'text-2xl', 'mb-3')}>
        {subtitle}
      </h2>
      <div className="flex flex-wrap justify-between">
        <Links values={links} />
        <TableOfContent show={false} sections={toc} />
      </div>
    </header>
  );
}
