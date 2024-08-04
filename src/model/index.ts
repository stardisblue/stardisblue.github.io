import * as icons from '@/components/ui/typography/icons';

export type SectionType<T> = { title: string; emoji: string; content: T[] };

export type LinkLike = string | Link;

export type Link = {
  kind?: keyof typeof icons;
  href: string;
  name?: string;
  title?: string;
};

export type DateType = string | [string, string];

export type EducationType = {
  title: string;
  organisation: OrganisationLike;
  date: DateType;
};

export type Listing = { title: string; content: string };

export type Experience = {
  kind?: string;
  title: string;
  organisation?: OrganisationLike;
  links?: LinkLike[];
  dates?: [DateType, DateType];
  content?: string;
  groups?: Listing[];
};

export type OrganisationLike = string | Organisation;

export type Organisation = {
  prefix?: string;
  url?: string;
  name: string;
  title?: string;
  location?: string;
};

export type Presentation = {
  title: string;
  status: string;
  event: string;
  organisation?: OrganisationLike;
  location: OrganisationLike;
  participation?: OrganisationLike[];
  links?: LinkLike[];
  date: DateType;
};

export type Publication = {
  title: LinkLike;
  authors: string[];
  journal?: string;
  prefix?: string;
  suffix?: string;
  date: DateType;
  doi?: string;
  links: LinkLike[];
};

export type Teaching = {
  title: string;
  dates: [DateType, DateType];
  cursus: string;
  organisation: OrganisationLike;
};
