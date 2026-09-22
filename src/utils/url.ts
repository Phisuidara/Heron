/** Joins Astro's BASE_URL with a relative asset path, normalizing the slash between them. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const rest = path.replace(/^\//, "");
  return `${base}/${rest}`;
}
