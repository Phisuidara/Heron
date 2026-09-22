import type { CvData } from "@/types/cv";
import { profile } from "./profile";
import { experience } from "./experience";
import { education } from "./education";
import { projects } from "./projects";
import { skills } from "./skills";
import { certifications, languages } from "./certifications";

/** Single entry point designs and pages use to read all CV content. */
export const cv: CvData = {
  profile,
  experience,
  education,
  projects,
  skills,
  certifications,
  languages,
};
