import { Teaching } from '@/model';
import { IUTBeziers, Polytech, UM } from './organisation';

const teachings = [
  {
    title: 'Web Oriented Architecture',
    dates: ['2020', '2021'],
    cursus: 'DevOps (DO3) & Informatique (IG3)',
    organisation: Polytech,
  },
  {
    title: 'Web Oriented Architecture',
    dates: ['2019', '2020'],
    cursus: 'Informatique (IG4)',
    organisation: Polytech,
  },
  {
    title: 'Introduction to Web',
    dates: ['2019', '2021'],
    cursus: 'DUT 2ième année',
    organisation: IUTBeziers,
  },
  {
    title: 'Science des données',
    dates: ['2018', '2019'],
    cursus: 'Master 1 DÉCOL',
    organisation: UM,
  },
] satisfies Teaching[];

export default teachings;
