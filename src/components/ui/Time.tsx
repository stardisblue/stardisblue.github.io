import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { DateType } from '../../model';
import { capitalize } from 'lodash';

export const Time: React.FC<{
  date: DateType;
  form?: string;
  locale?: Locale;
}> = ({ date, form = 'MMM Y', locale = fr }) => {
  if (typeof date === 'string')
    return (
      <time dateTime={date}>
        {capitalize(format(parseISO(date), form, { locale }))}
      </time>
    );
  const [dateTime, f] = date;
  return (
    <time dateTime={dateTime}>
      {capitalize(format(parseISO(dateTime), f, { locale }))}
    </time>
  );
};
