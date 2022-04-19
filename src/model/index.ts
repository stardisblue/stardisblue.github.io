import * as icons from './../components/ui/icons';

export type SectionType<T> = { title: string; emoji: string; content: T[] };

export type LinkType = string | StrictLinkType;

export type StrictLinkType = {
  kind?: keyof typeof icons;
  href: string;
  name?: string;
  title?: string;
  print?: boolean;
};
export type DateType = string | [string, string];

export type EducationType = {
  title: string;
  organisation: OrganisationType;
  date: DateType;
};

export type Listing = { title: string; content: string; print?: boolean };

export type ExperienceType = {
  kind?: string;
  title: string;
  organisation?: OrganisationType;
  links?: LinkType[];
  dates?: [DateType, DateType];
  print?: boolean;
  content?: string;
  groups?: Listing[];
};

export type OrganisationType = string | StrictOrganisationType;

export type StrictOrganisationType = {
  prefix?: string;
  url?: string;
  name: string;
  title?: string;
  location?: string;
};

export type PresentationType = {
  title: string;
  status: string;
  event: string;
  organisation?: OrganisationType;
  location: OrganisationType;
  participation?: OrganisationType[];
  links?: LinkType[];
  date: DateType;
};

export type PublicationsType = {
  title: LinkType;
  authors: string[];
  journal?: string;
  prefix?: string;
  suffix?: string;
  date: DateType;
  doi?: string;
  links: LinkType[];
};

export type TeachingsType = {
  title: string;
  dates: [DateType, DateType];
  cursus: string;
  organisation: OrganisationType;
};
