import React from 'react';
import { GH } from './URL';
import { TableOfContent } from './TableOfContent';
import { Link, Links, HR } from './ui';

export const Header: React.FC = () => (
  <header>
    <h1 className="helvetica mb0">Fati CHEN</h1>
    <h2 className="f4 i normal mb3 mt0">
      Ph.D. Student in Visual Analytics <span className="fs-normal">📊</span>
    </h2>

    <div className="flex flex-wrap justify-between">
      <Links>
        <Link
          href="mailto:fati.chen@lirmm.fr"
          title="fati.chen@lirmm.fr"
          className="link"
        >
          ✉ fati.chen@lirmm.fr
        </Link>
        <GH gh="stardisblue" className="link ml2" />
        <Link
          href="https://observablehq.com/@stardisblue"
          title="@stardisblue"
          className="link ml2"
          collapsible="Observable"
        >
          @stardisblue
        </Link>
      </Links>
      <TableOfContent show={false} />
    </div>
    <HR />
  </header>
);
