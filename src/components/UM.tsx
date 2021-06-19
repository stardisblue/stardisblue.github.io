import React from 'react';
import { A } from '../components/ui/A';

export const UM: React.FC = ({ children }) => (
  <A href="https://www.umontpellier.fr/" title="Université de Montpellier">
    {children}
  </A>
);
