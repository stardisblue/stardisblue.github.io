import React from 'react';

/** @deprecated */
export const If: <T>(
  cond: T | null | undefined,
  children?: (cond: T) => React.ReactNode
) => JSX.Element | null = (cond, children = (c: any) => c) => {
  if (!cond) return null;

  return <>{children(cond)}</>;
};

/** @deprecated */
export const IfMap: <T>(
  cond: T[] | null | undefined,
  children?: (cond: T, i: number) => React.ReactNode
) => JSX.Element | null = (cond, children = (c: any) => c) => {
  if (!cond) return null;

  return <>{cond.map(children)}</>;
};

export function wedge<T, S = T>(array: T[], separator: S) {
  return array.flatMap((v) => [separator, v]).slice(1);
}
