import classNames from 'classnames';

export function Article({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <article className={classNames('mb-4', 'pl-4', className)} {...props} />
  );
}
