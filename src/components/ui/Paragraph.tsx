import React from 'react';
import classnames from 'classnames';
import { HTMLAttributes } from 'react';

export const Paragraph: React.FC<
  { measure?: 'wide' | 'narrow' | true } & HTMLAttributes<HTMLParagraphElement>
> = ({ children, className, measure = 'wide', ...attrs }) => (
  <p
    className={classnames(
      {
        [measure !== true ? 'measure-' + measure : 'measure']: true,
      },
      'lh-copy',
      className
    )}
    {...attrs}
  >
    {children}
  </p>
);
