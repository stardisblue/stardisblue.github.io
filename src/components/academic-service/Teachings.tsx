import { UM } from '@/components/places';
import { Link, MetaData } from '@/components/ui/';

export function Teachings() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-none lg:auto-cols-[minmax(max-content,_1fr)] lg:grid-flow-col lg:grid-rows-1 lg:snap-x lg:snap-mandatory lg:overflow-x-auto gap-4 lg:pb-4">
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData date={['2020', '2021']} dateFormat="y" place={Polytech} />
        <h4 className="mt-0">WOA (Web Oriented Architecture)</h4>
        <div className="prose">
          <p>Cursus : DevOps (DO3) &amp; Informatique (IG4)</p>
        </div>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData date={['2019', '2020']} dateFormat="y" place={Polytech} />
        <h4 className="mt-0">WOA (Web Oriented Architecture)</h4>
        <div className="prose">
          <p>Cursus : Informatique (IG4)</p>
        </div>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData date={['2019', '2021']} dateFormat="y" place={IUTBeziers} />
        <h4 className="mt-0">Introduction to Web</h4>
        <div className="prose">
          <p>Cursus : DUT 2ième année</p>
        </div>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData date={['2018', '2019']} dateFormat="y" place={<UM />} />
        <h4 className="mt-0">Science des données</h4>
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
