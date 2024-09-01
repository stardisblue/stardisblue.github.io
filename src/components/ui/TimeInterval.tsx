import React from 'react';
import { DateType } from '@/model';
import { Time } from './Time';
import { Locale } from 'date-fns';

type Props = {
  dates: [DateType, DateType];
  form?: string;
  nospaces?: boolean;
  locale?: Locale;
};

/** @deprecated */
export function Times({ dates: [start, end], form, nospaces, locale }: Props) {
  return (
    <>
      <Time date={start} form={form} locale={locale} />
      {nospaces ? '–' : ' – '}
      <Time date={end} form={form} locale={locale} />
    </>
  );
}

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
        form={sameYear ? 'MMM' : props.form}
      /> – <Time date={end} {...props} />
    </i>
  );
}
