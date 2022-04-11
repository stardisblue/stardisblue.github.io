import React from 'react';
import classnames from 'classnames';

export const Links: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  children,
  ...props
}) => {
  const newChildren = React.Children.toArray(children)
    .flatMap((c, i) => [<span key={i + '__sep'} className="pl2"></span>, c])
    .slice(1);
  return (
    <span {...props} className={classnames('flex', className)}>
      {newChildren}
    </span>
  );
};
export default Links;
