import { fetchCategories, fetchFaqs } from './faq';
import { CategoryType } from '@/types';
import { http, HttpResponse } from 'msw';
import { server } from '@/mocks/server';

describe('FAQ 서비스', () => {
  describe('fetchCategories', () => {
    it('카테고리 목록을 정상적으로 가져와야 한다', async () => {
      const result = await fetchCategories('CONSULT');

      expect(result).toBeInstanceOf(Array);
      result.forEach((category) => {
        expect(category).toHaveProperty('categoryID');
        expect(category).toHaveProperty('name');
      });
    });

    it('API 요청이 실패하면 에러를 throw해야 한다', async () => {
      server.use(
        http.get('*/category', ({ request }) => {
          const url = new URL(request.url);
          const tab = url.searchParams.get('tab');

          if (tab === 'INVALID_CATEGORY') {
            return new HttpResponse(null, { status: 400 });
          }

          // 다른 케이스는 기본 핸들러에 위임
          return HttpResponse.json([]);
        }),
      );

      await expect(
        fetchCategories('INVALID_CATEGORY' as CategoryType),
      ).rejects.toThrow('카테고리를 불러오는데 실패했습니다.');
    });

    it('네트워크 오류 발생 시 에러를 throw해야 한다', async () => {
      server.use(
        http.get('*/category', () => {
          return HttpResponse.error();
        }),
      );

      await expect(fetchCategories('CONSULT')).rejects.toThrow();
    });

    it('응답이 ok가 아닐 때 에러를 throw해야 한다', async () => {
      server.use(
        http.get('*/category', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error',
          });
        }),
      );

      await expect(fetchCategories('CONSULT')).rejects.toThrow(
        '카테고리를 불러오는데 실패했습니다.',
      );
    });
  });

  describe('fetchFaqs', () => {
    it('기본 파라미터로 FAQ 목록을 가져와야 한다', async () => {
      const result = await fetchFaqs('CONSULT');

      expect(result).toHaveProperty('pageInfo');
      expect(result.pageInfo).toHaveProperty('totalRecord');
      expect(result.pageInfo).toHaveProperty('offset');
      expect(result.pageInfo).toHaveProperty('limit');
      expect(result.pageInfo).toHaveProperty('prevOffset');
      expect(result.pageInfo).toHaveProperty('nextOffset');

      expect(result).toHaveProperty('items');
      expect(Array.isArray(result.items)).toBe(true);
    });

    it('서브 카테고리와 함께 FAQ 목록을 가져와야 한다', async () => {
      const result = await fetchFaqs('CONSULT', 'PRODUCT');

      expect(result).toHaveProperty('pageInfo');
      expect(result).toHaveProperty('items');

      // 추가적인 검증: PRODUCT 카테고리에 맞는 결과가 반환되는지 확인
      // 실제 MSW 핸들러가 카테고리별 필터링을 제대로 수행하는지 확인하는 내용 추가 가능
    });

    it('오프셋과 제한을 지정하여 FAQ 목록을 가져와야 한다', async () => {
      const result = await fetchFaqs('CONSULT', 'ALL', 10, 5);

      expect(result).toHaveProperty('pageInfo');
      expect(result).toHaveProperty('items');
      expect(result.pageInfo.offset).toBe(10);
      expect(result.pageInfo.limit).toBe(5);
    });

    it('검색어와 함께 FAQ 목록을 가져와야 한다', async () => {
      const searchTerm = '검색어';
      const result = await fetchFaqs('CONSULT', 'ALL', 0, 10, searchTerm);

      expect(result).toHaveProperty('pageInfo');
      expect(result).toHaveProperty('items');

      // 검색어가 포함된 결과인지 검증할 수 있음
      // (handlers.ts가 제대로 구현되어 있다면 이미 필터링된 결과가 반환됨)
    });

    it('잘못된 카테고리로 요청해도 빈 결과를 반환해야 한다', async () => {
      server.use(
        http.get('*/faq', ({ request }) => {
          const url = new URL(request.url);
          const tab = url.searchParams.get('tab');

          if (tab === 'INVALID_CATEGORY') {
            return HttpResponse.json({
              pageInfo: {
                totalRecord: 0,
                offset: 0,
                limit: 10,
                prevOffset: null,
                nextOffset: null,
              },
              items: [],
            });
          }

          // 다른 케이스는 기본 핸들러에 위임
          return HttpResponse.json([]);
        }),
      );

      const result = await fetchFaqs('INVALID_CATEGORY' as CategoryType);

      expect(result).toHaveProperty('pageInfo');
      expect(result.pageInfo).toHaveProperty('totalRecord');
      expect(result.pageInfo.totalRecord).toBe(0);
      expect(result).toHaveProperty('items');
      expect(result.items).toHaveLength(0);
    });

    it('응답이 ok가 아닐 때 에러를 throw해야 한다', async () => {
      server.use(
        http.get('*/faq', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error',
          });
        }),
      );

      await expect(fetchFaqs('CONSULT')).rejects.toThrow(
        'FAQ를 불러오는데 실패했습니다.',
      );
    });

    it('네트워크 오류 발생 시 에러를 throw해야 한다', async () => {
      server.use(
        http.get('*/faq', () => {
          return HttpResponse.error();
        }),
      );

      await expect(fetchFaqs('CONSULT')).rejects.toThrow();
    });
  });
});
