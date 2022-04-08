import React from 'react';
import { GH } from './URL';
import { TableOfContent } from './TableOfContent';
import { A, Links, HR } from './ui';
import styled from 'styled-components/macro';

const PrintableHeader = styled.header`
  @media print {
    display: flex;

    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;

    div {
      width: 100%;
    }
  }
`;

export const Header: React.FC<{ subtitle: JSX.Element }> = ({ subtitle }) => (
  <PrintableHeader>
    <h1 className="f1 helvetica mb0">Fati CHEN</h1>
    <h2 className="f2 i normal mb3 mt0">{subtitle}</h2>

    <div className="flex flex-wrap justify-between">
      <Links>
        <A href="https://stardis.blue" className="link">
          🌐 stardis.blue
        </A>
        <A
          href="mailto:fati.chen@lirmm.fr"
          title="fati.chen@lirmm.fr"
          className="link ml2"
        >
          ✉ fati.chen@lirmm.fr
        </A>
        <GH gh="stardisblue" className="link ml2" />
        <A
          href="https://observablehq.com/@stardisblue"
          title="@stardisblue"
          className="link ml2"
          collapsible="Observable"
        >
          @stardisblue
        </A>
      </Links>
      <TableOfContent show={false} />
    </div>
    <HR />
  </PrintableHeader>
);
