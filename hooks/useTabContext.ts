import { createContext, useContext } from 'react';

type TabContextType = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

export const TabContext = createContext<TabContextType | undefined>(undefined);

export const useTabContext = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error('Tab 컴포넌트는 TabProvider 내부에서 사용되어야 합니다');
  }
  return context;
};
