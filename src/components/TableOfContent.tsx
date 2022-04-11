import React from 'react';
import styled from 'styled-components/macro';
import { Collapsible } from './ui';

export type TOC = {
  id: string;
  title: string;
  emoji: string;
};

export const TableOfContent: React.FC<{ show?: boolean; sections: TOC[] }> = ({
  show = true,
  sections,
}) => (
  <div className="flex flex-wrap noprint">
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

const StyledNavigation = styled.div`
  @media print {
    display: none;
  }
`;

export const Navigation: React.FC<{ sections: TOC[] }> = ({ sections }) => (
  <>
    <StyledNavigation className="flex flex-wrap justify-end">
      <span title="(joke) be careful when sailing ">
        ⚓<em className="gray mr2">Navigation</em>
      </span>
      <TableOfContent sections={sections} />
    </StyledNavigation>
  </>
);
