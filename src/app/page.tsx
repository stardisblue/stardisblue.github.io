import {
  Experience,
  ExperienceGroup,
  SubExperience,
} from '@/components/Experience';
import {
  GithubLink,
  Heading1,
  Heading2,
  Link,
  LinkedInLink,
  ObservableLink,
} from '@/components/ui/typography';
import {
  Document,
  Email,
  Presentation,
} from '@/components/ui/typography/icons';
import React from 'react';

const Title = Heading1;
const Subtitle = Heading2;
const SectionTitle = Heading2;

const ComwattMontpellier = (
  <>
    <Link href="//www.comwatt.com" iconless>
      Comwatt
    </Link>
    , Montpellier
  </>
);
const LirmmMontpellier = (
  <>
    <Link href="//www.lirmm.fr" iconless>
      LIRMM
    </Link>
    , Montpellier
  </>
);
export default function Home() {
  return (
    <main id="CF" className="ph2-m container mx-auto divide-y">
      <header className="py-4">
        <Title>Fati CHEN</Title>
        <Subtitle>Docteur en Informatique, Data Science & Data Viz</Subtitle>
        <div>
          <Link href="//stardis.blue">stardis.blue</Link>
          {' · '}
          <Link href="mailto:chen.fati@gmail.com" icon={Email}>
            chen.fati@gmail.com
          </Link>
          {' · '}
          <GithubLink href="stardisblue">stardisblue</GithubLink>
          {' · '}
          <ObservableLink href="@stardisblue">@stardisblue</ObservableLink>
          {' · '}
          <LinkedInLink href="in/fati-chen/">Fati Chen</LinkedInLink>
        </div>
      </header>
      <section className="py-4">
        <SectionTitle>👨‍🏫 Expérience</SectionTitle>
        <Experience
          title="Data Scientist &amp; Full Stack"
          place={ComwattMontpellier}
          dates={['2023-03', '2024-06']}
          keywords={[
            'R&D',
            'pyspark',
            'airflow',
            'python',
            'gcloud',
            'react',
            'spring',
            'java',
          ]}
        >
          <p>
            Améliorer l'intelligence de prédiction et d'optimisation de la
            consommation électrique. <br />
            Veille scientifique en data. Encadrement d'une ingénieure data.
          </p>
        </Experience>
        <Experience
          title="Indépendant – Data scientist & Full Stack"
          place="Montpellier"
          dates={['2022-06', 'présent']}
          keywords={[
            'R&D',
            'Data Viz',
            'Data Science',
            'react',
            'svelte',
            'D3',
          ]}
        >
          <p>
            Notamment: aide à la détection d'anomalies en épidemiologie (projet
            européen{' '}
            <Link href="//mood-h2020.eu/epidemic-intelligence-data-and-vizualisation/">
              MOOD
            </Link>
            ).
          </p>
        </Experience>
        <Experience
          title="Doctorat en Data Science &amp; Data Visualisation"
          place={LirmmMontpellier}
          dates={['2018-09', '2022-06']}
          links={[
            <Link href="//hal-lirmm.ccsd.cnrs.fr/tel-03840977" icon={Document}>
              Thèse
            </Link>,
            <Link
              href="//stardisblue.github.io/thesis-presentation"
              icon={Presentation}
            >
              Soutenance
            </Link>,
          ]}
          keywords={['R&D', 'Data Science', 'Data Viz', 'Web']}
        >
          <p>
            Recherche dans le domaine de la visualisation analytique axée autour
            de trois thématiques:
          </p>
          <ol>
            <li>réduction de l'encombrement visuel</li>
            <li>agglomération spatiale d'entités et</li>
            <li>représentations interactives de données spatio-temporelles.</li>
          </ol>
          <p>
            <GithubLink href="stardisblue/prosovis">Prosovis</GithubLink> :
            plateforme web de visualisation analytique de données
            prosopographiques.
          </p>
          <p>
            <Link href="//agorajs.github.io">AGORA</Link> : analyse comparative
            des différents algorithmes de placement de graphes.
          </p>
          <p>
            <GithubLink href="stardisblue/fsac">FSAC</GithubLink> :
            agglomération spatiale pour la visualisation de grand volumes de
            données en temps réel.
          </p>
        </Experience>
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
              générique pour la détection de motifs spatio-temporels sur des
              données de mobilité. Refactorisation du C++ et amélioration de
              l'algorithme.
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
              Développement d'un solveur pour un puzzle combinatoire,
              EternityII. Analyse et déploiement de differentes stratégies de
              résolution, certaines basées sur le pré-calculs d'instances
              simplifiées.
            </p>
          </SubExperience>
        </ExperienceGroup>
        <Experience
          title="Développeur Full Stack"
          place="WBS, Montpellier"
          dates={['2015-03', '2015-07']}
          keywords={['Web', 'PHP5.3', 'jQuery', 'VoIP', 'SOAP']}
        >
          <p>Integration d'une couche VOIP dans une plateforme web d'ERP.</p>
        </Experience>
        <Experience
          title="Développement Web, services hardware"
          place="Nîmes, Montpellier"
          dates={['2015', '2018']}
          timeFormat="y"
          keywords={['Wordpress', 'Prestashop', 'Joomla', 'CakePHP']}
        />
      </section>
    </main>
  );
}
