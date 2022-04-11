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
      content: `Research on the data visual analysis domain. Development and implementation of web applications to analyze spatio-temporal dimensions of data and model its relations.`,
    },
    {
      kind: 'Internship',
      title: 'Research on Algorithms Applied to Graph Drawing',
      organisation: LIRMM,
      dates: [['2018-02', 'MMM'], '2018-06'],
      links: [{ kind: 'Github', href: 'agorajs' }],
      content: `Research, development, and implementation of algorithms for visual cluttering reduction, applied to graph visualization.`,
      roles: 'Research, development and implementation',
      technologies: 'Typescript, nodejs, d3, observable',
    },
    {
      kind: 'Internship',
      title: 'Research on Pattern Mining Algorithms for Timeseries',
      organisation: LIRMM,
      dates: [['2017-01', 'MMM'], '2017-07'],
      links: [{ kind: 'Github', href: 'jGetMove/jGetMove' }],
      content: `Development of jGetMove, an
      efficient and unifying spatio-temporal pattern mining system for
      moving objects. Refactoring from C++ and improving the algorithm.`,
      roles: 'Refactoring, optimisation et development',
      technologies: 'Java, C++',
    },
    {
      kind: 'Internship',
      title: 'Research on Constraint Algorithms',
      organisation: LIRMM,
      dates: ['2015-10', '2016-07'],
      links: [
        { kind: 'Github', href: 'EternityII/EternityII' },
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
      roles: 'Research, development et implementation',
      technologies: 'C++, Java',
    },
    {
      kind: 'Internship',
      title: 'Web Dev.',
      organisation: { prefix: 'at ', name: 'WBS (Montpellier, France)' },
      dates: [['2015-03', 'MMM'], '2015-07'],
      content: 'VOIP stack integration into a web based PGI software.',
      roles: 'Development and implementation',
      technologies: 'PHP, SOAP, VOIP, JavaScript',
    },
    {
      kind: 'Freelance',
      title: 'Data Analyst, Web Developer, Computer Builder',
      dates: [
        ['2012', 'Y'],
        ['2018', 'Y'],
      ],
    },
    {
      title:
        'ECI : Computer Science Club (Highschool - Lycée Daudet - Nîmes, France)',
    },
  ],
};

export default experiences;
