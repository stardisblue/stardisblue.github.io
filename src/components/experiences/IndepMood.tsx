import { Link, MetaData, Place, Tags } from '@/components/ui';

export function IndepMood() {
  return (
    <article className="max-w-prose">
      <h3>Indépendant – Data scientist & Full Stack</h3>
      <Place>Montpellier</Place>
      <MetaData date={['2022-06', 'présent']}>
        <Tags>R&D, Data Viz, Data Science, react, svelte, D3</Tags>
      </MetaData>
      <p>
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
    </article>
  );
}
