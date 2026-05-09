import React, { useState } from 'react';
import { APP_LIST } from '../data';
import AppCard from './AppCard';
import styles from './AppsSection.module.css';

const ALL_TAGS = ['すべて', ...new Set(APP_LIST.flatMap(app => app.tags))];

export default function AppsSection() {
  const [activeTag, setActiveTag] = useState('すべて');

  const filtered = activeTag === 'すべて'
    ? APP_LIST
    : APP_LIST.filter(app => app.tags.includes(activeTag));

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
        <div className={styles.filters}>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`${styles.filterBtn} ${activeTag === tag ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div className={styles.grid}>
          {filtered.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}