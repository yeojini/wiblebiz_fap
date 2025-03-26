'use client';

import { useSearchContext } from '@/hooks/useSearchContext';
import { useFormContext } from 'react-hook-form';
import ResetIcon from '@/assets/icons/reset_icon.svg';
import styles from './SearchResult.module.scss';

export default function SearchResult() {
  const { reset } = useFormContext();
  const { query, setQuery, searchResult } = useSearchContext();

  const handleResetSearch = () => {
    setQuery('');
    reset();
  };

  if (!query) return null;

  return (
    <div className={styles.searchResult}>
      <p className={styles.searchResultText}>
        검색 결과 총
        <span className={styles.searchResultCount}>{searchResult}</span>건
      </p>
      <button onClick={handleResetSearch} className={styles.resetButton}>
        <ResetIcon width={24} height={24} />
        검색 초기화
      </button>
    </div>
  );
}
