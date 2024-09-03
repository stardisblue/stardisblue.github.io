import { LinkLike } from '@/model';

export const links = [
  { name: '🌐 stardis.blue', href: 'https://stardis.blue' },
  {
    name: '✉ chen.fati@gmail.com',
    href: 'mailto:chen.fati@gmail.com',
    title: 'chen.fati@gmail.com',
  },
  {
    kind: 'Github',
    href: 'https://github.com/stardisblue',
    name: 'stardisblue',
  },
  {
    kind: 'Observable',
    name: '@stardisblue',
    href: 'https://observablehq.com/@stardisblue',
  },
  {
    kind: 'LinkedIn',
    name: 'Fati Chen',
    href: 'https://www.linkedin.com/in/fati-chen/',
    title: 'fati-chen',
  },
] satisfies LinkLike[];
