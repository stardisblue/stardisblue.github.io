import { Footer } from '@/components/Footer';
import * as AcademicServices from '@/components/academic-service';
import * as Communications from '@/components/communications';
import { Educations } from '@/components/educations';
import * as Experiences from '@/components/experiences';
import {
  GithubLink,
  Link,
  LinkedInLink,
  ObservableLink,
  Section,
} from '@/components/ui';
import { Email } from '@/components/ui/icons';
import React from 'react';

export default function Home() {
  return (
    <div className="prose prose-a:underline prose-a:text-blue-600 prose-a:hover:text-blue-800 prose-a:visited:text-purple-600 max-w-none">
      <main id="CF" className="ph2-m container mx-auto divide-y">
        <header className="py-4">
          <h1>Fati CHEN</h1>
          <h2>Docteur en Informatique, Data Science & Data Viz</h2>
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
          <h2>📰 News</h2>
          <iframe
            width="100%"
            height="319"
            frameBorder="0"
            src="https://observablehq.com/embed/@stardisblue/showcase?cells=viewof+showcase"
          />
        </Section>
        <Section>
          <h2>👨‍🏫 Expérience</h2>
          <Experiences.Comwatt />
          <Experiences.IndepMood />
          <Experiences.Doctorat />
          <Experiences.StagesRecherche />
          <Experiences.Wbs />
          <Experiences.IndepPc />
        </Section>
        <Section>
          <h2>🎓 Éducation</h2>
          <Educations />
        </Section>
        <Section>
          <h2>👨‍🏫 Service Académique</h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <article>
              <h3 className="mt-0">Comité d'organisation</h3>
              <AcademicServices.OrganisationCommitee />
            </article>
            <article>
              <h3 className="mt-0">Reviewer</h3>
              <AcademicServices.Reviewer />
            </article>
          </div>
          <article>
            <h3>Enseignements</h3>
            <AcademicServices.Teachings />
          </article>
          <article>
            <h3>Encadrement</h3>
            <AcademicServices.AlexisSupervision />
          </article>
        </Section>
        <Section>
          <h2>📡 Communications</h2>
          <article>
            <h3 className="mt-0">🖥️ Présentations</h3>
            <Communications.Presentations />
          </article>
          <article>
            <h3>📄 Publications</h3>
            <Communications.Publications />
          </article>
        </Section>
        <Footer />
      </main>
    </div>
  );
}
