import { HTMLAttributes } from 'react';

const Heading = ({
  variant: Variant,
  ...props
}: {
  variant: React.ElementType<
    HTMLAttributes<HTMLHeadingElement>,
    'h1' | 'h2' | 'h3' | 'h4'
  >;
} & React.HTMLAttributes<HTMLHeadingElement>) => <Variant {...props} />;

/** @deprecated use <h1> */
export const Heading1 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h1',
    ...props,
  });

/** @deprecated use <h2>  */
export const Heading2 = (props: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h2',
    ...props,
  });
