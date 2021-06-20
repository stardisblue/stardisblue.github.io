import React from 'react';

export const Section: React.FC<{ title: any; attrs?: any }> = ({
  title,
  children = '',
  attrs = {},
}) => (
  <section
    id={`sec-${title.toLocaleLowerCase().replaceAll(/[^a-z]+/g, '-')}`}
    {...attrs}
  >
    <h2 className="helvetica">{title}</h2>
    {children}
  </section>
);

export default Section;
