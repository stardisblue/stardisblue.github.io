import React from 'react';
import { format, parseISO } from 'date-fns/esm';
import { fr } from 'date-fns/esm/locale';
import { DateType } from '../../model';
import { capitalize } from 'lodash';

export const Time: React.FC<{
  date: DateType;
  form?: string;
  locale?: Locale;
}> = ({ date, form = 'MMM y', locale = fr }) => {
  if (typeof date !== 'string') [date, form] = date;

  return (
    <time dateTime={date}>
      {capitalize(format(parseISO(date), form, { locale }))}
    </time>
  );
};
