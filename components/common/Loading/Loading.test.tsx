import { render, screen } from '@testing-library/react';
import Loading from './index';

describe('Loading에서', () => {
  it('로딩 스피너를 렌더링해야 한다', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('자식 컴포넌트를 렌더링해야 한다', () => {
    render(
      <Loading>
        <div>Loading Message</div>
      </Loading>,
    );

    expect(screen.getByText('Loading Message')).toBeInTheDocument();
  });

  it('className prop이 적용되어야 한다', () => {
    const { container } = render(<Loading className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });
});
