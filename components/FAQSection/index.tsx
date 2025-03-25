'use client';

import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import { useId, useState } from 'react';
import { CategoryType, SubCategoryType } from '@/types';
import FAQList from '@/components/FAQList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SearchIcon from '@/assets/icons/search_icon.svg';
import { searchSchema, type SearchFormData } from '@/schemas/searchSchema';

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>('CONSULT');
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategoryType>('ALL');
  const searchInputId = useId();
  const [query, setQuery] = useState('');

  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      setQuery(data.search);
    })(e);
  };

  const handleResetSearch = () => {
    setQuery('');
    reset();
  };

  return (
    <section>
      <TabList>
        <TabButton
          id="CONSULT"
          selected={selectedCategory === 'CONSULT'}
          onClick={() => setSelectedCategory('CONSULT')}
        >
          서비스 도입
        </TabButton>
        <TabButton
          id="USAGE"
          selected={selectedCategory === 'USAGE'}
          onClick={() => setSelectedCategory('USAGE')}
        >
          서비스 이용
        </TabButton>
      </TabList>
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
      <FAQList
        category={selectedCategory}
        subCategory={selectedSubCategory}
        query={query}
        onResetSearch={handleResetSearch}
        onSelectSubCategory={setSelectedSubCategory}
      />
    </section>
  );
}
