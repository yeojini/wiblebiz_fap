import { CategoryType } from '@/types';
import SearchFormProvider from '@/components/SearchFormProvider';
import CategoryTab from '@/components/CategoryTab';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import TabPanel from '@/components/common/TabPanel';
import SubCategoryTab from '@/components/SubCategoryTab';
import FAQList from '@/components/FAQList';
import SearchBar from '@/components/SearchBar';
import SearchResult from '@/components/common/SearchResult';
import QueryErrorSuspenseBoundary from '@/components/QueryErrorSuspenseBoundary';

import styles from './FAQSection.module.scss';

const FAQ_CATEGORIES: Record<CategoryType, string> = {
  CONSULT: '서비스 도입',
  USAGE: '서비스 이용',
} as const;

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
        <CategoryTab>
          <TabList className={styles.tabList}>
            {Object.entries(FAQ_CATEGORIES).map(([key, value]) => (
              <TabButton className={styles.tabButton} id={key} key={key}>
                {value}
              </TabButton>
            ))}
          </TabList>
          <SearchBar />
          <SearchResult />
          <QueryErrorSuspenseBoundary>
            {Object.keys(FAQ_CATEGORIES).map((key) => (
              <TabPanel id={key} key={key}>
                <SubCategoryTab category={key as CategoryType}>
                  <QueryErrorSuspenseBoundary>
                    <FAQList category={key as CategoryType} />
                  </QueryErrorSuspenseBoundary>
                </SubCategoryTab>
              </TabPanel>
            ))}
          </QueryErrorSuspenseBoundary>
        </CategoryTab>
      </SearchFormProvider>
    </section>
  );
}
