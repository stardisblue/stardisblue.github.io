import classnames from 'classnames';
import React from 'react';

export const Links: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
  className,
  ...props
}) => <span {...props} className={classnames('flex', className)} />;
export default Links;
