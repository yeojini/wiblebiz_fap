import { screen, render } from '@testing-library/react';
import Tab from './index';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import userEvent from '@testing-library/user-event';

describe('Tab에서', () => {
  const mockOnChange = vi.fn();

  it('defaultTab을 설정해야 한다', () => {
    render(
      <Tab defaultTab="TEST_TAB" onChange={mockOnChange}>
        <TabList>
          <TabButton id="TEST_TAB">TEST_TAB</TabButton>
        </TabList>
      </Tab>,
    );

    const tabButton = screen.getByRole('tab', {
      name: 'TEST_TAB',
      selected: true,
    });
    expect(tabButton).toBeInTheDocument();
  });

  it('자식 컴포넌트를 렌더링해야 한다', () => {
    const { container } = render(
      <Tab defaultTab="TEST_TAB" onChange={mockOnChange}>
        <div>Tab Content</div>
      </Tab>,
    );

    expect(container).toHaveTextContent('Tab Content');
  });

  it('onChange가 호출될 때 전달된 함수를 실행해야 한다', async () => {
    render(
      <Tab defaultTab="TEST_TAB" onChange={mockOnChange}>
        <TabList>
          <TabButton id="TEST_TAB">TEST_TAB</TabButton>
          <TabButton id="NEW_TAB">NEW_TAB</TabButton>
        </TabList>
      </Tab>,
    );

    await userEvent.click(
      screen.getByRole('tab', {
        name: 'NEW_TAB',
      }),
    );

    expect(mockOnChange).toHaveBeenCalled();
  });
});
