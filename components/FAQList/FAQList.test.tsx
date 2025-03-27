import { render, screen, fireEvent } from '@testing-library/react';
import FAQList from './index';
import { useFaqList } from '@/services/useFAQService';
import { useTabContext } from '@/hooks/useTabContext';
import { useSearchContext } from '@/hooks/useSearchContext';

vi.mock('@/services/useFAQService');
vi.mock('@/hooks/useTabContext');
vi.mock('@/hooks/useSearchContext');

describe('FAQList', () => {
  const mockFetchNextPage = vi.fn();
  const mockSetSearchResult = vi.fn();

  beforeEach(() => {
    (useTabContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      activeTab: 'ALL',
    });

    (useSearchContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      query: '',
      setSearchResult: mockSetSearchResult,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('FAQ 목록을 렌더링해야 한다', () => {
    const mockData = {
      pages: [
        {
          pageInfo: {
            totalRecord: 2,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 0,
          },
          items: [
            {
              id: 1,
              categoryName: '카테고리1',
              subCategoryName: '서브카테고리1',
              question: '질문1',
              answer: '답변1',
            },
            {
              id: 2,
              categoryName: '카테고리2',
              subCategoryName: '서브카테고리2',
              question: '질문2',
              answer: '답변2',
            },
          ],
        },
      ],
    };

    (useFaqList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isFetching: false,
    });

    render(<FAQList category="CONSULT" />);

    expect(screen.getByText('질문1')).toBeInTheDocument();
    expect(screen.getByText('질문2')).toBeInTheDocument();
    expect(screen.getByText('카테고리1')).toBeInTheDocument();
    expect(screen.getByText('카테고리2')).toBeInTheDocument();
    expect(screen.getByText('서브카테고리1')).toBeInTheDocument();
    expect(screen.getByText('서브카테고리2')).toBeInTheDocument();
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  it('더보기 버튼 클릭 시 fetchNextPage를 호출해야 한다', () => {
    const mockData = {
      pages: [
        {
          pageInfo: {
            totalRecord: 20,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 10,
          },
          items: [
            {
              id: 1,
              categoryName: 'C1',
              subCategoryName: 'S1',
              question: 'Q1',
              answer: 'A1',
            },
          ],
        },
      ],
    };

    (useFaqList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isFetching: false,
    });

    render(<FAQList category="CONSULT" />);

    const moreButton = screen.getByText('더보기');
    fireEvent.click(moreButton);

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });

  it('다음 페이지가 없으면 더보기 버튼이 표시되지 않아야 한다', () => {
    const mockData = {
      pages: [
        {
          pageInfo: {
            totalRecord: 5,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 0,
          },
          items: [
            {
              id: 1,
              categoryName: 'C1',
              subCategoryName: 'S1',
              question: 'Q1',
              answer: 'A1',
            },
          ],
        },
      ],
    };

    (useFaqList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isFetching: false,
    });

    render(<FAQList category="CONSULT" />);

    expect(screen.queryByText('더보기')).not.toBeInTheDocument();
  });

  it('로딩 중일 때 Loading 컴포넌트를 표시해야 한다', () => {
    const mockData = {
      pages: [
        {
          pageInfo: {
            totalRecord: 5,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 0,
          },
          items: [
            {
              id: 1,
              categoryName: 'C1',
              subCategoryName: 'S1',
              question: 'Q1',
              answer: 'A1',
            },
          ],
        },
      ],
    };

    (useFaqList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
      isFetching: true,
    });

    render(<FAQList category="CONSULT" />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.queryByText('더보기')).not.toBeInTheDocument();
  });

  it('검색 결과가 없을 때 "검색 결과가 없습니다" 메시지를 표시해야 한다', () => {
    const mockData = {
      pages: [
        {
          pageInfo: {
            totalRecord: 0,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 0,
          },
          items: [],
        },
      ],
    };

    (useSearchContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      query: '존재하지 않는 검색어',
      setSearchResult: mockSetSearchResult,
    });

    (useFaqList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isFetching: false,
    });

    render(<FAQList category="CONSULT" />);

    expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
  });

  it('렌더링 시 검색 결과 수를 설정해야 한다', () => {
    const mockData = {
      pages: [
        {
          pageInfo: {
            totalRecord: 3,
            offset: 0,
            limit: 10,
            prevOffset: 0,
            nextOffset: 0,
          },
          items: [
            {
              id: 1,
              categoryName: 'C1',
              subCategoryName: 'S1',
              question: 'Q1',
              answer: 'A1',
            },
            {
              id: 2,
              categoryName: 'C2',
              subCategoryName: 'S2',
              question: 'Q2',
              answer: 'A2',
            },
            {
              id: 3,
              categoryName: 'C3',
              subCategoryName: 'S3',
              question: 'Q3',
              answer: 'A3',
            },
          ],
        },
      ],
    };

    (useFaqList as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockData,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: false,
      isFetchingNextPage: false,
      isFetching: false,
    });

    render(<FAQList category="CONSULT" />);

    expect(mockSetSearchResult).toHaveBeenCalledWith(3);
  });
});
