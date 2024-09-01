import { TimeInterval } from './ui';
import { Heading4, Heading3 as Title } from './ui/typography';
import { wedge } from './utils';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ExperienceMetaData = {
  title: React.ReactNode;
  place: React.ReactNode;
  dates: [string, string];
  keywords?: string[];
  links?: React.ReactNode[];
  timeFormat?: string;
  children?: React.ReactNode;
};

export function Experience({
  title,
  place,
  dates: [start, end],
  timeFormat,
  keywords,
  links,
  children,
}: ExperienceMetaData) {
  return (
    <article className="max-w-prose">
      <Place children={place} />
      <Title>{title}</Title>
      <small>
        <TimeInterval start={start} end={end} form={timeFormat} />{' '}
        {links && (
          <>
            <Links links={links} />{' '}
          </>
        )}
        {keywords && <Keywords children={keywords} />}
      </small>
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
    <article className="max-w-prose">
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
  dates: [start, end],
  keywords,
  links,
}: Optional<ExperienceMetaData, 'place'>) {
  return (
    <>
      {place && <Place children={place} />}
      <Heading4>{title}</Heading4>
      <small>
        <TimeInterval start={start} end={end} />{' '}
        {links && (
          <>
            <Links links={links} />{' '}
          </>
        )}
        {keywords && <Keywords children={keywords} />}
      </small>
      {children && <div className="prose">{children}</div>}
    </>
  );
}

function Links({ links }: { links: React.ReactNode[] }) {
  return (
    <>
      <span className="sr-only">liens : </span>
      {wedge(
        links.map((link) => <span className="font-mono">{link}</span>),
        ' · '
      )}
    </>
  );
}

function Keywords({ children }: { children: string[] }) {
  return (
    <span className="before:font-mono before:content-['#['] after:font-mono after:content-[']']">
      <span className="sr-only">tags : </span>
      {wedge(
        children.map((tag) => (
          <code className="bg-gray-100 whitespace-nowrap font-semibold text-[0.875em] before:content-['`']  after:content-['`']">
            {tag}
          </code>
        )),
        ', '
      )}
    </span>
  );
}

function Place({ children }: { children: React.ReactNode }) {
  return (
    <span className="before:content-['🗺️'] whitespace-nowrap float-right ml-4">
      <span className="sr-only">lieu : </span>
      {children}
    </span>
  );
}
