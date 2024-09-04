import { Keywords, Links, Place as UIPlace, TimeInterval } from './ui';

export function ExperienceMetaData({
  dates: [start, end],
  dateFormat: dateFormat,
  links,
  keywords,
}: {
  dates: [string, string];
  dateFormat?: string;
  links?: React.ReactNode[];
  keywords?: string[];
}) {
  return (
    <small>
      <TimeInterval start={start} end={end} form={dateFormat} />{' '}
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
