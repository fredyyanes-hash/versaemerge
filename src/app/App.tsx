import { lazy, Suspense } from 'react';
import VersaEmergePremium from './components/VersaEmergePremium';
import { currentPath } from './basePath';

const VersaEmergeTours = lazy(() => import('./components/VersaEmergeTours'));

export default function App() {
  if (currentPath() === '/tours') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0e1a]" />}>
        <VersaEmergeTours />
      </Suspense>
    );
  }

  return <VersaEmergePremium />;
}
