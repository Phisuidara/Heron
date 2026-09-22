/**
 * Design registry.
 *
 * `activeDesign` is the ONE line to change to switch the site's entire visual
 * identity. Each entry here must have a matching folder under src/designs/<name>/
 * exposing a `layout.astro` that accepts a single `cv: CvData` prop.
 *
 * Astro compiles component imports statically, so the actual layout import
 * lives in src/pages/index.astro (it maps this key to its component). This
 * file exists so the *choice* of design is a single, obvious, isolated line.
 */
export const availableDesigns = ["minimal"] as const;

export type DesignName = (typeof availableDesigns)[number];

// ---------------------------------------------------------------------------
// EDIT ME: change this value to switch designs (must match a folder name and
// be one of `availableDesigns` above, and be wired in src/pages/index.astro).
// ---------------------------------------------------------------------------
export const activeDesign: DesignName = "minimal";
