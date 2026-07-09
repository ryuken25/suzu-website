export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function mailtoUrl(subject: string, body: string, to = 'mysuzuverse@gmail.com') {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Opens Gmail compose in browser when possible; falls back to mailto. */
export function gmailComposeUrl(subject: string, body: string, to = 'mysuzuverse@gmail.com') {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}
