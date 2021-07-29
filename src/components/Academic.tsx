import React from 'react';
import { Navigation } from './TableOfContent';
import { Article, A, Section, HR, Paragraph } from './ui';
import { Polytech, UM } from './URL';

export const Academic: React.FC = () => (
  <Section title="👨‍🏫 ACADEMIC SERVICES">
    <Article title="Organization Committee" attrs={{ className: 'noprint' }}>
      <Paragraph>
        <A href="https://egc2021.sciencesconf.org/">EGC 2021</A>, Extraction et
        Gestion des Connaissances <time dateTime="2021">2021</time>.
      </Paragraph>
    </Article>
    <Article title="Teachings">
      <Paragraph>
        <strong>Web Oriented Architecture</strong>, DevOps (DO3) & C.S. (IG3)
        3rd year students. <Polytech />, France.{' '}
        <time dateTime="2020">2020</time>-<time dateTime="2021">2021</time>
      </Paragraph>
      <Paragraph>
        <strong>Web Oriented Architecture</strong>, C.S. 4th year students
        (IG4). <Polytech />, France. <time dateTime="2019">2019</time>-
        <time dateTime="2020">2020</time>
      </Paragraph>
      <Paragraph>
        <strong>Introduction to Web</strong>, C.S. 2nd year students.{' '}
        <A href="https://www.iutbeziers.fr/">
          University Institute of Technology, Béziers
        </A>
        , France. <time dateTime="2019">2019</time>-
        <time dateTime="2021">2021</time>
      </Paragraph>
      <Paragraph>
        <strong>Data Science</strong>, M.Sc. 1st year students. <UM />, France.{' '}
        <time dateTime="2018">2018</time>-<time dateTime="2019">2019</time>
      </Paragraph>
    </Article>
    <Navigation />
    <HR />
  </Section>
);
