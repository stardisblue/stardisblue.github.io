import { fr, Locale } from 'date-fns/locale';
import React from 'react';
import { PresentationType } from '@/model';
import { Links, Time } from '../ui';
import { IfMap } from '../utils';
import { AutoOrg } from '../ui/typography';

type Props = Omit<PresentationType, 'location'> & {
  location: string;
  locale?: Locale;
};

export function Presentation({
  title,
  status,
  organisation,
  location,
  event,
  participation,
  date,
  links,
  locale = fr,
}: Props) {
  return (
    <div className="space">
      <h4>{title}</h4>
      <span>
        <span>{status}</span>,{' '}
        <em>
          {event}
          {organisation && <AutoOrg join=" " value={organisation} />},{' '}
        </em>
        {location}
        <span>
          {IfMap(participation, (org, i) => (
            <AutoOrg join=", " key={i} value={org} />
          ))}
        </span>
        , <Time date={date} locale={locale} />.
        {links && <Links values={links} />}
      </span>
    </div>
  );
}
