import { render, screen } from '@testing-library/react';
import ServiceInquirySection from './index';

describe('ServiceInquirySection에서', () => {
  it('서비스 문의 섹션이 올바르게 렌더링되어야 한다', () => {
    render(<ServiceInquirySection />);

    const sectionTitle = screen.getByRole('heading', {
      name: '서비스 문의',
      level: 2,
    });
    expect(sectionTitle).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);

    const downloadLink = screen.getByRole('link', {
      name: /상품 제안서 다운로드/,
    });

    expect(downloadLink).toHaveAttribute('href', '/proposal.pdf');
    expect(downloadLink).toHaveAttribute('download', '위블비즈 상품제안서');
    expect(downloadLink).toHaveAttribute('target', '_blank');

    const counselLink = screen.getByRole('link', { name: '상담문의 등록하기' });
    expect(counselLink).toHaveAttribute('href', '/counsel');

    const kakaoLink = screen.getByRole('link', { name: /카톡으로 문의하기/ });
    expect(kakaoLink).toHaveAttribute('href', 'https://pf.kakao.com/_xfLxjdb');
    expect(kakaoLink).toHaveAttribute('target', '_blank');
    expect(kakaoLink).toHaveAttribute('rel', 'noreferrer');
    expect(kakaoLink).toHaveTextContent('ID: Wible Biz(위블 비즈)');
  });

  it('카카오톡 ID 정보가 표시되어야 한다', () => {
    render(<ServiceInquirySection />);

    const kakaoId = screen.getByText('ID: Wible Biz(위블 비즈)');
    expect(kakaoId).toBeInTheDocument();
  });
});
