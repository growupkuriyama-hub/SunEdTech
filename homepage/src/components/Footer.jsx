import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.sunIcon} aria-hidden="true">☀</span>
          <div>
            <div className={styles.brandJa}>サン教育開発システム</div>
            <div className={styles.brandEn}>Sun Educational Development Systems</div>
          </div>
        </div>
        <div className={styles.copy}>
          © {year} SunEdTech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
