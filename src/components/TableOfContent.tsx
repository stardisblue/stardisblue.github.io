import React from 'react';
import { Collapsible } from './ui';

export type TOC = {
  id: string;
  title: string;
  emoji: string;
};

type TableOfContentProps = {
  show?: boolean;
  sections: TOC[];
};

export function TableOfContent({ show = true, sections }: TableOfContentProps) {
  return (
    <div className="flex flex-wrap">
      {sections.map(({ id, title, emoji }) => (
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

type NavigationProps = { sections: TOC[] };

export function Navigation({ sections }: NavigationProps) {
  return (
    <div className="flex flex-wrap justify-end">
      <span title="(joke) be careful when sailing">
        ⚓<em className="gray mr2">Navigation</em>
      </span>
      <TableOfContent sections={sections} />
    </div>
  );
}
