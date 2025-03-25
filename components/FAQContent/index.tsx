import Tab from '@/components/common/Tab';
import SearchBar from '@/components/SearchBar';
import CategoryTabPanel from '@/components/CategoryTabPanel';
import { useSearchContext } from '@/hooks/useSearchContext';
import TabList from '@/components/common/TabList';
import TabButton from '@/components/common/TabButton';
import { useFormContext } from 'react-hook-form';
import styles from './FAQContent.module.scss';

export default function FAQContent() {
  const { setQuery } = useSearchContext();
  const { reset } = useFormContext();

  const handleTabChange = () => {
    setQuery('');
    reset();
  };

  return (
    <Tab defaultTab="CONSULT" onChange={handleTabChange}>
      <TabList className={styles.tabList}>
        <TabButton className={styles.tabButton} id="CONSULT">
          서비스 도입
        </TabButton>
        <TabButton className={styles.tabButton} id="USAGE">
          서비스 이용
        </TabButton>
      </TabList>
      <SearchBar />
      <CategoryTabPanel />
    </Tab>
  );
}
