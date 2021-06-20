import React, { HTMLAttributes } from 'react';

export const Links: React.FC<HTMLAttributes<HTMLSpanElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <span className={`flex ${className}`} {...props}>
    {children}
  </span>
);

export default Links;
