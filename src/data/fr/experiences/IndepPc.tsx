import { Experience } from '@/components/Experience';

export function IndepPc() {
  return (
    <Experience
      title="Développement Web, services hardware"
      place="Nîmes, Montpellier"
      dates={['2015', '2018']}
      timeFormat="y"
      keywords={['Wordpress', 'Prestashop', 'Joomla', 'CakePHP']}
    />
  );
}
