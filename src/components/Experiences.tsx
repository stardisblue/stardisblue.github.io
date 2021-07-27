import React from 'react';
import { Article, A, Links, Section } from './ui';
import { GH, LIRMM, UM } from './URL';

export const Experiences: React.FC = () => (
  <Section title="💼 PROFESSIONAL AND RESEARCH EXPERIENCES">
    <Article
      title={
        <>
          Visual Analytics Ph.D. Student at <UM /> (Montpellier, France)
        </>
      }
    >
      <p>
        <em>
          <time dateTime="2018-07">Jul. 2018</time> - present
        </em>
      </p>
      <p className="measure-wide lh-copy">
        Research on the data visual analysis domain. Development and
        implementation of web applications to analyze spatio-temporal dimensions
        of data and model its relations.
      </p>
    </Article>
    <Article
      title={
        <>
          Visualization Algorithms Researcher at <LIRMM /> (Montpellier, France)
        </>
      }
    >
      <p>
        <em>
          <time dateTime="2018-02">Feb. 2018</time> -{' '}
          <time dateTime="2018-06">Jun. 2018</time>
        </em>{' '}
        — Internship
      </p>
      <p className="measure-wide lh-copy">
        Research, development, and implementation of algorithms for visual
        cluttering reduction, applied to graph visualization.
      </p>
    </Article>
    <Article
      title={
        <>
          Pattern Mining Researcher at <LIRMM>LIRMM</LIRMM> (Montpellier,
          France)
        </>
      }
    >
      <p>
        <em>
          <time dateTime="2017-01">Jan. 2017</time> -{' '}
          <time dateTime="2017">Jul. 2017</time>
        </em>{' '}
        — Internship{' '}
        <Links className="inline-flex">
          <GH gh="jGetMove/jGetMove" className="link" />
        </Links>
      </p>
      <p className="measure-wide lh-copy">
        Development of{' '}
        <A href="https://github.com/jgetmove/jgetmove">jGetMove</A> an efficient
        and unifying spatio-temporal pattern mining system for moving objects.
        <br />
        Refactoring from C++ and improving the algorithm.
      </p>
    </Article>
    <Article
      title={
        <>
          Constraint Programming Researcher at <LIRMM>LIRMM</LIRMM>{' '}
          (Montpellier, France)
        </>
      }
    >
      <p>
        <em>
          <time dateTime="2015-10">Oct. 2015</time> -{' '}
          <time dateTime="2016-07">Jul. 2016</time>
        </em>{' '}
        — Internship{' '}
        <Links className="inline-flex">
          <GH gh="EternityII/EternityII" className="link" />
          <A
            className="link ml2"
            href="https://github.com/EternityII/EternityII-report/blob/master/main.pdf"
            collapsible="PDF"
          >
            Report
          </A>
          <A
            className="link ml2"
            href="https://github.com/EternityII/EternityII-presentation/blob/master/main.pdf"
            collapsible="PPT"
          >
            Presentation
          </A>
        </Links>
      </p>
      <p className="measure-wide lh-copy">
        Development of a solver for a combinatorial puzzle game{' '}
        <A href="https://github.com/EternityII">EternityII</A>. Analysis and
        setup of various solving strategies, some based on pre-calculation of
        simplified instances.
      </p>
    </Article>
    <Article title="Web Developper at WBS (Montpellier, France)">
      <p>
        <em>
          <time dateTime="2015-03">Mar. 2015</time> -{' '}
          <time dateTime="2015-07">Jul. 2015</time>
        </em>{' '}
        — Internship
      </p>
      <p>Online PGI software development.</p>
    </Article>
    <Article title="Data Analyst, Web Developer, Computer Builder">
      <p>
        <em>
          <time dateTime="2012-01">Jan. 2012</time> -{' '}
          <time dateTime="2018-01">Jan. 2018</time>
        </em>{' '}
        — Freelancer
      </p>
    </Article>
    <Article title="ECI : Computer Science Club (Highschool - Lycée Daudet - Nîmes, France)" />
  </Section>
);
