import React from 'react';
import { A, Article, Collapsible, Links, Section } from './ui';
import { DOI, GH, HAL } from './URL';
import { PDF, Globe } from './icons';

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
        {(className) => (
          <>
            <HAL hal="lirmm-02879677" className={className}>
              <Collapsible title="hal: lirmm-02879677">
                <PDF />
              </Collapsible>
            </HAL>
            <GH gh="agorajs" className={className} />
            <A href="https://agorajs.github.io/" className={className}>
              <Collapsible title="agorajs.github.io">
                <Globe />
              </Collapsible>
            </A>
          </>
        )}
      </Links>
    </Article>
    <Article
      title={
        <HAL hal="hal-02302617">
          Node Overlap Removal Algorithms: A Comparative Study
        </HAL>
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
        {(className) => (
          <HAL hal="hal-02302617" className={className}>
            <Collapsible title="hal: hal-02302617">
              <PDF />
            </Collapsible>
          </HAL>
        )}
      </Links>
    </Article>
    <Article
      title={
        <HAL hal="lirmm-02137577">
          JGetMove: Mining Multiple Movement Patterns
        </HAL>
      }
    >
      <p className="measure-wide">
        <strong>Fati CHEN</strong>, Nhat Hai Phan, Pascal Poncelet, Maguelonne
        Teisseire. <time dateTime="2019">2019</time>.
      </p>
      <Links>
        {(cls) => (
          <>
            <HAL hal="lirmm-02137577" className={cls}>
              <Collapsible title="hal: lirmm-02137577">
                <PDF />
              </Collapsible>
            </HAL>
            <GH gh="jGetMove/jGetMove" className={cls} />
          </>
        )}
      </Links>
    </Article>
  </Section>
);
