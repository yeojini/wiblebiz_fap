import { render, screen } from '@testing-library/react';
import ServiceGuideSection from './index';

describe('ServiceGuideSection에서', () => {
  it('이용 프로세스가 올바르게 렌더링되어야 한다', () => {
    render(<ServiceGuideSection />);

    const sectionTitle = screen.getByRole('heading', {
      name: '이용 프로세스 안내',
      level: 2,
    });
    expect(sectionTitle).toBeInTheDocument();

    const processList = screen.getByRole('list');
    expect(processList).toBeInTheDocument();

    const steps = screen.getAllByRole('listitem');
    expect(steps).toHaveLength(4);

    const stepTitles = screen.getAllByRole('heading', { level: 3 });
    expect(stepTitles).toHaveLength(4);
    expect(stepTitles[0]).toHaveTextContent('1. 문의 등록');
    expect(stepTitles[1]).toHaveTextContent('2. 관리자 설정');
    expect(stepTitles[2]).toHaveTextContent('3. 임직원 가입');
    expect(stepTitles[3]).toHaveTextContent('4. 서비스 이용');
  });
});
