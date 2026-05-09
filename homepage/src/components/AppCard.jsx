import React from 'react';
import styles from './AppCard.module.css';

export default function AppCard({ app }) {
  const accentColor = app.color || '#F97316';
  const bgColor = app.bgColor || '#FFF7ED';

  const cardStyle = {
    '--card-accent': accentColor,
    '--card-bg': bgColor,
  };

  return (
    <article className={styles.card} style={cardStyle}>
      <div className={styles.cardHeader}>
        <div className={styles.iconWrap}>
          <span className={styles.icon}>{app.icon}</span>
        </div>

        <div className={styles.meta}>
          {app.paid && <span className={styles.paidBadge}>有料</span>}
          {!app.paid && <span className={styles.freeBadge}>無料</span>}
        </div>
      </div>


      {app.nameJa && (
        <h3 className={styles.titleJa}>{app.nameJa}</h3>
      )}

      {app.description && (
        <p className={styles.description}>{app.description}</p>
      )}

      {app.tags && app.tags.length > 0 && (
        <div className={styles.tags}>
          {app.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <a
        className={styles.btn}
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{app.paid ? '有料版を購入' : '無料で試す'}</span>
        <span className={styles.btnArrow}>↗</span>
      </a>
    </article>
  );
}