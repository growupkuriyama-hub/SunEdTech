# レベル別 英検トレーニング 英語DE科学

Cloudflare Pages向けの完全静的な英検トレーニングアプリです。

## 内容

- 上部に「サイトに戻る」ボタン
  - https://sunedtech-hp.pages.dev/
- 級ボタン
  - 準２級
  - ２級
  - 準１級
- 各級に Level 1 / Level 2 / Level 3
- 全データは `index.html` 内に埋め込み
- 外部API、AI通信、広告通信、課金APIなし

## Cloudflare Pages設定例

- Framework preset: None
- Build command: 空欄 または `npm run build`
- Build output directory: `.`
- Root directory: `/`
