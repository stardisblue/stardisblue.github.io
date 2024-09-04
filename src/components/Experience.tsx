import { Place as UIPlace } from './ui';

export function Place(props: React.HTMLAttributes<HTMLSpanElement>) {
  return <UIPlace className="float-right ml-4" {...props} />;
}
