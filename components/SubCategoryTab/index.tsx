'use client';

import { useFaqCategories } from '@/services/useFAQService';
import { CategoryType } from '@/types';
import Tab from '@/components/common/Tab';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import TabPanel from '@/components/common/TabPanel';
import styles from './SubCategoryTab.module.scss';

type SubCategoryTabProps = {
  category: CategoryType;
  children: React.ReactNode;
};

export default function SubCategoryTab({
  category,
  children,
}: SubCategoryTabProps) {
  const { data } = useFaqCategories(category);

  return (
    <Tab defaultTab="ALL">
      <TabList className={styles.tabList}>
        <TabButton id="ALL" className={styles.tabButton}>
          전체
        </TabButton>
        {data?.map((item) => (
          <TabButton
            key={item.categoryID}
            id={item.categoryID}
            className={styles.tabButton}
          >
            {item.name}
          </TabButton>
        ))}
      </TabList>
      <TabPanel id="ALL">{children}</TabPanel>
      {data?.map((item) => (
        <TabPanel key={item.categoryID} id={item.categoryID}>
          {children}
        </TabPanel>
      ))}
    </Tab>
  );
}
