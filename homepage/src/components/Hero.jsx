import React from 'react';
import { APP_LIST } from '../data';
import styles from './Hero.module.css';

export default function Hero() {
  const freeCount = APP_LIST.filter(app => !app.paid).length;
  const paidCount = APP_LIST.filter(app => app.paid).length;

  return (
    <section className={styles.hero} id="top">
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Web教材プロジェクト ── ダウンロード不要で今すぐ使える
        </div>
        <h1 className={styles.headline}>
          学ぶ力を、<br />
          <span className={styles.highlight}>Webで少しずつ</span><br />
          強くする。
        </h1>
        <p className={styles.sub}>
          サン教育開発システムは、学習塾での指導経験をもとに、<br className={styles.desktopBr} />
          英語・理科・数学・資格学習のための小さなWeb教材を<br className={styles.desktopBr} />
          開発する教育ソフトウェアプロジェクトです。
        </p>
        <div className={styles.actions}>
          <a href="#apps" className={styles.btnPrimary}>
            アプリ一覧を見る
            <span className={styles.arrow}>→</span>
          </a>
          <a href="#features" className={styles.btnSecondary}>
            特徴を見る
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{freeCount}</span>
            <span className={styles.statLabel}>無料教材アプリ</span>
          </div>
          {paidCount > 0 && (
            <>
              <div className={styles.statDivider} />
              <div className={styles.stat}>
                <span className={styles.statNum}>{paidCount}</span>
                <span className={styles.statLabel}>有料教材アプリ</span>
              </div>
            </>
          )}
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>0円</span>
            <span className={styles.statLabel}>無料公開</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>即使える</span>
            <span className={styles.statLabel}>インストール不要</span>
          </div>
        </div>
      </div>
    </section>
  );
}