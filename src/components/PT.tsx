import React from 'react';
import { A } from '../components/ui/A';

export const PT: React.FC = ({ children }) => (
  <A href="https://www.polytech.umontpellier.fr/" title="Polytech Montpellier">
    {children}
  </A>
);
