import React from 'react';
import styles from './FeaturesSection.module.css';

const FEATURES = [
  {
    icon: '📱',
    title: 'ダウンロード不要',
    desc: 'Webブラウザで動作するので、アプリのインストールは一切不要。すぐに使い始められます。',
  },
  {
    icon: '💻',
    title: 'スマホ・PC対応',
    desc: 'スマートフォン・タブレット・PCいずれでも快適に学習できるよう設計されています。',
  },
  {
    icon: '🏫',
    title: '塾の指導経験から開発',
    desc: '実際の学習塾での指導経験をもとに、つまずきやすいポイントを徹底的に洗い出した教材です。',
  },
  {
    icon: '🔗',
    title: '教科横断的に学べる',
    desc: '英語×理科など、複数の教科を横断する教材設計で、知識の有機的なつながりを育てます。',
  },
];

export default function FeaturesSection() {
  return (
    <section className={styles.section} id="features">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>なぜSunEdTech？</span>
          <h2 className={styles.title}>4つの特徴</h2>
        </div>
        <div className={styles.grid}>
          {FEATURES.map((f) => (
            <div className={styles.card} key={f.title}>
              <div className={styles.iconWrap}>
                <span className={styles.icon}>{f.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
