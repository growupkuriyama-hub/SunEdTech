import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#top" className={styles.logo}>
          <span className={styles.sunIcon} aria-hidden="true">☀</span>
          <div className={styles.logoText}>
            <span className={styles.logoJa}>サン教育開発システム</span>
<span className={styles.logoAddress}>練馬区石神井町４－８－３</span>
            <span className={styles.logoEn}>SunEdTech</span>
          </div>
        </a>
        <nav className={styles.nav}>
          <a href="#apps" className={styles.navLink}>アプリ一覧</a>
          <a href="#features" className={styles.navLink}>特徴</a>
          <a href="#parents" className={styles.navLink}>保護者の方へ</a>
          <a href="#contact" className={styles.navCta}>お問い合わせ</a>
        </nav>
      </div>
    </header>
  );
}
