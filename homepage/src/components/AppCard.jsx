import React from 'react';
import styles from './AppCard.module.css';

export default function AppCard({ app }) {
  return (
    <article className={styles.card} style={{ '--card-accent': app.color, '--card-bg': app.bgColor }}>
      <div className={styles.iconWrap}>
        <span className={styles.icon}>{app.icon}</span>
      </div>
      <div className={styles.body}>
        <div className={styles.tags}>
          {app.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        <h3 className={styles.name}>{app.nameJa}</p>
        <p className={styles.description}>{app.description}</p>
        <div className={styles.target}>
          <span className={styles.targetIcon}>🎯</span>
          <span>{app.target}</span>
        </div>
      </div>
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        無料で試す
        <span className={styles.btnArrow}>↗</span>
      </a>
    </article>
  );
}
