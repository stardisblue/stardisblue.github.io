import classNames from 'classnames';
import { HTMLAttributes } from 'react';

export const Heading = ({
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
    className={classNames(
      className,
      'font-serif',
      'font-bold',
      'small-caps',
      'mb-2'
    )}
    {...props}
  />
);

export const Heading1 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h1',
    className: classNames(className, 'text-3xl'),
    ...props,
  });

export const Heading2 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h2',
    className: classNames(className, 'text-2xl'),
    ...props,
  });

export const Heading3 = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h3',
    className: classNames(className, 'text-xl'),
    ...props,
  });

export const Heading4 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({ variant: 'h4', ...props });
