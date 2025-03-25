'use client';

import { useState } from 'react';
import { Faq } from '@/types';
import ArrowIcon from '@/assets/icons/arrow_icon.svg';
import styles from './FAQAccordion.module.scss';

type FAQAccordionProps = Faq;

export default function FAQAccordion({
  categoryName,
  subCategoryName,
  question,
  answer,
}: FAQAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={styles.item}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className={styles.left}>
          <div className={styles.categoryContainer}>
            <span className={styles.category}>{categoryName}</span>
            <ArrowIcon
              className={styles.arrowRight}
              fill="currentColor"
              width={18}
              height={18}
            />
            <span className={styles.category}>{subCategoryName}</span>
          </div>
          <p className={styles.question}>{question}</p>
        </div>
        <ArrowIcon className={`${styles.icon} ${isOpen && styles.up}`} />
      </button>
      <div className={`${styles.content} ${isOpen && styles.open}`}>
        <p className={styles.answer}>{answer}</p>
      </div>
    </li>
  );
}
