'use client';

import { CategoryType } from '@/types';
import Tab from '@/components/common/Tab';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import TabPanel from '@/components/common/TabPanel';
import { useFaqCategories } from '@/services/useFAQService';
import FAQList from '@/components/FAQList';

type CategoryTabPanelProps = {
  category: CategoryType;
};

export default function CategoryTabPanel({ category }: CategoryTabPanelProps) {
  const { data } = useFaqCategories(category);

  return (
    <TabPanel id={category}>
      <Tab defaultTab="ALL">
        <TabList>
          <TabButton id="ALL">전체</TabButton>
          {data?.map((item) => (
            <TabButton key={item.categoryID} id={item.categoryID}>
              {item.name}
            </TabButton>
          ))}
        </TabList>
        <TabPanel id="ALL">
          <FAQList category={category} subCategory="ALL" />
        </TabPanel>
        {data?.map((item) => (
          <TabPanel key={item.categoryID} id={item.categoryID}>
            <FAQList category={category} subCategory={item.categoryID} />
          </TabPanel>
        ))}
      </Tab>
    </TabPanel>
  );
}
