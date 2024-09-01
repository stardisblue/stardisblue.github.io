import { Link } from '@/components/ui/typography';

export const Lirmm = ({ city = false }: { city?: boolean }) => {
  const LirmmLink = (
    <Link href="//www.lirmm.fr" iconless>
      LIRMM
    </Link>
  );

  if (!city) return LirmmLink;

  return <>{LirmmLink}, Montpellier</>;
};
