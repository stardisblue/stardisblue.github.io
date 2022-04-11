import React from 'react';
import { OrganisationType, StrictOrganisationType } from '../../model';
import { Link } from './Link';

export const Org: React.FC<
  StrictOrganisationType & { suppress?: boolean; join?: string; link?: boolean }
> = (props) => {
  const suppress = props.suppress === undefined ? true : props.suppress;
  const location = props.location ? `, ${props.location}` : undefined;

  if (props.url)
    return (
      <>
        {props.join && props.join + ((props.link && props.prefix) || '')}
        <Link name={props.name} title={props.title} href={props.url} />
        {!suppress && location}
      </>
    );

  return (
    <span title={props.title}>
      {props.join && props.join + ((props.link && props.prefix) || '')}
      {props.name}
      {!suppress && location}
    </span>
  );
};
export const AutoOrg: React.FC<{
  suppress?: boolean;
  join?: string;
  link?: boolean;
  children?: OrganisationType;
}> = ({ children, suppress, join, link }) => {
  if (!children) return null;
  if (typeof children === 'string') return <>{children}</>;

  return <Org join={join} link={link} suppress={suppress} {...children} />;
};
