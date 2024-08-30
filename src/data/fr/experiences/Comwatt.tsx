import { Experience } from '@/components/Experience';
import { Link } from '@/components/ui/typography';

export function Comwatt() {
  return (
    <Experience
      title="Data Scientist &amp; Full Stack"
      place={
        <>
          <Link href="//www.comwatt.com" iconless>
            Comwatt
          </Link>
          , Montpellier
        </>
      }
      dates={['2023-03', '2024-06']}
      keywords={[
        'R&D',
        'pyspark',
        'airflow',
        'python',
        'gcloud',
        'react',
        'spring',
        'java',
      ]}
    >
      <p>
        Améliorer l'intelligence de prédiction et d'optimisation de la
        consommation électrique. <br />
        Veille scientifique en data. Encadrement d'une ingénieure data.
      </p>
    </Experience>
  );
}
