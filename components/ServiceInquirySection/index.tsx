import Link from 'next/link';
import DownloadIcon from '@/aseets/icons/download_icon.svg';
import TalkIcon from '@/aseets/icons/talk_icon.svg';
import WriteIcon from '@/aseets/icons/write_icon.svg';

export default function ServiceInquirySection() {
  return (
    <section>
      <h2>서비스 문의</h2>
      <Link href="/proposal.pdf" download="위블비즈 상품제안서" target="_blank">
        <DownloadIcon />
        <span>상품 제안서 다운로드</span>
      </Link>
      <Link href="/counsel">
        <WriteIcon />
        <span>상담문의 등록하기</span>
      </Link>
      <Link
        href="https://pf.kakao.com/_xfLxjdb"
        target="_blank"
        rel="noreferrer"
      >
        <TalkIcon />
        <div>
          <span>카톡으로 문의하기</span>
          <span>ID: Wible Biz(위블 비즈)</span>
        </div>
      </Link>
    </section>
  );
}
