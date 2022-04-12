import { ExperienceType, SectionType } from '../../model';
import { LIRMM, UM } from './organisation';

export const experiences: SectionType<ExperienceType> = {
  title: 'PROFESSIONAL AND RESEARCH EXPERIENCE',
  emoji: '💼',
  content: [
    {
      kind: 'Ph.D.',
      title: 'Visual Analytics',
      organisation: UM,
      dates: ['2018-07', '2022-06'],
      print: true,
      content: `Research on the data visual analysis domain based around 3 projects: 1. Reducing visual cluttering 2. spatial agglomeration clustering. 3. Interactive representations of spatio-temporal data.`,
      links: [
        {
          kind: 'Github',
          href: 'https://github.com/stardisblue/fsac',
          name: 'fsac',
        },
        {
          kind: 'Observable',
          href: 'https://observablehq.com/d/e51fd47b606ba403',
          name: 'Demo fsac',
        },
      ],
      domaines: 'visualisation, data science, HCI, full-stack',
      roles: 'project management, research, development',
      technologies:
        'typescript, javascript, python, django, react-redux, d3, observable',
    },
    {
      kind: 'Internship',
      title: 'Design of Algorithms for Graph Drawing',
      organisation: LIRMM,
      dates: [['2018-02', 'MMM'], '2018-06'],
      links: [
        { kind: 'Github', href: 'https://github.com/agorajs', name: 'AGORAjs' },
      ],
      content: `Research, development, and implementation of algorithms for visual cluttering reduction, applied to graph visualization.`,
      domaines: 'graph drawing, statistics, web, algorithmics',
      roles: 'research, development and implementation',
      technologies: 'Typescript, nodejs, d3, lodash, observable',
    },
    {
      kind: 'Internship',
      title: 'Dev. of Algorithms For Spatio-Temporal Pattern Mining',
      organisation: LIRMM,
      dates: [['2017-01', 'MMM'], '2017-07'],
      links: [
        {
          kind: 'Github',
          href: 'https://github.com/jGetMove/jGetMove',
          name: 'jGetMove/jGetMove',
        },
      ],
      content: `Development of jGetMove, an
      efficient and unifying spatio-temporal pattern mining system for
      moving objects. Refactoring from C++ and improving the algorithm.`,
      domaines: 'spatio-temporal data, data science, algorithmics',
      roles: 'refactoring, optimisation et development',
      technologies: 'java, C++',
    },
    {
      kind: 'Internship',
      title: 'Design of Constraint Resolution Algorithms',
      organisation: LIRMM,
      dates: ['2015-10', '2016-07'],
      links: [
        {
          kind: 'Github',
          href: 'https://github.com/EternityII/EternityII',
          name: 'EternityII/EternityII',
        },
        {
          kind: 'PDF',
          href: 'https://github.com/EternityII/EternityII-report/blob/master/main.pdf',
          name: 'Rapport',
        },
        {
          kind: 'PPT',
          href: 'https://github.com/EternityII/EternityII-presentation/blob/master/main.pdf',
          name: 'Présentation',
        },
      ],
      content: `Development of a solver for a combinatorial puzzle game, EternityII. Analysis and setup of various solving strategies, some based on pre-calculation of simplified instances.`,
      domaines: 'constraint programming, algorithmics, optimisation',
      roles: 'research, development et implementation',
      technologies: 'C++, Java',
    },
    {
      kind: 'Internship',
      title: 'Web Dev.',
      organisation: { prefix: 'at ', name: 'WBS (Montpellier, France)' },
      dates: [['2015-03', 'MMM'], '2015-07'],
      content: 'VoIP stack integration into a web based PGI software.',
      domaines: 'front-end, back-end',
      roles: 'development and implementation',
      technologies: 'PHP, SOAP, VoIP, JavaScript',
    },
    {
      kind: 'Freelance',
      title: 'Data Analyst, Web Developer, Computer Builder',
      dates: [
        ['2012', 'Y'],
        ['2018', 'Y'],
      ],
    },
    // {
    //   title:
    //     'ECI : Computer Science Club (Highschool - Lycée Daudet - Nîmes, France)',
    // },
  ],
};

export default experiences;
