import React from 'react';
import styles from './ContactSection.module.css';

// ★ メールアドレスをここだけ変更すればOK
const CONTACT_EMAIL = 'example@example.com';

export default function ContactSection() {
  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.sunDecor} aria-hidden="true">☀</div>
          <span className={styles.eyebrow}>お問い合わせ</span>
          <h2 className={styles.title}>利用希望・体験希望の方へ</h2>
          <p className={styles.desc}>
            教材の利用希望・体験のご要望、塾での導入相談など、<br />
            お気軽にメールでお問い合わせください。
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.emailBtn}>
            <span className={styles.emailIcon}>✉</span>
            {CONTACT_EMAIL}
          </a>
          <p className={styles.note}>
            ※ 返信にはお時間をいただく場合があります。あらかじめご了承ください。
          </p>
        </div>
      </div>
    </section>
  );
}
