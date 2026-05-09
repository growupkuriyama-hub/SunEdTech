import React from 'react';
import styles from './ParentsSection.module.css';

const USE_CASES = [
  { icon: '🏠', title: '家庭学習として', desc: '学校の授業の予習・復習に、短時間でさっと取り組める教材です。' },
  { icon: '📚', title: '塾の補助教材として', desc: '授業前後のウォームアップや確認テストとして、塾の先生にもご活用いただけます。' },
  { icon: '🌍', title: '英語長文への入口に', desc: '英語と理科を組み合わせた教材で、英語の長文読解への興味・入口を作ります。' },
  { icon: '🔭', title: '理科への橋がけに', desc: '英文を通して理科用語・概念に触れることで、両教科の理解を同時に深めます。' },
];

export default function ParentsSection() {
  return (
    <section className={styles.section} id="parents">
      <div className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <span className={styles.eyebrow}>保護者の方・先生方へ</span>
            <h2 className={styles.title}>
              安心して使える<br />Web教材です
            </h2>
            <p className={styles.desc}>
              サン教育開発システムの教材は、高円寺数理塾および学習塾グロウアップでの学習現場のニーズに応えて開発されています。
              広告表示なし、個人情報の収集なし、ブラウザだけで完結する安全な学習ツールです。
            </p>
            <div className={styles.trustBadges}>
              <span className={styles.badge}>✅ 広告なし</span>
              <span className={styles.badge}>✅ 登録不要</span>
              <span className={styles.badge}>✅ 無料公開</span>
            </div>
          </div>
          <div className={styles.right}>
            {USE_CASES.map((u, i) => (
              <div className={styles.useCase} key={i}>
                <span className={styles.useCaseIcon}>{u.icon}</span>
                <div>
                  <div className={styles.useCaseTitle}>{u.title}</div>
                  <div className={styles.useCaseDesc}>{u.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
