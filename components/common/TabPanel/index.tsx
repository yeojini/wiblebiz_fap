'use client';

import { useTabContext } from '@/hooks/useTabContext';

type TabPanelProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export default function TabPanel({ id, children, className }: TabPanelProps) {
  const { activeTab } = useTabContext();
  const isActive = activeTab === id;

  if (!isActive) return null;

  return (
    <div
      id={`panel-${id}`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      className={className}
    >
      {children}
    </div>
  );
}
