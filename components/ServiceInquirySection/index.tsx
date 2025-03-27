import Link from 'next/link';
import DownloadIcon from '@/assets/icons/download_icon.svg';
import TalkIcon from '@/assets/icons/talk_icon.svg';
import WriteIcon from '@/assets/icons/write_icon.svg';
import styles from './ServiceInquirySection.module.scss';

export default function ServiceInquirySection() {
  return (
    <section>
      <h2 className={styles.title}>서비스 문의</h2>
      <div className={styles.links}>
        <Link
          href="/proposal.pdf"
          download="위블비즈 상품제안서"
          target="_blank"
          className={styles.link}
        >
          <DownloadIcon className={styles.icon} />
          <span>상품 제안서 다운로드</span>
        </Link>
        <Link href="/counsel" className={styles.link}>
          <WriteIcon className={styles.icon} />
          <span>상담문의 등록하기</span>
        </Link>
        <Link
          href="https://pf.kakao.com/_xfLxjdb"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <TalkIcon className={styles.icon} />
          <div className={styles.talkText}>
            <span>카톡으로 문의하기</span>
            <span className={styles.talkId}>ID: Wible Biz(위블 비즈)</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
