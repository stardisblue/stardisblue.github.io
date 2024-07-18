import React from 'react';

import { Header } from '@/components/Header';
import { LinkType } from '@/model';

const toc = [
  { id: 'a-propos', title: 'A propos', emoji: '👨‍💻' },
  { id: 'experiences', title: 'Experiences', emoji: '💼' },
  { id: '-ducation', title: 'Education', emoji: '🎓' },
  { id: 'service-acad-mique', title: 'Service Académique', emoji: '👨‍🏫' },
  { id: 'communications', title: 'Communications', emoji: '📡' },
];

const links: LinkType[] = [
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
    kind: 'Linkedin',
    name: 'Fati Chen',
    href: 'https://www.linkedin.com/in/fati-chen/',
    title: 'fati-chen',
  },
];

export default function Home() {
  return (
    <main id="CF" className="ph2-m container mx-auto">
      <Header subtitle="DataScience & Dev. Fullstack" toc={toc} links={links} />
    </main>
  );
}
