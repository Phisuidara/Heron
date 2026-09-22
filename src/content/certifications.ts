import type { Certification, Language } from "@/types/cv";

// ---------------------------------------------------------------------------
// EDIT ME: replace with your real certifications and languages.
// Leave the arrays empty ([]) if not applicable — designs handle that case.
// ---------------------------------------------------------------------------
export const certifications: Certification[] = [
  {
    name: "Example Certification",
    issuer: "Issuing Organization",
    issueDate: "2023-05",
    credentialUrl: "https://example.com/credential",
  },
];

export const languages: Language[] = [
  { name: "English", proficiency: "fluent" },
  { name: "Spanish", proficiency: "native" },
];
