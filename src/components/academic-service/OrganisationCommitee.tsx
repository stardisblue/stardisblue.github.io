import { Time } from '../ui';
import { Heading4, Link } from '../ui/typography';

export function OrganisationCommitee() {
  return (
    <article>
      <small>
        <i>
          <Time date="2021-01" />
        </i>{' '}
        <Link
          href="https://egc2021.sciencesconf.org/"
          title="Extraction et Gestion des Connaissances 2021"
        >
          EGC 2021
        </Link>
      </small>
      <Heading4 mt0>
        Extraction et Gestion des Connaissances (EGC) 2021
      </Heading4>
      <div className="prose">
        <p>
          La conférence est un événement annuel réunissant des chercheurs et
          praticiens de disciplines relevant des sciences des données et des
          connaissances.
        </p>
      </div>
    </article>
  );
}
