import React, { HtmlHTMLAttributes } from 'react';

import { DeprecatedSection } from './ui/Section';
import { Navigation } from './TableOfContent';

type Props = HtmlHTMLAttributes<HTMLElement> & {
  emoji?: string;
};

export function NavSection({ title, emoji, children, ...attrs }: Props) {
  return (
    <DeprecatedSection emoji={emoji} title={title} {...attrs}>
      {children}
      <Navigation />
      <hr />
    </DeprecatedSection>
  );
}
