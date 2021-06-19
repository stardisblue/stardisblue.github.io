import React, { AnchorHTMLAttributes } from 'react';
import { A } from '../components/ui/A';

export const HAL: React.FC<
  { hal: string } & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ hal, children, ...props }) => (
  <A {...props} href={'https://hal-lirmm.ccsd.cnrs.fr/' + hal}>
    {children}
  </A>
);
