import React from 'react';

type Props = {
  title: any;
  dashed?: boolean;
  comma?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function InlineTitle({
  title,
  className = 'space',
  children,
  dashed,
  comma,
}: Props) {
  return (
    <div className={className}>
      <h4 className="inline-block mv-0">{title}</h4>
      <span>
        {dashed && ' – '}
        {comma && ', '}
        {children}
      </span>
    </div>
  );
}
