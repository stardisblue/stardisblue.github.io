import React from 'react';
import { Navigation } from './TableOfContent';
import { Article, A, Links, Section, HR, Paragraph } from './ui';
import { GH, LIRMM, UM } from './URL';

export const Experiences: React.FC<{
  title: string;
  articles: {
    title: JSX.Element | string;
    children?: JSX.Element;
  }[];
}> = ({ title, articles }) => (
  <Section emoji="💼" title={title}>
    {articles.map((article, i) => (
      <Article key={i} {...article} />
    ))}
    <Navigation />
    <HR />
  </Section>
);
