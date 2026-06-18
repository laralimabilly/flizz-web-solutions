// i18n helpers shared by Astro components and React islands.
// URL strategy: English is the default at the root (`/`, `/portfolio/...`);
// Portuguese is prefixed (`/pt/`, `/pt/portfolio/...`).

import { ui, defaultLang, type Lang } from './ui';

/** Resolve the dictionary for a locale. Components read nested keys: t.nav.home */
export function useTranslations(lang: Lang) {
  return ui[lang] ?? ui[defaultLang];
}

/** Derive the active locale from a URL pathname. `/pt` or `/pt/...` → 'pt'. */
export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  return seg === 'pt' ? 'pt' : 'en';
}

/**
 * Map the current pathname to its counterpart in the target locale.
 * Used by the language selector and the hreflang alternates.
 *   getAltPath('/portfolio/foo', 'pt') => '/pt/portfolio/foo'
 *   getAltPath('/pt/portfolio/foo', 'en') => '/portfolio/foo'
 */
export function getAltPath(pathname: string, target: Lang): string {
  // Strip a leading /pt (with or without trailing path) to get the base EN path.
  const base = pathname.replace(/^\/pt(?=\/|$)/, '') || '/';
  if (target === 'en') return base;
  return base === '/' ? '/pt/' : `/pt${base}`;
}
