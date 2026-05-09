# サン教育開発システム — SunEdTech ポータルサイト

**Sun Educational Development Systems**  
英語・理科・数学・資格学習のためのWeb教材ポータルサイトです。

---

## 技術スタック

- **React 18** + **Vite 5**
- CSS Modules（スコープ付きスタイル）
- Google Fonts（Noto Sans JP / Outfit）

---

## アプリ一覧の編集

`src/data.js` を編集するだけでアプリカードを追加・変更できます。

```js
export const APP_LIST = [
  {
    id: "your-app-id",          // 一意のID
    name: "App Name",           // 英語タイトル
    nameJa: "アプリ名",          // 日本語タイトル
    description: "説明文",
    target: "対象学年・レベル",
    tags: ["タグ1", "タグ2"],
    url: "https://your-app.com", // ← ここにURLを入力
    color: "#3B82F6",            // カードのアクセントカラー
    bgColor: "#EFF6FF",          // カードの背景色
    icon: "🔬",                  // 絵文字アイコン
  },
];
```

---

## ローカル開発

```bash
# 依存パッケージをインストール
npm install

# 開発サーバー起動（http://localhost:5173）
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

---

## Vercel へのデプロイ手順

### 方法A: Vercel CLI（推奨）

```bash
# 1. Vercel CLI をインストール
npm install -g vercel

# 2. ログイン
vercel login

# 3. プロジェクトルートでデプロイ
vercel

# 4. 本番デプロイ
vercel --prod
```

初回は対話形式で設定を確認されます。  
- **Framework Preset**: Vite（自動検出されます）  
- **Build Command**: `npm run build`  
- **Output Directory**: `dist`

---

### 方法B: GitHub 連携（自動デプロイ）

1. このリポジトリを GitHub に push する
2. [vercel.com](https://vercel.com) にアクセスし「New Project」
3. GitHub リポジトリを選択してインポート
4. Framework は「Vite」を選択（自動検出される場合が多い）
5. 「Deploy」ボタンをクリック

以後は `git push` するたびに自動デプロイされます。

---

### 方法C: ドラッグ&ドロップ

```bash
npm run build
```

ビルド後、Vercel ダッシュボードの「Deploy」ページに `dist/` フォルダをドラッグ&ドロップするだけです。

---

## 主なカスタマイズ箇所

| ファイル | 内容 |
|---|---|
| `src/data.js` | アプリ一覧データ（URL・タグ・色など） |
| `src/components/ContactSection.jsx` | お問い合わせメールアドレス |
| `src/index.css` | カラーパレット（CSS変数） |
| `index.html` | サイトのタイトル・メタ情報 |

---

## ライセンス

本プロジェクトのコードは自由にご利用いただけます。  
教材コンテンツの著作権はサン教育開発システムに帰属します。
