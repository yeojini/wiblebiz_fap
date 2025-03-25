import FAQSection from '@/components/FAQSection';
import ServiceInquirySection from '@/components/ServiceInquirySection';
import ServiceGuideSection from '@/components/ServiceGuideSection';
import AppDownloadSection from '@/components/AppDownloadSection';

export const revalidate = 3600;

export default async function Home() {
  return (
    <main>
      <FAQSection />
      <ServiceInquirySection />
      <ServiceGuideSection />
      <AppDownloadSection />
    </main>
  );
}
