import { ExperienceGroup, SubExperience } from '@/components/Experience';
import { Link, GithubLink } from '@/components/ui/typography';
import { Document, Presentation } from '@/components/ui/typography/icons';

export function StagesRecherche() {
  return (
    <ExperienceGroup
      title="Projets de recherche"
      place={
        <Link href="//www.lirmm.fr" iconless>
          LIRMM
        </Link>
      }
    >
      <SubExperience
        title="Conception d'algorithmes de dessin de graphes"
        start="2018-02"
        end="2018-06"
        links={[<GithubLink href="agorajs">Agorajs</GithubLink>]}
        keywords={['Web', 'Stats', 'Graph Drawing']}
      >
        <p>
          Recherche, conception et implémentation d'algorithmes de réduction
          d'encombrement visuels, appliqués à la visualisation de graphes.
        </p>
      </SubExperience>
      <SubExperience
        title="Développement d'algorithmes d'extraction de motifs spatio-temporels"
        start="2017-01"
        end="2017-07"
        links={[<GithubLink href="jGetMove/jGetMove">JGetMove</GithubLink>]}
        keywords={['Pattern Mining', 'Java']}
      >
        <p>
          Conception et développement de jGetMove, un système performant et
          générique pour la détection de motifs spatio-temporels sur des données
          de mobilité. Refactorisation du C++ et amélioration de l'algorithme.
        </p>
      </SubExperience>
      <SubExperience
        title="Conception d'algorithmes de résolution par contraintes"
        start="2015-10"
        end="2016-07"
        links={[
          <GithubLink href="EternityII/EternityII">EternityII</GithubLink>,
          <GithubLink
            href="EternityII/EternityII-report/blob/master/main.pdf"
            icon={Document}
          >
            Rapport
          </GithubLink>,
          <GithubLink
            href="EternityII/EternityII-presentation/blob/master/main.pdf"
            icon={Presentation}
          >
            Presentation
          </GithubLink>,
        ]}
        keywords={['Constraint Programming', 'C++']}
      >
        <p>
          Développement d'un solveur pour un puzzle combinatoire, EternityII.
          Analyse et déploiement de differentes stratégies de résolution,
          certaines basées sur le pré-calculs d'instances simplifiées.
        </p>
      </SubExperience>
    </ExperienceGroup>
  );
}
