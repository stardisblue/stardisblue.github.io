import { LinkType } from '@/model';
import React from 'react';
import { AutoLink } from '../typography';

type Props = Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  values: LinkType[];
};

export function Links({ className, values, ...props }: Props) {
  return (
    <span {...props} className={className}>
      {values
        .flatMap((v, i) => [
          <span key={i + '__sep'} className="pl-1" />,
          <AutoLink key={i} value={v} />,
        ])
        .slice(1)}
    </span>
  );
}
