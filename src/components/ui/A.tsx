import React from 'react';
import Collapsible from './Collapsible';
import * as icons from './icons';
type AProps = {
  className?: string;
  collapsible?: keyof typeof icons;
  title?: string;
  external?: boolean;
};

export const A: React.FC<
  AProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ external = true, collapsible = null, children, ...attrs }) => {
  let content = children;
  if (collapsible) {
    const Icon = icons[collapsible];
    content = (
      <Collapsible title={content as string}>
        <Icon />
      </Collapsible>
    );
  }

  return (
    <a
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...attrs}
    >
      {content}
    </a>
  );
};
