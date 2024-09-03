import React from 'react';
import { Time } from './Time';
import { Locale } from 'date-fns';

export function TimeInterval({
  start,
  end,
  ...props
}: {
  start: string;
  end: string;
  form?: string;
  locale?: Locale;
}) {
  const sameYear = start.slice(0, 4) === end.slice(0, 4);

  return (
    <i>
      <span className="sr-only">dates : </span>
      <Time
        date={start}
        {...props}
        form={props.form || !sameYear ? props.form : 'MMM'}
      />{' '}
      – <Time date={end} {...props} />
    </i>
  );
}
