'use client';

import { useEffect } from 'react';
import { initClarity } from '@/lib/clarity';

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || 'yu5bsbdgyc';

export function ClarityAnalytics() {
  useEffect(() => {
    initClarity(CLARITY_PROJECT_ID);
  }, []);

  return null;
}