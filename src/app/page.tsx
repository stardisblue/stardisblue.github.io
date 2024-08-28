import React from 'react';

import { Header } from '@/components/Header';
import { InlineTitle, Section, Time, Times } from '@/components/ui';
import { AutoOrg, Link, Org, Text } from '@/components/ui/typography';
import { NavSection } from '@/components/NavSection';
import { Experience, Experiences } from '@/components/items/Experience';
import { Presentation } from '@/components/items/Presentation';
import { Publication } from '@/components/items/Publication';
import {
  academics,
  educations,
  experiences,
  presentations,
  publications,
  skills,
  teachings,
} from '@/locales/fr';

export default function Home() {
  return (
    <main id="CF" className="ph2-m container mx-auto">
      <Header />
      <Section emoji="👨‍🏫" title="COMPETENCES">
        <Text>
          Gestion de projets, visualisation, web, data science, architecture
          logicielle, algorithmique.
        </Text>
        {skills.map((skill, i) => (
          <InlineTitle key={i} title={skill.name} dashed>
            {skill.content}
          </InlineTitle>
        ))}
      </Section>
      <NavSection emoji="💼" title="EXPERIENCES">
        {experiences.map(([key, exp], i) =>
          Array.isArray(exp) ? (
            <Experiences key={i} title={key} experiences={exp} />
          ) : (
            <Experience key={i} {...exp} />
          )
        )}
      </NavSection>
      <NavSection emoji="🎓" title="ÉDUCATION">
        {educations.map((edu, i) => (
          <InlineTitle key={i} title={edu.title} dashed>
            <Time date={edu.date} form="y" />{' '}
            <AutoOrg value={edu.organisation} />
          </InlineTitle>
        ))}
      </NavSection>
      <NavSection emoji="👨‍🏫" title="SERVICE ACADÉMIQUE">
        <article>
          <h3>Comité d'organisation</h3>
          {academics.map((academic, i) => (
            <Text key={i}>
              {academic.title} (<Org {...academic} />)
            </Text>
          ))}
        </article>
        <article>
          <h3>Enseignements</h3>
          {teachings.map((teach, i) => (
            <InlineTitle key={i} title={teach.title} comma>
              <Times dates={teach.dates} form="y" nospaces />, {teach.cursus}.{' '}
              <AutoOrg value={teach.organisation} />
            </InlineTitle>
          ))}{' '}
        </article>
        <article>
          <h3>Encadrement</h3>
          <InlineTitle title="A. Delaforge" comma>
            Mars - Juil. 2019, Stagiaire Master 2. Implementation d'une frise
            chronologique dans un dashboard interactif en js.{' '}
            <Link
              kind="Linkedin"
              name="Alexis Delaforge"
              href="https://www.linkedin.com/in/alexis-delaforge/"
            />
          </InlineTitle>
        </article>
      </NavSection>
      <NavSection emoji="📡" title="COMMUNICATIONS">
        <div>
          <article>
            <h3>
              <span className="normal">🖥️</span>
              Présentations
            </h3>
            {presentations.map((edu, i) => (
              <Presentation key={i} {...edu} />
            ))}
          </article>
          <article>
            <h3>
              <span className="normal">📄</span>
              Publications
            </h3>
            {publications.map((publi, i) => (
              <Publication key={i} {...publi} />
            ))}
          </article>
        </div>
      </NavSection>
    </main>
  );
}
