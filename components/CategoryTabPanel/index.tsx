import TabPanel from '@/components/common/TabPanel';
import { useTabContext } from '@/hooks/useTabContext';
import { CategoryType } from '@/types';
import FAQList from '@/components/FAQList';
import Tab from '@/components/common/Tab';

export default function CategoryTabPanel() {
  const { activeTab } = useTabContext();
  const category = activeTab as CategoryType;

  return (
    <TabPanel id={category}>
      <Tab defaultTab="ALL">
        <FAQList category={category} />
      </Tab>
    </TabPanel>
  );
}
