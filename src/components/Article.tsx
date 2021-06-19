import React from 'react';

export const Article: React.FC<{ title: any; attrs?: any }> = ({
  title,
  attrs,
  children,
}) => (
  <article {...attrs}>
    <h3 className="helvetica">{title}</h3>
    {children}
  </article>
);
