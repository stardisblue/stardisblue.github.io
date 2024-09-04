import { Place } from '@/components/Experience';
import { MetaData, Keywords } from '../ui';

export function IndepPc() {
  return (
    <article className="max-w-prose">
      <Place>Nîmes, Montpellier</Place>
      <h3>Développement Web, services hardware</h3>
      <MetaData date={['2015', '2018']} dateFormat="y">
        <Keywords children={['Wordpress', 'Prestashop', 'Joomla', 'CakePHP']} />
      </MetaData>
    </article>
  );
}
