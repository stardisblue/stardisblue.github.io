import React from 'react';
import { DateType } from '../../model';
import { Time } from './Time';

export const Times: React.FC<{
  dates: [DateType, DateType];
  form?: string;
  spaces?: boolean;
  locale?: Locale;
}> = ({ dates: [start, end], form, spaces = true, locale }) => (
  <>
    <Time date={start} form={form} locale={locale} />
    {spaces && ' '}-{spaces && ' '}
    <Time date={end} form={form} locale={locale} />
  </>
);
