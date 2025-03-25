'use client';

import { useId } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SearchIcon from '@/assets/icons/search_icon.svg';
import { searchSchema, type SearchFormData } from '@/schemas/searchSchema';
import { useSearchContext } from '@/hooks/useSearchContext';

export default function SearchBar() {
  const searchInputId = useId();
  const { setQuery } = useSearchContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = handleSubmit((data) => {
    setQuery(data.search);
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor={searchInputId} className="sr-only">
        검색
      </label>
      <input
        id={searchInputId}
        type="text"
        placeholder="찾으시는 내용을 입력해 주세요"
        {...register('search')}
      />
      <button type="submit" aria-label="검색하기">
        <SearchIcon />
      </button>
      {errors.search && (
        <p style={{ color: 'red', fontSize: '12px' }}>
          {errors.search.message}
        </p>
      )}
    </form>
  );
}
