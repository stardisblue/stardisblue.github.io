import { UM } from '../places';
import { ArticleMetaData } from '../ui';
import { Heading4, Link } from '../ui/typography';

export function Teachings() {
  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-none lg:auto-cols-[minmax(max-content,_1fr)] lg:grid-flow-col lg:grid-rows-1 lg:snap-x lg:snap-mandatory lg:overflow-x-auto gap-4">
      <article className="sm:border-l-2 sm:pl-4">
        <ArticleMetaData
          date={['2020', '2021']}
          dateFormat="y"
          place={Polytech}
        />
        <Heading4 mt0>WOA (Web Oriented Architecture)</Heading4>
        <div className="prose">
          <p>Cursus : DevOps (DO3) &amp; Informatique (IG4)</p>
        </div>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <ArticleMetaData
          date={['2019', '2020']}
          dateFormat="y"
          place={Polytech}
        />
        <Heading4 mt0>WOA (Web Oriented Architecture)</Heading4>
        <div className="prose">
          <p>Cursus : Informatique (IG4)</p>
        </div>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <ArticleMetaData
          date={['2019', '2021']}
          dateFormat="y"
          place={IUTBeziers}
        />
        <Heading4 mt0>Introduction to Web</Heading4>
        <div className="prose">
          <p>Cursus : DUT 2ième année</p>
        </div>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <ArticleMetaData
          date={['2018', '2019']}
          dateFormat="y"
          place={<UM />}
        />
        <Heading4 mt0>Science des données</Heading4>
        <div className="prose">
          <p>Cursus : Master 1 DÉCOL</p>
        </div>
      </article>
    </div>
  );
}

const IUTBeziers = (
  <Link
    href="https://www.iutbeziers.fr/"
    title="Institut Universitaire de Technologie de Béziers"
    iconless
  >
    IUT de Béziers
  </Link>
);

const Polytech = (
  <Link href="https://www.polytech.umontpellier.fr/" iconless>
    Polytech Montpellier
  </Link>
);
