'use client';

import FAQAccordion from '@/components/FAQAccordion';
import ResetIcon from '@/assets/icons/reset_icon.svg';
import SubCategoryTabList from '@/components/SubCategoryTabList';
import NoDataIcon from '@/assets/icons/no_data_icon.svg';
import { useFaqList } from '@/services/useFAQService';
import { useTabContext } from '@/hooks/useTabContext';
import { useSearchContext } from '@/hooks/useSearchContext';
import { useFormContext } from 'react-hook-form';
import { CategoryType, SubCategoryType } from '@/types';
import styles from './FAQList.module.scss';

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

  const noResult = query && data?.pages[0].items.length === 0;

  return (
    <>
      {query && (
        <div className={styles.searchResult}>
          <p className={styles.searchResultText}>
            검색 결과 총
            <span className={styles.searchResultCount}>
              {data?.pages[0].items.length}
            </span>
            건
          </p>
          <button onClick={handleResetSearch} className={styles.resetButton}>
            <ResetIcon width={24} height={24} />
            검색 초기화
          </button>
        </div>
      )}
      <SubCategoryTabList category={category} />
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
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.moreButton}
          >
            <span className={styles.plusIcon} />
            더보기
          </button>
        )}
      </ul>
    </>
  );
}
