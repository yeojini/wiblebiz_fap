import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFormContext } from 'react-hook-form';
import { useSearchContext } from '@/hooks/useSearchContext';
import SearchBar from './index';

vi.mock('react-hook-form');
vi.mock('@/hooks/useSearchContext');

describe('SearchBar에서', () => {
  const mockSetQuery = vi.fn();
  const mockRegister = vi.fn().mockReturnValue({});
  const mockHandleSubmit = vi
    .fn()
    .mockImplementation((callback) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      callback({ search: 'test-query' });
    });
  const mockWatch = vi.fn();
  const mockSetValue = vi.fn();

  beforeEach(() => {
    mockWatch.mockReturnValue('');
    (useSearchContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setQuery: mockSetQuery,
    });
    (useFormContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      watch: mockWatch,
      setValue: mockSetValue,
    });
  });

  it('검색 입력창이 플레이스홀더 텍스트를 가지고 렌더링되어야 한다', () => {
    render(<SearchBar />);

    const searchInput =
      screen.getByPlaceholderText('찾으시는 내용을 입력해 주세요');
    expect(searchInput).toBeInTheDocument();
  });

  it('검색 버튼이 렌더링되어야 한다', () => {
    render(<SearchBar />);

    const searchButton = screen.getByRole('button', { name: '검색하기' });
    expect(searchButton).toBeInTheDocument();
  });

  it('검색어를 입력하면 검색어가 표시되어야 한다', async () => {
    render(<SearchBar />);

    const searchInput =
      screen.getByPlaceholderText('찾으시는 내용을 입력해 주세요');
    await userEvent.type(searchInput, 'test-query');
    expect(searchInput).toHaveValue('test-query');
  });

  it('검색 버튼을 클릭하면 검색어가 설정되어야 한다', async () => {
    render(<SearchBar />);

    const searchButton = screen.getByRole('button', { name: '검색하기' });
    await userEvent.click(searchButton);

    expect(mockSetQuery).toHaveBeenCalledWith('test-query');
  });

  describe('검색어가 있을 때', () => {
    beforeEach(() => {
      mockWatch.mockReturnValue('test-query');
    });

    it('지우기 버튼이 표시되어야 한다', () => {
      render(<SearchBar />);

      const clearButton = screen.getByRole('button', { name: '지우기' });
      expect(clearButton).toBeInTheDocument();
    });

    it('지우기 버튼을 클릭하면 검색어가 초기화되어야 한다', async () => {
      render(<SearchBar />);

      const clearButton = screen.getByRole('button', { name: '지우기' });
      await userEvent.click(clearButton);

      expect(mockSetValue).toHaveBeenCalledWith('search', '');
    });
  });

  describe('검색어가 없을 때', () => {
    beforeEach(() => {
      mockWatch.mockReturnValue('');
    });

    it('지우기 버튼이 표시되지 않아야 한다', () => {
      render(<SearchBar />);

      const clearButton = screen.queryByRole('button', { name: '지우기' });
      expect(clearButton).not.toBeInTheDocument();
    });
  });
});
