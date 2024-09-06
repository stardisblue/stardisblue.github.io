import { MetaData, Place, Tags } from '../ui';

export function IndepPc() {
  return (
    <article className="max-w-prose">
      <h3>Développement Web, services hardware</h3>
      <Place>Nîmes, Montpellier</Place>
      <MetaData date={['2015', '2018']} dateFormat="y">
        <Tags>Wordpress, Prestashop, Joomla, CakePHP</Tags>
      </MetaData>
    </article>
  );
}
