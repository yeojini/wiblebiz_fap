import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { kiaSignature } from './fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReactQueryProvider from '@/lib/react-query/ReactQueryProvider';
import styles from './layout.module.scss';
import '@/styles/global.scss';

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: '위블 비즈(Wible Biz)',
  description:
    '위블 비즈는 기업을 위한 친환경 모빌리티 서비스로 차량부터 전용 App/Web까지 업무차량 토탈 솔루션을 제공합니다.',
  keywords:
    '위블비즈,위블 비즈,모빌리티,구독서비스,차량구독,차량관리,업무용차량,법인차,관용차,전기차,FMS,스마트솔루션',
  robots: { index: true, follow: true },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className={kiaSignature.className}>
      <body>
        <ReactQueryProvider>
          <Header />
          <div className={styles.container}>{children}</div>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
