import React from 'react';
import { A, Section } from './ui';
import { UM, LIRMM } from './URL';

export const AboutMe: React.FC = () => (
  <Section title="👨‍💻 ABOUT ME" className="noprint">
    <p className="measure-wide lh-copy">
      I am a Ph.D. Student 👨‍🔬 at <UM>University of Montpellier</UM>, France.
      Where I am a member of the <A href="http://advanse.lirmm.fr/">ADVANSE</A>{' '}
      team at the <LIRMM /> laboratory. My thesis work focuses on reducing
      visual cluttering of spatio-temporal historical data.
    </p>
    <p className="measure-wide lh-copy">
      I am interested in web technologies, security, algorithmics, science,
      equality, philosophy. I speak English, French and Russian fluently. Have a
      passion for bouldering 🧗 and Origami.
      <br />
      Played chess♟ and won prizes🥇 during highschool.
    </p>
    <p className="measure-wide lh-copy">
      I also created several micro websites for my friends, a partition{' '}
      <A href="https://calioppe.github.io/">repository</A>🎼 for the association
      EVS Callioppe. A printable student{' '}
      <A href="https://stardisblue.github.io/chansonnier">songs lyrics</A>
      🎶 for a student association and a{' '}
      <A href="https://stardisblue.github.io/cesar/">cesar</A> code
      encoder-decoder.
    </p>
  </Section>
);
