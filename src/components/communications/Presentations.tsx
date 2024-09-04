import { Lirmm } from '../places';
import { MetaData } from '../ui';
import {
  GithubLink,
  Heading4,
  Link,
  LinkedInLink,
  ObservableLink,
} from '../ui/typography';
import { Facebook, Presentation } from '../ui/typography/icons';
import { wedge } from '../utils';

export function Presentations() {
  return (
    <div className="grid grid-cols-1 auto-rows-auto grid-flow-dense md:grid-cols-2 xl:grid-cols-3 gap-4">
      <article className="md:border-l-2 md:pl-4">
        <MetaData
          date="2023-12"
          place={
            <>
              <LinkedInLink href="company/slbglobal/" iconless>
                SLB
              </LinkedInLink>
              , Montpellier
            </>
          }
        >
          <LinkedInLink href="posts/flint-company_le-double-visage-de-python-data-back-activity-7133484351492640768-wpbP?utm_source=share&utm_medium=member_desktop">
            Évènement
          </LinkedInLink>
        </MetaData>
        <Heading4 mt0>TDD et clean-archi avec pyspark</Heading4>
        <div className="prose">
          <p>
            Intervenant, <em>Le double visage de Python (Data & Back)</em>.
          </p>
        </div>
      </article>
      <article className="md:border-l-2 md:pl-4">
        <MetaData
          date="2022-10"
          place={
            <>
              <Link href="https://www.cirad.fr/" iconless>
                CIRAD
              </Link>
              , Paris
            </>
          }
        />
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
        <MetaData date="2022-06" place={<Lirmm />}>
          <Link
            href="//stardisblue.github.io/thesis-presentation"
            icon={Presentation}
          >
            Présentation
          </Link>{' '}
          <GithubLink href="stardisblue/thesis-presentation">code</GithubLink>
        </MetaData>
        <Heading4 mt0>Soutenance de thèse</Heading4>
        <div className="prose">
          <p>
            <em>
              Réduction de l'encombrement visuel : Application à la
              visualisation et à l'exploration de données prosopographiques
            </em>
          </p>
        </div>
      </article>
      <article className="md:border-l-2 md:pl-4">
        <MetaData
          date="2022-05"
          place={
            <>
              <Link href="https://www.sorbonne-universite.fr/" iconless>
                Sorbonne
              </Link>
              , Paris
            </>
          }
        />
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
        <MetaData date="2021-06" place="Visio">
          <Link
            href="https://www.facebook.com/events/200843748562680/"
            icon={Facebook}
            title="Evènement Facebook - Club de Ciencias Computacionales Yachay Tech"
          >
            Evènement
          </Link>
        </MetaData>
        <Heading4 mt0>ProsoVis: Prosopographic Data Exploration</Heading4>
        <div className="prose">
          <p>
            Orateur Invité, <em>Simposio Investigación Computational</em>.
          </p>
        </div>
      </article>
      <article className="md:border-l-2 md:pl-4">
        <MetaData date="2021-05" place="Visio">
          <ObservableLink href="@stardisblue/agora-presentation-labri">
            Présentation
          </ObservableLink>
        </MetaData>
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
        <MetaData date="2021-04" place="Visio" />
        <Heading4 mt0>First look at Prosopographic Data Exploration</Heading4>
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
        <MetaData date="2019-09" place="Průhonice/Prague, Tchéquie">
          <Link
            href="https://kam.mff.cuni.cz/gd2019/"
            title="Graph Drawing and Network Visualization"
          >
            GD 2019
          </Link>
        </MetaData>
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
  );
}
