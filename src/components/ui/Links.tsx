import React from 'react';

type Props = React.HTMLAttributes<HTMLSpanElement>;

export function Links({ className, children, ...props }: Props) {
  const newChildren = React.Children.toArray(children)
    .flatMap((c, i) => [<span key={i + '__sep'} className="pl-2"></span>, c])
    .slice(1);
  return (
    <span {...props} className={className}>
      {newChildren}
    </span>
  );
}
