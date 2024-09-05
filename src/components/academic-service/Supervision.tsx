import { LinkedInLink, MetaData } from '@/components/ui/';

export function AlexisSupervision() {
  return (
    <article>
      <MetaData date={['2019-03', '2019-06']}>
        <LinkedInLink href="in/alexis-delaforge/">
          Alexis Delaforge
        </LinkedInLink>
      </MetaData>
      <h4>Stagiaire Master 2</h4>
      <p>
        Implementation d'une frise chronologique dans un dashboard interactif en
        js.
      </p>
    </article>
  );
}
