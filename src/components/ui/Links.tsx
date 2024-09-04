import { Fragment } from 'react';
import { wedge } from '../utils';

export function Links({ links }: { links: React.ReactNode[] }) {
  return (
    <>
      <span className="sr-only">liens : </span>
      {wedge(
        links.map((link, i) => <Fragment key={i}>{link}</Fragment>),
        ' · '
      )}
    </>
  );
}
