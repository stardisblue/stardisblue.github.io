import React from 'react';
import { Section } from './ui';

export function News() {
  return (
    <Section emoji="📰" title="NEWS">
      <iframe
        width="100%"
        height="319"
        frameBorder="0"
        src="https://observablehq.com/embed/@stardisblue/showcase?cells=viewof+showcase"
      ></iframe>
      <hr />
    </Section>
  );
}
