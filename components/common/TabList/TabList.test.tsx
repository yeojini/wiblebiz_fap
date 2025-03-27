import { render, screen } from '@testing-library/react';
import TabList from './index';

describe('TabList에서', () => {
  it('자식 컴포넌트를 렌더링해야 한다', () => {
    render(
      <TabList>
        <div>Tab Content</div>
      </TabList>,
    );

    expect(screen.getByText('Tab Content')).toBeInTheDocument();
  });

  it('aria-label이 적용되어야 한다', () => {
    render(
      <TabList ariaLabel="Test Tab List">
        <div>Tab Content</div>
      </TabList>,
    );

    const tablist = screen.getByRole('tablist', { name: 'Test Tab List' });
    expect(tablist).toBeInTheDocument();
  });

  it('className prop이 적용되어야 한다', () => {
    render(
      <TabList className="custom-class">
        <div>Tab Content</div>
      </TabList>,
    );

    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveClass('custom-class');
  });
});
