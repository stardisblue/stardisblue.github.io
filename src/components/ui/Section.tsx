import React, { HtmlHTMLAttributes } from 'react';

export const Section: React.FC<{
  title: string;
  attrs?: HtmlHTMLAttributes<HTMLElement>;
}> = ({ title, children = '', attrs = {} }) => (
  <section
    id={`sec-${title.toLocaleLowerCase().replace(/[^a-z]+/g, '-')}`}
    {...attrs}
  >
    <h2 className="helvetica">{title}</h2>
    {children}
  </section>
);

export default Section;
