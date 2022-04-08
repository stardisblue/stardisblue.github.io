import React from 'react';
import { Navigation } from './TableOfContent';
import { Article, A, Section, HR, Paragraph } from './ui';
import { Polytech, UM } from './URL';

export const Academic: React.FC<{
  title: string;
  content: {
    title: string;
    attrs?: any;
    children: JSX.Element;
  }[];
}> = ({ title, content }) => (
  <Section emoji="👨‍🏫" title={title}>
    {content.map((article, i) => (
      <Article key={i} {...article} />
    ))}
    <Navigation />
    <HR />
  </Section>
);
