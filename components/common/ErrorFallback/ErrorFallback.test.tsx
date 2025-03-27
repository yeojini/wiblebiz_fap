import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorFallback from './index';

describe('ErrorFallback에서', () => {
  const mockReset = vi.fn();
  const mockError = new Error('Test Error');

  it('에러 화면이 올바르게 렌더링되어야 한다', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);
    expect(
      screen.getByText('일시적인 오류가 발생했습니다.'),
    ).toBeInTheDocument();
    expect(screen.getByText('잠시 후 다시 시도해주세요.')).toBeInTheDocument();
  });

  it('개발 환경에서는 에러 메시지를 표시해야 한다', () => {
    vi.stubEnv('NODE_ENV', 'development');
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);
    expect(screen.getByText('에러 메세지 : Test Error')).toBeInTheDocument();
  });

  it('프로덕션 환경에서는 에러 메시지를 표시하지 않아야 한다', () => {
    vi.stubEnv('NODE_ENV', 'production');
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);
    expect(screen.queryByText('에러 메세지 : Test Error')).toBeNull();
  });

  it('재시도 버튼을 클릭하면 resetErrorBoundary가 호출되어야 한다', async () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);

    const retryButton = screen.getByRole('button', { name: '다시 시도' });
    await userEvent.click(retryButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
