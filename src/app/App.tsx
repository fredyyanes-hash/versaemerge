import { useEffect, useRef, useState, type ComponentType } from 'react';
import { flushSync } from 'react-dom';
import { LazyMotion, MotionConfig } from 'motion/react';
import VersaEmergePremium from './components/VersaEmergePremium';
import { currentPath, routeOf } from './basePath';

type PageModule = { default: ComponentType };

// Each secondary page is its own chunk, fetched on first visit (or earlier,
// when a link to it is hovered or focused).
const loaders: Record<string, () => Promise<PageModule>> = {
  '/tours': () => import('./components/VersaEmergeTours'),
  '/story': () => import('./components/VersaEmergeStory'),
  '/band': () => import('./components/VersaEmergeBand'),
  '/merch': () => import('./components/VersaEmergeMerch'),
};

const loaded: Record<string, ComponentType> = { '/': VersaEmergePremium };
const pending: Record<string, Promise<ComponentType>> = {};

function routeKey(path: string) {
  return path in loaders ? path : '/';
}

function loadPage(path: string): Promise<ComponentType> {
  const key = routeKey(path);
  if (loaded[key]) return Promise.resolve(loaded[key]);
  pending[key] ??= loaders[key]().then((mod) => (loaded[key] = mod.default));
  return pending[key];
}

const loadMotionFeatures = () => import('./motionFeatures').then((mod) => mod.default);

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll to the URL's #section if it has one, otherwise to the top.
function scrollForNavigation(hash: string) {
  const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);
}

export default function App() {
  const [path, setPath] = useState(() => routeKey(currentPath()));
  const [, setLoadCount] = useState(0);
  const [navigated, setNavigated] = useState(false);
  const pathRef = useRef(path);
  pathRef.current = path;
  const Page = loaded[path];

  // First visit straight to a secondary page: fetch its chunk.
  useEffect(() => {
    if (!Page) loadPage(path).then(() => setLoadCount((n) => n + 1));
  }, [Page, path]);

  useEffect(() => {
    // Swap pages in place (with a cross-fade where supported) instead of a
    // full reload, once the next page's code is ready.
    const show = async (next: string, hash: string) => {
      await loadPage(next);
      const swap = () => {
        flushSync(() => {
          setPath(next);
          setNavigated(true);
        });
        scrollForNavigation(hash);
      };
      if (document.startViewTransition && !prefersReducedMotion()) {
        document.startViewTransition(swap);
      } else {
        swap();
      }
    };

    const linkTarget = (event: Event) => {
      const anchor = (event.target as Element | null)?.closest?.('a');
      if (!anchor || (anchor.target && anchor.target !== '_self') || anchor.hasAttribute('download')) return null;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return null;
      const route = routeOf(url.pathname);
      if (route === null || (route !== '/' && !(route in loaders))) return null;
      return { url, route };
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = linkTarget(event);
      if (!link) return;
      const { url, route } = link;
      // Same-page #section links keep the browser's own behavior.
      if (url.pathname === window.location.pathname && url.hash) return;
      event.preventDefault();
      if (url.pathname !== window.location.pathname) {
        window.history.pushState(null, '', url.pathname + url.search + url.hash);
        show(route, url.hash);
      } else {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      }
    };

    const onIntent = (event: Event) => {
      const link = linkTarget(event);
      if (link) loadPage(link.route);
    };

    // Back/forward between pages; #section changes within a page are left to the browser.
    const onPopState = () => {
      const next = routeKey(currentPath());
      if (next !== pathRef.current) show(next, window.location.hash);
    };

    document.addEventListener('click', onClick);
    document.addEventListener('pointerover', onIntent, { passive: true });
    document.addEventListener('focusin', onIntent);
    window.addEventListener('popstate', onPopState);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('pointerover', onIntent);
      document.removeEventListener('focusin', onIntent);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        {Page ? (
          <div key={path} className={navigated ? 'page-enter' : undefined}>
            <Page />
          </div>
        ) : (
          <div className="min-h-screen bg-[#0a0e1a]" />
        )}
      </MotionConfig>
    </LazyMotion>
  );
}
