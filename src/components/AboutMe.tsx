import React from 'react';
import { Section } from './ui';

export const AboutMe: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <Section emoji="👨‍💻" title={title} className="noprint" children={children} />
  );
};
