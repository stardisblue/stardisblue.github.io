import { Time, Place } from '@/components/ui';
import { Link } from '@/components/ui/typography';
import { UM } from './places';

function EducationMetaData({
  date,
  place,
}: {
  date: string;
  place: React.ReactNode;
}) {
  return (
    <small>
      <i>
        <Time date={date} form="y" />
      </i>{' '}
      <Place>{place}</Place>
    </small>
  );
}

export function Educations() {
  return (
    <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-none lg:auto-cols-[minmax(max-content,_1fr)] lg:grid-flow-col lg:grid-rows-1 lg:snap-x lg:snap-mandatory lg:overflow-x-auto gap-4">
      <article className="sm:border-l-2 sm:pl-4">
        <EducationMetaData date="2022" place={<UM />} />
        <h3 className="mt-0">Doctorat Informatique</h3>
        <h4 className="mt-0">Data visualisation &amp; Data science</h4>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <EducationMetaData date="2018" place={<UM />} />
        <h3 className="mt-0">Master Informatique</h3>
        <h4 className="mt-0">Architecture logicielle</h4>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <EducationMetaData date="2016" place={<UM />} />
        <h3 className="mt-0">Licence Informatique</h3>
        <h4 className="mt-0">Architecture logicielle</h4>
      </article>
      <article className="sm:border-l-2 sm:pl-4">
        <EducationMetaData
          date="2015"
          place={
            <Link
              href="https://iut-montpellier-sete.edu.umontpellier.fr/"
              title="Institut Universitaire de Technologie de Montpellier"
              iconless
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
