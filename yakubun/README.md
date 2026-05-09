# 分数の約分練習

分数の約分を繰り返し練習するシンプルな静的Webアプリです。  
ビルドツール不要。HTML / CSS / JavaScript のみで動作します。

## 機能

- 3段階の難易度（かんたん・ふつう・むずかしい）
- 正解 / 不正解 / 連続正解のカウント
- ヒント機能（公約数を表示）
- ダークモード自動対応

## ローカルで動かす

ビルド不要です。`index.html` をブラウザで開くだけで動きます。

```bash
# VS Code の Live Server 拡張、または任意の静的サーバーを使う場合
npx serve .
```

## GitHubにアップロードする手順

```bash
# 1. リポジトリを初期化
git init
git add .
git commit -m "first commit"

# 2. GitHub でリポジトリを作成したあと（空のまま）
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git branch -M main
git push -u origin main
```

## Vercel で公開する手順

### A. Vercel ダッシュボードから（推奨）

1. [vercel.com](https://vercel.com) にサインイン（GitHubアカウントで OK）
2. **Add New → Project** をクリック
3. **Import Git Repository** で先ほどの GitHub リポジトリを選択
4. 設定画面では何も変更しない（Framework Preset: `Other` のまま）
5. **Deploy** ボタンを押す → 約30秒で公開完了

`vercel.json` により静的サイトとして自動判定されます。

### B. Vercel CLI から

```bash
npm i -g vercel
vercel login
vercel --prod
```

### 再デプロイ

`main` ブランチに push するたびに Vercel が自動でデプロイします。

```bash
git add .
git commit -m "update"
git push
```

## ファイル構成

```
fraction-app/
├── index.html    # マークアップ
├── style.css     # スタイル（ダークモード含む）
├── app.js        # ゲームロジック
├── vercel.json   # Vercel 静的サイト設定
├── .gitignore
└── README.md
```

## ライセンス

MIT
