'use client';

import { CategoryType, SubCategoryType } from '@/types';
import { useFaqList } from '@/services/useFAQService';
import FAQAccordion from '@/components/FAQAccordion';
import useSearchContext from '@/hooks/useSearchContext';
import { useTabContext } from '@/hooks/useTabContext';

type FAQListProps = {
  category: CategoryType;
};

export default function FAQList({ category }: FAQListProps) {
  const { query } = useSearchContext();
  const { activeTab } = useTabContext();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useFaqList({
    category,
    subCategory: activeTab as SubCategoryType,
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
