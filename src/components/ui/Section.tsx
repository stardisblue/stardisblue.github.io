import React, { HtmlHTMLAttributes } from 'react';

type Props = HtmlHTMLAttributes<HTMLElement> & {
  emoji?: string;
};

export function Section({ title = '', children, emoji, ...attrs }: Props) {
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
}
