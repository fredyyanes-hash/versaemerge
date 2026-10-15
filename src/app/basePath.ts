// Base path the site is served from: "/" locally, "/versaemerge/" on GitHub Pages.
const BASE = import.meta.env.BASE_URL;
const BASE_PREFIX = BASE.replace(/\/+$/, '');

// Prefix an absolute site path (e.g. "/tours", "/#band") with the base path.
export function withBase(path: string) {
  return BASE_PREFIX + path;
}

// A pathname with the base path removed, e.g. "/tours", or null when the
// pathname is outside the site.
export function routeOf(pathname: string) {
  if (BASE_PREFIX) {
    if (pathname !== BASE_PREFIX && !pathname.startsWith(BASE_PREFIX + '/')) return null;
    pathname = pathname.slice(BASE_PREFIX.length);
  }
  return pathname.replace(/\/+$/, '') || '/';
}

// Current pathname with the base path removed, e.g. "/tours".
export function currentPath() {
  return routeOf(window.location.pathname) ?? '/';
}
