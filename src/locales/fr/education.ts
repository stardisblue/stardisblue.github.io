import { EducationType, SectionType } from '../../model';
import { IUTMontpellier, UM } from './organisation';

const education: SectionType<EducationType> = {
  emoji: '🎓',
  title: 'ÉDUCATION',
  content: [
    {
      title: 'Master en architecture logicielle, Informatique',
      organisation: UM,
      date: '2018',
    },
    {
      title: 'Licence en architecture logicielle, Informatique',
      organisation: UM,
      date: '2016',
    },
    {
      title: 'DUT en Informatique de gestion',
      organisation: IUTMontpellier,
      date: '2015',
    },
  ],
};

export default education;
