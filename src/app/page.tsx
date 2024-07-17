import { groups } from 'd3';
import { Metadata } from 'next';
import React from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Experience, Experiences } from '@/components/items/Experience';
import { Presentation } from '@/components/items/Presentation';
import { Publication } from '@/components/items/Publication';
import { News } from '@/components/News';
import { AutoOrg, Link, Org, Text } from '@/components/typography';
import { NavSection, Section, Time, Times } from '@/components/ui';
import { InlineTitle } from '@/components/ui/InlineTitle';
import {
  academics,
  education,
  experiences,
  presentations,
  publications,
  skills,
  teachings,
} from '@/locales/fr';
import { LIRMM, UM } from '@/locales/fr/organisation';
import { ExperienceType } from '@/model';

const toc = [
  { id: 'a-propos', title: 'A propos', emoji: '👨‍💻' },
  { id: 'experiences', title: 'Experiences', emoji: '💼' },
  { id: '-ducation', title: 'Education', emoji: '🎓' },
  { id: 'service-acad-mique', title: 'Service Académique', emoji: '👨‍🏫' },
  { id: 'communications', title: 'Communications', emoji: '📡' },
];

const groupedexp = groups(experiences.content, (d) =>
  d.kind === 'Stage' ? 'Stages' : d.title
).map(
  ([v, arr]) =>
    [v, arr.length > 1 ? arr : arr[0]] as [
      string,
      ExperienceType | ExperienceType[]
    ]
);

export const metadata: Metadata = {
  title: 'Fati CHEN',
};

export default function Home() {
  return (
    <main id="FC">
      <div className="ph2-m container mx-auto">
        <Header
          subtitle={
            <>
              Visualisation Analytique
              <span className="fs-normal">📊</span>
            </>
          }
          toc={toc}
        />
        <hr />
        <main>
          <div className="grid grid-cols-2">
            <Section emoji="👨‍💻" title="A PROPOS">
              <Text>
                Je suis actuellement doctorant 👨‍🔬 à l'
                <Org {...UM} />. Où je suis membre de l'équipe{' '}
                <Org name="ADVANSE" url="http://advanse.lirmm.fr/" /> au{' '}
                <Org {...LIRMM} />. Mon travail se focalise sur la réduction de
                l'encombrement visuel appliquée aux données spatio-temporelles.
              </Text>
              <Text>
                Je suis intéressé par les technologies web, la sécurité,
                l'algorithmique, les sciences, l'équité et la philosophie. Je
                parle Français, Anglais et Russe couramment. Je suis passionné
                d'escalade 🧗 et d'Origami. J'ai aussi longtemps joué aux échecs
                ♟ et gagné des prix 🥇 durant le lycée.
              </Text>
              <Text>
                Philanthrope, j'ai créé plusieurs micro sites web pour mes amis,
                un <Link name="répertoire" href="https://calioppe.github.io/" />{' '}
                de partitions 🎼 pour l'association EVS Callioppe. Un{' '}
                <Link
                  name="chansonnier"
                  href="https://stardisblue.github.io/chansonnier"
                />
                🎶 imprimable pour une association d'étudiant et un
                encodeur-décodeur de code{' '}
                <Link
                  name="césar"
                  href="https://stardisblue.github.io/cesar/"
                />
                .
              </Text>
            </Section>
            <Section emoji="🛠️" title={skills.title}>
              <Text>{skills.abstract}</Text>
              {skills.content.map((skill, i) => (
                <InlineTitle key={i} title={skill.name} dashed>
                  {skill.content}
                </InlineTitle>
              ))}
            </Section>
          </div>
          <News />
          <NavSection
            emoji={experiences.emoji}
            title={experiences.title}
            toc={toc}
          >
            {groupedexp.map(([key, exp], i) =>
              Array.isArray(exp) ? (
                <Experiences key={i} title={key} content={exp} />
              ) : (
                <Experience key={i} {...exp} />
              )
            )}
          </NavSection>
          <NavSection emoji={education.emoji} title={education.title} toc={toc}>
            {education.content.map((edu, i) => (
              <InlineTitle key={i} title={edu.title} dashed>
                <Time date={edu.date} form="y" />{' '}
                <AutoOrg value={edu.organisation} />
              </InlineTitle>
            ))}
          </NavSection>
          <NavSection emoji="👨‍🏫" title="SERVICE ACADÉMIQUE" toc={toc}>
            <article>
              <h3>{academics.title}</h3>
              {academics.content.map((academic, i) => (
                <Text key={i}>
                  {academic.title} (<Org {...academic} />)
                </Text>
              ))}
            </article>
            <article>
              <h3>{teachings.title}</h3>
              {teachings.content.map((teach, i) => (
                <InlineTitle key={i} title={teach.title} comma>
                  <Times dates={teach.dates} form="y" nospaces />,{' '}
                  {teach.cursus}. <AutoOrg value={teach.organisation} />
                </InlineTitle>
              ))}{' '}
            </article>
            <article>
              <h3>Encadrement</h3>
              <InlineTitle title="A. Delaforge" comma>
                Mars - Juil. 2019, Stagiaire Master 2. Implementation d'une
                frise chronologique dans un dashboard interactif en js.{' '}
                <Link
                  kind="Linkedin"
                  name="Alexis Delaforge"
                  href="https://www.linkedin.com/in/alexis-delaforge/"
                />
              </InlineTitle>
            </article>
          </NavSection>
          <NavSection emoji="📡" title="COMMUNICATIONS" toc={toc}>
            <div>
              <article>
                <h3>
                  <span className="normal">{presentations.emoji}</span>
                  {presentations.title}
                </h3>
                {presentations.content.map((edu, i) => (
                  <Presentation key={i} {...edu} />
                ))}
              </article>
              <article>
                <h3>
                  <span className="normal">{publications.emoji}</span>
                  {publications.title}
                </h3>
                {publications.content.map((publi, i) => (
                  <Publication key={i} {...publi} />
                ))}
              </article>
            </div>
          </NavSection>
        </main>
        <Footer />
      </div>
    </main>
  );
}
