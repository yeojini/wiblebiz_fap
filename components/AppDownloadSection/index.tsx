import { useId } from 'react';
import Link from 'next/link';
import GooglePlayIcon from '@/assets/icons/google_play_icon.svg';
import AppStoreIcon from '@/assets/icons/app_store_icon.svg';
import styles from './AppDownloadSection.module.scss';

export default function AppDownloadSection() {
  const titleId = useId();
  return (
    <section className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        <span className={styles.emphasis}>위블 비즈 App</span> 지금 만나보세요!
      </h2>

      <div className={styles.links}>
        <Link
          href="https://play.google.com/store/apps/details?id=kor.mop.user.app"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <GooglePlayIcon />
          Google Play
        </Link>
        <Link
          href="https://apps.apple.com/kr/app/위블-비즈/id12345678"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <AppStoreIcon />
          App Store
        </Link>
      </div>
    </section>
  );
}
