import { lazy, Suspense, type ComponentType } from 'react';
import VersaEmergePremium from './components/VersaEmergePremium';
import { currentPath } from './basePath';

const VersaEmergeTours = lazy(() => import('./components/VersaEmergeTours'));
const VersaEmergeStory = lazy(() => import('./components/VersaEmergeStory'));

const routes: Record<string, ComponentType> = {
  '/tours': VersaEmergeTours,
  '/story': VersaEmergeStory,
};

export default function App() {
  const Page = routes[currentPath()];
  if (Page) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0e1a]" />}>
        <Page />
      </Suspense>
    );
  }

  return <VersaEmergePremium />;
}
