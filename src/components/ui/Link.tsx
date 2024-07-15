import classnames from 'classnames';
import React from 'react';
import { Collapsible } from '.';
import { LinkType, StrictLinkType } from '../../model';
import * as icons from './icons';

export const Link: React.FC<StrictLinkType & { className?: string }> = ({
  name,
  href,
  print,
  title,
  kind,
  className,
}) => {
  name = name || href;

  className = classnames(className, {
    print: print === undefined ? '' : print === true ? 'print' : 'noprint',
  });

  if (kind) {
    const Icon: any = icons[kind];
    const content = (
      <Collapsible title={name}>
        <Icon />
      </Collapsible>
    );

    return (
      <a
        className={className + ' link'}
        href={href}
        title={title || name}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
  return (
    <a
      className={className}
      href={href}
      title={title || name}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
};

export const AutoLink = ({ children }: { children: LinkType }) => {
  if (typeof children === 'string') {
    return <Link href={children} />;
  }
  return <Link {...children} />;
};
