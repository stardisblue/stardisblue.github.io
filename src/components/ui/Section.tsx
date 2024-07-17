import classNames from 'classnames';
import { Open_Sans } from 'next/font/google';
import React, { HtmlHTMLAttributes } from 'react';

const tinos = Open_Sans({ weight: '500', subsets: ['latin'] });

type Props = HtmlHTMLAttributes<HTMLElement> & {
  emoji?: string;
};

export function Section({ title = '', children, emoji, ...attrs }: Props) {
  return (
    <section
      id={`sec--${title.toLocaleLowerCase().replace(/[^a-z]+/g, '-')}`}
      {...attrs}
    >
      <h2 className={classNames(tinos.className, 'text-xl', 'mb-2', 'mt-1')}>
        {emoji} {title}
      </h2>
      {children}
    </section>
  );
}
