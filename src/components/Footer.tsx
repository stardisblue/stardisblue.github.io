import React from 'react';
import { GH } from './URL';

export const Footer: React.FC = () => (
  <footer>
    2021 &mdash; Made with 💖 with Gatsby{' '}
    <GH gh="stardisblue/stardisblue.github.io" className="inline-flex" />
  </footer>
);
