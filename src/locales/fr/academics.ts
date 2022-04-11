import { SectionType } from '../../model';
import { StrictOrganisationType } from './organisation';

const academics: SectionType<StrictOrganisationType> = {
  emoji: '👨‍🏫',
  title: "Comité d'organisation",
  content: [
    {
      name: 'EGC 2021',
      url: 'https://egc2021.sciencesconf.org/',
      title: 'Extraction et Gestion des Connaissances 2021',
    },
  ],
};

export default academics;
