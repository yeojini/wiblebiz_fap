import { render, screen } from '@testing-library/react';
import Footer from './index';

describe('Footer에서', () => {
  it('저작권 정보가 렌더링되어야 한다', () => {
    render(<Footer />);

    expect(
      screen.getByText(/© 2023 KIA CORP. All Rights Reserved./),
    ).toBeInTheDocument();
  });

  it('회사 주소 정보가 렌더링되어야 한다', () => {
    render(<Footer />);

    expect(
      screen.getByText('서울특별시 서초구 헌릉로 12 기아㈜'),
    ).toBeInTheDocument();
  });

  it('대표자 정보가 렌더링되어야 한다', () => {
    render(<Footer />);

    expect(screen.getByText('대표: 송호성, 최준영')).toBeInTheDocument();
  });

  it('사업자 등록 정보가 렌더링되어야 한다', () => {
    render(<Footer />);

    expect(
      screen.getByText('사업자등록번호: 119-81-02316'),
    ).toBeInTheDocument();
    expect(screen.getByText('통신판매번호: 2006-07935')).toBeInTheDocument();
  });

  it('고객센터 정보가 렌더링되어야 한다', () => {
    render(<Footer />);

    expect(screen.getByText('고객센터: 1833-4964')).toBeInTheDocument();
  });

  it('제휴문의 이메일 링크가 올바르게 렌더링되어야 한다', () => {
    render(<Footer />);

    expect(screen.getByText('제휴문의:')).toBeInTheDocument();

    const emailLink = screen.getByRole('link', { name: 'wible.biz@kia.com' });
    expect(emailLink).toHaveAttribute('href', 'mailto:wible.biz@kia.com');
  });
});
