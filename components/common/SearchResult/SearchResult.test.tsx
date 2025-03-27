import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormContext } from 'react-hook-form';
import { useSearchContext } from '@/hooks/useSearchContext';
import SearchResult from './index';

vi.mock('react-hook-form');
vi.mock('@/hooks/useSearchContext');

describe('SearchResult에서', () => {
  const mockReset = vi.fn();
  const mockSetQuery = vi.fn();

  beforeEach(() => {
    (useFormContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      reset: mockReset,
    });
  });

  describe('검색어가 있을 때', () => {
    beforeEach(() => {
      (useSearchContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        {
          query: '검색어',
          setQuery: mockSetQuery,
          searchResult: 5,
        },
      );
    });

    it('검색 결과 수를 표시해야 한다', () => {
      const { container } = render(<SearchResult />);
      expect(container).toHaveTextContent(/검색 결과 총*5건/);
    });

    it('초기화 버튼을 클릭하면 검색어와 폼이 초기화되어야 한다', async () => {
      render(<SearchResult />);

      const resetButton = screen.getByRole('button', { name: '검색 초기화' });
      await userEvent.click(resetButton);

      expect(mockSetQuery).toHaveBeenCalledWith('');
      expect(mockReset).toHaveBeenCalled();
    });
  });

  describe('검색어가 없을 때', () => {
    beforeEach(() => {
      (useSearchContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
        {
          query: '',
          setQuery: mockSetQuery,
          searchResult: 0,
        },
      );
    });

    it('아무것도 렌더링하지 않아야 한다', () => {
      const { container } = render(<SearchResult />);
      expect(container).toBeEmptyDOMElement();
    });
  });
});
