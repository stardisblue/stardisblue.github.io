import React from 'react';
import { Link, Section } from './ui';
import { UM, LIRMM } from './URL';

export const AboutMe: React.FC = () => (
  <Section title="👨‍💻 ABOUT ME">
    <p className="measure-wide">
      Fati is a Ph.D. Student 👨‍🔬 at <UM>University of Montpellier</UM>, France.
      Where he is a member of the{' '}
      <Link href="http://advanse.lirmm.fr/">ADVANSE</Link> team at the <LIRMM />{' '}
      laboratory. His thesis work focuses on reducing visual cluttering of
      spatio-temporal historical data.
    </p>
    <p className="measure-wide">
      He is interested in web technologies, security, algorithmics, science,
      equality, philosophy. Speaks English, French and Russian fluently. Has a
      passion for bouldering 🧗 and Origami.
      <br />
      Played chess♟ and won prizes🥇 during highschool.
    </p>
    <p className="measure-wide">
      He also created several micro websites for his friends, a partition{' '}
      <Link href="https://calioppe.github.io/">repository</Link>🎼 for the
      association EVS Callioppe. A printable student{' '}
      <Link href="https://stardisblue.github.io/chansonnier">songs lyrics</Link>
      🎶 for a student association and a{' '}
      <Link href="https://stardisblue.github.io/cesar/">cesar</Link> code
      encoder-decoder.
    </p>
  </Section>
);
