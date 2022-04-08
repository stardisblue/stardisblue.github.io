import React from 'react';
import { Navigation } from './TableOfContent';
import { Article, Section, A, HR, Paragraph } from './ui';
import { LIRMM } from './URL';

export const Presentations: React.FC<{
  title: string;
  content: { title: string; children: JSX.Element }[];
}> = ({ title, content }) => (
  <Section emoji="🖥️" title={title}>
    {content.map((article, i) => (
      <Article key={i} {...article} />
    ))}
    <Navigation />
    <HR />
  </Section>
);
