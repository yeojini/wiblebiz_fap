'use client';

import { useState } from 'react';
import { TabContext } from '@/hooks/useTabContext';

interface TabProps {
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  children: React.ReactNode;
}

export default function Tab({ defaultTab = '', onChange, children }: TabProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (tabId: string) => {
    if (activeTab !== tabId) {
      setActiveTab(tabId);
      onChange?.(tabId);
    }
  };

  return (
    <TabContext.Provider
      value={{
        activeTab,
        setActiveTab: handleTabChange,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
