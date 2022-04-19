import React from 'react';
import { DateType } from '../../model';
import { Time } from './Time';

export const Times: React.FC<{
  dates: [DateType, DateType];
  form?: string;
  nospaces?: boolean;
  locale?: Locale;
}> = ({ dates: [start, end], form, nospaces, locale }) => (
  <>
    <Time date={start} form={form} locale={locale} />
    {nospaces ? '-' : ' - '}
    <Time date={end} form={form} locale={locale} />
  </>
);
