'use client';

import { CategoryType, SubCategoryType } from '@/types';
import { useFaqList } from '@/services/useFAQService';
import FAQAccordion from '@/components/FAQAccordion';
import useSearchContext from '@/hooks/useSearchContext';

type FAQListProps = {
  category: CategoryType;
  subCategory: SubCategoryType;
};

export default function FAQList({ category, subCategory }: FAQListProps) {
  const { query } = useSearchContext();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFaqList({
    category,
    subCategory,
    limit: 10,
    query,
  });

  return (
    <ul>
      {data?.pages.map((page) =>
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
  );
}
