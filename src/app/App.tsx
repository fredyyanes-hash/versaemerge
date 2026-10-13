import { lazy, Suspense } from 'react';
import VersaEmergePremium from './components/VersaEmergePremium';

const VersaEmergeTours = lazy(() => import('./components/VersaEmergeTours'));

export default function App() {
  if (window.location.pathname.replace(/\/+$/, '') === '/tours') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#0a0e1a]" />}>
        <VersaEmergeTours />
      </Suspense>
    );
  }

  return <VersaEmergePremium />;
}
