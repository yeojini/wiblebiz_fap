import Page from '@/app/page';
import { render, screen } from '@testing-library/react';
vi.mock('@/components/FAQSection');
vi.mock('@/components/ServiceInquirySection');
vi.mock('@/components/ServiceGuideSection');
vi.mock('@/components/AppDownloadSection');

describe('Page', () => {
  it('should render', async () => {
    render(await Page());
    expect(screen.getByText('자주 묻는 질문')).toBeDefined();
    expect(
      screen.getByText('궁금하신 내용을 빠르게 찾아보세요.'),
    ).toBeDefined();
  });
});
