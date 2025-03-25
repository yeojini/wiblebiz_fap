import Tab from '@/components/common/Tab';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import CategoryTabPanel from '@/components/CategoryTabPanel';
import PrefetchBoundary from '@/lib/react-query/PrefetchBoundary';
import { QUERY_KEYS } from '@/services/queryKeys';
import { fetchCategories } from '@/services/faq';

export default async function FAQSection() {
  return (
    <Tab defaultTab="CONSULT">
      <TabList>
        <TabButton id="CONSULT">서비스 도입</TabButton>
        <TabButton id="USAGE">서비스 이용</TabButton>
      </TabList>
      <PrefetchBoundary
        fetchQueryOptions={[
          {
            queryKey: QUERY_KEYS.FAQ.CATEGORIES('CONSULT'),
            queryFn: () => fetchCategories('CONSULT'),
          },
          {
            queryKey: QUERY_KEYS.FAQ.CATEGORIES('USAGE'),
            queryFn: () => fetchCategories('USAGE'),
          },
        ]}
      >
        <CategoryTabPanel category="CONSULT" />
        <CategoryTabPanel category="USAGE" />
      </PrefetchBoundary>
    </Tab>
  );
}
