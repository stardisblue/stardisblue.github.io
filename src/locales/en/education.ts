import { EducationType, SectionType } from '../../model';
import { IUTMontpellier, UM } from './organisation';

const education: SectionType<EducationType> = {
  emoji: '🎓',
  title: 'EDUCATION',
  content: [
    {
      title: 'M.Sc. in Software Architecture, Computer Science',
      organisation: UM,
      date: '2018',
    },
    {
      title: 'B.Sc. in Software Architecture, Computer Science',
      organisation: UM,
      date: '2016',
    },
    {
      title: 'Technical degree in Business Computing',
      organisation: IUTMontpellier,
      date: '2015',
    },
  ],
};

export default education;
