import { Keywords, Links, Place as UIPlace, TimeInterval } from './ui';

export function ExperienceMetaData({
  dates: [start, end],
  timeFormat,
  links,
  keywords,
}: {
  dates: [string, string];
  timeFormat?: string | undefined;
  links?: React.ReactNode[];
  keywords?: string[] | undefined;
}) {
  return (
    <small>
      <TimeInterval start={start} end={end} form={timeFormat} />{' '}
      {links && (
        <>
          <Links links={links} />{' '}
        </>
      )}
      {keywords && <Keywords children={keywords} />}
    </small>
  );
}

export function Place(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <UIPlace className="float-right ml-4" {...props} />;
}
