'use client';

import { useEffect } from 'react';
import { initMocks } from '@/mocks';

export default function MSWComponent() {
  useEffect(() => {
    // 테스트 환경에서만 MSW 활성화
    // 1. process.env.NODE_ENV === 'test' 조건 체크
    // 2. 명시적으로 환경 변수를 설정한 경우 (개발 중 MSW 사용)
    if (
      process.env.NODE_ENV === 'test' ||
      process.env.NEXT_PUBLIC_ENABLE_MSW === 'true'
    ) {
      initMocks();
    }
  }, []);

  return null;
}
