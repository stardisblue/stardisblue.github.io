import { Link } from '@/components/ui';

export const Lirmm = ({ city = false }: { city?: boolean }) => {
  const LirmmLink = (
    <Link
      href="//www.lirmm.fr"
      title="Laboratoire d'Informatique, de Robotique et de Microélectronique de Montpellier"
    >
      LIRMM
    </Link>
  );

  if (!city) return LirmmLink;

  return <>{LirmmLink}, Montpellier</>;
};
