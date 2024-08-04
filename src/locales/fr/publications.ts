import { Publication, SectionType } from '@/model';

const publications: SectionType<Publication> = {
  emoji: '📄',
  title: 'Publications',
  content: [
    {
      title: {
        name: 'Node Overlap Removal Algorithms: An Extended Comparative Study',
        href: 'https://agorajs.github.io/',
      },
      authors: [
        'Fati Chen',
        'Laurent Piccinini',
        'Pascal Poncelet',
        'Arnaud Sallaberry',
      ],
      journal: 'Journal of Graph Algorithms and Applications (JGAA)',
      prefix: 'In',
      suffix: ', 24(4): 683-706',
      date: ['2020', 'y'],
      doi: '10.7155/jgaa.00532',
      links: [
        {
          href: 'https://hal-lirmm.ccsd.cnrs.fr/lirmm-02879677',
          kind: 'PDF',
          name: 'hal: lirmm-02879677',
        },
        { kind: 'Github', href: 'https://github.com/agorajs', name: 'AGORAjs' },
        {
          kind: 'Globe',
          href: 'https://agorajs.github.io/',
          name: 'agorajs.github.io',
        },
      ],
    },
    {
      title: {
        name: 'Node Overlap Removal Algorithms: A Comparative Study',
        href: 'https://hal-lirmm.ccsd.cnrs.fr/hal-02302617',
      },
      authors: [
        'Fati Chen',
        'Laurent Piccinini',
        'Pascal Poncelet',
        'Arnaud Sallaberry',
      ],
      journal:
        'Proceedings of the 27th International Symposium on Graph Drawing and Network Visualization',
      prefix: 'In',
      suffix: ', Průhonice/Prague, Tchéquie',
      date: '2019-09',
      doi: '10.1007/978-3-030-35802-0_14',
      links: [
        {
          kind: 'PDF',
          name: 'hal: hal-02302617',
          href: 'https://hal-lirmm.ccsd.cnrs.fr/hal-02302617',
        },
      ],
    },
    {
      title: {
        name: 'JGetMove: Mining Multiple Movement Patterns',
        href: 'https://hal-lirmm.ccsd.cnrs.fr/lirmm-02137577',
      },
      authors: [
        'Fati Chen',
        'Nhat Hai Phan',
        'Pascal Poncelet',
        'Maguelonne Teisseire',
      ],
      date: ['2019', 'y'],
      links: [
        {
          kind: 'PDF',
          name: 'hal: lirmm-02137577',
          href: 'https://hal-lirmm.ccsd.cnrs.fr/lirmm-02137577',
        },
        {
          kind: 'Github',
          name: 'jGetMove/jGetMove',
          href: 'https://github.com/jGetMove/jGetMove',
        },
      ],
    },
  ],
} satisfies SectionType<Publication>;
export default publications;
