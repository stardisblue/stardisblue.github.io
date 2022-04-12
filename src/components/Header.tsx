import React from 'react';
import { TableOfContent, TOC } from './TableOfContent';
import { Links } from './ui';
import styled from 'styled-components/macro';
import { Link } from './ui/Link';

const PrintableHeader = styled.header`
  @media print {
    display: flex;

    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;

    & > div {
      width: 100%;
    }
  }
`;

export const Header: React.FC<{ subtitle: React.ReactNode; toc: TOC[] }> = ({
  subtitle,
  toc,
}) => (
  <PrintableHeader>
    <h1 className="f1 helvetica mb0">Fati Chen</h1>
    <h2 className="f2 i normal georgia mb3 mt0">{subtitle}</h2>
    <div className="flex flex-wrap justify-between">
      <Links>
        <Link
          className="link"
          name="🌐 stardis.blue"
          href="https://stardis.blue"
        />
        <Link
          className="link"
          name="✉ chen.fati@gmail.com"
          href="mailto:chen.fati@gmail.com"
          title="chen.fati@gmail.com"
        />

        <Link
          kind="Github"
          href="https://github.com/stardisblue"
          name="stardisblue"
        />
        <Link
          kind="Observable"
          name="@stardisblue"
          href="https://observablehq.com/@stardisblue"
        />
        <Link
          kind="Linkedin"
          name="Fati Chen"
          href="https://www.linkedin.com/in/fati-chen/"
          title="fati-chen"
        />
      </Links>
      <TableOfContent show={false} sections={toc} />
    </div>
    <hr />
  </PrintableHeader>
);
