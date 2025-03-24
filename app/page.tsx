import FAQSection from '@/components/FAQSection';

export default async function Home() {
  return (
    <div>
      <main>
        <section>
          <h1>자주 묻는 질문</h1>
          <span>궁금하신 내용을 빠르게 찾아보세요.</span>
        </section>
        <FAQSection />
      </main>
    </div>
  );
}
