import React from 'react';

import { GithubLink } from './ui/typography';

export function Footer() {
  return (
    <footer>
      2024 &mdash;{' '}
      <GithubLink href="stardisblue.github.io">
        stardisblue.github.io
      </GithubLink>{' '}
      Made with 💖 &amp; Next.js
    </footer>
  );
}
