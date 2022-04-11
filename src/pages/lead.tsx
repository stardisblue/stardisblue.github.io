import React from 'react';
import 'tachyons/css/tachyons.min.css';
import '../styles/global.scss';
import { Helmet } from 'react-helmet';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  AutoLink,
  AutoOrg,
  Link,
  Links,
  NavSection,
  Org,
  Section,
  Time,
  Times,
} from '../components/ui';
import { LIRMM, UM } from '../locales/fr/organisation';
import { Authors } from '../components/Authors';
import { News } from '../components/News';
import {
  experiences,
  academics,
  teachings,
  education,
  presentations,
  publications,
} from '../locales/fr';

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

const LeadPageFr: React.FC = function () {
  return (
    <main id="FC" className="georgia lh-title">
      <Helmet>
        <title>Fati CHEN</title>
      </Helmet>
      <div className="ph2-m mw8 center">
        <Header
          subtitle={
            <>
              Doctorant en Visualisation Analytique
              <span className="fs-normal">📊</span>
            </>
          }
          toc={toc}
        />
        <main>
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
              d'escalade 🧗 et d'Origami. J'ai aussi longtemps joué aux échecs ♟
              et gagné des prix 🥇 durant le lycée.
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
              <Link name="césar" href="https://stardisblue.github.io/cesar/" />.
            </p>
          </Section>
          <News />
          <NavSection
            emoji={experiences.emoji}
            title={experiences.title}
            toc={toc}
          >
            {experiences.content.map((exp, i) => (
              <article key={i}>
                <h3>
                  {exp.kind && [exp.kind, ' – ']}
                  {exp.title}
                  <AutoOrg join=" " link={true}>
                    {exp.organisation}
                  </AutoOrg>
                </h3>
                {exp.dates && (
                  <p>
                    <em>
                      <Times dates={exp.dates} />
                    </em>{' '}
                    {exp.links && (
                      <Links className="inline-flex">
                        {exp.links.map((l, i) => (
                          <AutoLink key={i}>{l}</AutoLink>
                        ))}
                      </Links>
                    )}
                  </p>
                )}
                {(exp.roles || exp.technologies || exp.content) && (
                  <p>
                    <span className="noprint">{exp.content}</span>{' '}
                    {exp.content && (exp.roles || exp.technologies) && (
                      <br className="noprint" />
                    )}
                    {exp.roles && (
                      <>
                        <em>Rôles</em> : {exp.roles}.{' '}
                      </>
                    )}
                    {exp.technologies && (
                      <>
                        <em>Technos.</em> : {exp.technologies}.
                      </>
                    )}
                  </p>
                )}
              </article>
            ))}
          </NavSection>
          <NavSection emoji="👨‍🏫" title="SERVICES ACADÉMIQUES" toc={toc}>
            <div>
              <h3>{academics.title}</h3>
              {academics.content.map((academic, i) => (
                <article key={i}>
                  <p>
                    {academic.title} (<Org {...academic} />)
                  </p>
                </article>
              ))}
            </div>
            <div>
              <h3>{teachings.title}</h3>
              {teachings.content.map((teach, i) => (
                <article key={i}>
                  <p>
                    <strong>{teach.title}</strong>,{' '}
                    <Times dates={teach.dates} form="Y" spaces={false} />,{' '}
                    {teach.cursus}. <AutoOrg>{teach.organisation}</AutoOrg>
                  </p>
                </article>
              ))}{' '}
            </div>
          </NavSection>
          <NavSection emoji={education.emoji} title={education.title} toc={toc}>
            {education.content.map((edu, i) => (
              <article key={i} className="flex items-baseline">
                <h3>
                  {edu.title} – <Time date={edu.date} form="Y" />{' '}
                  <small>
                    <AutoOrg>{edu.organisation}</AutoOrg>
                  </small>
                </h3>
              </article>
            ))}
          </NavSection>
          <NavSection
            emoji={presentations.emoji}
            title={presentations.title}
            toc={toc}
          >
            {presentations.content.map((edu, i) => (
              <article key={i}>
                <h3>{edu.title}</h3>
                <p>
                  {edu.status},{' '}
                  <em>
                    {edu.event}
                    {<AutoOrg join=" ">{edu.organisation}</AutoOrg>},{' '}
                  </em>
                  {edu.location}
                  {edu.participation &&
                    edu.participation.map((org, i) => (
                      <AutoOrg join=", " key={i} children={org} />
                    ))}
                  , <Time date={edu.date} />.{' '}
                  <Links className="inline-flex">
                    {edu.links &&
                      edu.links.map((l, i) => <AutoLink key={i}>{l}</AutoLink>)}
                  </Links>
                </p>
              </article>
            ))}
          </NavSection>
          <NavSection
            emoji={publications.emoji}
            title={publications.title}
            toc={toc}
          >
            {publications.content.map((publi, i) => (
              <article key={i}>
                <h3>
                  <AutoLink>{publi.title}</AutoLink>
                </h3>
                <p>
                  <strong>{publi.authors[0]}</strong>
                  <Authors>, {publi.authors.slice(1).join(', ')}</Authors>.
                  {publi.journal && (
                    <>
                      {' '}
                      {publi.prefix} <em>{publi.journal}</em>
                      {publi.suffix && ` ${publi.suffix}`}.
                    </>
                  )}{' '}
                  <Time date={publi.date} />.
                  {publi.doi && <> doi:{<AutoLink>{publi.doi}</AutoLink>}</>}
                </p>
                <Links>
                  {publi.links.map((l, i) => (
                    <AutoLink key={i}>{l}</AutoLink>
                  ))}
                </Links>
              </article>
            ))}
          </NavSection>
        </main>
        <Footer />
      </div>
    </main>
  );
};

export default LeadPageFr;
