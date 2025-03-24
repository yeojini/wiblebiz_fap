'use client';

import { useState } from 'react';
import { SubCategoryType, CategoryType, PageInfo, Faq } from '@/types';
import { fetchFaqs } from '@/services';

type FaqListProps = {
  pageInfo: PageInfo;
  category: CategoryType;
  subCategory: SubCategoryType;
};

export default function FaqList({
  pageInfo: initialPageInfo,
  category,
  subCategory,
}: FaqListProps) {
  const [items, setItems] = useState<Faq[]>([]);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [isLoading, setIsLoading] = useState(false);

  const hasMore = pageInfo.offset + pageInfo.limit < pageInfo.totalRecord;

  const loadMoreFaqs = async () => {
    try {
      setIsLoading(true);
      const data = await fetchFaqs(
        category,
        subCategory,
        pageInfo.nextOffset,
        pageInfo.limit,
      );
      setItems((prev) => [...prev, ...data.items]);
      setPageInfo(data.pageInfo);
    } catch (error) {
      console.error('FAQ 로딩 중 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {items.map((item) => (
        <div key={item.id} id={item.id.toString()}>
          {item.question}
        </div>
      ))}
      {isLoading && <div>로딩 중...</div>}
      {hasMore && (
        <button type="button" onClick={loadMoreFaqs} disabled={isLoading}>
          더보기
        </button>
      )}
    </>
  );
}
