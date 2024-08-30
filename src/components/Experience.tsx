import { TimeInterval } from './ui';
import { Heading, Heading3 as Title } from './ui/typography';

export function Experience({
  title,
  place,
  dates: [start, end],
  timeFormat,
  keywords,
  links,
  children,
}: {
  title: React.ReactNode;
  place: React.ReactNode;
  dates: [string, string];
  keywords?: string[];
  links?: React.ReactNode[];
  timeFormat?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="mb-4">
      <Place children={place} />
      <Title>{title}</Title>
      <TimeInterval start={start} end={end} form={timeFormat} />
      {links && (
        <small className="font-mono">
          {wedge(links, <span className="font-sans"> · </span>)}
        </small>
      )}
      {keywords && <Keywords children={keywords} />}
      {children && <div className="prose">{children}</div>}
    </article>
  );
}

export function ExperienceGroup({
  title,
  place,
  children,
}: {
  title: React.ReactNode;
  place: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <article className="mb-4">
      <Place children={place} />
      <Title>{title}</Title>
      {children}
    </article>
  );
}

export function SubExperience({
  title,
  place,
  children,
  start,
  end,
  keywords,
  links,
}: {
  title: React.ReactNode;
  place?: React.ReactNode;
  start: string;
  end: string;
  keywords?: string[];
  links?: React.ReactNode[];
  children: React.ReactNode;
}) {
  return (
    <article className="mb-4">
      {place && <Place children={place} />}
      <Heading variant="h4">{title}</Heading>
      <TimeInterval start={start} end={end} />
      {links && <small>{wedge(links, ' · ')}</small>}
      {keywords && <Keywords children={keywords} />}
      <div className="prose">{children}</div>
    </article>
  );
}

function Keywords({ children }: { children: string[] }) {
  return (
    <div className="inline-block">
      <div className="flex flex-wrap items-center before:font-mono before:content-['#['] after:font-mono  after:content-[']'] *:bg-gray-100">
        {wedge(
          children.map((tag) => (
            <small className="px-1 ms-1 font-mono whitespace-nowrap">
              {tag}
            </small>
          )),
          ', '
        )}
      </div>
    </div>
  );
}

function Place({ children }: { children: React.ReactNode }) {
  return (
    <span className="before:content-['🗺️'] whitespace-nowrap float-right">
      {children}
    </span>
  );
}

function wedge<T, S = T>(array: T[], separator: S) {
  return array.flatMap((v) => [v, separator]).slice(0, -1);
}
