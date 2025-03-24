import { SubCategoryType, CategoryType, FaqResponse } from '@/types';
import TabPanel from '@/components/common/TabPanel';

type SubCategoryTabPanelProps = {
  category: CategoryType;
  subCategory: SubCategoryType;
};

export default async function SubCategoryTabPanel({
  category,
  subCategory,
}: SubCategoryTabPanelProps) {
  const url =
    subCategory === 'ALL'
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/faq/?limit=10&offset=0&tab=${category}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/faq/?limit=10&offset=0&tab=${category}&faqCategoryID=${subCategory}`;

  const jsonData = await fetch(url);
  const data = (await jsonData.json()) as FaqResponse;

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
