import React, { AnchorHTMLAttributes } from 'react';
import { Link } from './ui';

export const UM: React.FC = ({ children }) => (
  <Link href="https://www.umontpellier.fr/" title="Université de Montpellier">
    {children ?? 'University of Montpellier'}
  </Link>
);

/**
 * @deprecated
 */
export const GitHub: React.FC<
  { gh: string } & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ gh, children, ...props }) => (
  <Link {...props} href={'https://github.com/' + gh}>
    {children ?? gh}
  </Link>
);

export const GH: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & { gh: string }
> = ({ gh, ...props }) => (
  <Link
    href={'https://github.com/' + gh}
    title={gh}
    collapsible="Github"
    {...props}
  >
    {gh}
  </Link>
);

export const HAL: React.FC<
  { hal: string } & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ hal, children, ...props }) => (
  <Link {...props} href={'https://hal-lirmm.ccsd.cnrs.fr/' + hal}>
    {children}
  </Link>
);

export const DOI: React.FC<{ doi: string }> = ({ doi }) => (
  <Link href={'https://dx.doi.org/' + doi} title={'doi:' + doi}>
    {doi}
  </Link>
);

export const Polytech: React.FC = ({ children }) => (
  <Link
    href="https://www.polytech.umontpellier.fr/"
    title="Polytech Montpellier"
  >
    {children ?? 'POLYTECH Montpellier'}
  </Link>
);

export const LIRMM: React.FC = ({ children }) => (
  <Link
    href="https://www.lirmm.fr/"
    title="Laboratoire d'Informatique, de Robotique et de Microélectronique de Montpellier"
  >
    {children ?? 'LIRMM'}
  </Link>
);
