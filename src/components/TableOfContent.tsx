import React from 'react';
import styled from 'styled-components/macro';
import { Collapsible } from './ui';

export const TableOfContent: React.FC<{ show?: boolean }> = ({
  show = true,
}) => (
  <div className="flex flex-wrap noprint">
    <a href="#sec--about-me" className="link">
      <Collapsible title="About me">👨‍💻</Collapsible>
    </a>
    <a href="#sec--publications" className="link">
      <Collapsible title="Publications">📄</Collapsible>
    </a>
    <a href="#sec--presentations" className="link">
      <Collapsible title="Presentations">️🖥️</Collapsible>
    </a>
    <a href="#sec--academic-services" className="link">
      <Collapsible title="Academic Services">👨‍🏫</Collapsible>
    </a>
    <a href="#sec--professional-and-research-experiences" className="link">
      <Collapsible title="Professional & Research Experiences">💼</Collapsible>
    </a>
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

export const Navigation: React.FC = () => (
  <>
    <StyledNavigation className="flex flex-wrap justify-end">
      <span title="(joke) be careful when sailing ">
        ⚓<em className="gray mr2">Navigation</em>
      </span>
      <TableOfContent />
    </StyledNavigation>
  </>
);
