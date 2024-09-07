import { Link, MetaData, Place, Tags } from '@/components/ui';
import indepMoodImage from './indepmood_dashboard.png';
import ExportedImage from 'next-image-export-optimizer';
export function IndepMood() {
  return (
    <article>
      <h3 className="max-w-prose">Indépendant – Data scientist & Full Stack</h3>
      <div className="md:grid md:justify-start md:gap-x-4">
        <Place>Montpellier</Place>
        <MetaData
          className="md:col-span-2 lg:col-span-1"
          date={['2022-06', 'présent']}
        >
          <Tags>R&D, Data Viz, Data Science, react, svelte, D3</Tags>
        </MetaData>
        <figure className="max-w-96 block md:my-0 lg:row-span-4 md:row-start-2 lg:row-start-1 md:col-start-2">
          <ExportedImage
            className="md:h-32 md:w-auto"
            alt="Image représentant le dashboard EDE"
            src={indepMoodImage}
          />
          <figcaption>fig. : Dashboard EDE</figcaption>
        </figure>
        <p className="md:my-0 max-w-prose">
          Notamment: aide à la détection d'anomalies en épidemiologie (projet
          européen{' '}
          <Link
            href="//mood-h2020.eu/epidemic-intelligence-data-and-vizualisation/"
            icon
          >
            MOOD
          </Link>
          ).
        </p>
      </div>
    </article>
  );
}
