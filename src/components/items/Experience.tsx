import classNames from 'classnames';
import fr from 'date-fns/esm/locale/fr';
import React from 'react';
import { ExperienceType } from '../../model';
import { AutoOrg, Times, Links, AutoLink } from '../ui';
import InlineTitle from '../ui/InlineTitle';
import { If } from '../utils';

export const Experience: React.FC<ExperienceType & { locale?: Locale }> = ({
  locale = fr,
  ...exp
}) => (
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
            <Times dates={dates} locale={locale} />
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
    {If(exp.groups, (groups) => (
      <p className="space">
        {groups.map(({ title, content, print }, i) => (
          <span key={i} className={print ? '' : 'noprint'}>
            <em>{title}</em> : {content}.{' '}
          </span>
        ))}
      </p>
    ))}
  </article>
);

export const Experiences: React.FC<{
  title: string;
  content: ExperienceType[];
  locale?: Locale;
}> = ({ title, content, locale = fr }) => (
  <article>
    <h3>{title}</h3>
    {content.map((exp, i) => (
      <div key={i} className="space">
        <InlineTitle
          className="print"
          title={
            <>
              {exp.title}
              <AutoOrg join=" " link={true}>
                {exp.organisation}
              </AutoOrg>
            </>
          }
          dashed
        >
          {If(exp.links, (links) => (
            <Links>
              <AutoLink key={i}>{links[0]}</AutoLink>
            </Links>
          ))}
        </InlineTitle>
        <h4 className="noprint">
          {exp.title}
          <AutoOrg join=" " link={true}>
            {exp.organisation}
          </AutoOrg>
        </h4>
        <p className="noprint">
          {If(exp.dates, (dates) => (
            <em>
              <Times dates={dates} locale={locale} />
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
        {(exp.dates || exp.groups) && (
          <p className="space">
            {If(exp.dates, (dates) => (
              <span className="print">
                <em>
                  <Times dates={dates} locale={locale} />
                </em>
                <span className="ph1"> – </span>
              </span>
            ))}
            {If(exp.groups, (groups) =>
              groups.map(({ title, content, print }, i) => (
                <span key={i} className={print ? '' : 'noprint'}>
                  <em>{title}</em> : {content}.{' '}
                </span>
              ))
            )}
          </p>
        )}
      </div>
    ))}
  </article>
);
