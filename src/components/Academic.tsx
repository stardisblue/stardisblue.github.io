import React from 'react';
import { Article, Link, Section } from './ui';
import { Polytech, UM } from './URL';

export const Academic: React.FC = () => (
  <Section title="👨‍🏫 ACADEMIC SERVICES">
    <Article title="Organization Committee">
      <p className="measure-wide">
        <Link href="https://egc2021.sciencesconf.org/">EGC 2021</Link>,
        Extraction et Gestion des Connaissances{' '}
        <time dateTime="2021">2021</time>.
      </p>
    </Article>
    <Article title="Teachings">
      <p className="measure-wide">
        <strong>Web Oriented Architecture</strong>, DevOps (DO3) & C.S. (IG3)
        3rd year students. <Polytech />, France.{' '}
        <time dateTime="2020">2020</time>-<time dateTime="2021">2021</time>
      </p>
      <p className="measure-wide">
        <strong>Web Oriented Architecture</strong>, C.S. 4th year students
        (IG4). <Polytech />, France. <time dateTime="2019">2019</time>-
        <time dateTime="2020">2020</time>
      </p>
      <p className="measure-wide">
        <strong>Introduction to Web</strong>, C.S. 2nd year students.{' '}
        <Link href="https://www.iutbeziers.fr/">
          University Institute of Technology, Béziers
        </Link>
        , France. <time dateTime="2019">2019</time>-
        <time dateTime="2021">2021</time>
      </p>
      <p className="measure-wide">
        <strong>Data Science</strong>, M.Sc. 1st year students. <UM />, France.{' '}
        <time dateTime="2018">2018</time>-<time dateTime="2019">2019</time>
      </p>
    </Article>
  </Section>
);
