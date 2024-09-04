import { MetaData } from '../ui';
import { LinkedInLink } from '../ui/typography';

export function AlexisSupervision() {
  return (
    <article>
      <MetaData date={['2019-03', '2019-06']}>
        <LinkedInLink href="in/alexis-delaforge/">
          Alexis Delaforge
        </LinkedInLink>
      </MetaData>
      <h4 className="mt-0">Stagiaire Master 2</h4>
      <div className="prose">
        <p>
          Implementation d'une frise chronologique dans un dashboard interactif
          en js.
        </p>
      </div>
    </article>
  );
}
