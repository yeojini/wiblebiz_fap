import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTabContext } from '@/hooks/useTabContext';
import TabButton from './index';

vi.mock('@/hooks/useTabContext');

describe('TabButton에서', () => {
  const mockSetActiveTab = vi.fn();
  const tabId = 'TEST_TAB';

  beforeEach(() => {
    (useTabContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      activeTab: tabId,
      setActiveTab: mockSetActiveTab,
    });
  });

  describe('활성화된 탭일 때', () => {
    it('선택된 상태로 표시되어야 한다', () => {
      render(<TabButton id={tabId}>Tab Content</TabButton>);

      const button = screen.getByRole('tab', { selected: true });
      expect(button).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('비활성화된 탭일 때', () => {
    beforeEach(() => {
      (useTabContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        activeTab: 'OTHER_TAB',
        setActiveTab: mockSetActiveTab,
      });
    });

    it('선택되지 않은 상태로 표시되어야 한다', () => {
      render(<TabButton id={tabId}>TAB</TabButton>);

      const button = screen.getByRole('tab', { name: 'TAB', selected: false });
      expect(button).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('클릭하면 해당 탭이 활성화되어야 한다', async () => {
    render(<TabButton id={tabId}>TAB</TabButton>);

    const button = screen.getByRole('tab', { name: 'TAB' });
    await userEvent.click(button);

    expect(mockSetActiveTab).toHaveBeenCalledWith(tabId);
  });

  it('적절한 WAI-ARIA 속성을 가져야 한다', () => {
    render(<TabButton id={tabId}>TAB</TabButton>);

    const button = screen.getByRole('tab', { name: 'TAB' });
    expect(button).toHaveAttribute('aria-controls', `panel-${tabId}`);
  });

  it('className prop이 적용되어야 한다', () => {
    render(
      <TabButton id={tabId} className="custom-class">
        TAB
      </TabButton>,
    );

    const button = screen.getByRole('tab', { name: 'TAB' });
    expect(button).toHaveClass('custom-class');
  });
});
