
export function cn(...classes: Array<string | false | null | undefined>) { return classes.filter(Boolean).join(' '); }
export function mailtoUrl(subject: string, body: string) {
  return `mailto:mysuzuverse@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
