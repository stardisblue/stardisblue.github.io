import { Footer } from '@/components/Footer';
import * as AcademicServices from '@/components/academic-service';
import * as Communications from '@/components/communications';
import { Educations } from '@/components/educations';
import * as Experiences from '@/components/experiences';
import { Section, SectionTitle } from '@/components/ui';
import {
  GithubLink,
  Heading1,
  Heading2,
  Heading3,
  Link,
  LinkedInLink,
  ObservableLink,
} from '@/components/ui/typography';
import { Email } from '@/components/ui/typography/icons';
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
        <Educations />
      </Section>
      <Section>
        <SectionTitle>👨‍🏫 Service Académique</SectionTitle>
        <div className="grid gap-y-4 lg:grid-cols-2 ">
          <article>
            <Heading3 mt0>Comité d'organisation</Heading3>
            <AcademicServices.OrganisationCommitee />
          </article>
          <article>
            <Heading3 mt0>Reviewer</Heading3>
            <div className="prose">
              <p>
                <Link href="https://www.computer.org/csdl/journal/tg" iconless>
                  TVCG
                </Link>
                ,{' '}
                <em>
                  IEEE Transactions on Visualization and Computer Graphics
                </em>
                , 1 paper.
              </p>
            </div>
          </article>
        </div>
        <article>
          <Heading3>Enseignements</Heading3>
          <AcademicServices.Teachings />
        </article>
        <article>
          <Heading3>Encadrement</Heading3>
          <AcademicServices.AlexisSupervision />
        </article>
      </Section>
      <Section>
        <SectionTitle>📡 Communications</SectionTitle>
        <article>
          <Heading3 mt0>🖥️ Présentations</Heading3>
          <Communications.Presentations />
        </article>
        <article>
          <Heading3>📄 Publications</Heading3>
          <Communications.Publications />
        </article>
      </Section>
      <Footer />
    </main>
  );
}
