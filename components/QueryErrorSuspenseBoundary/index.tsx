'use client';

import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import ErrorFallback from '@/components/common/ErrorFallback';
import Loading from '@/components/common/Loading';

export default function QueryErrorSuspenseBoundary({
  children,
  loadingFallback = <Loading />,
  errorFallback = ErrorFallback,
}: {
  children: React.ReactNode;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ComponentType<FallbackProps>;
}) {
  return (
    <Suspense fallback={loadingFallback}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={errorFallback} onReset={reset}>
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Suspense>
  );
}
