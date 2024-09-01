import { Experience } from '@/components/Experience';
import { Link, GithubLink } from '@/components/ui/typography';
import { Document, Presentation } from '@/components/ui/typography/icons';
import { Lirmm } from '../places';

export function Doctorat() {
  return (
    <Experience
      title="Doctorat en Data Science &amp; Data Visualisation"
      place={<Lirmm city />}
      dates={['2018-09', '2022-06']}
      links={[<Thesis />, <Soutenance />]}
      keywords={['R&D', 'Data Science', 'Data Viz', 'Web']}
    >
      <p>
        Recherche dans le domaine de la visualisation analytique axée autour de
        trois thématiques:
      </p>
      <ol>
        <li>réduction de l'encombrement visuel</li>
        <li>agglomération spatiale d'entités et</li>
        <li>représentations interactives de données spatio-temporelles.</li>
      </ol>
      <p>
        <GithubLink href="stardisblue/prosovis">Prosovis</GithubLink> :
        plateforme web de visualisation analytique de données prosopographiques.
      </p>
      <p>
        <Link href="//agorajs.github.io">AGORA</Link> : analyse comparative des
        différents algorithmes de placement de graphes.
      </p>
      <p>
        <GithubLink href="stardisblue/fsac">FSAC</GithubLink> : agglomération
        spatiale pour la visualisation de grand volumes de données en temps
        réel.
      </p>
    </Experience>
  );
}

function Soutenance() {
  return (
    <Link
      href="//stardisblue.github.io/thesis-presentation"
      icon={Presentation}
    >
      Soutenance
    </Link>
  );
}

function Thesis() {
  return (
    <Link href="//hal-lirmm.ccsd.cnrs.fr/tel-03840977" icon={Document}>
      Thèse
    </Link>
  );
}
