import { render, screen } from '@testing-library/react';
import { useTabContext } from '@/hooks/useTabContext';
import TabPanel from './index';
import TabButton from '@/components/common/TabButton';

vi.mock('@/hooks/useTabContext');

describe('TabPanel에서', () => {
  const panelId = 'CONSULT';

  describe('활성화된 패널일 때', () => {
    beforeEach(() => {
      (useTabContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        activeTab: 'CONSULT',
      });
    });

    it('패널이 보여야 한다', () => {
      render(
        <div>
          <TabButton id="CONSULT">CONSULT</TabButton>
          <TabPanel id={panelId}>Panel Content</TabPanel>
        </div>,
      );

      const panel = screen.getByRole('tabpanel', { name: 'CONSULT' });
      expect(panel).toBeInTheDocument();
    });

    it('자식 컴포넌트를 렌더링해야 한다', () => {
      render(<TabPanel id={panelId}>Panel Content</TabPanel>);

      const panel = screen.getByRole('tabpanel');
      expect(panel).toHaveTextContent('Panel Content');
    });
  });

  describe('비활성화된 패널일 때', () => {
    beforeEach(() => {
      (useTabContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        activeTab: 'OTHER_PANEL',
      });
    });

    it('패널이 보이지 않아야 한다', () => {
      render(<TabPanel id={panelId}>Panel Content</TabPanel>);

      expect(screen.queryByRole('tabpanel')).toBeNull();
    });
  });
});
