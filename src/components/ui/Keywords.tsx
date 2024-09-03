import { wedge } from '../utils';

export function Keywords({ children }: { children: string[] }) {
  return (
    <span className="before:font-mono before:content-['#['] after:font-mono after:content-[']']">
      <span className="sr-only">tags : </span>
      {wedge(
        children.map((tag) => (
          <code
            key={tag}
            className="bg-gray-100 whitespace-nowrap font-semibold text-[0.875em] before:content-['`']  after:content-['`']"
          >
            {tag}
          </code>
        )),
        ', '
      )}
    </span>
  );
}
