import React from 'react';
import { APP_LIST } from '../data';
import AppCard from './AppCard';
import styles from './AppsSection.module.css';

export default function AppsSection() {
  return (
    <section className={styles.section} id="apps">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Web教材アプリ</span>
          <h2 className={styles.title}>アプリ一覧</h2>
          <p className={styles.desc}>
            すべてブラウザで動作します。インストール不要、アカウント登録なしで今すぐ使えます。
          </p>
        </div>
        <div className={styles.grid}>
          {APP_LIST.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}
