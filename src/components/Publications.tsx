import React from 'react';
import { Authors } from './Authors';
import { Navigation } from './TableOfContent';
import { Article, A, Links, Section, HR, Paragraph } from './ui';
import { DOI, GH } from './URL';

export const Publications: React.FC<{
  title: string;
  content: {
    title: JSX.Element;
    children: JSX.Element;
  }[];
}> = ({ title, content }) => (
  <Section emoji="📄" title={title}>
    {content.map((article, i) => (
      <Article key={i} {...article} />
    ))}
    <Navigation />
    <HR />
  </Section>
);
