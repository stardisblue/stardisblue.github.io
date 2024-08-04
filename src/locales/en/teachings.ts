import { SectionType, Teaching } from '@/model';
import { IUTBeziers, Polytech, UM } from './organisation';

const teachings: SectionType<Teaching> = {
  emoji: '👨‍🏫',
  title: 'Teachings',
  content: [
    {
      title: 'Web Oriented Architecture',
      dates: ['2020', '2021'],
      cursus: 'DevOps (DO3) & C.S. (IG3) 3rd years',
      organisation: Polytech,
    },
    {
      title: 'Web Oriented Architecture',
      dates: ['2019', '2020'],
      cursus: 'C.S. (IG4) 4th years',
      organisation: Polytech,
    },
    {
      title: 'Introduction to Web',
      dates: ['2019', '2021'],
      cursus: 'C.S. 2nd years',
      organisation: IUTBeziers,
    },
    {
      title: 'Data Science',
      dates: ['2018', '2019'],
      cursus: 'M.Sc. 1st years',
      organisation: UM,
    },
  ],
};

export default teachings;
