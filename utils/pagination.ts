import { Faq, PageInfo, FaqResponse } from '@/types';

/**
 * 페이지네이션 정보 생성 헬퍼 함수
 * @param totalItems 총 아이템 수
 * @param offset 현재 페이지 오프셋
 * @param limit 페이지당 아이템 수
 * @returns 페이지네이션 정보
 */
export const createPageInfo = (
  totalItems: Faq[],
  offset: number,
  limit: number,
): PageInfo => {
  return {
    totalRecord: totalItems.length,
    offset,
    limit,
    prevOffset: Math.max(0, offset - limit),
    nextOffset: offset + limit < totalItems.length ? offset + limit : offset,
  };
};

/**
 * 페이지네이션된 API 응답 생성 헬퍼 함수
 * @param items 아이템 배열
 * @param offset 현재 페이지 오프셋
 * @param limit 페이지당 아이템 수
 * @returns 페이지네이션된 API 응답
 */
export const createResponse = (
  items: Faq[],
  offset: number,
  limit: number,
): FaqResponse => {
  return {
    pageInfo: createPageInfo(items, offset, limit),
    items: items.slice(offset, offset + limit),
  };
};
