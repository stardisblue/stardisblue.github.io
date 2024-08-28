import React from 'react';
import { Text } from './typography';

type Props = {
  title: any;
  dashed?: boolean;
  comma?: boolean;
  className?: string;
  children: React.ReactNode;
};
export function InlineTitle({ title, children, dashed, comma }: Props) {
  return (
    <Text as="div">
      <h4 className="inline-block mv-0 font-semibold">{title}</h4>
      <Text className="inline">
        {dashed && ' – '}
        {comma && ', '}
        {children}
      </Text>
    </Text>
  );
}
