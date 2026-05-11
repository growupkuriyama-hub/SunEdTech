# つるかめ算マスター！

小学生向けのつるかめ算練習アプリです。面積図でわかりやすく学べます。

## 特徴

- ツル×カメ、カブトムシ×クモ、タコ×イカ、人×犬 の4種類がランダム出題
- 面積図がリアルタイムで変化
- 全10問・スコア表示
- 外部APIなし・純粋なHTML+JS（1ファイル）

## Cloudflare Pages へのデプロイ手順

### 1. GitHubリポジトリを作成

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
git push -u origin main
```

### 2. Cloudflare Pages に接続

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. **Workers & Pages** → **Create application** → **Pages** タブ
3. **Connect to Git** → GitHubアカウントを連携 → 作成したリポジトリを選択
4. ビルド設定：
   - **Framework preset**: `None`
   - **Build command**: （空欄のまま）
   - **Build output directory**: `/`（もしくは `.`）
5. **Save and Deploy** をクリック

しばらくするとデプロイ完了し、`https://<プロジェクト名>.pages.dev` でアクセスできます。

### 以降の更新

```bash
git add .
git commit -m "update"
git push
```

pushするたびに自動で再デプロイされます。

## ファイル構成

```
index.html   ← アプリ本体（これ1ファイルだけ）
wrangler.toml← Cloudflare Pages ビルド設定
README.md    ← このファイル
```
