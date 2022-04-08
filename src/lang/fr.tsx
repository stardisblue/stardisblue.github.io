import React from 'react';
import { DOI, GH, LIRMM, Polytech, UM } from '../components/URL';
import { A, Links, Paragraph } from '../components/ui';
import { Authors } from '../components/Authors';

export const subtitle = (
  <>
    Doctorant en Visualisation Analytique <span className="fs-normal">📊</span>
  </>
);
export const aboutme = {
  title: 'A PROPOS',
  children: (
    <>
      <Paragraph measure>
        Je suis doctorant 👨‍🔬 à l'<UM>Université de Montpellier</UM>. Où je suis
        membre de l'équipe <A href="http://advanse.lirmm.fr/">ADVANSE</A> au{' '}
        <LIRMM />. Mon travail se focalise sur la réduction de l'encombrement
        visuel appliquée aux données spatio-temporelles.
      </Paragraph>
      <Paragraph measure>
        Je suis intéressé par les technologies web, la sécurité,
        l'algorithmique, les sciences, l'équité et la philosophie. Je parle
        Français, Anglais et Russe couramment. Je suis passionné d'escalade 🧗
        et d'Origami. J'ai aussi longtemps joué aux échecs ♟ et gagné des prix
        🥇 durant le lycée.
      </Paragraph>
      <Paragraph measure>
        Philanthrope, j'ai créé plusieurs micro sites web pour mes amis, un{' '}
        <A href="https://calioppe.github.io/">répertoire</A> de partitions 🎼
        pour l'association EVS Callioppe. Un{' '}
        <A href="https://stardisblue.github.io/chansonnier">chansonnier</A>🎶
        imprimable pour une association d'étudiant et un encodeur-décodeur de
        code <A href="https://stardisblue.github.io/cesar/">césar</A>.
      </Paragraph>
    </>
  ),
};
export const experiences = {
  title: 'EXPERIENCES PROFESSIONNELLES ET DE RECHERCHE',
  articles: [
    {
      title: (
        <>
          Doctorant en Visualisation Analytique à l'
          <UM>Université de Montpellier</UM>
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2018-07">Juill. 2018</time> -{' '}
              <time dateTime="2022-06">Juin 2022</time>
            </em>
          </Paragraph>
          <Paragraph>
            Recherche dans le domaine de la visualisation analytique.
            Développement et implémentation d'applications web pour analyser les
            dimensions spatio-temporelles des données et modéliser leurs
            relations.
          </Paragraph>
        </>
      ),
    },
    {
      title: (
        <>
          Stagiaire en algorithmes de visualisation au <LIRMM /> (Montpellier,
          France)
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2018-02">Févr. 2018</time> -{' '}
              <time dateTime="2018-06">Juin. 2018</time>
            </em>{' '}
            {/* — Stage */}
          </Paragraph>
          <Paragraph>
            Recherche, développement et implémentation d'algorithmes de
            réduction d'encombrement visuels, appliqués à la visualisation de
            graphes.
          </Paragraph>
        </>
      ),
    },
    {
      title: (
        <>
          Stagiaire en pattern mining au <LIRMM />
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2017-01">Janv. 2017</time> -{' '}
              <time dateTime="2017">Juill. 2017</time>
            </em>{' '}
            {/* — Stage{' '} */}
            <Links className="inline-flex">
              <GH gh="jGetMove/jGetMove" className="link" />
            </Links>
          </Paragraph>
          <Paragraph>
            Développement de{' '}
            <A href="https://github.com/jgetmove/jgetmove">jGetMove</A>, un
            système performant et générique pour la détection de motifs
            spatio-temporels sur des données de mobilité.
            <br />
            Refactorisation du C++ et amélioration de l'algorithme.
          </Paragraph>
        </>
      ),
    },
    {
      title: (
        <>
          Stagiaire en programmation par contraintes au <LIRMM>LIRMM</LIRMM>
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2015-10">Oct. 2015</time> -{' '}
              <time dateTime="2016-07">Juill. 2016</time>
            </em>{' '}
            {/* — Stage{' '} */}
            <Links className="inline-flex">
              <GH gh="EternityII/EternityII" className="link" />
              <A
                className="link ml2"
                href="https://github.com/EternityII/EternityII-report/blob/master/main.pdf"
                collapsible="PDF"
              >
                Rapport
              </A>
              <A
                className="link ml2"
                href="https://github.com/EternityII/EternityII-presentation/blob/master/main.pdf"
                collapsible="PPT"
              >
                Présentation
              </A>
            </Links>
          </Paragraph>
          <Paragraph>
            Development of a solver for a combinatorial puzzle game{' '}
            <A href="https://github.com/EternityII">EternityII</A>. Analysis and
            setup of various solving strategies, some based on pre-calculation
            of simplified instances.
          </Paragraph>
        </>
      ),
    },
    {
      title: 'Stagiaire Développeur Web au WBS (Montpellier, France)',
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2015-03">Mar. 2015</time> -{' '}
              <time dateTime="2015-07">Jul. 2015</time>
            </em>{' '}
            {/* — Internship */}
          </Paragraph>
          <Paragraph>Online PGI software development.</Paragraph>
        </>
      ),
    },
    {
      title: 'Data Analyst, Web Developer, Computer Builder',
      children: (
        <Paragraph>
          <em>
            <time dateTime="2012-01">Jan. 2012</time> -{' '}
            <time dateTime="2018-01">Jan. 2018</time>
          </em>{' '}
          — Freelancer
        </Paragraph>
      ),
    },
    {
      title:
        'ECI : Computer Science Club (Highschool - Lycée Daudet - Nîmes, France)',
    },
  ],
};
export const education = {
  title: 'EDUCATION',
  content: [
    {
      title: 'M.Sc. in Software Architecture, Computer Science',
      time: '2018',
      children: (
        <>
          <UM />, France.
        </>
      ),
    },
    {
      title: 'B.Sc. in Software Architecture, Computer Science',
      time: '2016',
      children: (
        <>
          <UM />, France.
        </>
      ),
    },
    {
      title: 'Technical degree in Business Computing',
      time: '2015',
      children: (
        <>
          <A
            href="https://iut-montpellier-sete.edu.umontpellier.fr/"
            title="IUT de Montpellier"
          >
            University Institute of Technology of Montpellier
          </A>
          , France.
        </>
      ),
    },
  ],
};
export const academics = {
  title: 'ACADEMIC SERVICES',
  content: [
    {
      title: 'Organization Committee',
      attrs: { className: 'noprint' },
      children: (
        <Paragraph>
          <A href="https://egc2021.sciencesconf.org/">EGC 2021</A>, Extraction
          et Gestion des Connaissances <time dateTime="2021">2021</time>.
        </Paragraph>
      ),
    },
    {
      title: 'Teachings',
      children: (
        <>
          <Paragraph>
            <strong>Web Oriented Architecture</strong>, DevOps (DO3) & C.S.
            (IG3) 3rd year students. <Polytech />, France.{' '}
            <time dateTime="2020">2020</time>-<time dateTime="2021">2021</time>
          </Paragraph>
          <Paragraph>
            <strong>Web Oriented Architecture</strong>, C.S. 4th year students
            (IG4). <Polytech />, France. <time dateTime="2019">2019</time>-
            <time dateTime="2020">2020</time>
          </Paragraph>
          <Paragraph>
            <strong>Introduction to Web</strong>, C.S. 2nd year students.{' '}
            <A href="https://www.iutbeziers.fr/">
              University Institute of Technology, Béziers
            </A>
            , France. <time dateTime="2019">2019</time>-
            <time dateTime="2021">2021</time>
          </Paragraph>
          <Paragraph>
            <strong>Data Science</strong>, M.Sc. 1st year students. <UM />,
            France. <time dateTime="2018">2018</time>-
            <time dateTime="2019">2019</time>
          </Paragraph>
        </>
      ),
    },
  ],
};
export const presentations = {
  title: 'PRESENTATIONS',
  content: [
    {
      title: 'ProsoVis: Prosopographic Data Exploration Interface',
      children: (
        <Paragraph>
          <em>
            Guest Presenter, Simposio Investigación Computational: Approaches
            for the Analysis of Urban Mobility Data
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
      ),
    },
    {
      title: 'Node Overlap Removal Algorithms: an Extended Comparative Study',
      children: (
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
      ),
    },
    {
      title: 'ProsoVis: Prosopographic Data Exploration Interface',
      children: (
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
      ),
    },
    {
      title: 'Node Overlap Removal Algorithms: A Comparative Study',
      children: (
        <Paragraph>
          <em>
            27th International Symposium on Graph Drawing and Network
            Visualization
          </em>
          , Průhonice/Prague, Czech Republic,{' '}
          <time dateTime="2019-09">September 2019</time>.
        </Paragraph>
      ),
    },
  ],
};
export const publications = {
  title: 'PUBLICATIONS',
  content: [
    {
      title: (
        <A href="https://agorajs.github.io/">
          Node Overlap Removal Algorithms: an Extended Comparative Study
        </A>
      ),
      children: (
        <>
          <Paragraph>
            <strong>Fati CHEN</strong>
            <Authors>
              , Laurent Piccinini, Pascal Poncelet, Arnaud Sallaberry
            </Authors>
            . In <em>Journal of Graph Algorithms and Applications (JGAA)</em>,
            24(4): 683-706. <time dateTime="2020">2020</time>. doi:
            <DOI doi="10.7155/jgaa.00532" />
          </Paragraph>
          <Links>
            <A
              className="link"
              href="https://hal-lirmm.ccsd.cnrs.fr/lirmm-02879677"
              collapsible="PDF"
              children="hal: lirmm-02879677"
            />
            <GH gh="agorajs" className="link ml2" />
            <A
              href="https://agorajs.github.io/"
              className="link ml2"
              collapsible="Globe"
            >
              agorajs.github.io
            </A>
          </Links>
        </>
      ),
    },
    {
      title: (
        <A href="https://hal-lirmm.ccsd.cnrs.fr/hal-02302617">
          Node Overlap Removal Algorithms: A Comparative Study
        </A>
      ),
      children: (
        <>
          <Paragraph>
            <strong>Fati CHEN</strong>
            <Authors>
              , Laurent Piccinini, Pascal Poncelet, Arnaud Sallaberry
            </Authors>
            . In{' '}
            <em>
              Proceedings of the 27th International Symposium on Graph Drawing
              and Network Visualization
            </em>
            , Průhonice/Prague, Czech Republic,{' '}
            <time dateTime="2019-09">September 2019</time>. doi:
            <DOI doi="10.1007/978-3-030-35802-0_14" />
            <Links className="flex">
              <A
                className="link"
                href="https://hal-lirmm.ccsd.cnrs.fr/hal-02302617"
                collapsible="PDF"
                children="hal: hal-02302617"
              />
            </Links>
          </Paragraph>
        </>
      ),
    },
    {
      title: (
        <A href="https://hal-lirmm.ccsd.cnrs.fr/lirmm-02137577">
          JGetMove: Mining Multiple Movement Patterns
        </A>
      ),
      children: (
        <>
          <Paragraph>
            <strong>Fati CHEN</strong>
            <Authors>
              , Nhat Hai Phan, Pascal Poncelet, Maguelonne Teisseire
            </Authors>
            . <time dateTime="2019">2019</time>.
          </Paragraph>
          <Links>
            <A
              className="link"
              href="https://hal-lirmm.ccsd.cnrs.fr/lirmm-02137577"
              collapsible="PDF"
              children="hal: lirmm-02137577"
            />
            <GH gh="jGetMove/jGetMove" className="link ml2" />
          </Links>
        </>
      ),
    },
  ],
};
