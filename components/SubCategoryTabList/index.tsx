import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import { CategoryType, SubCategoryType } from '@/types';
import { useFaqCategories } from '@/services/useFAQService';

type SubCategoryTabListProps = {
  category: CategoryType;
  selectedSubCategory: SubCategoryType;
  onSelectSubCategory: (subCategory: SubCategoryType) => void;
};

export default function SubCategoryTabList({
  category,
  selectedSubCategory,
  onSelectSubCategory,
}: SubCategoryTabListProps) {
  const { data } = useFaqCategories(category);

  return (
    <TabList>
      <TabButton
        id="ALL"
        selected={selectedSubCategory === 'ALL'}
        onClick={() => onSelectSubCategory('ALL')}
      >
        전체
      </TabButton>
      {data?.map((item) => (
        <TabButton
          key={item.categoryID}
          id={item.categoryID}
          selected={selectedSubCategory === item.categoryID}
          onClick={() => onSelectSubCategory(item.categoryID)}
        >
          {item.name}
        </TabButton>
      ))}
    </TabList>
  );
}
