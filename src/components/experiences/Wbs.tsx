import { Place } from '@/components/Experience';
import { MetaData, Tags } from '../ui';

export function Wbs() {
  return (
    <article className="max-w-prose">
      <Place>WBS, Montpellier</Place>
      <h3>Développeur Full Stack</h3>
      <MetaData date={['2015-03', '2015-07']}>
        <Tags>Web, PHP5.3, jQuery, VoIP, SOAP</Tags>
      </MetaData>
      <p>Integration d'une couche VOIP dans une plateforme web d'ERP.</p>
    </article>
  );
}
