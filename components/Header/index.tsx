'use client';

import { useEffect, useRef, useState } from 'react';
import Logo from '@/assets/wible_logo.svg';
import styles from './Header.module.scss';

const Header = () => {
  const [showShadow, setShowShadow] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current || !sentinelRef.current) return;

    const headerHeight = headerRef.current.offsetHeight;

    if (sentinelRef.current) {
      sentinelRef.current.style.top = `${headerHeight}px`;
    }

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setShowShadow(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current && sentinelRef.current) {
        observerRef.current.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      <header
        ref={headerRef}
        className={`${styles.header} ${showShadow ? styles.shadow : ''}`}
      >
        <Logo
          className={styles.logo}
          width={120}
          height={40}
          aria-label="Wible Logo"
          role="img"
        />
      </header>
    </>
  );
};

export default Header;
