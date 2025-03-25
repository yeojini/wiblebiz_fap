'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { searchSchema, type SearchFormData } from '@/schemas/searchSchema';
import SearchProvider from '@/components/SearchProvider';
import FAQContent from '@/components/FAQContent';
import styles from './FAQSection.module.scss';

export default function FAQSection() {
  const methods = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
    mode: 'onSubmit',
  });

  return (
    <section>
      <h1 className={styles.title}>
        자주 묻는 질문
        <em className={styles.description}>
          궁금하신 내용을 빠르게 찾아보세요.
        </em>
      </h1>
      <FormProvider {...methods}>
        <SearchProvider>
          <FAQContent />
        </SearchProvider>
      </FormProvider>
    </section>
  );
}
