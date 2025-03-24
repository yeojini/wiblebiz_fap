'use client';

type TabListProps = {
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
};

export default function TabList({
  children,
  ariaLabel,
  className,
}: TabListProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={className}>
      {children}
    </div>
  );
}
