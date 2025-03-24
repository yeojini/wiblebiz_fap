import { render, screen, fireEvent } from '@testing-library/react';
import FAQAccordion from '.';

describe('FAQAccordion', () => {
  const mockProps = {
    id: 1,
    categoryName: '가입문의',
    subCategoryName: '일반',
    question: '위블비즈는 어떤 서비스인가요?',
    answer: '위블비즈는 기업용 모빌리티 서비스입니다.',
  };

  it('기본 정보들이 올바르게 렌더링되어야 한다', () => {
    render(<FAQAccordion {...mockProps} />);

    expect(screen.getByText(mockProps.categoryName)).toBeDefined();
    expect(screen.getByText(mockProps.subCategoryName)).toBeDefined();
    expect(screen.getByText(mockProps.question)).toBeDefined();
  });

  it('초기에는 답변이 보이지 않아야 한다', () => {
    render(<FAQAccordion {...mockProps} />);

    expect(screen.queryByText(mockProps.answer)).toBeNull();
  });

  it('아코디언 버튼 클릭 시 답변이 토글되어야 한다', () => {
    render(<FAQAccordion {...mockProps} />);

    const notExpandedButton = screen.getByRole('button', { expanded: false });
    expect(notExpandedButton).toBeDefined();

    fireEvent.click(notExpandedButton);

    expect(screen.getByText(mockProps.answer)).toBeDefined();

    const expandedButton = screen.getByRole('button', { expanded: true });
    expect(expandedButton).toBeDefined();

    fireEvent.click(expandedButton);

    expect(screen.queryByText(mockProps.answer)).toBeNull();
  });
});
