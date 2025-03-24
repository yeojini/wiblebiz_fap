import FAQSection from '@/components/FAQSection';
import ServiceInquirySection from '@/components/ServiceInquirySection';
import ServiceGuideSection from '@/components/ServiceGuideSection';
import AppDownloadSection from '@/components/AppDownloadSection';
export default async function Home() {
  return (
    <div>
      <main>
        <section>
          <h1>자주 묻는 질문</h1>
          <span>궁금하신 내용을 빠르게 찾아보세요.</span>
        </section>
        <FAQSection />
        <ServiceInquirySection />
        <ServiceGuideSection />
        <AppDownloadSection />
      </main>
    </div>
  );
}
