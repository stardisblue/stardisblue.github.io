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
import { groups } from 'd3';
import { ExperienceType } from '../model';
import classNames from 'classnames';
import skills from '../locales/fr/skills';

const toc = [
  { id: 'a-propos', title: 'A propos', emoji: '👨‍💻' },
  { id: 'experiences', title: 'Experiences', emoji: '💼' },
  { id: '-ducation', title: 'Education', emoji: '🎓' },
  { id: 'service-acad-mique', title: 'Service Académique', emoji: '👨‍🏫' },
  { id: 'communications', title: 'Communications', emoji: '📡' },
];

const If: <T>(
  cond: T | null | undefined,
  children?: (cond: T) => React.ReactNode
) => JSX.Element | null = (cond, children = (c) => c) => {
  if (!cond) return null;

  return <>{children(cond)}</>;
};

const IfMap: <T>(
  cond: T[] | null | undefined,
  children?: (cond: T, i: number) => React.ReactNode
) => JSX.Element | null = (cond, children = (c) => c) => {
  if (!cond) return null;

  return <>{cond.map(children)}</>;
};

const groupedexp = groups(experiences.content, (d) =>
  d.kind === 'Stage' ? 'Stage' : d.title
).map(
  ([v, arr], i) =>
    [v, arr.length > 1 ? arr : arr[0]] as [
      string,
      ExperienceType | ExperienceType[]
    ]
);

const ExperienceGroup: React.FC<{
  title: string;
  content: ExperienceType[];
}> = ({ title, content }) => (
  <article>
    <h3>{title}s</h3>
    {content.map((exp, i) => (
      <div key={i}>
        <div className="print">
          <div className="flex items-baseline">
            <h4>
              {exp.title}
              <AutoOrg join=" " link={true}>
                {exp.organisation}
              </AutoOrg>
            </h4>
            {If(exp.links, (links) => (
              <>
                <span className="ph1"> – </span>
                <Links>
                  <AutoLink key={i}>{links[0]}</AutoLink>
                </Links>
              </>
            ))}
          </div>
        </div>
        <h4 className="noprint">
          {exp.title}
          <AutoOrg join=" " link={true}>
            {exp.organisation}
          </AutoOrg>
        </h4>
        <p className="noprint">
          {If(exp.dates, (dates) => (
            <em>
              <Times dates={dates} />
            </em>
          ))}
          {If(exp.links, (links) => (
            <>
              <Links className="pl1">
                {links.map((link, i) => (
                  <AutoLink key={i}>{link}</AutoLink>
                ))}
              </Links>
            </>
          ))}
        </p>
        {If(exp.content, (content) => (
          <p className={exp.print ? '' : 'noprint'}>{content}</p>
        ))}
        {(exp.dates || exp.roles || exp.technologies) && (
          <p>
            {If(exp.dates, (dates) => (
              <span className="print">
                <em>
                  <Times dates={dates} />
                </em>
                <span className="ph1"> – </span>
              </span>
            ))}
            {If(exp.domaines, (domaines) => (
              <>
                <em>Domaines</em> : {domaines}.{' '}
              </>
            ))}
            {If(exp.roles, (roles) => (
              <span className="noprint">
                <em>Rôles</em> : {roles}.{' '}
              </span>
            ))}
            {/* {If(exp.technologies, (technologies) => (
              <>
                <em>Technos.</em> : {technologies}.{' '}
              </>
            ))} */}
          </p>
        )}{' '}
      </div>
    ))}
  </article>
);

