import React from 'react';
import { Link } from './ui/Link';

export function Footer() {
  return (
    <footer>
      2024 &mdash;{' '}
      <Link
        className="inline-flex"
        kind="Github"
        href="https://github.com/stardisblue/stardisblue.github.io"
        name="stardisblue/stardisblue.github.io"
      />{' '}
      Made with 💖 &amp; Next.js
    </footer>
  );
}
