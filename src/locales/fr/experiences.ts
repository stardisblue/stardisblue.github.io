import { ExperienceType, SectionType } from '../../model';
import { LIRMM, UM } from './organisation';

const experiences: SectionType<ExperienceType> = {
  title: 'EXPERIENCES',
  emoji: '💼',
  content: [
    {
      kind: 'Doctorat',
      title: 'Visualisation Analytique',
      organisation: UM,
      dates: ['2018-07', '2022-06'],
      print: true,
      content: `Recherche dans le domaine de la visualisation analytique axée autour de trois projets: 1. réduction de l'encombrement visuel 2. agglomération spatiale d'entités et 3. représentations interactives de données spatio-temporelles.`,
      links: [
        {
          kind: 'Github',
          href: 'https://github.com/stardisblue/fsac',
          name: 'fsac',
        },
        {
          kind: 'Observable',
          href: 'https://observablehq.com/d/e51fd47b606ba403',
          name: 'Démo fsac',
        },
      ],
      domaines: 'visualisation, data science, IHM, full-stack',
      roles: 'gestion de projets, recherche, développement et implémentation',
      technologies:
        'typescript, javascript, python, django, react-redux, d3, observable',
    },
    {
      kind: 'Stage',
      title: "Conception d'algorithmes de dessin de graphes",
      organisation: LIRMM,
      dates: [['2018-02', 'LLL'], '2018-06'],
      links: [
        { kind: 'Github', href: 'https://github.com/agorajs', name: 'AGORAjs' },
      ],
      content: `Recherche, conception et implémentation d'algorithmes de réduction d'encombrement visuels, appliqués à la visualisation de graphes.`,
      domaines: 'dessin de graphe, statistiques, web, algorithmique',
      roles: 'recherche, conception et implémentation',
      technologies: 'typescript, nodejs, d3, lodash, observable',
    },
    {
      kind: 'Stage',
      title: "Dév. d'algorithmes d'extraction de motifs spatio-temporels",
      organisation: LIRMM,
      dates: [['2017-01', 'LLL'], '2017-07'],
      links: [
        {
          kind: 'Github',
          name: 'jGetMove',
          href: 'https://github.com/jGetMove/jGetMove',
        },
      ],
      content: `Conception et développement de jGetMove, un
        système performant et générique pour la détection de motifs 
        spatio-temporels sur des données de mobilité. Refactorisation du C++ et amélioration de l'algorithme.`,
      domaines: 'données spatio-temporelles, data science, algorithmique',
      roles: 'refactorisation, optimisation et conception',
      technologies: 'java, C++',
    },
    {
      kind: 'Stage',
      title: "Conception d'algorithmes de résolution par contraintes",
      organisation: LIRMM,
      dates: ['2015-10', '2016-07'],
      links: [
        {
          kind: 'Github',
          name: 'EternityII',
          href: 'https://github.com/EternityII/EternityII',
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
      content: `Développement d'un solveur pour un puzzle combinatoire,  EternityII. Analyse et déploiement de differentes stratégies de résolution, certaines basées sur le pré-calculs d'instances simplifiées.`,
      domaines: 'programmation par contraintes, algorithmique, optimisation',
      roles: 'recherche, conception et implémentation',
      technologies: 'C++, Java',
    },
    {
      kind: 'Stage',
      title: 'Dév. Web',
      organisation: { prefix: 'à ', name: 'WBS (Montpellier, France)' },
      dates: [['2015-03', 'LLL'], '2015-07'],
      content: "Integration d'une couche VOIP dans une plateforme web d'ERP.",
      domaines: 'front-end, back-end',
      roles: 'conception et développement',
      technologies: 'PHP, SOAP, VoIP, JavaScript',
    },
    {
      kind: 'Freelance',
      title: 'Data science, dév. web, services hardware',
      dates: [
        ['2012', 'Y'],
        ['2018', 'Y'],
      ],
    },
    // {
    //   title: "ECI : Club d'informatique (Lycée Daudet – Nîmes, France)",
    // },
  ],
};

export default experiences;