const Experience: React.FC<ExperienceType> = (exp) => (
  <article>
    <h3>
      {exp.title}
      <AutoOrg join=" " link={true}>
        {exp.organisation}
      </AutoOrg>
    </h3>
    {(exp.dates || exp.kind || exp.links) && (
      <p className="space">
        {If(exp.dates, (dates) => (
          <em>
            <Times dates={dates} />
          </em>
        ))}
        {If(exp.kind, (kind) => (
          <> – {kind}</>
        ))}
        {If(exp.links, (links) => (
          <>
            {' '}
            <Links key={1}>
              {links.map((l, i) => (
                <AutoLink key={i}>{l}</AutoLink>
              ))}
            </Links>
          </>
        ))}
      </p>
    )}
    {If(exp.content, (content) => {
      console.log(exp);
      return (
        <p className={classNames({ noprint: exp.print !== true }, 'space')}>
          {content}
        </p>
      );
    })}
    {(exp.roles || exp.technologies) && (
      <p>
        {If(exp.domaines, (domaines) => (
          <>
            <em>Domaines</em> : {domaines}.{' '}
          </>
        ))}
        {If(exp.roles, (roles) => (
          <span className="noprint">
            <em>Rôles</em> : {roles}.{' '}
          </span>
        ))}
        {If(exp.technologies, (technologies) => (
          <>
            <em>Technos.</em> : {technologies}.{' '}
          </>
        ))}
      </p>
    )}
  </article>
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
              {skills.content.map((skill, i) => (
                <article key={i}>
                  <p>
                    <h4 className="dib mv0">{skill.name}</h4> – {skill.content}
                  </p>
                </article>
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
                <ExperienceGroup title={key} content={exp} />
              ) : (
                <Experience key={i} {...exp} />
              )
            )}
          </NavSection>
          <NavSection emoji={education.emoji} title={education.title} toc={toc}>
            {education.content.map((edu, i) => (
              <p key={i} className="space">
                <h4 className="dib mv0">{edu.title}</h4> –{' '}
                <Time date={edu.date} form="Y" />{' '}
                <AutoOrg>{edu.organisation}</AutoOrg>
              </p>
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
                <p key={i}>
                  <h4 className="dib mv0">{teach.title}</h4>,{' '}
                  <Times dates={teach.dates} form="Y" spaces={false} />,{' '}
                  {teach.cursus}. <AutoOrg>{teach.organisation}</AutoOrg>
                </p>
              ))}{' '}
            </article>
            <article>
              <h3>Encadrement</h3>
              <p>
                <h4 className="dib mv0">A. Delaforge</h4>, 2019, Stagiaire
                Master 2. Implementation d'une frise chronologique dans un
                dashboard interactif en js.{' '}
                <Link
                  kind="Linkedin"
                  name="Alexis Delaforge"
                  href="https://www.linkedin.com/in/alexis-delaforge/"
                />
              </p>
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
                {' '}
                <p>{skills.abstract}</p>
                {skills.content.map((skill, i) => (
                  <p key={i} className="space">
                    <h4 className="dib mv0">{skill.name}</h4> – {skill.content}
                  </p>
                ))}
              </article>
              {/* </Section>
            <Section className="print" emoji="👨‍🏫" title="MANAGEMENT"> */}
              <div>
                <article>
                  <h3 className="mt0">{teachings.title}</h3>
                  {teachings.content.map((teach, i) => (
                    <p key={i} className="space">
                      <h4 className="dib mv0">{teach.title}</h4>,{' '}
                      <Times dates={teach.dates} form="Y" spaces={false} />,{' '}
                      {teach.cursus}. <AutoOrg>{teach.organisation}</AutoOrg>
                    </p>
                  ))}{' '}
                </article>
                <article>
                  <h3>Encadrement</h3>
                  <p>
                    <h4 className="dib mv0">A. Delaforge</h4>, Mars - Juil.
                    2019, Stagiaire M2.
                  </p>
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
                  <div key={i} className="space">
                    <h4 className="noprint">{edu.title}</h4>
                    <p>
                      <h4 className="print dib mv0">{edu.status}</h4>
                      <span className="noprint">{edu.status}</span>,{' '}
                      <em>
                        {edu.event}
                        {<AutoOrg join=" ">{edu.organisation}</AutoOrg>},{' '}
                      </em>
                      {edu.location}
                      <span className="noprint">
                        {IfMap(edu.participation, (org, i) => (
                          <AutoOrg join=", " key={i} children={org} />
                        ))}
                      </span>
                      , <Time date={edu.date} />.{' '}
                      <Links>
                        {IfMap(edu.links, (l, i) => (
                          <AutoLink key={i}>{l}</AutoLink>
                        ))}
                      </Links>
                    </p>
                  </div>
                ))}
              </article>
              <article>
                <h3>
                  <span className="normal">{publications.emoji}</span>
                  {publications.title}
                </h3>
                {publications.content.map((publi, i) => (
                  <div key={i} className="mt1--print">
                    <h4>
                      <AutoLink>{publi.title}</AutoLink>
                    </h4>
                    <p>
                      <strong>{publi.authors[0]}</strong>
                      <Authors>, {publi.authors.slice(1).join(', ')}</Authors>.
                      {If(publi.journal, (journal) => (
                        <span className="noprint">
                          {' '}
                          {publi.prefix} <em>{journal}</em>
                          {If(publi.suffix)}.
                        </span>
                      ))}{' '}
                      <Time date={publi.date} />.
                      {If(publi.doi, (doi) => (
                        <>
                          {' '}
                          doi: <AutoLink>{doi}</AutoLink>
                        </>
                      ))}
                    </p>
                    <Links className="noprint">
                      {publi.links.map((l, i) => (
                        <AutoLink key={i}>{l}</AutoLink>
                      ))}
                    </Links>
                  </div>
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
