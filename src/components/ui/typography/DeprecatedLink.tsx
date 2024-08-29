import classNames from 'classnames';
import React from 'react';

import { Collapsible } from '@/components/ui/Collapsible';
import { LinkLike, Link as LinkType } from '@/model';
import * as icons from './deprecated-icons';

/** @deprecated */
export function DeprecatedLink({
  name,
  href,
  title,
  kind,
  className,
}: LinkType & {
  className?: string;
}) {
  name ??= href;

  const anchorProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
    className: classNames(className, 'text-blue-600'),
    href,
    title: title ?? name,
  };

  if (kind) {
    const Icon = icons[kind];

    return (
      <a {...anchorProps}>
        <Collapsible title={name}>
          <Icon />
        </Collapsible>
      </a>
    );
  }

  return <a {...anchorProps}>{name}</a>;
}

/** @deprecated */
export function AutoLink({ value }: { value: LinkLike }) {
  if (typeof value === 'string') {
    return <DeprecatedLink href={value} />;
  }
  return <DeprecatedLink {...value} />;
}
