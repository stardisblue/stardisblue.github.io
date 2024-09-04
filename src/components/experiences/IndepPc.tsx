import { ExperienceMetaData, Place } from '@/components/Experience';
import { Heading3 } from '@/components/ui/typography';

export function IndepPc() {
  return (
    <article className="max-w-prose">
      <Place>Nîmes, Montpellier</Place>
      <Heading3>Développement Web, services hardware</Heading3>
      <ExperienceMetaData
        dates={['2015', '2018']}
        dateFormat="y"
        keywords={['Wordpress', 'Prestashop', 'Joomla', 'CakePHP']}
      />
    </article>
  );
}
