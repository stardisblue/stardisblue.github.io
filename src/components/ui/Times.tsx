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

export function Times({ dates: [start, end], form, nospaces, locale }: Props) {
  return (
    <>
      <Time date={start} form={form} locale={locale} />
      {nospaces ? '-' : ' - '}
      <Time date={end} form={form} locale={locale} />
    </>
  );
}
