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
              viewBox="0 0 24px 24px"
            />
            <span className={styles.subCategory}>{subCategoryName}</span>
          </div>
          <div className={styles.question}>{question}</div>
        </div>
        <ArrowIcon className={`${styles.icon} ${isOpen && styles.up}`} />
      </button>
      {isOpen && <div className={styles.content}>{answer}</div>}
    </li>
  );
}
