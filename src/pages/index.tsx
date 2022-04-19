import React from 'react';
import 'tachyons/css/tachyons.min.css';
import '../styles/global.scss';
import { Helmet } from 'react-helmet';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  AutoOrg,
  Link,
  NavSection,
  Org,
  Section,
  Time,
  Times,
} from '../components/ui';
import { LIRMM, UM } from '../locales/fr/organisation';
import { News } from '../components/News';
import {
  experiences,
  academics,
  teachings,
  education,
  presentations,
  publications,
  skills,
} from '../locales/fr';
import { groups } from 'd3';
import InlineTitle from '../components/ui/InlineTitle';
import Presentation from '../components/items/Presentation';
import Publication from '../components/items/Publication';
import { Experience, Experiences } from '../components/items/Experience';
import { ExperienceType } from '../model';

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
  ([v, arr], i) =>
    [v, arr.length > 1 ? arr : arr[0]] as [
      string,
      ExperienceType | ExperienceType[]
    ]
);

const IndexPageFr: React.FC = function () {
  return (
    <main id="FC" className="georgia lh-title">
      <Helmet>
        <title>Fati CHEN</title>
      </Helmet>
      <div className="ph2-m mw8 center">
        <Header
          subtitle={
            <>
              Visualisation Analytique
              <span className="fs-normal">📊</span>
            </>
          }
          toc={toc}
        />
        <main>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Section emoji="👨‍💻" title="A PROPOS" className="noprint">
              <p className="measure">
                Je suis actuellement doctorant 👨‍🔬 à l'
                <Org {...UM} />. Où je suis membre de l'équipe{' '}
                <Org name="ADVANSE" url="http://advanse.lirmm.fr/" /> au{' '}
                <Org {...LIRMM} />. Mon travail se focalise sur la réduction de
                l'encombrement visuel appliquée aux données spatio-temporelles.
              </p>
              <p className="measure">
                Je suis intéressé par les technologies web, la sécurité,
                l'algorithmique, les sciences, l'équité et la philosophie. Je
                parle Français, Anglais et Russe couramment. Je suis passionné
                d'escalade 🧗 et d'Origami. J'ai aussi longtemps joué aux échecs
                ♟ et gagné des prix 🥇 durant le lycée.
              </p>
              <p className="measure">
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
              </p>
            </Section>
            <Section emoji="🛠️" title={skills.title} className="noprint">
              <p>{skills.abstract}</p>
              {skills.content.map((skill, i) => (
                <InlineTitle key={i} title={skill.name} dashed>
                  {skill.content}
                </InlineTitle>
              ))}
            </Section>
          </div>
          <News />
          <div className="print pv2"></div>
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
                <AutoOrg>{edu.organisation}</AutoOrg>
              </InlineTitle>
            ))}
          </NavSection>
          <NavSection
            emoji="👨‍🏫"
            title="SERVICE ACADÉMIQUE"
            toc={toc}
            className="noprint"
          >
            <article>
              <h3>{academics.title}</h3>
              {academics.content.map((academic, i) => (
                <p key={i}>
                  {academic.title} (<Org {...academic} />)
                </p>
              ))}
            </article>
            <article>
              <h3>{teachings.title}</h3>
              {teachings.content.map((teach, i) => (
                <InlineTitle key={i} title={teach.title} comma>
                  <Times dates={teach.dates} form="y" nospaces />,{' '}
                  {teach.cursus}. <AutoOrg>{teach.organisation}</AutoOrg>
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
          <Section className="print" emoji="🛠️" title={skills.title}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5em',
                alignItems: 'baseline',
              }}
            >
              <article>
                <p className="space">{skills.abstract}</p>
                {skills.content.map((skill, i) => (
                  <InlineTitle key={i} title={skill.name} dashed>
                    {skill.content}
                  </InlineTitle>
                ))}
              </article>
              <div>
                <article>
                  <h3 className="mt0">{teachings.title}</h3>
                  {teachings.content.map((teach, i) => (
                    <InlineTitle key={i} title={teach.title} comma>
                      <Times dates={teach.dates} form="y" nospaces />,{' '}
                      {teach.cursus}. <AutoOrg>{teach.organisation}</AutoOrg>
                    </InlineTitle>
                  ))}{' '}
                </article>
                <article>
                  <h3>Encadrement</h3>
                  <InlineTitle title="A. Delaforge" comma>
                    Mars - Juil. 2019, Stagiaire M2.
                  </InlineTitle>
                </article>
              </div>
            </div>
          </Section>
          <NavSection emoji="📡" title="COMMUNICATIONS" toc={toc}>
            <div className="twocolumn--print">
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
};

export default IndexPageFr;
