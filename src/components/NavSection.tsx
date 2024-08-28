import React, { HtmlHTMLAttributes } from 'react';

import { Section } from './ui/Section';
import { Navigation, TOC } from './TableOfContent';

type Props = HtmlHTMLAttributes<HTMLElement> & {
  emoji?: string;
};

export function NavSection({ title, emoji, children, ...attrs }: Props) {
  return (
    <Section emoji={emoji} title={title} {...attrs}>
      {children}
      <Navigation />
      <hr />
    </Section>
  );
}
