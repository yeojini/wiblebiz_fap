import { useId } from 'react';
import Link from 'next/link';
import GooglePlayIcon from '@/assets/icons/google_play_icon.svg';
import AppStoreIcon from '@/assets/icons/app_store_icon.svg';

export default function AppDownloadSection() {
  const titleId = useId();
  return (
    <section aria-labelledby={titleId}>
      <h2 id={titleId}>
        <span>위블 비즈 App</span> 지금 만나보세요!
      </h2>

      <div>
        <Link
          href="https://play.google.com/store/apps/details?id=kor.mop.user.app"
          target="_blank"
          rel="noreferrer"
        >
          <GooglePlayIcon />
          <span>Google Play</span>
        </Link>

        <Link
          href="https://apps.apple.com/kr/app/위블-비즈/id12345678"
          target="_blank"
          rel="noreferrer"
        >
          <AppStoreIcon />
          <span>App Store</span>
        </Link>
      </div>
    </section>
  );
}
