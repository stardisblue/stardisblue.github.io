import React from 'react';
import { DeprecatedSection } from './ui';

export function News() {
  return (
    <DeprecatedSection emoji="📰" title="NEWS">
      <iframe
        width="100%"
        height="319"
        frameBorder="0"
        src="https://observablehq.com/embed/@stardisblue/showcase?cells=viewof+showcase"
      ></iframe>
      <hr />
    </DeprecatedSection>
  );
}
