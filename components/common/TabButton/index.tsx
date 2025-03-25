'use client';

import { useTabContext } from '@/hooks/useTabContext';

type TabButtonProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

export default function TabButton({ id, children, className }: TabButtonProps) {
  const { activeTab, setActiveTab } = useTabContext();
  const handleClick = () => setActiveTab(id);
  const isActive = activeTab === id;

  return (
    <button
      id={`tab-${id}`}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${id}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
