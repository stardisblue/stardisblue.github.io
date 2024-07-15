import React from 'react';
import { OrganisationType, StrictOrganisationType } from '../../model';
import { Link } from './Link';

type Props = StrictOrganisationType & {
  suppress?: boolean;
  join?: string;
  link?: boolean;
};

export const Org = ({
  suppress,
  location,
  url,
  join,
  title,
  name,
  link,
  prefix,
}: Props) => {
  suppress ??= true;
  location ??= `, ${location}`;

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
type AutoOrgProps = {
  suppress?: boolean;
  join?: string;
  link?: boolean;
  children?: OrganisationType;
};

export const AutoOrg = ({ children, suppress, join, link }: AutoOrgProps) => {
  if (!children) return null;
  if (typeof children === 'string') return <>{children}</>;

  return <Org join={join} link={link} suppress={suppress} {...children} />;
};
