# 化学式練習アプリ

中学理科の化学式をランダム出題で練習できる静的Webアプリです。

## 機能

- 42種類の化学式（単体・化合物・酸化物・硫化物/塩化物）
- 問題数を 5 / 10 / 15 / 20 問から選択
- カテゴリ絞り込み（単体 / 化合物 / 酸化物 / 硫化物・塩化物）
- ヒント表示
- 結果画面で「間違えた問題だけやり直す」機能
- ダークモード対応

## ローカルで動かす

```bash
# リポジトリをクローン
git clone https://github.com/<あなたのユーザー名>/chem-quiz.git
cd chem-quiz

# ローカルサーバー起動（Node.js 不要の場合は index.html を直接開いてもOK）
npm run dev
# → http://localhost:3000 で確認
```

> `public/index.html` をブラウザで直接開くだけでも動作します。

---

## GitHub にアップロードする手順

### 1. リポジトリを作成

1. https://github.com/new を開く
2. Repository name: `chem-quiz`
3. Public を選択 → **Create repository**

### 2. ローカルからプッシュ

```bash
cd chem-quiz

git init
git add .
git commit -m "first commit"

# GitHub のリポジトリ URL に合わせて変更してください
git remote add origin https://github.com/<あなたのユーザー名>/chem-quiz.git
git branch -M main
git push -u origin main
```

---

## Vercel で公開する手順

### A. Vercel ダッシュボードから（推奨）

1. https://vercel.com にログイン（GitHub アカウントで OK）
2. **Add New → Project** をクリック
3. `chem-quiz` リポジトリを選んで **Import**
4. 設定画面では何も変更せずそのまま **Deploy**
   - `vercel.json` の `outputDirectory: "public"` が自動で読まれます
   - ビルドコマンドは空欄で構いません
5. デプロイ完了後、発行された URL（例: `https://chem-quiz-xxx.vercel.app`）にアクセス

### B. Vercel CLI から

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 自動デプロイについて

`main` ブランチに `git push` するたびに Vercel が自動で再デプロイします。
Pull Request を作ると Preview URL も自動生成されます。

---

## フォルダ構成

```
chem-quiz/
├── public/
│   └── index.html   # アプリ本体（HTML + CSS + JS すべて 1 ファイル）
├── .gitignore
├── package.json     # npm run dev / build 用
├── vercel.json      # Vercel に public/ を配信するよう指示
└── README.md
```

## ライセンス

MIT
