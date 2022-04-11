import React from 'react';
import { Link } from './ui/Link';

export const Footer: React.FC = () => (
  <footer className="noprint">
    2021 &mdash;{' '}
    <Link
      kind="Github"
      href="https://github.com/stardisblue/stardisblue.github.io"
      name="stardisblue/stardisblue.github.io"
    />{' '}
    Made with 💖 &amp; Gatsby{' '}
  </footer>
);
