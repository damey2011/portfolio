const skillIcons = import.meta.glob('../img/skills/*.{png,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export function skillIcon(filename?: string): string | undefined {
  if (!filename) return undefined;
  return skillIcons[`../img/skills/${filename}`];
}

export function projectImage(src: string): string {
  return src;
}
