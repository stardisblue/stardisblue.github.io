import {
  Place,
  Section,
  SectionTitle,
  Time,
  TimeInterval,
} from '@/components/ui';
import * as AcademicServices from '@/components/academic-service';
import {
  DoiLink,
  GithubLink,
  HalLink,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Link,
  LinkedInLink,
  ObservableLink,
} from '@/components/ui/typography';
import {
  Email,
  Facebook,
  Presentation,
} from '@/components/ui/typography/icons';
import { Educations } from '@/components/educations';
import * as Experiences from '@/components/experiences';
import { Lirmm, UM } from '@/components/places';
import React from 'react';
import { wedge } from '@/components/utils';
import { Footer } from '@/components/Footer';

const Title = Heading1;
const Subtitle = Heading2;

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
      <Section>
        <SectionTitle>📰 News</SectionTitle>
        <iframe
          width="100%"
          height="319"
          frameBorder="0"
          src="https://observablehq.com/embed/@stardisblue/showcase?cells=viewof+showcase"
        />
      </Section>
      <Section>
        <SectionTitle>👨‍🏫 Expérience</SectionTitle>
        <Experiences.Comwatt />
        <Experiences.IndepMood />
        <Experiences.Doctorat />
        <Experiences.StagesRecherche />
        <Experiences.Wbs />
        <Experiences.IndepPc />
      </Section>
      <Section>
        <SectionTitle>🎓 Éducation</SectionTitle>
        <Educations />
      </Section>
      <Section>
        <SectionTitle>👨‍🏫 Service Académique</SectionTitle>
        <article>
          <Heading3 mt0>Comité d'organisation</Heading3>
          <AcademicServices.OrganisationCommitee />
        </article>
        <article>
          <Heading3>Enseignements</Heading3>
          <AcademicServices.Teachings />
        </article>
        <article>
          <Heading3>Encadrement</Heading3>
          <article>
            <small>
              <TimeInterval start="2019-03" end="2019-06" />{' '}
              <LinkedInLink href="in/alexis-delaforge/">
                Alexis Delaforge
              </LinkedInLink>
            </small>
            <Heading4 mt0>Stagiaire Master 2</Heading4>

            <div className="prose">
              <p>
                Implementation d'une frise chronologique dans un dashboard
                interactif en js.
              </p>
            </div>
          </article>
        </article>
      </Section>
      <Section>
        <SectionTitle>📡 Communications</SectionTitle>
        <article>
          <Heading3 mt0>🖥️ Présentations</Heading3>
          <div className="grid grid-cols-1 auto-rows-auto grid-flow-dense md:grid-cols-2 xl:grid-cols-3 gap-4">
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2023-12" />
                </i>{' '}
                <Place>
                  <LinkedInLink href="company/slbglobal/" iconless>
                    SLB
                  </LinkedInLink>
                  , Montpellier
                </Place>{' '}
                <LinkedInLink href="posts/flint-company_le-double-visage-de-python-data-back-activity-7133484351492640768-wpbP?utm_source=share&utm_medium=member_desktop">
                  Évènement
                </LinkedInLink>
              </small>
              <Heading4 mt0>TDD et clean-archi avec pyspark</Heading4>
              <div className="prose">
                <p>
                  Intervenant, <em>Le double visage de Python (Data & Back)</em>
                  .
                </p>
              </div>
            </article>
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2022-10" />
                </i>{' '}
                <Place>
                  <Link href="https://www.cirad.fr/" iconless>
                    CIRAD
                  </Link>
                  , Paris
                </Place>
              </small>
              <Heading4 mt0>Epid Data Explorer</Heading4>
              <div className="prose">
                <p>
                  Représentant,{' '}
                  <em>
                    meeting{' '}
                    <Link
                      href="//mood-h2020.eu/epidemic-intelligence-data-and-vizualisation/"
                      iconless
                    >
                      MOOD
                    </Link>
                  </em>
                  .
                </p>
              </div>
            </article>
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2022-06" />
                </i>{' '}
                <Place>
                  <Lirmm />
                </Place>{' '}
                <Link
                  href="https//stardisblue.github.io/thesis-presentation"
                  icon={Presentation}
                >
                  Présentation
                </Link>{' '}
                <GithubLink href="stardisblue/thesis-presentation">
                  code
                </GithubLink>
              </small>
              <Heading4 mt0>Soutenance de thèse</Heading4>
              <div className="prose">
                <p>
                  <em>
                    Réduction de l'encombrement visuel : Application à la
                    visualisation et à l'exploration de données
                    prosopographiques
                  </em>
                </p>
              </div>
            </article>
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2022-05" />
                </i>{' '}
                <Place>
                  <Link href="https://www.sorbonne-universite.fr/" iconless>
                    Sorbonne
                  </Link>
                  , Paris
                </Place>
              </small>
              <Heading4 mt0>Visualisation de données</Heading4>
              <div className="prose">
                <p>
                  Intervenant,{' '}
                  <em>
                    séminaire{' '}
                    <Link
                      href="https://anr.fr/Projet-ANR-17-CE38-0013"
                      title="Découverte dans les bAses Prosopographiques Historiques de coNnaissancEs"
                      iconless
                    >
                      ANR DAPHNE
                    </Link>
                  </em>
                  .
                </p>
              </div>
            </article>
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2021-06" />
                </i>{' '}
                <Place>Visio</Place>{' '}
                <Link
                  href="https://www.facebook.com/events/200843748562680/"
                  icon={Facebook}
                  title="Evènement Facebook - Club de Ciencias Computacionales Yachay Tech"
                >
                  Evènement
                </Link>
              </small>
              <Heading4 mt0>
                ProsoVis : Prosopographic Data Exploration
              </Heading4>
              <div className="prose">
                <p>
                  Orateur Invité, <em>Simposio Investigación Computational</em>.
                </p>
              </div>
            </article>
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2021-05" />
                </i>{' '}
                <Place>Visio</Place>{' '}
                <ObservableLink href="@stardisblue/agora-presentation-labri">
                  Présentation
                </ObservableLink>
              </small>
              <Heading4 mt0>Node Overlap Removal Algorithms</Heading4>
              <div className="prose">
                <p>
                  Orateur Invité,{' '}
                  <em>
                    séminaire{' '}
                    <Link
                      href="https://www.labri.fr/"
                      title="Laboratoire Bordelais de Recherche en Informatique"
                      iconless
                    >
                      LaBRI
                    </Link>
                    .
                  </em>
                </p>
              </div>
            </article>
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2021-04" />
                </i>{' '}
                <Place>Visio</Place>
              </small>
              <Heading4 mt0>
                First look at Prosopographic Data Exploration
              </Heading4>
              <div className="prose">
                <p>
                  Orateur Invité,{' '}
                  <em>
                    séminaire{' '}
                    <Link
                      href="https://anr.fr/Projet-ANR-17-CE38-0013"
                      title="Découverte dans les bAses Prosopographiques Historiques de coNnaissancEs"
                      iconless
                    >
                      ANR DAPHNE
                    </Link>
                  </em>
                  .
                </p>
                <p>
                  <small>
                    Collaborations :{' '}
                    {wedge(
                      [
                        <Link
                          key="LARHRA"
                          href="https://larhra.fr/"
                          title="Laboratoire de recherche historique Rhônes-Alpes"
                          iconless
                        >
                          LARHRA
                        </Link>,
                        <Link
                          key="TECHNÉ"
                          href="https://techne.labo.univ-poitiers.fr/"
                          title="Laboratoire de recherche en TECHnologies Numériques pour l’Éducation"
                          iconless
                        >
                          TECHNÉ
                        </Link>,
                        <Link
                          key="CÉDRIC"
                          href="https://cedric.cnam.fr/"
                          title="Centre d’études et de recherche en informatique et communications"
                          iconless
                        >
                          CÉDRIC
                        </Link>,
                        <Link
                          key="LAMOP"
                          href="https://lamop.pantheonsorbonne.fr/"
                          title="Laboratoire de Médiévistique occidentale de Paris"
                          iconless
                        >
                          LAMOP
                        </Link>,
                      ],
                      ', '
                    )}
                    .
                  </small>
                </p>
              </div>
            </article>
            <article className="md:border-l-2 md:pl-4">
              <small>
                <i>
                  <Time date="2019-09" />
                </i>{' '}
                <Place>Průhonice/Prague, Tchéquie</Place>{' '}
                <Link
                  href="https://kam.mff.cuni.cz/gd2019/"
                  title="Graph Drawing and Network Visualization"
                >
                  GD 2019
                </Link>
              </small>
              <Heading4 mt0>
                Node Overlap Removal Algorithms: A Comparative Study
              </Heading4>
              <div className="prose">
                <p>
                  Intervenant,
                  <em>
                    27th International Symposium on Graph Drawing and Network
                    Visualization
                  </em>
                  .
                </p>
              </div>
            </article>
          </div>
        </article>
        <article>
          <Heading3>📄 Publications</Heading3>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <article className="lg:border-l-2 lg:pl-4">
              <small>
                <i>
                  <Time date="2024" form="y" />
                </i>{' '}
                <Link href="https://journals.sagepub.com/doi/full/10.1177/14604582241279720">
                  Sage Journals
                </Link>{' '}
                <HalLink href="lirmm-04658031">lirmm-04658031</HalLink>
              </small>
              <Heading4 mt0>
                Epid Data Explorer: A Visualization Tool for Exploring and
                Comparing Spatio-Temporal Epidemiological Data
              </Heading4>
              <div className="prose">
                <p>
                  Laëtitia Viau, Jérôme Azé, <strong>Fati Chen</strong>, Pierre
                  Pompidor, Pascal Poncelet, Vincent Raveneau, Nancy Rodriguez,
                  Arnaud Sallaberry. <em>Health Informatics Journal</em>,
                  2024;30(3).
                </p>
              </div>
            </article>
            <article className="lg:border-l-2 lg:pl-4">
              <small>
                <i>
                  <Time date="2023-06" />
                </i>{' '}
                <HalLink href="lirmm-04286339">lirmm-04286339</HalLink>
              </small>
              <Heading4 mt0>
                Joint transcriptome and translatome analysis: a reproducible
                pipeline
              </Heading4>
              <div className="prose">
                <p>
                  Julie Ripoll, <strong>Fati Chen</strong>, Céline Mandier, Eric
                  Rivals.{' '}
                  <em>
                    23es Journées Ouvertes en Biologie, Informatique et
                    Mathématiques (
                    <Link href="https://jobim2023.sciencesconf.org/" iconless>
                      JOBIM 2023
                    </Link>
                    )
                  </em>
                  , Nice, France. Jun 2023.
                </p>
              </div>
            </article>
            <article className="lg:border-l-2 lg:pl-4">
              <small>
                <i>
                  <Time date="2020" form="y" />
                </i>{' '}
                <Link href="https://agorajs.github.io/">agorajs.github.io</Link>{' '}
                <GithubLink href="agorajs">AGORAjs</GithubLink>{' '}
                <HalLink href="lirmm-02879677">lirmm-02879677</HalLink>{' '}
                <DoiLink href="10.7155/jgaa.00532">10.7155/jgaa.00532</DoiLink>
              </small>
              <Heading4 mt0>
                Node Overlap Removal Algorithms: An Extended Comparative Study
              </Heading4>
              <div className="prose">
                <p>
                  <strong>Fati Chen</strong>, Laurent Piccinini, Pascal
                  Poncelet, Arnaud Sallaberry.{' '}
                  <em>
                    Journal of Graph Algorithms and Applications (
                    <Link
                      href="https://jgaa.info"
                      title="Journal of Graph Algorithms and Applications"
                      iconless
                    >
                      JGAA
                    </Link>
                    )
                  </em>
                  , 24(4): 683-706. 2020.
                </p>
              </div>
            </article>
            <article className="lg:border-l-2 lg:pl-4">
              <small>
                <i>
                  <Time date="2019-09" />
                </i>{' '}
                <Place>Průhonice/Prague, Tchéquie</Place>{' '}
                <HalLink href="hal-02302617">hal-02302617</HalLink>{' '}
                <DoiLink href="10.1007/978-3-030-35802-0_14">
                  10.1007/978-3-030-35802-0_14
                </DoiLink>
              </small>
              <Heading4 mt0>
                Node Overlap Removal Algorithms: A Comparative Study
              </Heading4>
              <div className="prose">
                <p>
                  <strong>Fati Chen</strong>, Laurent Piccinini, Pascal
                  Poncelet, Arnaud Sallaberry.{' '}
                  <em>
                    Proceedings of the 27th International Symposium on Graph
                    Drawing and Network Visualization (
                    <Link
                      href="https://kam.mff.cuni.cz/gd2019/"
                      title="Graph Drawing and Network Visualization"
                      iconless
                    >
                      GD 2019
                    </Link>
                    )
                  </em>
                  , Průhonice/Prague, Tchéquie. Sept. 2019.
                </p>
              </div>
            </article>
            <article className="lg:border-l-2 lg:pl-4">
              <small>
                <i>
                  <Time date="2019" form="y" />
                </i>{' '}
                <GithubLink href="jGetMove/jGetMove">jGetMove</GithubLink>{' '}
                <HalLink href="lirmm-02137577">lirmm-02137577</HalLink>
              </small>
              <Heading4 mt0>
                jGetMove: Mining Multiple Movement Patterns
              </Heading4>
              <div className="prose">
                <p>
                  <strong>Fati Chen</strong>, Nhat Hai Phan, Pascal Poncelet,
                  Maguelonne Teisseire
                </p>
              </div>
            </article>
          </div>
        </article>
      </Section>
      <Footer />
    </main>
  );
}
