# 英検レベル別 科学・論理英語クイズ

完全静的な単一HTMLアプリです。

## 改修内容

- ページ上部に「サイトに戻る」ボタンを追加
  - 遷移先: https://sunedtech-hp.pages.dev/
- 英検準2級・英検準1級・英検1級の切り替えボタンを追加
- 各級に Level 1 / Level 2 / Level 3 を追加
- 全問題データは `index.html` 内部に保存
- 外部API、AI API、外部CDN、広告通信、課金APIは不使用

## Cloudflare Pages

静的サイトとしてそのままデプロイできます。

推奨設定:

| 項目 | 値 |
|---|---|
| Framework preset | None / Other |
| Build command | 空欄、または `npm run build` |
| Output directory | `.` |
| Root directory | このフォルダ |

## ローカル確認

```bash
npm run start
```

または `index.html` をブラウザで直接開いて確認できます。
