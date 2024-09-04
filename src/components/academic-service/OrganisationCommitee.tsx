import { Link, MetaData } from '@/components/ui/';

export function OrganisationCommitee() {
  return (
    <article>
      <MetaData date="2021-01">
        <Link
          href="https://egc2021.sciencesconf.org/"
          title="Extraction et Gestion des Connaissances 2021"
        >
          EGC 2021
        </Link>
      </MetaData>
      <h4 className="mt-0">
        Extraction et Gestion des Connaissances (EGC) 2021
      </h4>
      <p>
        Événement annuel réunissant des chercheurs et praticiens de disciplines
        relevant des sciences des données et des connaissances.
      </p>
    </article>
  );
}
