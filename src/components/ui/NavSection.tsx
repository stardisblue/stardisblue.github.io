import React, { HtmlHTMLAttributes } from 'react';
import { Section } from '.';
import { Navigation, TOC } from '../TableOfContent';

export const NavSection: React.FC<
  HtmlHTMLAttributes<HTMLElement> & { emoji?: string; toc: TOC[] }
> = ({ title, emoji, children, toc }) => (
  <Section emoji={emoji} title={title}>
    {children}
    <Navigation sections={toc} />
    <hr />
  </Section>
);
