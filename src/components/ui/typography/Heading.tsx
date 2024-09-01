import classNames from 'classnames';
import { HTMLAttributes } from 'react';

const Heading = ({
  variant: Variant,
  className,
  ...props
}: {
  variant: React.ElementType<
    HTMLAttributes<HTMLHeadingElement>,
    'h1' | 'h2' | 'h3' | 'h4'
  >;
} & React.HTMLAttributes<HTMLHeadingElement>) => (
  <Variant
    className={classNames('text-pretty', 'font-serif', 'small-caps', className)}
    {...props}
  />
);

export const Heading1 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h1',
    className: classNames(
      'font-extrabold',
      'text-[2.25em]/[1.11]',
      'mt-0',
      'mb-[0.89em]',
      className
    ),
    ...props,
  });

export const Heading2 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h2',
    className: classNames(
      'font-bold',
      'text-[1.5em]/[1.33]',
      'mt-[2em]',
      'mb-[1em]',
      className
    ),
    ...props,
  });

export const Heading3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h3',
    className: classNames(
      'font-semibold',
      'text-[1.25em]/[1.6]',
      'mt-[1.6em]',
      'mb-[0.6em]',
      className
    ),
    ...props,
  });

export const Heading4 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h4',
    className: classNames(
      'font-semibold',
      'mt-[1.5em]',
      'mb-[0.5em]',
      'leading-[1.5]',
      className
    ),
    ...props,
  });
