import { Place } from '@/components/Experience';
import { Link } from '@/components/ui/typography';
import { MetaData, Keywords } from '../ui';

export function IndepMood() {
  return (
    <article className="max-w-prose">
      <Place>Montpellier</Place>
      <h3>Indépendant – Data scientist & Full Stack</h3>
      <MetaData date={['2022-06', 'présent']}>
        <Keywords
          children={[
            'R&D',
            'Data Viz',
            'Data Science',
            'react',
            'svelte',
            'D3',
          ]}
        />
      </MetaData>
      <div className="prose">
        <p>
          Notamment: aide à la détection d'anomalies en épidemiologie (projet
          européen{' '}
          <Link href="//mood-h2020.eu/epidemic-intelligence-data-and-vizualisation/">
            MOOD
          </Link>
          ).
        </p>
      </div>
    </article>
  );
}
