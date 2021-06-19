import React, { AnchorHTMLAttributes } from 'react';
import { A } from './ui/A';
import { Collapsible } from './ui/Collapsible';
import { Github } from 'react-bootstrap-icons';

export const GH: React.FC<
  AnchorHTMLAttributes<HTMLAnchorElement> & { gh: string }
> = ({ gh, ...props }) => (
  <A href={'https://github.com/' + gh} title={gh} {...props}>
    <Collapsible className="items-baseline" title={gh}>
      <Github />
    </Collapsible>
  </A>
);
