/**
 * Shared CV data model.
 *
 * These types define the *contract* between content (src/content/*.ts) and
 * every design (src/designs/*). Content files must satisfy these shapes;
 * designs may only rely on these shapes. Neither side should reach past it.
 */

export interface SocialLink {
  label: string;
  url: string;
  /** Icon key resolved by the active design; keep it generic (e.g. "github", "linkedin", "email"). */
  icon?: string;
}

export interface Profile {
  fullName: string;
  headline: string;
  summary: string;
  location?: string;
  email: string;
  avatarUrl?: string;
  links: SocialLink[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  startDate: string; // ISO "YYYY-MM"
  endDate?: string; // ISO "YYYY-MM"; omit for "present"
  summary: string;
  highlights?: string[];
  technologies?: string[];
  url?: string;
}

export interface EducationEntry {
  institution: string;
  credential: string;
  field?: string;
  startDate: string; // ISO "YYYY-MM"
  endDate?: string; // ISO "YYYY-MM"
  summary?: string;
  location?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  repository?: string;
  highlight?: boolean;
}

export type SkillLevel = "familiar" | "proficient" | "advanced" | "expert";

export interface SkillGroup {
  category: string;
  skills: Array<{
    name: string;
    level?: SkillLevel;
  }>;
}

export interface Certification {
  name: string;
  issuer: string;
  issueDate: string; // ISO "YYYY-MM"
  expirationDate?: string;
  credentialUrl?: string;
}

export interface Language {
  name: string;
  proficiency: "native" | "fluent" | "professional" | "conversational" | "basic";
}

/** Aggregate shape passed from pages into the active design's layout. */
export interface CvData {
  profile: Profile;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  projects: Project[];
  skills: SkillGroup[];
  certifications: Certification[];
  languages: Language[];
}
