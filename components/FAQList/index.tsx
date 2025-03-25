'use client';

import { CategoryType, SubCategoryType } from '@/types';
import { useFaqList } from '@/services/useFAQService';
import FAQAccordion from '@/components/FAQAccordion';
import ResetIcon from '@/assets/icons/reset_icon.svg';
import SubCategoryTabList from '@/components/SubCategoryTabList';
import { useTabContext } from '@/hooks/useTabContext';
import { useSearchContext } from '@/hooks/useSearchContext';
import { useFormContext } from 'react-hook-form';

type FAQListProps = {
  category: CategoryType;
};

export default function FAQList({ category }: FAQListProps) {
  const { query, setQuery } = useSearchContext();
  const { reset } = useFormContext();
  const { activeTab } = useTabContext();
  const subCategory = activeTab as SubCategoryType;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFaqList({
    category,
    subCategory,
    limit: 10,
    query,
  });

  const handleResetSearch = () => {
    setQuery('');
    reset();
  };

  return (
    <>
      {query && (
        <div>
          <span>검색 결과 총 {data?.pages[0].items.length}건</span>
          <button onClick={handleResetSearch}>
            <ResetIcon />
            검색 초기화
          </button>
        </div>
      )}
      <SubCategoryTabList category={category} />
      {query && data?.pages[0].items.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
      <ul>
        {data &&
          data.pages.map((page) =>
            page.items.map(
              ({ id, categoryName, subCategoryName, question, answer }) => (
                <FAQAccordion
                  key={id}
                  id={id}
                  categoryName={categoryName}
                  subCategoryName={subCategoryName}
                  question={question}
                  answer={answer}
                />
              ),
            ),
          )}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="more-button"
          >
            더보기
          </button>
        )}
      </ul>
    </>
  );
}
