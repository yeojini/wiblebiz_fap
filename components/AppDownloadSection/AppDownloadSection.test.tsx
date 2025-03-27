import { render, screen } from '@testing-library/react';
import AppDownloadSection from './index';

describe('앱 다운로드 섹션에서', () => {
  beforeEach(() => {
    render(<AppDownloadSection />);
  });

  describe('사용자가 섹션을 볼 때', () => {
    it('위블 비즈 앱 다운로드 섹션임을 인지할 수 있어야 한다', () => {
      const section = screen.getByRole('region', {
        name: '위블 비즈 App 지금 만나보세요!',
      });
      expect(section).toBeInTheDocument();
    });

    it('두 개의 앱 스토어 다운로드 링크를 볼 수 있어야 한다', () => {
      const storeLinks = screen.getAllByRole('link');
      expect(storeLinks).toHaveLength(2);
    });
  });

  describe('안드로이드 사용자가', () => {
    it('Google Play 스토어로 이동할 수 있어야 한다', () => {
      const googlePlayLink = screen.getByRole('link', { name: /google play/i });
      expect(googlePlayLink).toHaveAttribute(
        'href',
        'https://play.google.com/store/apps/details?id=kor.mop.user.app',
      );
    });
  });

  describe('iOS 사용자가', () => {
    it('App Store로 이동할 수 있어야 한다', () => {
      const appStoreLink = screen.getByRole('link', { name: /app store/i });
      expect(appStoreLink).toHaveAttribute(
        'href',
        'https://apps.apple.com/kr/app/위블-비즈/id12345678',
      );
    });
  });
});
