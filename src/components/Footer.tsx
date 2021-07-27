import React from 'react';
import { GH } from './URL';

export const Footer: React.FC = () => (
  <footer className="noprint">
    2021 &mdash;{' '}
    <GH gh="stardisblue/stardisblue.github.io" className="inline-flex" /> Made
    with 💖 &amp; Gatsby{' '}
  </footer>
);
