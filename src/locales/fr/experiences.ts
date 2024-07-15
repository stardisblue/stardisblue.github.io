import { ExperienceType, SectionType } from '../../model';
import { COMWATT, LIRMM, UM } from './organisation';

const experiences: SectionType<ExperienceType> = {
  title: 'EXPERIENCES',
  emoji: '💼',
  content: [
    { title: 'Data Scientist & Dev. Fullstack', organisation: COMWATT },
    {
      kind: 'Doctorat',
      title: 'Doctorat en Data Science & Data Viz',
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
      groups: [
        {
          title: 'Domaines',
          content: 'visualisation, data science, IHM, full-stack',
        },
        {
          title: 'Rôles',
          content:
            'gestion de projets, recherche, développement et implémentation',
          print: true,
        },
        {
          title: 'Technos.',
          content:
            'typescript, javascript, python, django, react-redux, d3, observable',
          print: true,
        },
      ],
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
      groups: [
        {
          title: 'Domaines',
          content: 'dessin de graphe, statistiques, web, algorithmique',
        },
        {
          title: 'Rôles',
          content: 'recherche, conception et implémentation',
        },
        {
          title: 'Technos.',
          content: 'typescript, nodejs, d3, lodash, observable',
          print: true,
        },
      ],
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
      groups: [
        {
          title: 'Domaines',
          content: 'données spatio-temporelles, data science, algorithmique',
        },
        {
          title: 'Rôles',
          content: 'refactorisation, optimisation et conception',
        },
        {
          title: 'Technos.',
          content: 'java, C++',
          print: true,
        },
      ],
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
      groups: [
        {
          title: 'Domaines',
          content: 'programmation par contraintes, algorithmique, optimisation',
        },
        {
          title: 'Rôles',
          content: 'recherche, conception et implémentation',
        },
        {
          title: 'Technos.',
          content: 'C++, Java',
          print: true,
        },
      ],
    },
    {
      kind: 'Stage',
      title: 'Dév. Web',
      organisation: { prefix: 'à ', name: 'WBS (Montpellier, France)' },
      dates: [['2015-03', 'LLL'], '2015-07'],
      content: "Integration d'une couche VOIP dans une plateforme web d'ERP.",
      groups: [
        {
          title: 'Domaines',
          content: 'front-end, back-end',
        },
        {
          title: 'Rôles',
          content: 'conception et développement',
        },
        {
          title: 'Technos.',
          content: 'PHP, SOAP, VoIP, JavaScript',
          print: true,
        },
      ],
    },
    {
      kind: 'Freelance',
      title: 'Data science, dév. web, services hardware',
      dates: [
        ['2012', 'y'],
        ['2018', 'y'],
      ],
    },
    // {
    //   title: "ECI : Club d'informatique (Lycée Daudet – Nîmes, France)",
    // },
  ],
};

export default experiences;
