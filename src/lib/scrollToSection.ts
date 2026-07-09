export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const navHeight = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '76',
  );
  const extra =
    id === 'portfolio' ? 36 :
    id === 'portfolio-story-stage' ? 4 :
    id === 'open-collab' ? 28 :
    28;

  const y = target.getBoundingClientRect().top + window.scrollY - navHeight - extra;
  window.history.pushState(null, '', `#${id}`);
  window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
}
