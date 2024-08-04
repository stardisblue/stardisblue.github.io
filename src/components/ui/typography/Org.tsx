import React from 'react';
import type { OrganisationLike, Organisation } from '@/model';
import { Link } from './Link';

type ModifiersProps = {
  suppress?: boolean;
  join?: string;
  link?: boolean;
};

type Props = Organisation & ModifiersProps;
type AutoOrgProps = ModifiersProps & { value: OrganisationLike };

export const Org = ({
  suppress = true,
  location,
  url,
  join,
  title,
  name,
  link,
  prefix,
}: Props) => {
  location &&= `, ${location}`;

  if (url)
    return (
      <>
        {join && join + ((link && prefix) || '')}
        <Link name={name} title={title} href={url} />
        {!suppress && location}
      </>
    );

  return (
    <span title={title}>
      {join && join + ((link && prefix) || '')}
      {name}
      {!suppress && location}
    </span>
  );
};

export const AutoOrg = ({ value, suppress, join, link }: AutoOrgProps) => {
  if (typeof value === 'string') return value;

  return <Org join={join} link={link} suppress={suppress} {...value} />;
};
