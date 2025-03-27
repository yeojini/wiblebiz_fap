import Header from './index';
import { render, screen } from '@testing-library/react';

describe('Header에서', () => {
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  it('헤더와 로고가 렌더링되어야 한다', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Wible Logo' })).toBeInTheDocument();
  });
});
