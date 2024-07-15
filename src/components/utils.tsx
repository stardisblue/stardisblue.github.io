import React from 'react';

/** @deprecated */
export const If: <T>(
  cond: T | null | undefined,
  children?: (cond: T) => React.ReactNode
) => JSX.Element | null = (cond, children = (c) => c) => {
  if (!cond) return null;

  return <>{children(cond)}</>;
};

/** @deprecated */
export const IfMap: <T>(
  cond: T[] | null | undefined,
  children?: (cond: T, i: number) => React.ReactNode
) => JSX.Element | null = (cond, children = (c) => c) => {
  if (!cond) return null;

  return <>{cond.map(children)}</>;
};
