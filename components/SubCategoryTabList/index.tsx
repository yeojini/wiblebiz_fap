import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import { CategoryType } from '@/types';
import { useFaqCategories } from '@/services/useFAQService';
import styles from './SubCategoryTabList.module.scss';

type SubCategoryTabListProps = {
  category: CategoryType;
};

export default function SubCategoryTabList({
  category,
}: SubCategoryTabListProps) {
  const { data } = useFaqCategories(category);

  return (
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
  );
}
