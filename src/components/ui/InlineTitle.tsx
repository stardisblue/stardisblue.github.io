import React from 'react';

const InlineTitle: React.FC<{
  title: any;
  dashed?: boolean;
  comma?: boolean;
  className?: string;
}> = ({ title, className = 'space', children, dashed, comma }) => (
  <div className={className}>
    <h4 className="dib mv0">{title}</h4>
    <span>
      {dashed && ' – '}
      {comma && ', '}
      {children}
    </span>
  </div>
);
export default InlineTitle;
