import styles from './AppCard.module.css';

export default function AppCard({ app }) {
  return (
    <article className={styles.card}>
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
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {app.paid ? '有料版を購入' : '無料で試す'}
        <span className={styles.btnArrow}>↗</span>
      </a>
    </article>
  );
}