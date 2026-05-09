# 中学卒業レベル 英単語クイズ

小学校内容も含めた中学卒業レベルの英単語クイズです。
React + Vite で作った完全静的アプリです。

## 特徴

- AI通信なし
- API通信なし
- 外部データ取得なし
- 問題データは `src/data/` 内のローカルファイルのみ
- 学習データはブラウザの localStorage のみに保存
- Cloudflare Pages で静的デプロイ可能

## ローカル実行

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

`dist` フォルダが生成されます。

## Cloudflare Pages 設定

- Framework preset: Vite
- Build command: npm run build
- Build output directory: dist

## 単語データの追加

`src/data/elementaryWords.js`, `grade1Words.js`, `grade2Words.js`, `grade3Words.js` に以下の形式で追加してください。

```js
{
  word: 'apple',
  meaning: 'りんご',
  level: 'elementary',
  partOfSpeech: 'noun'
}
```

## 注意

外部通信を入れない方針です。通信処理や外部サービス接続は追加しないでください。
