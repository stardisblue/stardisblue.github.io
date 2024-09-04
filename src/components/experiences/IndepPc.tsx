import { Place } from '@/components/Experience';
import { Heading3 } from '@/components/ui/typography';
import { ArticleMetaData, Keywords } from '../ui';

export function IndepPc() {
  return (
    <article className="max-w-prose">
      <Place>Nîmes, Montpellier</Place>
      <Heading3>Développement Web, services hardware</Heading3>
      <ArticleMetaData date={['2015', '2018']} dateFormat="y">
        <Keywords children={['Wordpress', 'Prestashop', 'Joomla', 'CakePHP']} />
      </ArticleMetaData>
    </article>
  );
}
