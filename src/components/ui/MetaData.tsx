import { Place } from './Place';
import { Time } from './Time';
import { TimeInterval } from './TimeInterval';

type Props = {
  date: string | [string, string];
  dateFormat?: string;
  place?: React.ReactNode;
  children?: React.ReactNode;
};

export function MetaData({ date, dateFormat, place, children }: Props) {
  const dateNode = Array.isArray(date) ? (
    <TimeInterval start={date[0]} end={date[1]} form={dateFormat} />
  ) : (
    <i>
      <span className="sr-only">date : </span>
      <Time date={date} form={dateFormat} />
    </i>
  );

  return (
    <div className="mb-1">
      <small>
        {dateNode}{' '}
        {place && (
          <>
            <Place>{place}</Place>{' '}
          </>
        )}
        {children}
      </small>
    </div>
  );
}
