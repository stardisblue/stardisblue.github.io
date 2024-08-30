import classNames from 'classnames';
import { Open_Sans } from 'next/font/google';
import { Heading2 as SectionTitle } from './typography';

const tinos = Open_Sans({ weight: '500', subsets: ['latin'] });

type Props = React.HtmlHTMLAttributes<HTMLElement> & {
  emoji?: string;
};

/** @deprecated */
export function DeprecatedSection({
  title = '',
  children,
  emoji,
  ...attrs
}: Props) {
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

export function Section({
  title,
  children,
  className,
  ...props
}: { title: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <section className={classNames(className, 'py-4')} {...props}>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </section>
  );
}
