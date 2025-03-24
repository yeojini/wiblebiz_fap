import { SubCategoryType, CategoryType } from '@/types';
import FaqList from '@/components/FAQList';
import TabPanel from '@/components/common/TabPanel';
import { fetchFaqs } from '@/services';
import FAQAccordion from '@/components/FAQAccordion';

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
      {items.map(({ id, categoryName, subCategoryName, question, answer }) => (
        <FAQAccordion
          key={id}
          id={id}
          categoryName={categoryName}
          subCategoryName={subCategoryName}
          question={question}
          answer={answer}
        />
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
