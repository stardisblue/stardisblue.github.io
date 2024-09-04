import { Place } from '@/components/Experience';
import { MetaData, Keywords } from '../ui';

export function Wbs() {
  return (
    <article className="max-w-prose">
      <Place>WBS, Montpellier</Place>
      <h3>Développeur Full Stack</h3>
      <MetaData date={['2015-03', '2015-07']}>
        <Keywords children={['Web', 'PHP5.3', 'jQuery', 'VoIP', 'SOAP']} />
      </MetaData>
      <div className="prose">
        <p>Integration d'une couche VOIP dans une plateforme web d'ERP.</p>
      </div>
    </article>
  );
}
