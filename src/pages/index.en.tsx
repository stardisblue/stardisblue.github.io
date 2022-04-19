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
import { LIRMM, UM } from '../locales/en/organisation';
import { News } from '../components/News';
import {
  experiences,
  academics,
  teachings,
  education,
  presentations,
  publications,
  skills,
} from '../locales/en';
import { groups } from 'd3';
import { ExperienceType } from '../model';
import InlineTitle from '../components/ui/InlineTitle';
import Presentation from '../components/items/Presentation';
import Publication from '../components/items/Publication';
import { Experiences, Experience } from '../components/items/Experience';
import { enGB } from 'date-fns/locale';

const toc = [
  { id: 'about-me', title: 'About me', emoji: '👨‍💻' },
  {
    id: 'professional-and-research-experiences',
    title: 'Professional & Research Experiences',
    emoji: '💼',
  },
  { id: 'academic-services', title: 'Academic Services', emoji: '👨‍🏫' },
  { id: 'education', title: 'Education', emoji: '🎓' },
  { id: 'presentations', title: 'Presentations', emoji: '🖥️' },
  { id: 'publications', title: 'Publications', emoji: '📄' },
];

const groupedexp = groups(experiences.content, (d) =>
  d.kind === 'Internship' ? 'Internship' : d.title
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
              Visual Analytics
              <span className="fs-normal">📊</span>
            </>
          }
          toc={toc}
        />
        <main>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Section emoji="👨‍💻" title="ABOUT ME" className="noprint">
              <p className="measure">
                I am a Ph.D.Student 👨‍🔬 at <Org {...UM} />, France. Where I am a
                member of the{' '}
                <Org name="ADVANSE" url="http://advanse.lirmm.fr/" /> team at
                the <Org {...LIRMM} /> laboratory. My thesis work focuses on
                reducing visual cluttering of spatio-temporal historical data.
              </p>
              <p className="measure">
                I am interested in web technologies, security, algorithmics,
                science, equality, philosophy. I speak English, French and
                Russian fluently. Have a passion for bouldering 🧗 and Origami.
                <br />
                Played chess♟ and won prizes🥇 during highschool.
              </p>
              <p className="measure">
                I also created several micro websites for my friends, a
                partition{' '}
                <Link name="repository" href="https://calioppe.github.io/" />
                🎼 for the association EVS Callioppe. A printable student{' '}
                <Link
                  name="songs lyrics"
                  href="https://stardisblue.github.io/chansonnier"
                />
                🎶 for a student association and a{' '}
                <Link
                  name="cesar"
                  href="https://stardisblue.github.io/cesar/"
                />{' '}
                code encoder-decoder.
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
                <Experiences key={i} title={key} content={exp} locale={enGB} />
              ) : (
                <Experience key={i} {...exp} locale={enGB} />
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
            title="ACADEMIC SERVICES"
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
              <h3>Supervision</h3>
              <InlineTitle title="A. Delaforge" comma>
                Mar - July 2019, Master 2 C.S. Intern. Implementation of a
                timeline into an interactive dashboard in js.{' '}
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
                <p>{skills.abstract}</p>
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
                  <h3>Supervision</h3>
                  <InlineTitle title="A. Delaforge" comma>
                    Mar - July 2019, Master 2 C.S. Intern.
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
                  <Presentation key={i} {...edu} locale={enGB} />
                ))}
              </article>
              <article>
                <h3>
                  <span className="normal">{publications.emoji}</span>
                  {publications.title}
                </h3>
                {publications.content.map((publi, i) => (
                  <Publication key={i} {...publi} locale={enGB} />
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
