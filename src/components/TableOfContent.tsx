import React from 'react';
import { Collapsible } from './ui';

export type TOC = {
  id: string;
  title: string;
  emoji: string;
};

type TableOfContentProps = {
  show?: boolean;
};

const toc = [
  { id: 'a-propos', title: 'A propos', emoji: '👨‍💻' },
  { id: 'experiences', title: 'Experiences', emoji: '💼' },
  { id: '-ducation', title: 'Education', emoji: '🎓' },
  { id: 'service-acad-mique', title: 'Service Académique', emoji: '👨‍🏫' },
  { id: 'communications', title: 'Communications', emoji: '📡' },
] satisfies TOC[];

export function TableOfContent({ show = true }: TableOfContentProps) {
  return (
    <div className="flex flex-wrap">
      {toc.map(({ id, title, emoji }) => (
        <a className="link" key={id} href={'#sec--' + id}>
          <Collapsible title={title}>{emoji}</Collapsible>
        </a>
      ))}
      {show && (
        <a href="#FC" className="link">
          <Collapsible title="Back to Top" className="link">
            🔼
          </Collapsible>
        </a>
      )}
    </div>
  );
}

export function Navigation() {
  return (
    <div className="flex flex-wrap justify-end">
      <span title="(joke) be careful when sailing">
        ⚓<em className="gray mr2">Navigation</em>
      </span>
      <TableOfContent />
    </div>
  );
}
