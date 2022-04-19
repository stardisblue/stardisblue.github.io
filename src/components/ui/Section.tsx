import React, { HtmlHTMLAttributes } from 'react';

export const Section: React.FC<
  HtmlHTMLAttributes<HTMLElement> & { emoji?: string }
> = ({ title = '', children, emoji, ...attrs }) => {
  return (
    <section
      id={`sec--${title.toLocaleLowerCase().replace(/[^a-z]+/g, '-')}`}
      {...attrs}
    >
      <h2>
        {emoji && <span className="normal">{emoji}</span>} {title}
      </h2>
      {children}
    </section>
  );
};
export default Section;
