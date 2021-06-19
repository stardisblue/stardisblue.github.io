import React, { AnchorHTMLAttributes } from 'react';
import { A } from '../components/ui/A';

export const GitHub: React.FC<
  { gh: string } & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ gh, children, ...props }) => (
  <A {...props} href={'https://github.com/' + gh}>
    {children ?? gh}
  </A>
);
