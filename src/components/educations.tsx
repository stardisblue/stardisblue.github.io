import { Link, MetaData } from './ui';
import { UM } from './places';

export function Educations() {
  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-none lg:auto-cols-[minmax(max-content,_1fr)] lg:grid-flow-col lg:grid-rows-1 lg:snap-x lg:snap-mandatory lg:overflow-x-auto gap-4">
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData date="2022" dateFormat="y" place={<UM />} />
        <h3 className="mt-0">Doctorat Informatique</h3>
        <h4 className="mt-0">Data visualisation &amp; Data science</h4>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData date="2018" dateFormat="y" place={<UM />} />
        <h3 className="mt-0">Master Informatique</h3>
        <h4 className="mt-0">Architecture logicielle</h4>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData date="2016" dateFormat="y" place={<UM />} />
        <h3 className="mt-0">Licence Informatique</h3>
        <h4 className="mt-0">Architecture logicielle</h4>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <MetaData
          date="2015"
          dateFormat="y"
          place={
            <Link
              href="https://iut-montpellier-sete.edu.umontpellier.fr/"
              title="Institut Universitaire de Technologie de Montpellier"
            >
              IUT de Montpellier
            </Link>
          }
        />
        <h3 className="mt-0">DUT Informatique</h3>
        <h4 className="mt-0">Informatique de gestion</h4>
      </article>
    </div>
  );
}
