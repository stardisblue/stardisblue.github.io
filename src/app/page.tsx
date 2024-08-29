import {
  Email,
  Github,
  Globe,
  LinkedIn,
  Observable,
} from '@/components/ui/typography/icons';
import { Link } from '@/components/ui/typography/Link';
import classNames from 'classnames';
import React from 'react';

export default function Home() {
  return (
    <main id="CF" className={classNames('ph2-m', 'container', 'mx-auto')}>
      <header>
        <Title>Docteur en Informatique</Title>
        <Subtitle>Data Science & Data Viz</Subtitle>
        <div>
          <Link href="https://stardis.blue">
            <Globe />
            stardis.blue
          </Link>
          {' · '}
          <Link href="mailto:chen.fati@gmail.com">
            <Email />
            chen.fati@gmail.com
          </Link>
          {' · '}
          <Link
            href="https://github.com/stardisblue"
            title="Github:stardisblue"
          >
            <Github />
            stardisblue
          </Link>
          {' · '}
          <Link
            href="https://observablehq.com/@stardisblue"
            title="Observable:@stardisblue"
          >
            <Observable />
            @stardisblue
          </Link>
          {' · '}
          <Link
            href="https://www.linkedin.com/in/fati-chen/"
            title="LinkedIn:fati-chen"
          >
            <LinkedIn />
            Fati Chen
          </Link>
        </div>
      </header>
    </main>
  );
}

const Title = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h1',
    className: classNames(className, 'text-3xl', 'mb-2'),
    ...props,
  });

const Subtitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) =>
  Heading({
    variant: 'h2',
    className: classNames(className, 'text-2xl', 'mb-2'),
    ...props,
  });

const Heading = ({
  variant: Variant,
  className,
  ...props
}: {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & React.HTMLAttributes<HTMLHeadingElement>) => (
  <Variant
    className={classNames('font-serif', 'font-bold', className)}
    {...props}
  />
);
