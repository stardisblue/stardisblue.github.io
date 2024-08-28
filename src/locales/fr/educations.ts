import { Education } from '@/model';
import { IUTMontpellier, UM } from './organisation';

const educations = [
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
] satisfies Education[];

export default educations;
