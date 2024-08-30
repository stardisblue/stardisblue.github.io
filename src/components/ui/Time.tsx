import React from 'react';
import { format, parseISO, Locale } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DateType } from '@/model';
import { capitalize } from 'lodash';

type Props = {
  date: DateType;
  form?: string;
  locale?: Locale;
};

export function Time({ date, form = 'MMM y', locale = fr }: Props) {
  if (typeof date !== 'string') [date, form] = date;

  let formattedDate;
  try {
    formattedDate = format(parseISO(date), form, { locale });
  } catch {
    formattedDate = date;
  }

  return <time dateTime={date}>{capitalize(formattedDate)}</time>;
}
