import {
  DoiLink,
  GithubLink,
  HalLink,
  Link,
  MetaData,
  Place,
} from '@/components/ui/';
import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';

export function Publications() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <article className="lg:border-l-2 lg:pl-4">
        <MetaData date="2024" dateFormat="y">
          <PubliCode title="journal">[j]</PubliCode>{' '}
          <HalLink href="lirmm-04658031">lirmm-04658031</HalLink>{' '}
          <DoiLink href="10.1177/14604582241279720">
            10.1177/14604582241279720
          </DoiLink>
        </MetaData>
        <h4 className="mt-0">
          Epid Data Explorer: A Visualization Tool for Exploring and Comparing
          Spatio-Temporal Epidemiological Data
        </h4>
        <p>
          Laëtitia Viau, Jérôme Azé, <strong>Fati Chen</strong>, Pierre
          Pompidor, Pascal Poncelet, Vincent Raveneau, Nancy Rodriguez, Arnaud
          Sallaberry. <em>Health Informatics Journal</em>, 2024;30(3).
        </p>
      </article>
      <article className="lg:border-l-2 lg:pl-4">
        <MetaData date="2023-06">
          <PubliCode title="poster">[p]</PubliCode>{' '}
          <HalLink href="lirmm-04286339">lirmm-04286339</HalLink>
        </MetaData>
        <h4 className="mt-0">
          Joint transcriptome and translatome analysis: a reproducible pipeline
        </h4>
        <p>
          Julie Ripoll, <strong>Fati Chen</strong>, Céline Mandier, Eric Rivals.{' '}
          <em>
            23es Journées Ouvertes en Biologie, Informatique et Mathématiques (
            <Link href="https://jobim2023.sciencesconf.org/">JOBIM 2023</Link>)
          </em>
          , Nice, France. Jun 2023.
        </p>
      </article>
      <article className="lg:border-l-2 lg:pl-4">
        <MetaData date="2020" dateFormat="y">
          <PubliCode title="journal">[j]</PubliCode>{' '}
          <Link href="https://agorajs.github.io/" icon>
            agorajs.github.io
          </Link>{' '}
          <GithubLink href="agorajs">AGORAjs</GithubLink>{' '}
          <HalLink href="lirmm-02879677">lirmm-02879677</HalLink>{' '}
          <DoiLink href="10.7155/jgaa.00532">10.7155/jgaa.00532</DoiLink>
        </MetaData>
        <h4 className="mt-0">
          Node Overlap Removal Algorithms: An Extended Comparative Study
        </h4>
        <p>
          <strong>Fati Chen</strong>, Laurent Piccinini, Pascal Poncelet, Arnaud
          Sallaberry.{' '}
          <em>
            Journal of Graph Algorithms and Applications (
            <Link
              href="https://jgaa.info"
              title="Journal of Graph Algorithms and Applications"
            >
              JGAA
            </Link>
            )
          </em>
          , 24(4): 683-706. 2020.
        </p>
      </article>
      <article className="lg:border-l-2 lg:pl-4">
        <MetaData date="2019-09">
          <PubliCode title="conference">[c]</PubliCode>{' '}
          <Place>Průhonice/Prague, Tchéquie</Place>{' '}
          <HalLink href="hal-02302617">hal-02302617</HalLink>{' '}
          <DoiLink href="10.1007/978-3-030-35802-0_14">
            10.1007/978-3-030-35802-0_14
          </DoiLink>
        </MetaData>
        <h4 className="mt-0">
          Node Overlap Removal Algorithms: A Comparative Study
        </h4>
        <p>
          <strong>Fati Chen</strong>, Laurent Piccinini, Pascal Poncelet, Arnaud
          Sallaberry.{' '}
          <em>
            Proceedings of the 27th International Symposium on Graph Drawing and
            Network Visualization (
            <Link
              href="https://kam.mff.cuni.cz/gd2019/"
              title="Graph Drawing and Network Visualization"
            >
              GD 2019
            </Link>
            )
          </em>
          , Průhonice/Prague, Tchéquie. Sept. 2019.
        </p>
      </article>
      <article className="lg:border-l-2 lg:pl-4">
        <MetaData date="2019" dateFormat="y">
          <PubliCode title="software">[s]</PubliCode>{' '}
          <GithubLink href="jGetMove/jGetMove">jGetMove</GithubLink>{' '}
          <HalLink href="lirmm-02137577">lirmm-02137577</HalLink>
        </MetaData>
        <h4 className="mt-0">jGetMove: Mining Multiple Movement Patterns</h4>
        <p>
          <strong>Fati Chen</strong>, Nhat Hai Phan, Pascal Poncelet, Maguelonne
          Teisseire
        </p>
      </article>
    </div>
  );
}

function PubliCode({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <code
      className={classNames(
        'before:content-none',
        'after:content-none',
        className
      )}
      {...props}
    />
  );
}
