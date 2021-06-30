import React from 'react';
import styled from 'styled-components/macro';

export const Links: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => <span {...props} className={`flex ${className}`} />;
export default Links;
