import { render, screen } from '@testing-library/react';
import { useSearchContext } from '@/hooks/useSearchContext';
import { useFormContext } from 'react-hook-form';
import userEvent from '@testing-library/user-event';
import CategoryTab from './index';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';

vi.mock('@/hooks/useSearchContext');

vi.mock('react-hook-form');

describe('CategoryTab에서', () => {
  const mockSetQuery = vi.fn();
  const mockReset = vi.fn();
  const mockChildren = <div>Tab Content</div>;

  beforeEach(() => {
    (useSearchContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      setQuery: mockSetQuery,
    });
    (useFormContext as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      reset: mockReset,
    });
  });

  it('자식 컴포넌트를 렌더링해야 한다', () => {
    render(<CategoryTab>{mockChildren}</CategoryTab>);

    expect(screen.getByText('Tab Content')).toBeInTheDocument();
  });

  describe('탭이 변경될 때', () => {
    it('검색어와 폼이 초기화되어야 한다', async () => {
      render(
        <CategoryTab>
          <TabList>
            <TabButton id="CONSULT">CONSULT</TabButton>
            <TabButton id="USAGE">USAGE</TabButton>
          </TabList>
        </CategoryTab>,
      );

      const tab = screen.getByRole('tab', { name: 'USAGE' });
      await userEvent.click(tab);

      expect(mockSetQuery).toHaveBeenCalledWith('');
      expect(mockReset).toHaveBeenCalledTimes(1);
    });
  });
});
