import { Section, SectionTitle } from '@/components/ui';
import {
  GithubLink,
  Heading1,
  Heading2,
  Link,
  LinkedInLink,
  ObservableLink,
} from '@/components/ui/typography';
import { Email } from '@/components/ui/typography/icons';
import * as Experiences from '@/data/fr/experiences';
import React from 'react';

const Title = Heading1;
const Subtitle = Heading2;

export default function Home() {
  return (
    <main id="CF" className="ph2-m container mx-auto divide-y">
      <header className="py-4">
        <Title>Fati CHEN</Title>
        <Subtitle>Docteur en Informatique, Data Science & Data Viz</Subtitle>
        <div>
          <Link href="//stardis.blue">stardis.blue</Link>
          {' · '}
          <Link href="mailto:chen.fati@gmail.com" icon={Email}>
            chen.fati@gmail.com
          </Link>
          {' · '}
          <GithubLink href="stardisblue">stardisblue</GithubLink>
          {' · '}
          <ObservableLink href="@stardisblue">@stardisblue</ObservableLink>
          {' · '}
          <LinkedInLink href="in/fati-chen/">Fati Chen</LinkedInLink>
        </div>
      </header>
      <Section>
        <SectionTitle>📰 News</SectionTitle>
        <iframe
          width="100%"
          height="319"
          frameBorder="0"
          src="https://observablehq.com/embed/@stardisblue/showcase?cells=viewof+showcase"
        />
      </Section>
      <Section>
        <SectionTitle>👨‍🏫 Expérience</SectionTitle>
        <Experiences.Comwatt />
        <Experiences.IndepMood />
        <Experiences.Doctorat />
        <Experiences.StagesRecherche />
        <Experiences.Wbs />
        <Experiences.IndepPc />
      </Section>
      <Section>
        <SectionTitle>🎓 Éducation</SectionTitle>
      </Section>
    </main>
  );
}
