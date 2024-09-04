import classNames from 'classnames';
import {
  Doi,
  Github,
  Hal,
  LinkedIn,
  Link as LinkIcon,
  Observable,
} from './icons';

export function Link({
  className,
  icon: Icon = LinkIcon,
  iconless = false,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  icon?: React.ElementType;
  iconless?: boolean;
}) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        className,
        'underline',
        'text-blue-600',
        'hover:text-blue-800',
        'visited:text-purple-600'
      )}
      {...props}
    >
      {!iconless && <Icon />}
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
    icon?: React.ElementType;
    iconless?: boolean;
  }) => {
    return (
      <Link
        href={`${baseUrl}${href}`}
        title={`${prefix}:${href}`}
        icon={Icon}
        className={classNames(baseClassName, className)}
        {...props}
      />
    );
  };
}
