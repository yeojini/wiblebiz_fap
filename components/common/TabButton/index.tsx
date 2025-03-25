'use client';

type TabButtonProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function TabButton({
  id,
  children,
  className,
  selected,
  onClick,
}: TabButtonProps) {
  return (
    <button
      id={`tab-${id}`}
      role="tab"
      aria-selected={selected}
      aria-controls={`panel-${id}`}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
