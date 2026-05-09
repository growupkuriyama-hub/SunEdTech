# 英単語クイズ

中学卒業レベルの英単語学習Webアプリです。

## 特徴

- **完全静的** — AI API・外部API通信・サーバーサイド処理を一切使用しません
- **オフライン動作** — インターネット接続なしでも動作します
- **学習履歴保存** — ブラウザのlocalStorageに解答履歴を保存します
- **苦手単語復習** — 間違えた単語だけを集中的に復習できます
- **約1,500語収録** — 小学校〜中3レベルの語彙を収録。2,400語程度まで拡張しやすい構成です

## レベル構成

| レベル | 語数の目安 |
|--------|-----------|
| 小学校 | 386語 |
| 中1    | 389語 |
| 中2    | 365語 |
| 中3    | 361語 |
| 全範囲 | 1,501語 |

## ローカルでの実行方法

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev

# 本番ビルド（distフォルダが生成される）
npm run build
```

## Cloudflare Pages へのデプロイ

1. このリポジトリをGitHubにプッシュする
2. Cloudflare Pagesのダッシュボードで「新しいプロジェクトを作成」
3. GitHubリポジトリと接続する
4. ビルド設定を以下のように入力する

| 項目 | 値 |
|------|----|
| Framework preset | Vite |
| Build command | npm run build |
| Build output directory | dist |

5. 「保存してデプロイ」を押す

## 単語データの追加・修正方法

単語データは `src/data/` 以下の4ファイルに分かれています。

```
src/data/
  elementaryWords.js  ← 小学校レベル
  grade1Words.js      ← 中1レベル
  grade2Words.js      ← 中2レベル
  grade3Words.js      ← 中3レベル
  index.js            ← 上記をまとめてエクスポート
```

各ファイルの形式：

```js
export const elementaryWords = [
  { word: "apple", meaning: "りんご", level: "elementary", partOfSpeech: "noun" },
  // ...
];
```

`partOfSpeech` に使える値：
`noun` / `verb` / `adjective` / `adverb` / `preposition` / `conjunction` / `pronoun` / `phrase` / `other`

単語を追加したら、各ファイルの配列に追記するだけで自動的にクイズに反映されます。

## 注意事項

- このアプリに `fetch` / `axios` / `XMLHttpRequest` / `WebSocket` / AI API などの外部通信を追加しないでください
- `process.env` や `import.meta.env` を使った環境変数の埋め込みも不要です
- 学習データはブラウザのlocalStorageに保存されます。ブラウザのデータを削除するとリセットされます

## チェックリスト

- [x] `npm run build` が通る構成
- [x] 外部API通信なし
- [x] fetch等を使っていない
- [x] Cloudflare Pagesで静的デプロイ可能
- [x] 単語データを増やしやすい構造
