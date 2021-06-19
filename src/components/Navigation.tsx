import React from 'react';
import { TOC } from './TOC';

export const Navigation: React.FC = () => (
  <div className="flex flex-wrap justify-end">
    <em className="gray mr2">Navigation</em>
    <TOC />
  </div>
);
