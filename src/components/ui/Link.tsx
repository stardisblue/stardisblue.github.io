import React from 'react';
import { Collapsible } from '.';
import { LinkType, StrictLinkType } from '@/model';
import * as icons from './icons';

type Props = StrictLinkType & {
  className?: string;
};

export function Link({ name, href, title, kind, className }: Props) {
  name = name || href;

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
}

export function AutoLink({ children }: { children: LinkType }) {
  if (typeof children === 'string') {
    return <Link href={children} />;
  }
  return <Link {...children} />;
}
