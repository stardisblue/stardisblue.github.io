import { MetaData, Place, Tags } from '@/components/ui';

export function Wbs() {
  return (
    <article className="max-w-prose">
      <h3>Développeur Full Stack</h3>
      <Place>WBS, Montpellier</Place>
      <MetaData date={['2015-03', '2015-07']}>
        <Tags>Web, PHP5.3, jQuery, VoIP, SOAP</Tags>
      </MetaData>
      <p>Integration d'une couche VOIP dans une plateforme web d'ERP.</p>
    </article>
  );
}
