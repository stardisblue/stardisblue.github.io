import { wedge } from '../utils';

/** @deprecated use Tags instead */
export function Keywords({ children }: { children: string[] }) {
  return (
    <span className="before:font-mono before:content-['#['] after:font-mono after:content-[']']">
      <span className="sr-only">tags : </span>
      {wedge(
        children.map((tag) => (
          <code key={tag} className="bg-gray-100 whitespace-nowrap">
            {tag}
          </code>
        )),
        ', '
      )}
    </span>
  );
}

export function Tags({ children }: { children: string }) {
  const tags = children.split(/, */);
  return (
    <span className="before:font-mono before:content-['#['] after:font-mono after:content-[']']">
      <span className="sr-only">tags : </span>
      {wedge(
        tags.map((tag) => (
          <code key={tag} className="bg-gray-100 whitespace-nowrap">
            {tag}
          </code>
        )),
        ', '
      )}
    </span>
  );
}
