import { render, screen } from '@testing-library/react';
import { useFaqCategories } from '@/services/useFAQService';
import SubCategoryTab from './index';

vi.mock('@/services/useFAQService', () => ({
  useFaqCategories: vi.fn(),
}));

describe('SubCategoryTab에서', () => {
  const mockCategories = [
    { categoryID: 'CAT1', name: '가입문의' },
    { categoryID: 'CAT2', name: '비즈니스' },
    { categoryID: 'CAT3', name: '결제' },
  ];

  const mockChildren = <div>FAQ Content</div>;

  beforeEach(() => {
    (useFaqCategories as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockCategories,
    });
  });

  it('기본 "전체" 탭이 렌더링되어야 한다', () => {
    render(<SubCategoryTab category="CONSULT">{mockChildren}</SubCategoryTab>);

    const allTab = screen.getByRole('tab', { name: '전체' });
    expect(allTab).toBeInTheDocument();
  });

  it('카테고리 데이터에 기반한 탭 버튼이 렌더링되어야 한다', () => {
    render(<SubCategoryTab category="CONSULT">{mockChildren}</SubCategoryTab>);

    expect(screen.getByRole('tab', { name: '가입문의' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '비즈니스' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '결제' })).toBeInTheDocument();
  });
});
