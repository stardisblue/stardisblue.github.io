import { Keywords, Link, MetaData } from '@/components/ui';
import { Place } from '../Experience';

export function Comwatt() {
  return (
    <article className="max-w-prose">
      <Place>
        <Link href="//www.comwatt.com">Comwatt</Link>, Montpellier
      </Place>
      <h3 className="mt-0">Data Scientist &amp; Full Stack</h3>
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
      <p>
        Améliorer l'intelligence de prédiction et d'optimisation de la
        consommation électrique. <br />
        Veille scientifique en data. Encadrement d'une ingénieure data.
      </p>
    </article>
  );
}
