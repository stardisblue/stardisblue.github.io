import fr from 'date-fns/esm/locale/fr';
import React from 'react';
import { PresentationType } from '../../model';
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
    <h4 className="noprint">{title}</h4>
    <span>
      <h4 className="print dib mv0">{status}</h4>
      <span className="noprint">{status}</span>,{' '}
      <em>
        {event}
        {<AutoOrg join=" ">{organisation}</AutoOrg>},{' '}
      </em>
      {location}
      <span className="noprint">
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
