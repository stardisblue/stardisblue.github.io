import { Link, MetaData, Place, Tags } from '@/components/ui';

export function Comwatt() {
  return (
    <article>
      <div className="max-w-prose">
        <h3 className="mt-0">Data Scientist &amp; Full Stack</h3>
        <Place>
          <Link href="//www.comwatt.com">Comwatt</Link>, Montpellier
        </Place>
        <MetaData date={['2023-03', '2024-06']}>
          <Tags>R&D, TDD, clean-archi, CI/CD, docker, kubernetes, gcloud</Tags>
        </MetaData>
        <p>
          Améliorer l'intelligence de prédiction et d'optimisation de la
          consommation électrique. <br />
          Veille scientifique en data. Encadrement d'une ingénieure data.
        </p>
        <p>
          Gestion et l'analyse des données temps-réel et batch pour garantir
          l'efficacité et la robustesse de toute stack data. L'objectif est de
          garantir le traitement de plus de 30k mesures/min et le bon
          déroulement des processus data quotidiens pour plus de 15000 foyers
          francais.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-4">
        <div>
          <h4 className="mt-0">Data Science</h4>
          <div className="metadata">
            <small>
              <Tags>airflow, pyspark, kafka, python, ELK</Tags>
            </small>
          </div>
          <ul className="mb-0">
            <li>Conception de pipelines d'analyse</li>
            <li>Conception d'algorithmes de machine learning</li>
            <li>Mise en place de process et bonnes pratiques CI/CD</li>
            <li>
              Mise en place d'une stratégie de stockage de données en
              architecture médaillon.
            </li>
            <li>
              Ajout de mécanismes de résilience en cas d'indisponibilité de
              données covariantes.
            </li>
            <li>Mise en place de briques de surveillance et de monitoring</li>
          </ul>
        </div>
        <div>
          <h4 className="lg:mt-0">FullStack</h4>
          <div className="metadata">
            <small>
              <Tags>react, spring, java</Tags>
            </small>
          </div>
          <ul className="mb-0">
            <li>Unification de deux front-end react en un seul</li>
            <li>Intégration des entrées-sorties liées à la datascience</li>
            <li>Gestion multilingue front (i18n)</li>
            <li>Développement de nouvelles briques fonctionnelles</li>
          </ul>
        </div>
      </div>
    </article>
  );
}
