import Page from '@/app/page';
import { render, screen } from '@testing-library/react';

describe('Page', () => {
  it('should render', async () => {
    render(await Page());
    expect(screen.getByText('서비스 상품')).toBeDefined();
  });
});
