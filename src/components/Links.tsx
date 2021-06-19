import React, { HTMLAttributes } from 'react';

export const Links: React.FC<
  HTMLAttributes<HTMLSpanElement> & {
    children?: (className: string) => React.ReactNode;
  }
> = ({ className = '', children, ...props }) => (
  <span className={`flex ${className}`} {...props}>
    {children && children('link ml2')}
  </span>
);
