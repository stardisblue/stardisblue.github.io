import React from 'react';
import { Article, A, Section } from './ui';
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
  >
    {children}
  </Article>
);

export const Education: React.FC = () => (
  <Section title="🎓 EDUCATION">
    <EduArticle
      title="M.Sc. in Software Architecture, Computer Science"
      time="2018"
    >
      <UM />, France.
    </EduArticle>
    <EduArticle
      title="B.Sc. in Software Architecture, Computer Science"
      time="2016"
    >
      <UM />, France.
    </EduArticle>
    <EduArticle title="Technical degree in Business Computing" time="2015">
      <A
        href="https://iut-montpellier-sete.edu.umontpellier.fr/"
        title="IUT de Montpellier"
      >
        University Institute of Technology of Montpellier
      </A>
      , France.
    </EduArticle>
  </Section>
);
