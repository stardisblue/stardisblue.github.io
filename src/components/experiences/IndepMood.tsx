import { ExperienceMetaData, Place } from '@/components/Experience';
import { Heading3, Link } from '@/components/ui/typography';

export function IndepMood() {
  return (
    <article className="max-w-prose">
      <Place>Montpellier</Place>
      <Heading3>Indépendant – Data scientist & Full Stack</Heading3>
      <ExperienceMetaData
        dates={['2022-06', 'présent']}
        keywords={['R&D', 'Data Viz', 'Data Science', 'react', 'svelte', 'D3']}
      />
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
