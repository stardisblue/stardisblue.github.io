import { Link, MetaData } from '@/components/ui';

export function Reviewer() {
  return (
    <article>
      <MetaData date="2023" dateFormat="y">
        <Link href="https://www.computer.org/csdl/journal/tg" icon>
          TVCG 2023
        </Link>
      </MetaData>
      <h4 className="mt-0">
        IEEE Transactions on Visualization and Computer Graphics (TVCG) 2023
      </h4>
      <p>1 paper</p>
    </article>
  );
}
