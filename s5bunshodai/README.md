# 算数文章題 練習アプリ

小学5年生向けの算数文章題を、ローカルの問題ストックからランダムに出題する静的アプリです。  
AI APIやサーバー側処理は使っていないため、APIキー不要・追加料金なしで公開できます。

## 機能

- 問題ストックからランダム出題
- ジャンル絞り込み（速さ・分数・割合・体積・単位換算）
- 答え合わせ＋解説表示
- 正答率・問題数カウント
- ブラウザだけで動く静的アプリ

## 現在の問題数

- 速さ・時間: 10問
- 体積・面積: 10問
- 分数計算: 10問
- 割合・百分率: 10問
- 単位換算: 10問

合計 50問です。

## 問題を追加する場所

`src/problems.js` の `PROBLEM_BANK` に、次の形式で追加してください。

```js
{
  id: 'speed-011',
  category: 'speed',
  cat: '速さ・時間',
  text: '問題文をここに書きます。',
  parts: [
    { question: '何を求めるか', answer: '15', unit: '分' }
  ],
  explanation: '解説を書きます。',
}
```

`category` は以下のどれかです。

| category | 表示カテゴリ |
|---|---|
| `speed` | 速さ・時間 |
| `volume` | 体積・面積 |
| `fraction` | 分数計算 |
| `ratio` | 割合・百分率 |
| `unit` | 単位換算 |

答えは数値で判定します。分数は `3/4` のようなスラッシュ記法で書けます。ユーザーが小数で答えても、数値が合っていれば正解になります。

## 使用技術

- Vite（ビルドツール）
- Vanilla JS + CSS
- AI APIなし

---

## ローカル開発

### 1. 依存インストール

```bash
npm install
```

### 2. 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

### 3. ビルド確認

```bash
npm run build
npm run preview
```

---

## Vercel で公開する手順

### 1. Vercel にインポート

1. Vercel にログイン
2. ダッシュボードで「Add New → Project」をクリック
3. GitHub のリポジトリを選択
4. 「Import」をクリック

### 2. ビルド設定

Vite プロジェクトは Vercel が自動判定します。確認だけしてください。

| 項目 | 値 |
|------|----|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

### 3. デプロイ

環境変数の設定は不要です。  
「Deploy」ボタンをクリックすれば公開できます。

---

## セキュリティ

この版では、Anthropic Claude API / OpenAI API / Gemini API などへの接続はありません。  
APIキーも不要です。

## ライセンス

MIT
