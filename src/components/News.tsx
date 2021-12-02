import React from 'react';
import { Section, HR } from './ui';

export const News: React.FC = () => (
  <Section className="noprint" title="📰 NEWS">
    <iframe
      width="100%"
      height="319"
      frameBorder="0"
      src="https://observablehq.com/embed/@stardisblue/showcase?cells=viewof+showcase"
    ></iframe>
    <HR />
  </Section>
);
