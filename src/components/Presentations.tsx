import React from 'react';
import { Navigation } from './TableOfContent';
import { Article, Section, A, HR, Paragraph } from './ui';
import { LIRMM } from './URL';

export const Presentations: React.FC = () => (
  <Section title="🖥️ PRESENTATIONS">
    <Article
      title="ProsoVis: Prosopographic Data Exploration Interface"
      titleSize="f5--print"
    >
      <Paragraph>
        <em>
          Guest Presenter, Simposio Investigación Computational: Approaches for
          the Analysis of Urban Mobility Data
        </em>
        , Visio, <time dateTime="2021-04">June 2021</time>.{' '}
        <A
          className="items-baseline inline-flex"
          href="https://www.facebook.com/events/200843748562680/"
          title="Facebook Event - Club de Ciencias Computacionales Yachay Tech"
          collapsible={'Facebook'}
        >
          Facebook Event
        </A>
      </Paragraph>
    </Article>
    <Article
      title="Node Overlap Removal Algorithms: an Extended Comparative Study"
      titleSize="f5--print"
    >
      <Paragraph>
        <em>
          Guest Presenter, séminar{' '}
          <A
            href="https://www.labri.fr/"
            title="Laboratoire Bordelais de Recherche en Informatique"
            children="LaBRi"
          />
        </em>
        , Visio, <time dateTime="2021-05">May 2021</time>.{' '}
        <A
          href="https://observablehq.com/@stardisblue/agora-presentation-labri"
          title="@stardisblue/agora-presentation-labri"
          className="items-baseline inline-flex"
          collapsible="Observable"
        >
          Presentation
        </A>
      </Paragraph>
    </Article>
    <Article
      title="ProsoVis: Prosopographic Data Exploration Interface"
      titleSize="f5--print"
    >
      <Paragraph>
        <em>
          Guest Presenter, séminar{' '}
          <A href="https://anr.fr/Projet-ANR-17-CE38-0013">ANR DAPHNE</A>
        </em>
        , Visio,{' '}
        <A
          href="http://larhra.ish-lyon.cnrs.fr/"
          title="Laboratoire de recherche historique Rhônes-Alpes"
          children="LARHRA"
        />
        ,{' '}
        <A
          href="https://techne.labo.univ-poitiers.fr/"
          title="Laboratoire de recherche en TECHnologies Numériques pour l’Éducation"
          children="TECHNÉ"
        />
        ,{' '}
        <A
          href="http://cedric.cnam.fr/"
          title="Centre d’études et de recherche en informatique et communications"
          children="CÉDRIC"
        />
        , <LIRMM />,{' '}
        <A
          href="https://lamop.pantheonsorbonne.fr/"
          title="Laboratoire de Médiévistique occidentale de Paris"
          children="LAMOP"
        />
        , <time dateTime="2021-04">April 2021</time>.
      </Paragraph>
    </Article>
    <Article
      title="Node Overlap Removal Algorithms: A Comparative Study"
      titleSize="f5--print"
    >
      <Paragraph>
        <em>
          27th International Symposium on Graph Drawing and Network
          Visualization
        </em>
        , Průhonice/Prague, Czech Republic,{' '}
        <time dateTime="2019-09">September 2019</time>.
      </Paragraph>
    </Article>
    <Navigation />
    <HR />
  </Section>
);
