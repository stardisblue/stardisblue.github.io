import React from 'react';
import { DOI, GH, LIRMM, Polytech, UM } from '../components/URL';
import { A, Links, Paragraph } from '../components/ui';
import { Authors } from '../components/Authors';

export const subtitle = (
  <>
    Ph.D. Student in Visual Analytics <span className="fs-normal">📊</span>
  </>
);
export const aboutme = {
  title: 'ABOUT ME',
  children: (
    <>
      <Paragraph measure>
        I am a Ph.D.Student 👨‍🔬 at <UM>University of Montpellier</UM>, France.
        Where I am a member of the{' '}
        <A href="http://advanse.lirmm.fr/">ADVANSE</A> team at the <LIRMM />{' '}
        laboratory. My thesis work focuses on reducing visual cluttering of
        spatio-temporal historical data.
      </Paragraph>
      <Paragraph measure>
        I am interested in web technologies, security, algorithmics, science,
        equality, philosophy. I speak English, French and Russian fluently. Have
        a passion for bouldering 🧗 and Origami.
        <br />
        Played chess♟ and won prizes🥇 during highschool.
      </Paragraph>
      <Paragraph measure>
        I also created several micro websites for my friends, a partition{' '}
        <A href="https://calioppe.github.io/">repository</A>🎼 for the
        association EVS Callioppe. A printable student{' '}
        <A href="https://stardisblue.github.io/chansonnier">songs lyrics</A>
        🎶 for a student association and a{' '}
        <A href="https://stardisblue.github.io/cesar/">cesar</A> code
        encoder-decoder.
      </Paragraph>
    </>
  ),
};
export const experiences = {
  title: 'PROFESSIONAL AND RESEARCH EXPERIENCES',
  articles: [
    {
      title: (
        <>
          Visual Analytics Ph.D. Student at <UM /> (Montpellier, France)
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2018-07">Jul. 2018</time> - present
            </em>
          </Paragraph>
          <Paragraph>
            Research on the data visual analysis domain. Development and
            implementation of web applications to analyze spatio-temporal
            dimensions of data and model its relations.
          </Paragraph>
        </>
      ),
    },
    {
      title: (
        <>
          Visualization Algorithms Researcher at <LIRMM /> (Montpellier, France)
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2018-02">Feb. 2018</time> -{' '}
              <time dateTime="2018-06">Jun. 2018</time>
            </em>{' '}
            — Internship
          </Paragraph>
          <Paragraph>
            Research, development, and implementation of algorithms for visual
            cluttering reduction, applied to graph visualization.
          </Paragraph>
        </>
      ),
    },
    {
      title: (
        <>
          Pattern Mining Researcher at <LIRMM>LIRMM</LIRMM> (Montpellier,
          France)
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2017-01">Jan. 2017</time> -{' '}
              <time dateTime="2017">Jul. 2017</time>
            </em>{' '}
            — Internship{' '}
            <Links className="inline-flex">
              <GH gh="jGetMove/jGetMove" className="link" />
            </Links>
          </Paragraph>
          <Paragraph>
            Development of{' '}
            <A href="https://github.com/jgetmove/jgetmove">jGetMove</A> an
            efficient and unifying spatio-temporal pattern mining system for
            moving objects.
            <br />
            Refactoring from C++ and improving the algorithm.
          </Paragraph>
        </>
      ),
    },
    {
      title: (
        <>
          Constraint Programming Researcher at <LIRMM>LIRMM</LIRMM>{' '}
          (Montpellier, France)
        </>
      ),
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2015-10">Oct. 2015</time> -{' '}
              <time dateTime="2016-07">Jul. 2016</time>
            </em>{' '}
            — Internship{' '}
            <Links className="inline-flex">
              <GH gh="EternityII/EternityII" className="link" />
              <A
                className="link ml2"
                href="https://github.com/EternityII/EternityII-report/blob/master/main.pdf"
                collapsible="PDF"
              >
                Report
              </A>
              <A
                className="link ml2"
                href="https://github.com/EternityII/EternityII-presentation/blob/master/main.pdf"
                collapsible="PPT"
              >
                Presentation
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
      title: 'Web Developper at WBS (Montpellier, France)',
      children: (
        <>
          <Paragraph>
            <em>
              <time dateTime="2015-03">Mar. 2015</time> -{' '}
              <time dateTime="2015-07">Jul. 2015</time>
            </em>{' '}
            — Internship
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
