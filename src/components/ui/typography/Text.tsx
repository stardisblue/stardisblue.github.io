import classNames from 'classnames';

export function Text<T extends JSX.ElementType>({
  className,
  as: As = 'p',
  ...props
}: { as?: any } & React.HTMLAttributes<T>) {
  return (
    <As
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
