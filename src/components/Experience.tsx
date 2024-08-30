import { TimeInterval } from './ui';
import { Article } from './ui/Article';
import { Heading, Heading3 as Title } from './ui/typography';
import { wedge } from './utils';

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
    <Article>
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
    </Article>
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
    <Article>
      <Place children={place} />
      <Title>{title}</Title>
      {children}
    </Article>
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
    <Article>
      {place && <Place children={place} />}
      <Heading variant="h4">{title}</Heading>
      <TimeInterval start={start} end={end} />
      {links && <small>{wedge(links, ' · ')}</small>}
      {keywords && <Keywords children={keywords} />}
      <div className="prose">{children}</div>
    </Article>
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
