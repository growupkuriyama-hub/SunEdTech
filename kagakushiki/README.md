# 化学式練習アプリ

中学理科の化学式をランダム出題で練習できる静的Webアプリです。

## 機能

- 42種類の化学式（単体・化合物・酸化物・硫化物/塩化物）
- 問題数を 5 / 10 / 15 / 20 問から選択
- カテゴリ絞り込み
- ヒント表示
- 間違えた問題だけやり直す機能
- ダークモード対応

## ローカルで動かす

```bash
git clone https://github.com/<あなたのユーザー名>/chem-quiz.git
cd chem-quiz
npm run dev
# → http://localhost:3000
```

> `public/index.html` をブラウザで直接開くだけでも動作します。

---

## GitHub にアップロードする手順

### 1. GitHubでリポジトリを作成

1. https://github.com/new を開く
2. Repository name: `chem-quiz`
3. Public を選択 → **Create repository**

### 2. ローカルからプッシュ

```bash
cd chem-quiz

git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/<あなたのユーザー名>/chem-quiz.git
git branch -M main
git push -u origin main
```

---

## Cloudflare Pages で公開する手順

### A. ダッシュボードから（推奨）

1. https://dash.cloudflare.com にログイン
2. 左メニュー **Workers & Pages** → **Create** → **Pages** タブ
3. **Connect to Git** → GitHub を連携 → `chem-quiz` を選んで **Begin setup**
4. ビルド設定を以下のように入力：

   | 項目 | 値 |
   |---|---|
   | Framework preset | `None` |
   | Build command | （空欄のまま） |
   | Build output directory | `public` |

5. **Save and Deploy** をクリック
6. 数秒でデプロイ完了。発行された URL（例: `https://chem-quiz.pages.dev`）にアクセス

### B. Wrangler CLI から

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy public --project-name chem-quiz
```

### 自動デプロイについて

`main` ブランチに `git push` するたびに Cloudflare Pages が自動で再デプロイします。
Pull Request を作ると Preview URL も自動生成されます。

---

## フォルダ構成

```
chem-quiz/
├── public/
│   └── index.html   # アプリ本体（HTML + CSS + JS すべて 1 ファイル）
├── .gitignore
├── package.json
└── README.md
```

## ライセンス

MIT
