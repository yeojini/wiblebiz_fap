import { useFormContext } from 'react-hook-form';
import { type SearchFormData } from '@/schemas/searchSchema';
import SearchIcon from '@/assets/icons/search_icon.svg';
import { useSearchContext } from '@/hooks/useSearchContext';
import { useId } from 'react';

export default function SearchBar() {
  const searchInputId = useId();
  const { setQuery } = useSearchContext();

  const { register, handleSubmit } = useFormContext<SearchFormData>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      setQuery(data.search);
    })(e);
  };

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
    </form>
  );
}
