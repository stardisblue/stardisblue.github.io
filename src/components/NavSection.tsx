import React, { HtmlHTMLAttributes } from 'react';

import { Section } from './ui/Section';
import { Navigation, TOC } from './TableOfContent';

type Props = HtmlHTMLAttributes<HTMLElement> & {
  emoji?: string;
  toc: TOC[];
};

export function NavSection({ title, emoji, children, toc, ...attrs }: Props) {
  return (
    <Section emoji={emoji} title={title} {...attrs}>
      {children}
      <Navigation sections={toc} />
      <hr />
    </Section>
  );
}
