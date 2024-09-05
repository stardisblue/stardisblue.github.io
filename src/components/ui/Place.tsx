import classNames from 'classnames';

export function Place({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={classNames(
        "before:content-['🗺️']",
        'whitespace-nowrap',
        'before:not-italic',
        'me-1',
        'last:me-0',
        className
      )}
      {...props}
    >
      <span className="sr-only">lieu : </span>
      {children}
    </span>
  );
}
