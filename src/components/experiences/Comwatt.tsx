import { Place } from '@/components/Experience';
import { Heading3, Link } from '@/components/ui/typography';
import { MetaData, Keywords } from '../ui';

export function Comwatt() {
  return (
    <article className="max-w-prose">
      <Place>
        <Link href="//www.comwatt.com" iconless>
          Comwatt
        </Link>
        , Montpellier
      </Place>
      <Heading3 mt0>Data Scientist &amp; Full Stack</Heading3>
      <MetaData date={['2023-03', '2024-06']}>
        <Keywords
          children={[
            'R&D',
            'pyspark',
            'airflow',
            'python',
            'gcloud',
            'react',
            'spring',
            'java',
          ]}
        />
      </MetaData>
      <div className="prose">
        <p>
          Améliorer l'intelligence de prédiction et d'optimisation de la
          consommation électrique. <br />
          Veille scientifique en data. Encadrement d'une ingénieure data.
        </p>
      </div>
    </article>
  );
}
