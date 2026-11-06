/** A dotted translation key (e.g. `navigation.home`) or a literal that is rendered as-is. */
export type TranslationKey = string;

export type ProjectStatus = 'current' | 'completed';

export interface ProjectTeam {
  name: TranslationKey;
  members: string[];
}

export interface ProjectPhoto {
  src: string;
  description: TranslationKey;
}

export interface Project {
  id: string;
  /** Short label used on the homepage teaser. */
  shortTitle: TranslationKey;
  title: TranslationKey;
  /** Description shown on the projects list card. */
  cardDescription: TranslationKey;
  /** Lead paragraph on the project details page. */
  shortDescription: TranslationKey;
  description: TranslationKey;
  experimentDescription: TranslationKey;
  status: ProjectStatus;
  date: string;
  teams: ProjectTeam[];
  teamPhoto: string;
  mainPhoto: ProjectPhoto;
  experimentPhoto: ProjectPhoto;
  repository?: { label: string; url: string };
}

export interface TeamMember {
  name: string;
  roles: string[];
  image: string;
  description: string;
}

export interface TeamGroup {
  team: string;
  members: TeamMember[];
}

export interface Partner {
  name: string;
  logo: { src: string; width: number; height: number };
  url: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface SlideImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/* ---- Cosmo backend API ---- */

export interface PostImage {
  src: string;
  width: number;
  height: number;
}

export interface PostItem {
  id: string;
  title?: string;
  description: string;
  backgroundPhoto?: PostImage;
  date?: string;
}

export interface PostDetails {
  id: string;
  title?: string;
  description: string;
  images?: PostImage[];
  date?: string;
}

/** Spring Data page response returned by `GET /api/posts`. */
export interface PostsPage {
  content: PostItem[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
