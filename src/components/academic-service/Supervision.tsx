import { TimeInterval } from '../ui';
import { LinkedInLink, Heading4 } from '../ui/typography';

export function AlexisSupervision() {
  return (
    <article>
      <small>
        <TimeInterval start="2019-03" end="2019-06" />{' '}
        <LinkedInLink href="in/alexis-delaforge/">
          Alexis Delaforge
        </LinkedInLink>
      </small>
      <Heading4 mt0>Stagiaire Master 2</Heading4>

      <div className="prose">
        <p>
          Implementation d'une frise chronologique dans un dashboard interactif
          en js.
        </p>
      </div>
    </article>
  );
}
