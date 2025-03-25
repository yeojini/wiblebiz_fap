import Logo from '@/assets/kia_logo.svg';
import styles from './Footer.module.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <Logo className={styles.logo} preserveAspectRatio="xMinYMid meet" />©
        2023 KIA CORP. All Rights Reserved.
      </div>
      <address className={styles.info}>
        <div className={styles.row}>
          <span>서울특별시 서초구 헌릉로 12 기아㈜</span>
          <span>대표: 송호성, 최준영</span>
        </div>
        <div className={styles.row}>
          <span>사업자등록번호: 119-81-02316</span>
          <span>통신판매번호: 2006-07935</span>
        </div>
        <div className={styles.row}>
          <span>고객센터: 1833-4964</span>
          <span>
            <span>제휴문의: </span>
            <Link href="mailto:wible.biz@kia.com" className={styles.link}>
              wible.biz@kia.com
            </Link>
          </span>
        </div>
      </address>
    </footer>
  );
}
