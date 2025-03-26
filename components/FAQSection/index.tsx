import SearchFormProvider from '@/components/SearchFormProvider';
import FAQContent from '@/components/FAQContent';
import styles from './FAQSection.module.scss';

export default function FAQSection() {
  return (
    <section>
      <h1 className={styles.title}>
        자주 묻는 질문
        <em className={styles.description}>
          궁금하신 내용을 빠르게 찾아보세요.
        </em>
      </h1>
      <SearchFormProvider>
        <FAQContent />
      </SearchFormProvider>
    </section>
  );
}
