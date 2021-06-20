import React, { AnchorHTMLAttributes } from 'react';
import { A, Collapsible } from './ui';
import { Github as GithubIcon } from './icons';

export const UM: React.FC = ({ children }) => (
  <A href="https://www.umontpellier.fr/" title="Université de Montpellier">
    {children}
  </A>
);

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
  <A href={'https://github.com/' + gh} title={gh} {...props}>
    <Collapsible className="items-baseline" title={gh}>
      <GithubIcon />
    </Collapsible>
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

export const PT: React.FC = ({ children }) => (
  <A href="https://www.polytech.umontpellier.fr/" title="Polytech Montpellier">
    {children}
  </A>
);

export const LIRMM: React.FC = ({ children }) => (
  <A
    href="http://www.lirmm.fr/"
    title="Laboratoire d'Informatique, de Robotique et de Microélectronique de Montpellier"
  >
    {children}
  </A>
);
