import { Presentation } from '@/model';
import { LIRMM } from './organisation';

const presentations = [
  {
    title: 'ProsoVis: Prosopographic Data Exploration Interface',
    status: 'Orateur Invité',
    event: 'Simposio Investigación Computational',
    location: 'Visio',
    date: '2021-06',
    links: [
      {
        kind: 'Facebook',
        name: ' ',
        href: 'https://www.facebook.com/events/200843748562680/',
        title:
          'Evènement Facebook - Club de Ciencias Computacionales Yachay Tech',
      },
    ],
  },
  {
    title: 'Node Overlap Removal Algorithms: an Extended Comparative Study',
    status: 'Orateur Invité',
    event: 'séminaire',
    organisation: {
      name: 'LaBRI',
      url: 'https://www.labri.fr/',
      title: 'Laboratoire Bordelais de Recherche en Informatique',
    },
    location: 'Visio',
    date: '2021-05',
    links: [
      {
        kind: 'Observable',
        name: 'Présentation',
        href: 'https://observablehq.com/@stardisblue/agora-presentation-labri',
        title: '@stardisblue/agora-presentation-labri',
      },
    ],
  },
  {
    title: 'ProsoVis: Prosopographic Data Exploration Interface',
    status: 'Orateur Invité',
    event: 'séminaire',
    organisation: {
      name: 'ANR DAPHNE',
      url: 'https://anr.fr/Projet-ANR-17-CE38-0013',
      title:
        'Découverte dans les bAses Prosopographiques Historiques de coNnaissancEs',
    },
    location: 'Visio',
    participation: [
      {
        name: 'LARHRA',
        url: 'http://larhra.ish-lyon.cnrs.fr/',
        title: 'Laboratoire de recherche historique Rhônes-Alpes',
      },
      {
        name: 'TECHNÉ',
        url: 'https://techne.labo.univ-poitiers.fr/',
        title:
          'Laboratoire de recherche en TECHnologies Numériques pour l’Éducation',
      },
      {
        name: 'CÉDRIC',
        url: 'http://cedric.cnam.fr/',
        title:
          'Centre d’études et de recherche en informatique et communications',
      },
      LIRMM,
      {
        name: 'LAMOP',
        url: 'https://lamop.pantheonsorbonne.fr/',
        title: 'Laboratoire de Médiévistique occidentale de Paris',
      },
    ],
    date: '2021-04',
  },
  {
    title: 'Node Overlap Removal Algorithms: A Comparative Study',
    status: 'Intervenant',
    event:
      '27th International Symposium on Graph Drawing and Network Visualization',
    organisation: {
      name: 'GD 2019',
      url: 'https://kam.mff.cuni.cz/gd2019/',
      title: 'Graph Drawing and Network Visualization',
    },
    date: '2019-09',
    location: 'Průhonice/Prague, Tchéquie',
  },
] satisfies Presentation[];

export default presentations;
