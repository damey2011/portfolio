export const glassBar = 'glass-bar';
export const glassWindow = 'glass-window';
export const glassWidget = 'glass-widget';

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
