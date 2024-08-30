import { fr, Locale } from 'date-fns/locale';
import React from 'react';
import { Publication as PublicationType } from '../../model';
import { Authors } from '../Authors';
import { Links, Time } from '../ui';
import { If } from '../utils';
import { AutoLink } from '../ui/typography';

/** @deprecated */
export function Publication({
  title,
  authors,
  date,
  links,
  doi,
  journal,
  prefix,
  suffix,
  locale = fr,
}: PublicationType & {
  locale?: Locale;
}) {
  return (
    <div className="space">
      <h4>
        <AutoLink value={title} />
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
            doi: <AutoLink value={doi} />
          </>
        ))}
      </p>
      <Links values={links} />
    </div>
  );
}
