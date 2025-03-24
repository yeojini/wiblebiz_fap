'use client';

import { useEffect } from 'react';

export default function MSWComponent() {
  // MSW 초기화
  useEffect(() => {
    const init = async () => {
      if (
        typeof window !== 'undefined' &&
        process.env.NODE_ENV === 'development'
      ) {
        const { initMocks } = await import('../mocks');
        await initMocks();
      }
    };

    init();
  }, []);
  return null;
}
