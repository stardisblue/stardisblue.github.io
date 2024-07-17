import classNames from 'classnames';

export function Text({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={classNames(
        'mb-2',
        'leading-normal',
        'text-balance',
        'w-[30em]',
        className
      )}
      {...props}
    />
  );
}
