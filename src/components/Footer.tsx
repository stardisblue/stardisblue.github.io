import React from 'react';

import { DeprecatedLink } from './ui/typography';

export function Footer() {
  return (
    <footer>
      2024 &mdash;{' '}
      <DeprecatedLink
        kind="Github"
        href="https://github.com/stardisblue/stardisblue.github.io"
        name="stardisblue.github.io"
      />{' '}
      Made with 💖 &amp; Next.js
    </footer>
  );
}
