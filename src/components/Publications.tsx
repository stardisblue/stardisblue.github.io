import React from 'react';
import { Article, A, Links, Section } from './ui';
import { DOI, GH } from './URL';

export const Publications: React.FC = () => (
  <Section title="📄 PUBLICATIONS">
    <Article
      title={
        <A href="https://agorajs.github.io/">
          Node Overlap Removal Algorithms: an Extended Comparative Study
        </A>
      }
    >
      <p className="measure-wide">
        <strong>Fati CHEN</strong>, Laurent Piccinini, Pascal Poncelet, Arnaud
        Sallaberry. <em>Journal of Graph Algorithms and Applications (JGAA)</em>
        , 24(4): 683-706. <time dateTime="2020">2020</time>. doi:
        <DOI doi="10.7155/jgaa.00532" />
      </p>
      <Links>
        <A
          className="link"
          href="https://hal-lirmm.ccsd.cnrs.fr/lirmm-02879677"
          collapsible="PDF"
          children="hal: lirmm-02879677"
        />
        <GH gh="agorajs" className="link ml2" />
        <A
          href="https://agorajs.github.io/"
          className="link ml2"
          collapsible="Globe"
        >
          agorajs.github.io
        </A>
      </Links>
    </Article>
    <Article
      title={
        <A href="https://hal-lirmm.ccsd.cnrs.fr/hal-02302617">
          Node Overlap Removal Algorithms: A Comparative Study
        </A>
      }
    >
      <p className="measure-wide">
        <strong>Fati CHEN</strong>, Laurent Piccinini, Pascal Poncelet, Arnaud
        Sallaberry.{' '}
        <em>
          In Proceedings of the 27th International Symposium on Graph Drawing
          and Network Visualization
        </em>
        , Průhonice/Prague, Czech Republic,{' '}
        <time dateTime="2019-09">September 2019</time>. doi:
        <DOI doi="10.1007/978-3-030-35802-0_14" />
      </p>
      <Links>
        <A
          className="link"
          href="https://hal-lirmm.ccsd.cnrs.fr/hal-02302617"
          collapsible="PDF"
          children="hal: hal-02302617"
        />
      </Links>
    </Article>
    <Article
      title={
        <A href="https://hal-lirmm.ccsd.cnrs.fr/lirmm-02137577">
          JGetMove: Mining Multiple Movement Patterns
        </A>
      }
    >
      <p className="measure-wide">
        <strong>Fati CHEN</strong>, Nhat Hai Phan, Pascal Poncelet, Maguelonne
        Teisseire. <time dateTime="2019">2019</time>.
      </p>
      <Links>
        <A
          className="link"
          href="https://hal-lirmm.ccsd.cnrs.fr/lirmm-02137577"
          collapsible="PDF"
          children="hal: lirmm-02137577"
        />
        <GH gh="jGetMove/jGetMove" className="link ml2" />
      </Links>
    </Article>
  </Section>
);
