import { SubCategoryType, CategoryType } from '@/types';
import FaqList from '@/components/FAQList';
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
  const { items, pageInfo } = await fetchFaqs(category, subCategory, 0, 10);
  const hasMore = pageInfo.offset + pageInfo.limit < pageInfo.totalRecord;

  return (
    <TabPanel id={subCategory}>
      {items.map((item) => (
        <div key={item.id} id={item.id.toString()}>
          {item.question}
        </div>
      ))}
      {hasMore && (
        <FaqList
          pageInfo={pageInfo}
          category={category}
          subCategory={subCategory}
        />
      )}
    </TabPanel>
  );
}
