import React, { useMemo, useState } from 'react';
import { APP_LIST } from '../data';
import AppCard from './AppCard';
import styles from './AppsSection.module.css';

export default function AppsSection() {
  const [activeTag, setActiveTag] = useState('すべて');

  const allTags = useMemo(() => {
    return ['すべて', '無料版', ...new Set(APP_LIST.flatMap(app => app.tags))];
  }, []);

  const filteredApps = useMemo(() => {
    if (activeTag === 'すべて') return APP_LIST;
    if (activeTag === '無料版') return APP_LIST.filter(app => !app.paid);
    return APP_LIST.filter(app => app.tags.includes(activeTag));
  }, [activeTag]);

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
          {allTags.map(tag => (
            <button
              key={tag}
              type="button"
              className={`${styles.filterBtn} ${activeTag === tag ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredApps.map(app => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}