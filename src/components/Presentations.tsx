import React from 'react';
import { A, Article, Collapsible, Section } from './ui';
import { LIRMM } from './URL';
import { Observable, Facebook } from './ui/icons';
export const Presentations: React.FC = () => (
  <Section title="🖥 PRESENTATIONS">
    <Article title="Node Overlap Removal Algorithms: A Comparative Study">
      <p className="measure-wide">
        <em>
          27th International Symposium on Graph Drawing and Network
          Visualization
        </em>
        , Průhonice/Prague, Czech Republic,{' '}
        <time dateTime="2019-09">September 2019</time>.
      </p>
    </Article>
    <Article title="ProsoVis: Prosopographic Data Exploration Interface">
      <p className="measure-wide">
        <em>
          Guest Presenter, séminar{' '}
          <A href="https://anr.fr/Projet-ANR-17-CE38-0013">ANR DAPHNE</A>
        </em>
        , Visio,{' '}
        <A
          href="http://larhra.ish-lyon.cnrs.fr/"
          title="Laboratoire de recherche historique Rhônes-Alpes"
        >
          LARHRA
        </A>
        ,{' '}
        <A
          href="https://techne.labo.univ-poitiers.fr/"
          title="Laboratoire de recherche en TECHnologies Numériques pour l’Éducation"
        >
          TECHNÉ
        </A>
        ,{' '}
        <A
          href="http://cedric.cnam.fr/"
          title="Centre d’études et de recherche en informatique et communications"
        >
          CÉDRIC
        </A>
        , <LIRMM>LIRMM</LIRMM>,{' '}
        <A
          href="https://lamop.pantheonsorbonne.fr/"
          title="Laboratoire de Médiévistique occidentale de Paris"
        >
          LAMOP
        </A>
        , <time dateTime="2021-04">April 2021</time>.
      </p>
    </Article>
    <Article title="Node Overlap Removal Algorithms: an Extended Comparative Study">
      <p className="measure-wide">
        <em>
          Guest Presenter, séminar{' '}
          <A
            href="https://www.labri.fr/"
            title="Laboratoire Bordelais de Recherche en Informatique"
          >
            LaBRi
          </A>
        </em>
        , Visio, <time dateTime="2021-05">May 2021</time>.{' '}
        <A
          href="https://observablehq.com/@stardisblue/agora-presentation-labri"
          title="@stardisblue/agora-presentation-labri"
        >
          <Collapsible
            title="Presentation"
            className="items-baseline inline-flex"
          >
            <Observable />
          </Collapsible>
        </A>
      </p>
    </Article>
    <Article title="ProsoVis: Prosopographic Data Exploration Interface">
      <p className="measure-wide">
        <em>
          Guest Presenter, Simposio Investigación Computational: Approaches for
          the Analysis of Urban Mobility Data
        </em>
        , Visio, <time dateTime="2021-04">June 2021</time>.{' '}
        <A
          href="https://www.facebook.com/events/200843748562680/"
          title="Facebook Event - Club de Ciencias Computacionales Yachay Tech"
        >
          {' '}
          <Collapsible
            title="Facebook Event"
            className="items-baseline inline-flex"
          >
            <Facebook />
          </Collapsible>
        </A>
      </p>
    </Article>
  </Section>
);
