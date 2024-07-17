import React from 'react';
import { fr, Locale } from 'date-fns/locale';

import { ExperienceType } from '@/model';
import { AutoOrg, Text } from '@/components/typography';
import { Links, Times } from '@/components/ui';
import { If } from '@/components/utils';

type ExperienceProps = ExperienceType & {
  locale?: Locale;
};

export function Experience({ locale = fr, ...exp }: ExperienceProps) {
  return (
    <article>
      <h3 className="text-xl mb-2">
        {exp.title}
        {exp.organisation && (
          <AutoOrg join=" " link={true} value={exp.organisation} />
        )}
      </h3>
      {(exp.dates || exp.kind || exp.links) && (
        <Text>
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
              <Links values={links} />
            </>
          ))}
        </Text>
      )}
      {If(exp.content, (content) => {
        return <Text>{content}</Text>;
      })}
      {If(exp.groups, (groups) => (
        <Text>
          {groups.map(({ title, content }, i) => (
            <span key={i}>
              <em>{title}</em> : {content}.{' '}
            </span>
          ))}
        </Text>
      ))}
    </article>
  );
}

type ExperiencesProps = {
  title: string;
  content: ExperienceType[];
  locale?: Locale;
};

export function Experiences({ title, content, locale = fr }: ExperiencesProps) {
  return (
    <article>
      <h3 className="text-xl mb-2">{title}</h3>
      {content.map((exp, i) => (
        <div key={i} className="mb-2">
          <h4 className="text-lg mb-2">
            {exp.title}
            {exp.organisation && (
              <AutoOrg join=" " link={true} value={exp.organisation} />
            )}
          </h4>
          <Text>
            {If(exp.dates, (dates) => (
              <em>
                <Times dates={dates} locale={locale} />
              </em>
            ))}
            {If(exp.links, (links) => (
              <Links className="pl-1" values={links} />
            ))}
          </Text>
          {If(exp.content, (content) => (
            <Text>{content}</Text>
          ))}
          {(exp.dates || exp.groups) &&
            If(exp.groups, (groups) =>
              groups.map(({ title, content }, i) => (
                <Text key={i}>
                  <em>{title}</em> : {content}.{' '}
                </Text>
              ))
            )}
        </div>
      ))}
    </article>
  );
}
