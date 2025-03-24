import { CategoryType } from '@/types';
import Tab from '@/components/common/Tab';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import TabPanel from '@/components/common/TabPanel';
import SubCategoryTabPanel from '@/components/SubCategoryTabPanel';
import SearchBar from '@/components/SearchBar';
import { fetchCategories } from '@/services';

type CategoryTabPanelProps = {
  category: CategoryType;
};

export default async function CategoryTabPanel({
  category,
}: CategoryTabPanelProps) {
  const data = await fetchCategories(category);

  return (
    <TabPanel id={category}>
      <Tab defaultTab="ALL">
        <SearchBar />
        <TabList>
          <TabButton id="ALL">전체</TabButton>
          {data.map((item) => (
            <TabButton key={item.categoryID} id={item.categoryID}>
              {item.name}
            </TabButton>
          ))}
        </TabList>
        <SubCategoryTabPanel category={category} subCategory="ALL" />
        {data.map((item) => (
          <SubCategoryTabPanel
            key={item.categoryID}
            category={category}
            subCategory={item.categoryID}
          />
        ))}
      </Tab>
    </TabPanel>
  );
}
