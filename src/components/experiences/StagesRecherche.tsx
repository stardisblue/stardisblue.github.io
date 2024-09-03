import { ExperienceMetaData, Place } from '@/components/Experience';
import { GithubLink, Heading3, Heading4 } from '@/components/ui/typography';
import { Document, Presentation } from '@/components/ui/typography/icons';
import { Lirmm } from '../places';

export function StagesRecherche() {
  return (
    <article className="max-w-prose">
      <Place>
        <Lirmm />
      </Place>
      <Heading3>Projets de recherche</Heading3>
      <article>
        <Heading4 mt0>Conception d'algorithmes de dessin de graphes</Heading4>
        <ExperienceMetaData
          dates={['2018-02', '2018-06']}
          links={[<GithubLink href="agorajs">Agorajs</GithubLink>]}
          keywords={['Web', 'Stats', 'Graph Drawing']}
        />
        <div className="prose">
          <p>
            Recherche, conception et implémentation d'algorithmes de réduction
            d'encombrement visuels, appliqués à la visualisation de graphes.
          </p>
        </div>
      </article>
      <article>
        <Heading4>
          Développement d'algorithmes d'extraction de motifs spatio-temporels
        </Heading4>
        <ExperienceMetaData
          dates={['2017-01', '2017-07']}
          links={[<GithubLink href="jGetMove/jGetMove">jGetMove</GithubLink>]}
          keywords={['Pattern Mining', 'Java']}
        />
        <div className="prose">
          <p>
            Conception et développement de jGetMove, un système performant et
            générique pour la détection de motifs spatio-temporels sur des
            données de mobilité. Refactorisation du C++ et amélioration de
            l'algorithme.
          </p>
        </div>
      </article>
      <article>
        <Heading4>
          Conception d'algorithmes de résolution par contraintes
        </Heading4>
        <ExperienceMetaData
          dates={['2015-10', '2016-07']}
          links={[
            <GithubLink href="EternityII/EternityII">EternityII</GithubLink>,
            <RapportEternityII />,
            <PresentationEternityII />,
          ]}
          keywords={['Constraint Programming', 'C++']}
        />
        <div className="prose">
          <p>
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
