import React from 'react';
import { GH } from './URL';

export const Footer: React.FC = () => (
  <footer>
    2021 &mdash;{' '}
    <GH gh="stardisblue/stardisblue.github.io" className="inline-flex" /> Made
    with 💖 with Gatsby{' '}
  </footer>
);
