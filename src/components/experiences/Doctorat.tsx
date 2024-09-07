import {
  GithubLink,
  Link,
  Links,
  MetaData,
  Place,
  Tags,
} from '@/components/ui';
import { Document, Presentation } from '@/components/ui/icons';
import { Lirmm } from '../places';
import ExportedImage from 'next-image-export-optimizer';

import prosovisImage from './doctorat_prosovis.png';
import agoraImage from './doctorat_agora.png';
import fsacImage from './doctorat_fsac.png';
export function Doctorat() {
  return (
    <article>
      <h3 className="max-w-prose">
        Doctorat en Data Science &amp; Data Visualisation
      </h3>
      <Place>
        <Lirmm city />
      </Place>
      <MetaData date={['2018-09', '2022-06']}>
        <Links links={[<Thesis />, <Soutenance />]} />{' '}
        <Tags>R&D, Data Science, Data Viz, Web</Tags>
      </MetaData>
      <p className="max-w-prose">
        Recherche dans le domaine de la visualisation analytique axée autour de
        trois thématiques :
      </p>
      <div className="lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <h4 className="md:mt-0 max-w-prose">
            ProsoVis : plateforme de visualisation analytique
          </h4>
          <small className="metadata mb-1 block">
            <GithubLink href="stardisblue/prosovis">Prosovis</GithubLink>
          </small>

          <figure>
            <ExportedImage
              className="aspect-video object-contain"
              alt="Dashboard Prosovis"
              src={prosovisImage}
            />
            <figcaption>fig. : aperçu du dashboard</figcaption>
          </figure>
          <p className="md:mb-0 max-w-prose">
            Plateforme web de visualisation analytique de données
            prosopographiques.
          </p>
        </div>
        <div>
          <h4 className="md:mt-0 max-w-prose">
            AGORA : comparaison de méthode de graph drawing
          </h4>
          <small className="metadata mb-1 block">
            <Link href="//agorajs.github.io" icon>
              AGORA
            </Link>
          </small>
          <figure>
            <ExportedImage
              className="aspect-video object-contain"
              alt="AGORAjs: page de résultats"
              src={agoraImage}
            />
            <figcaption>fig. : aperçu de la page des résultats</figcaption>
          </figure>
          <p className="md:mb-0 max-w-prose">
            Analyse comparative des différents algorithmes de placement de
            graphes.
          </p>
        </div>
        <div>
          <h4 className="md:mt-0 max-w-prose">
            FSAC : agglomération de données spatiales
          </h4>
          <small className="metadata mb-1 block">
            <GithubLink href="stardisblue/fsac">FSAC</GithubLink>
          </small>
          <figure>
            <ExportedImage
              className="aspect-video object-contain"
              alt="Exemple d'agglomération de données"
              src={fsacImage}
            />
            <figcaption>fig. : exemple d'agglomération</figcaption>
          </figure>
          <p className="md:mb-0 max-w-prose">
            Agglomération spatiale pour la visualisation de grand volumes de
            données en temps réel.
          </p>
        </div>
      </div>
    </article>
  );
}

export function Soutenance() {
  return (
    <Link
      href="//stardisblue.github.io/thesis-presentation"
      icon={Presentation}
    >
      Soutenance
    </Link>
  );
}

export function Thesis() {
  return (
    <Link href="//hal-lirmm.ccsd.cnrs.fr/tel-03840977" icon={Document}>
      Thèse
    </Link>
  );
}
