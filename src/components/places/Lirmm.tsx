import { Link } from '@/components/ui/typography';

export const Lirmm = ({ city = false }: { city?: boolean }) => {
  const LirmmLink = (
    <Link
      href="//www.lirmm.fr"
      title="Laboratoire d'Informatique, de Robotique et de Microélectronique de Montpellier"
      iconless
    >
      LIRMM
    </Link>
  );

  if (!city) return LirmmLink;

  return <>{LirmmLink}, Montpellier</>;
};
