import { SubCategoryType, CategoryType } from '@/types';
import TabPanel from '@/components/common/TabPanel';
import { fetchFaqs } from '@/services';

type SubCategoryTabPanelProps = {
  category: CategoryType;
  subCategory: SubCategoryType;
};

export default async function SubCategoryTabPanel({
  category,
  subCategory,
}: SubCategoryTabPanelProps) {
  const data = await fetchFaqs(category, subCategory, 0, 10);

  return (
    <TabPanel id={subCategory}>
      {data.items.map((item) => (
        <div key={item.id} id={item.id.toString()}>
          {item.question}
        </div>
      ))}
    </TabPanel>
  );
}
