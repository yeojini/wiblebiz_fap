'use client';

import { useId } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSearchContext } from '@/hooks/useSearchContext';
import { type SearchFormData } from '@/schemas/searchSchema';
import SearchIcon from '@/assets/icons/search_icon.svg';
import ClearIcon from '@/assets/icons/clear_icon.svg';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const searchInputId = useId();
  const { setQuery } = useSearchContext();

  const { register, handleSubmit, watch, setValue } =
    useFormContext<SearchFormData>();

  const search = watch('search');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      setQuery(data.search);
    })(e);
  };

  const handleClear = () => {
    setValue('search', '');
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <label htmlFor={searchInputId} className="sr-only">
        검색
      </label>
      <div className={styles.inputContainer}>
        <input
          id={searchInputId}
          type="text"
          placeholder="찾으시는 내용을 입력해 주세요"
          className={styles.input}
          {...register('search')}
        />
        {search && (
          <button
            className={styles.button}
            type="button"
            aria-label="지우기"
            onClick={handleClear}
          >
            <ClearIcon width={24} height={24} />
          </button>
        )}
        <button className={styles.button} type="submit" aria-label="검색하기">
          <SearchIcon width={28} height={28} />
        </button>
      </div>
    </form>
  );
}
