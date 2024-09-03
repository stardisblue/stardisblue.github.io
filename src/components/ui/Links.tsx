import { wedge } from '../utils';

export function Links({ links }: { links: React.ReactNode[] }) {
  return (
    <>
      <span className="sr-only">liens : </span>
      {wedge(
        links.map((link, i) => (
          <span key={i} className="font-mono">
            {link}
          </span>
        )),
        ' · '
      )}
    </>
  );
}
