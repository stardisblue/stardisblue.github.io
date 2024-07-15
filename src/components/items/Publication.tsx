import { fr, Locale } from 'date-fns/locale';
import React from 'react';
import { PublicationsType } from '../../model';
import { Authors } from '../Authors';
import { AutoLink, Links, Time } from '../ui';
import { If } from '../utils';

const Publication: React.FC<PublicationsType & { locale?: Locale }> = ({
  title,
  authors,
  date,
  links,
  doi,
  journal,
  prefix,
  suffix,
  locale = fr,
}) => (
  <div className="space">
    <h4>
      <AutoLink>{title}</AutoLink>
    </h4>
    <p>
      <strong>{authors[0]}</strong>
      <Authors>, {authors.slice(1).join(', ')}</Authors>.
      {If(journal, (journal) => (
        <span>
          {' '}
          {prefix} <em>{journal}</em>
          {If(suffix)}.
        </span>
      ))}{' '}
      <Time date={date} locale={locale} />.
      {If(doi, (doi) => (
        <>
          {' '}
          doi: <AutoLink>{doi}</AutoLink>
        </>
      ))}
    </p>
    <Links>
      {links.map((l, i) => (
        <AutoLink key={i}>{l}</AutoLink>
      ))}
    </Links>
  </div>
);

export default Publication;
