import React from 'react';

const Section: React.FC<{ title: any; attrs?: any }> = ({
  title,
  children = '',
  attrs = {},
}) => (
  <section
    id={`sec-${title.toLocaleLowerCase().replaceAll(/[^a-z]+/g, '-')}`}
    {...attrs}
  >
    <hr />
    <h2 className="helvetica">{title}</h2>
    {children}
  </section>
);

export default Section;
