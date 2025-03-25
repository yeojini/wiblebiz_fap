import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import { CategoryType } from '@/types';
import { useFaqCategories } from '@/services/useFAQService';

type SubCategoryTabListProps = {
  category: CategoryType;
};

export default function SubCategoryTabList({
  category,
}: SubCategoryTabListProps) {
  const { data } = useFaqCategories(category);

  return (
    <TabList>
      <TabButton id="ALL">전체</TabButton>
      {data?.map((item) => (
        <TabButton key={item.categoryID} id={item.categoryID}>
          {item.name}
        </TabButton>
      ))}
    </TabList>
  );
}
