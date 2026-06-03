'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroSceneLoader() {
  return (
    <Suspense fallback={null}>
      <HeroScene />
    </Suspense>
  );
}
