import React from 'react';

export const Authors: React.FC = ({ children }) => (
  <>
    <em className="print"> et al</em>
    <span className="noprint">{children}</span>
  </>
);
