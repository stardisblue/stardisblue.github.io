import React from 'react';
import { A } from '../components/A';

export const LIRMM: React.FC = ({ children }) => (
  <A
    href="http://www.lirmm.fr/"
    title="Laboratoire d'Informatique, de Robotique et de Microélectronique de Montpellier"
  >
    {children}
  </A>
);
