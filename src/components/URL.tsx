import React, { AnchorHTMLAttributes } from 'react';
import { A } from './ui';

export const UM: React.FC = ({ children }) => (
  <A href="https://www.umontpellier.fr/" title="Université de Montpellier">
    {children ?? 'University of Montpellier'}
  </A>
);

/**
 * @deprecated
 */
export const GitHub: React.FC<
  { gh: string } & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ gh, children, ...props }) => (
  <A {...props} href={'https://github.com/' + gh}>
    {children ?? gh}
  </A>
);

export const GH: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & { gh: string }
> = ({ gh, ...props }) => (
  <A
    href={'https://github.com/' + gh}
    title={gh}
    collapsible="Github"
    {...props}
  >
    {gh}
  </A>
);

export const HAL: React.FC<
  { hal: string } & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ hal, children, ...props }) => (
  <A {...props} href={'https://hal-lirmm.ccsd.cnrs.fr/' + hal}>
    {children}
  </A>
);

export const DOI: React.FC<{ doi: string }> = ({ doi }) => (
  <A href={'https://dx.doi.org/' + doi} title={'doi:' + doi}>
    {doi}
  </A>
);

export const Polytech: React.FC = ({ children }) => (
  <A href="https://www.polytech.umontpellier.fr/" title="Polytech Montpellier">
    {children ?? 'POLYTECH Montpellier'}
  </A>
);

export const LIRMM: React.FC = ({ children }) => (
  <A
    href="https://www.lirmm.fr/"
    title="Laboratoire d'Informatique, de Robotique et de Microélectronique de Montpellier"
  >
    {children ?? 'LIRMM'}
  </A>
);
