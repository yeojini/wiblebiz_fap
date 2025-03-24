'use client';

import { useState } from 'react';
import { TabContext } from '@/hooks/useTabContext';

type TabProps = {
  children: React.ReactNode;
  defaultTab: string;
  className?: string;
};

export const Tab = ({ children, defaultTab, className }: TabProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabContext.Provider>
  );
};

export default Tab;
