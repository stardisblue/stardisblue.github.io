import { GithubLink, Links, MetaData, Place, Tags } from '@/components/ui';
import { Document, Presentation } from '@/components/ui/icons';
import { Lirmm } from '../places';
import ExportedImage from 'next-image-export-optimizer';
import eternityImage from './stages_eternity.png';
import jgetmoveImage from './stages_jgetmove.png';
import agoraImage from './stages_agora.png';

export function StagesRecherche() {
  return (
    <article>
      <h3>Projets de recherche</h3>
      <Place>
        <Lirmm />
      </Place>
      <article>
        <h4 className="mt-0 max-w-prose">
          Conception d'algorithmes de dessin de graphes
        </h4>
        <div className="md:grid md:justify-start md:gap-x-4">
          <MetaData
            className="md:col-span-2 lg:col-span-1"
            date={['2018-02', '2018-06']}
          >
            <Links links={[<GithubLink href="agorajs">Agorajs</GithubLink>]} />{' '}
            <Tags>Web, Stats, Graph Drawing</Tags>
          </MetaData>
          <figure className="max-w-96 md:my-0 lg:row-span-3 md:row-start-2 lg:row-start-1 md:col-start-2">
            <ExportedImage
              className="md:max-h-32 md:w-auto"
              alt="Image représentant un dessin de graphe"
              src={agoraImage}
            />
            <figcaption>fig. : dessin de graphe</figcaption>
          </figure>
          <p className="md:my-0 max-w-prose">
            Recherche, conception et implémentation d'algorithmes de réduction
            d'encombrement visuels, appliqués à la visualisation de graphes.
          </p>
        </div>
      </article>
      <article>
        <h4 className="max-w-prose">
          Développement d'algorithmes d'extraction de motifs spatio-temporels
        </h4>
        <div className="md:grid md:justify-start md:gap-x-4">
          <MetaData
            className="md:col-span-2 lg:col-span-1"
            date={['2017-01', '2017-07']}
          >
            <Links
              links={[
                <GithubLink href="jGetMove/jGetMove">jGetMove</GithubLink>,
              ]}
            />{' '}
            <Tags>Pattern Mining, Java</Tags>
          </MetaData>{' '}
          <figure className="max-w-96 md:my-0 lg:row-span-3 md:row-start-2 lg:row-start-1 md:col-start-2">
            <ExportedImage
              alt="Image représentant un motif de groupe"
              src={jgetmoveImage}
            />
            <figcaption>fig. : Motif spatio-temporel "fuzzy swarm"</figcaption>
          </figure>
          <p className="md:my-0 max-w-prose">
            Conception et développement de jGetMove, un système performant et
            générique pour la détection de motifs spatio-temporels sur des
            données de mobilité. Refactorisation du C++ et amélioration de
            l'algorithme.
          </p>
        </div>
      </article>
      <article>
        <h4 className="max-w-prose">
          Conception d'algorithmes de résolution par contraintes
        </h4>
        <div className="md:grid md:justify-start md:gap-x-4">
          <MetaData
            className="md:col-span-2 lg:col-span-1"
            date={['2015-10', '2016-07']}
          >
            <Links
              links={[
                <GithubLink href="EternityII/EternityII">
                  EternityII
                </GithubLink>,
                <RapportEternityII />,
                <PresentationEternityII />,
              ]}
            />{' '}
            <Tags>Constraint Programming, C++</Tags>
          </MetaData>
          <figure className="max-w-96 md:my-0 lg:row-span-3 md:row-start-2 lg:row-start-1 md:col-start-2">
            <ExportedImage
              alt="Image représentant un motif de groupe"
              src={eternityImage}
            />
            <figcaption>fig. : Contraintes pour une pièce du puzzle</figcaption>
          </figure>
          <p className="md:my-0 max-w-prose">
            Développement d'un solveur pour un puzzle combinatoire, EternityII.
            Analyse et déploiement de differentes stratégies de résolution,
            certaines basées sur le pré-calculs d'instances simplifiées.
          </p>
        </div>
      </article>
    </article>
  );
}

function PresentationEternityII() {
  return (
    <GithubLink
      href="EternityII/EternityII-presentation/blob/master/main.pdf"
      icon={Presentation}
    >
      Presentation
    </GithubLink>
  );
}

function RapportEternityII() {
  return (
    <GithubLink
      href="EternityII/EternityII-report/blob/master/main.pdf"
      icon={Document}
    >
      Rapport
    </GithubLink>
  );
}
