'use client';

import { CategoryType, SubCategoryType } from '@/types';
import { useFaqList } from '@/services/useFAQService';
import FAQAccordion from '@/components/FAQAccordion';
import ResetIcon from '@/assets/icons/reset_icon.svg';
import SubCategoryTabList from '@/components/SubCategoryTabList';

type FAQListProps = {
  category: CategoryType;
  subCategory: SubCategoryType;
  query: string;
  onResetSearch: () => void;
  onSelectSubCategory: (subCategory: SubCategoryType) => void;
};

export default function FAQList({
  category,
  subCategory,
  query,
  onSelectSubCategory,
  onResetSearch,
}: FAQListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFaqList({
    category,
    subCategory,
    limit: 10,
    query,
  });

  return (
    <>
      {query && (
        <div>
          <span>검색 결과 총 {data?.pages[0].items.length}건</span>
          <button onClick={onResetSearch}>
            <ResetIcon />
            검색 초기화
          </button>
        </div>
      )}
      <SubCategoryTabList
        category={category}
        selectedSubCategory={subCategory}
        onSelectSubCategory={onSelectSubCategory}
      />
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
