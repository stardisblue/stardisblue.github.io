import React from 'react';
import { Navigation } from './TableOfContent';
import { Article, A, Section, HR, Paragraph } from './ui';
import { UM } from './URL';

export const EduArticle: React.FC<{ title: React.ReactNode; time: string }> = ({
  title,
  time,
  children,
}) => (
  <Article
    title={
      <>
        {title} — <time dateTime={time}>{time}</time>
      </>
    }
    titleSize="f5--print"
  >
    <Paragraph>{children}</Paragraph>
  </Article>
);

export const Education: React.FC<{
  title: string;
  content: { title: string; time: string; children: JSX.Element }[];
}> = ({ title, content }) => (
  <Section emoji="🎓" title={title}>
    {content.map((edu, i) => (
      <EduArticle key={i} {...edu} />
    ))}
    <Navigation />
    <HR />
  </Section>
);
