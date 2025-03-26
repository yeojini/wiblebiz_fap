'use client';

import { useEffect } from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import NoDataIcon from '@/assets/icons/no_data_icon.svg';
import { useFaqList } from '@/services/useFAQService';
import { useTabContext } from '@/hooks/useTabContext';
import { useSearchContext } from '@/hooks/useSearchContext';
import { CategoryType, SubCategoryType } from '@/types';
import styles from './FAQList.module.scss';
import Loading from '@/components/common/Loading';

type FAQListProps = {
  category: CategoryType;
};

export default function FAQList({ category }: FAQListProps) {
  const { query, setSearchResult } = useSearchContext();
  const { activeTab } = useTabContext();
  const subCategory = activeTab as SubCategoryType;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useFaqList({
      category,
      subCategory,
      limit: 10,
      query,
    });

  useEffect(() => {
    setSearchResult(data?.pages[0].items.length);
  }, [data?.pages[0].items.length]);

  const noResult = query && data?.pages[0].items.length === 0;

  return (
    <>
      <ul className={`${styles.faqList} ${noResult && styles.noResult}`}>
        {noResult && (
          <div className={styles.noResultContent}>
            <NoDataIcon width={40} height={40} />
            검색 결과가 없습니다.
          </div>
        )}
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
        {isFetching ? (
          <Loading />
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.moreButton}
          >
            <span className={styles.plusIcon} />
            더보기
          </button>
        ) : (
          <></>
        )}
      </ul>
    </>
  );
}
