import React, { AnchorHTMLAttributes } from 'react';

export const A: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);

export default A;
