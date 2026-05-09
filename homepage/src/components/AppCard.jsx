import React from 'react';
import styles from './AppCard.module.css';

export default function AppCard({ app }) {
  const accentColor = app.color || '#F97316';
  const bgColor = app.bgColor || '#FFF7ED';

  const cardStyle = {
    '--card-accent': accentColor,
    '--card-bg': bgColor,
  };

  // ボタンは実画面で確実に見えるよう、重要な見た目を inline style でも指定します。
  // CSS Modules や CSS 変数の反映が遅れても、背景色・文字色・サイズは崩れません。
  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    width: '100%',
    marginTop: '8px',
    padding: '14px 20px',
    backgroundColor: accentColor,
    color: '#FFFFFF',
    fontSize: '15px',
    fontWeight: 800,
    lineHeight: 1.2,
    borderRadius: '14px',
    border: '2px solid transparent',
    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.16)',
    textDecoration: 'none',
    opacity: 1,
    visibility: 'visible',
    position: 'relative',
    zIndex: 2,
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

      <h3 className={styles.title}>{app.name}</h3>

      {app.nameJa && (
        <p className={styles.titleJa}>{app.nameJa}</p>
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
        style={buttonStyle}
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
