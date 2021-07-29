import React, { HtmlHTMLAttributes } from 'react';

export const Section: React.FC<HtmlHTMLAttributes<HTMLElement>> = ({
  title,
  children,
  ...attrs
}) => (
  <section
    id={`sec-${title.toLocaleLowerCase().replace(/[^a-z]+/g, '-')}`}
    {...attrs}
  >
    <h2 className="f3 helvetica">{title}</h2>
    {children}
  </section>
);
export default Section;
