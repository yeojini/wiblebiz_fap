import { type FallbackProps } from 'react-error-boundary';
import ResetIcon from '@/assets/icons/reset_icon.svg';
import styles from './ErrorFallback.module.scss';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className={styles.container} role="alert">
      <h2 className={styles.title}>일시적인 오류가 발생했습니다.</h2>
      <p className={styles.message}>잠시 후 다시 시도해주세요.</p>
      <button onClick={resetErrorBoundary} className={styles.retryButton}>
        <ResetIcon className={styles.buttonIcon} fill="#fff" />
        다시 시도
      </button>
      {process.env.NODE_ENV === 'development' && (
        <pre className={styles.errorDetail}>에러 메세지 : {error.message}</pre>
      )}
    </div>
  );
}
