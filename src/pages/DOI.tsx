import React from 'react';
import { A } from '../components/A';

export const DOI: React.FC<{ doi: string }> = ({ doi }) => (
  <A href={'https://dx.doi.org/' + doi} title={'doi:' + doi}>
    {doi}
  </A>
);
