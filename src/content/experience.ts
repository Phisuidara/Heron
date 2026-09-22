import type { ExperienceEntry } from "@/types/cv";

// ---------------------------------------------------------------------------
// EDIT ME: replace with your real work history, most recent first.
// Omit `endDate` for your current role.
// ---------------------------------------------------------------------------
export const experience: ExperienceEntry[] = [
  {
    company: "Example Company",
    role: "Senior Software Engineer",
    location: "Remote",
    startDate: "2023-01",
    // endDate omitted: current role
    summary: "Placeholder role summary describing scope and impact.",
    highlights: [
      "Placeholder highlight describing a concrete outcome or metric.",
      "Placeholder highlight describing a system you built or improved.",
    ],
    technologies: ["TypeScript", "Node.js"],
    url: "https://example.com",
  },
  {
    company: "Previous Company",
    role: "Software Engineer",
    location: "City, Country",
    startDate: "2020-06",
    endDate: "2022-12",
    summary: "Placeholder role summary for a prior position.",
    highlights: ["Placeholder highlight.", "Placeholder highlight."],
    technologies: ["JavaScript", "React"],
  },
];
