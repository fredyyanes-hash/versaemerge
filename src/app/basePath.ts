// Base path the site is served from: "/" locally, "/versaemerge/" on GitHub Pages.
const BASE = import.meta.env.BASE_URL;

// Prefix an absolute site path (e.g. "/tours", "/#band") with the base path.
export function withBase(path: string) {
  return BASE.replace(/\/+$/, '') + path;
}

// Current pathname with the base path removed, e.g. "/tours".
export function currentPath() {
  const base = BASE.replace(/\/+$/, '');
  let path = window.location.pathname;
  if (base && path.startsWith(base)) path = path.slice(base.length);
  return path.replace(/\/+$/, '') || '/';
}
