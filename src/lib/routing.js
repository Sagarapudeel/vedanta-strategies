import { canonicalizePage, parseLocationPage, pathForPage } from './seoConfig';

export { canonicalizePage, parseLocationPage, pathForPage };

export function syncBrowserUrl(pageId, { replace = false } = {}) {
  if (typeof window === 'undefined') return;
  const path = pathForPage(pageId);
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (current === path) return;
  const method = replace ? 'replaceState' : 'pushState';
  window.history[method]({ page: canonicalizePage(pageId) }, '', path);
}

export function createPageNavigator(setActivePage) {
  return (pageId) => {
    const next = canonicalizePage(pageId);
    setActivePage(next);
    syncBrowserUrl(next);
  };
}
