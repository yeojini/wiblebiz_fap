import { render, screen } from '@testing-library/react';
import FAQSection from './index';

vi.mock('@/components/SearchFormProvider');

describe('FAQSection에서', () => {
  it('제목과 설명이 렌더링되어야 한다', () => {
    render(<FAQSection />);

    expect(screen.getByText('자주 묻는 질문')).toBeInTheDocument();
    expect(
      screen.getByText('궁금하신 내용을 빠르게 찾아보세요.'),
    ).toBeInTheDocument();
  });
});
