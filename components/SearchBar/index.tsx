import { useId } from 'react';
import SearchIcon from '@/assets/icons/search_icon.svg';

export default function SearchBar() {
  const searchInputId = useId();

  return (
    <form>
      <label htmlFor={searchInputId} className="sr-only">
        검색
      </label>
      <input
        id={searchInputId}
        type="text"
        placeholder="찾으시는 내용을 입력해 주세요"
      />
      <button type="submit" aria-label="검색하기">
        <SearchIcon />
      </button>
    </form>
  );
}
