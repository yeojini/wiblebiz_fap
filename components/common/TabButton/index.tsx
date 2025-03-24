'use client';

import { useTabContext } from '@/hooks/useTabContext';

type TabButtonProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export default function TabButton({ id, children, className }: TabButtonProps) {
  const { activeTab, setActiveTab } = useTabContext();
  const isActive = activeTab === id;

  return (
    <button
      id={`tab-${id}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      className={className}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}
