import React from 'react';
import { A, Article, Section } from './ui';
import { UM } from './URL';

export const Education: React.FC = () => (
  <Section title="🎓 EDUCATION">
    <Article
      title={
        <>
          M.Sc. in Software Architecture, Computer Science —{' '}
          <time dateTime="2018">2018</time>
        </>
      }
    >
      <UM>University of Montpellier</UM>, France.
    </Article>
    <Article
      title={
        <>
          B.Sc. in Software Architecture, Computer Science —{' '}
          <time dateTime="2016">2016</time>
        </>
      }
    >
      <UM>University of Montpellier</UM>, France.
    </Article>
    <Article
      title={
        <>
          Technical degree in Business Computing —{' '}
          <time dateTime="2015">2015</time>
        </>
      }
    >
      <A
        href="https://iut-montpellier-sete.edu.umontpellier.fr/"
        title="IUT de Montpellier"
      >
        University Institute of Technology of Montpellier
      </A>
      , France.
    </Article>
  </Section>
);
