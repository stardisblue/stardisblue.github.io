import classNames from 'classnames';
import { Place } from './Place';
import { Time } from './Time';
import { TimeInterval } from './TimeInterval';

type Props = {
  date: string | [string, string];
  dateFormat?: string;
  place?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function MetaData({
  date,
  dateFormat,
  place,
  children,
  className,
}: Props) {
  const dateNode = Array.isArray(date) ? (
    <TimeInterval start={date[0]} end={date[1]} form={dateFormat} />
  ) : (
    <i className="me-1 last:me-0">
      <span className="sr-only">date : </span>
      <Time date={date} form={dateFormat} />
    </i>
  );

  return (
    <small className={classNames('metadata mb-1 block', className)}>
      {dateNode} {place && <Place>{place}</Place>} {children}
    </small>
  );
}
