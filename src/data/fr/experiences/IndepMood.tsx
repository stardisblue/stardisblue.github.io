import { Experience } from '@/components/Experience';
import { Link } from '@/components/ui/typography';

export function IndepMood() {
  return (
    <Experience
      title="Indépendant – Data scientist & Full Stack"
      place="Montpellier"
      dates={['2022-06', 'présent']}
      keywords={['R&D', 'Data Viz', 'Data Science', 'react', 'svelte', 'D3']}
    >
      <p>
        Notamment: aide à la détection d'anomalies en épidemiologie (projet
        européen{' '}
        <Link href="//mood-h2020.eu/epidemic-intelligence-data-and-vizualisation/">
          MOOD
        </Link>
        ).
      </p>
    </Experience>
  );
}
