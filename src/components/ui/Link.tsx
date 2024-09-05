import classNames from 'classnames';
import { Chain, Doi, Github, Hal, LinkedIn, Observable } from './icons';

export function Link({
  icon: Icon,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: React.ElementType | true;
}) {
  if (Icon === true) Icon = Chain;
  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {Icon && <Icon />}
      {children}
    </a>
  );
}

export const ObservableLink = specialLink(
  '//observablehq.com/',
  Observable,
  'Observable'
);

export const LinkedInLink = specialLink(
  '//www.linkedin.com/',
  LinkedIn,
  'LinkedIn'
);

export const GithubLink = specialLink(
  '//github.com/',
  Github,
  'github',
  'font-mono'
);

export const DoiLink = specialLink('//doi.org/', Doi, 'doi', 'font-mono');

export const HalLink = specialLink(
  '//hal-lirmm.ccsd.cnrs.fr/',
  Hal,
  'hal',
  'font-mono'
);

export function specialLink(
  baseUrl: string,
  icon: React.ElementType,
  prefix: string,
  baseClassName?: string
) {
  return ({
    href,
    title,
    icon: Icon = icon,
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    icon?: React.ElementType | false;
  }) => {
    return (
      <Link
        href={`${baseUrl}${href}`}
        title={`${prefix}:${href}`}
        icon={Icon === false ? undefined : Icon}
        className={classNames(baseClassName, className)}
        {...props}
      />
    );
  };
}
