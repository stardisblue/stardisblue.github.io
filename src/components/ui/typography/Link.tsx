import classNames from 'classnames';

export function Link({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        className,
        'underline text-blue-600',
        'hover:text-blue-800',
        'visited:text-purple-600'
      )}
      {...props}
    />
  );
}
