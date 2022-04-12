import { SectionType, TeachingsType } from '../../model';
import { IUTBeziers, Polytech, UM } from './organisation';

const teachings: SectionType<TeachingsType> = {
  emoji: '👨‍🏫',
  title: 'Teachings',
  content: [
    {
      title: 'Web Oriented Architecture',
      dates: ['2020', '2021'],
      cursus: 'DevOps (DO3) & C.S. (IG3) 3rd year students',
      organisation: Polytech,
    },
    {
      title: 'Web Oriented Architecture',
      dates: ['2019', '2020'],
      cursus: 'C.S. (IG4) 4th year students',
      organisation: Polytech,
    },
    {
      title: 'Introduction to Web',
      dates: ['2019', '2021'],
      cursus: 'C.S. 2nd year students',
      organisation: IUTBeziers,
    },
    {
      title: 'Data Science',
      dates: ['2018', '2019'],
      cursus: 'M.Sc. 1st year students',
      organisation: UM,
    },
  ],
};

export default teachings;
