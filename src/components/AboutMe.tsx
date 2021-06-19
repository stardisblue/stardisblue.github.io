import React from 'react';
import Section from '../components/ui/Section';
import { A } from './ui/A';
import { UM } from './UM';
import { LIRMM } from './Lirmm';

export const AboutMe: React.FC = () => (
  <Section title="👨‍💻 ABOUT ME">
    <p className="measure-wide">
      Fati is a Ph.D. Student 👨‍🔬 at <UM>University of Montpellier</UM>, France.
      Where he is a member of the <A href="http://advanse.lirmm.fr/">ADVANSE</A>{' '}
      team at the <LIRMM>LIRMM</LIRMM> laboratory. His thesis work focuses on
      reducing visual cluttering of spatio-temporal historical data.
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
      <A href="https://calioppe.github.io/">repository</A>🎼 for the association
      EVS Callioppe. A printable student{' '}
      <A href="https://stardisblue.github.io/chansonnier">songs lyrics</A>
      🎶 for a student association and a{' '}
      <A href="https://stardisblue.github.io/cesar/">cesar</A> code
      encoder-decoder.
    </p>
  </Section>
);
