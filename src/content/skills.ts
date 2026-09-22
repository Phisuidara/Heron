import type { SkillGroup } from "@/types/cv";

// ---------------------------------------------------------------------------
// EDIT ME: replace with your real skills, grouped however makes sense to you.
// `level` is optional.
// ---------------------------------------------------------------------------
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: "advanced" },
      { name: "Python", level: "proficient" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [{ name: "Git" }, { name: "Docker" }],
  },
];
