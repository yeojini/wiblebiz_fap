import Tab from '@/components/common/Tab';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import CategoryTabPanel from '@/components/CategoryTabPanel';

export default async function FAQSection() {
  return (
    <Tab defaultTab="CONSULT">
      <TabList>
        <TabButton id="CONSULT">서비스 도입</TabButton>
        <TabButton id="USAGE">서비스 이용</TabButton>
      </TabList>
      <CategoryTabPanel category="CONSULT" />
      <CategoryTabPanel category="USAGE" />
    </Tab>
  );
}
