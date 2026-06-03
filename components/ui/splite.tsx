'use client';

import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

function SplineFallback({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<SplineFallback className={className} />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
