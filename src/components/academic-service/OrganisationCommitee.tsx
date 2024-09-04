import { MetaData } from '../ui';
import { Heading4, Link } from '../ui/typography';

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
      <Heading4 mt0>
        Extraction et Gestion des Connaissances (EGC) 2021
      </Heading4>
      <div className="prose">
        <p>
          Événement annuel réunissant des chercheurs et praticiens de
          disciplines relevant des sciences des données et des connaissances.
        </p>
      </div>
    </article>
  );
}
