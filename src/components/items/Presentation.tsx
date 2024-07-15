import { fr, Locale } from 'date-fns/locale';
import React from 'react';
import { PresentationType } from '@/model';
import { AutoLink, AutoOrg, Links, Time } from '../ui';
import { IfMap } from '../utils';

const Presentation: React.FC<PresentationType & { locale?: Locale }> = ({
  title,
  status,
  organisation,
  location,
  event,
  participation,
  date,
  links,
  locale = fr,
}) => (
  <div className="space">
    <h4>{title}</h4>
    <span>
      <span>{status}</span>,{' '}
      <em>
        {event}
        {<AutoOrg join=" ">{organisation}</AutoOrg>},{' '}
      </em>
      {location}
      <span>
        {IfMap(participation, (org, i) => (
          <AutoOrg join=", " key={i} children={org} />
        ))}
      </span>
      , <Time date={date} locale={locale} />.{' '}
      <Links>
        {IfMap(links, (l, i) => (
          <AutoLink key={i}>{l}</AutoLink>
        ))}
      </Links>
    </span>
  </div>
);

export default Presentation;
