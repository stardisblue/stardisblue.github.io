import React from 'react';
import { Collapsible } from '../components/Collapsible';

export const TOC: React.FC<{ show?: boolean }> = ({ show = true }) => (
  <div className="flex flex-wrap">
    <a href="#sec--about-me" className="link">
      <Collapsible title="About me">👨‍💻</Collapsible>
    </a>
    <a href="#sec--publications" className="link">
      <Collapsible title="Publications">📄</Collapsible>
    </a>
    <a href="#sec--presentations" className="link">
      <Collapsible title="Presentations">🖥</Collapsible>
    </a>
    <a href="#sec--academic-services" className="link">
      <Collapsible title="Academic Services">👨‍🏫</Collapsible>
    </a>
    <a href="#sec--professional-and-research-experiences" className="link">
      <Collapsible title="Professional & Research Experiences">💼</Collapsible>
    </a>
    {show && (
      <a href="#" className="link">
        <Collapsible title="Back to Top" className="link">
          🔼
        </Collapsible>
      </a>
    )}
  </div>
);
