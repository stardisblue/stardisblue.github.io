import React from 'react';
import Collapsible from './Collapsible';
import * as icons from './icons';
type LinkProps = {
  className?: string;
  collapsible?: keyof typeof icons;
  title?: string;
  external?: boolean;
};

export const Link: React.FC<
  LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
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
      target={external ? '_blank' : null}
      rel={external ? 'noopener noreferrer' : null}
      {...attrs}
    >
      {content}
    </a>
  );
};
