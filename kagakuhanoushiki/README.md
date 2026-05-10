# ⚗️ 化学ラボ — 中学理科 化学反応式マスター

中学生向けの化学反応式学習ゲームアプリです。外部APIや課金サービスは一切使用せず、すべて内部データで動作します。

## 機能

| モード | 内容 |
|--------|------|
| ⚡ クイズバトル | 10問・ライフ3本・コンボボーナスXP |
| ⏱️ タイムアタック | 15秒カウントダウン付きクイズ |
| ⚖️ 係数合わせ | 化学反応式のバランシング練習 |
| 🔬 探索モード | 分子ビジュアル＋反応式一覧 |

## 技術スタック

- 純粋な HTML / CSS / JavaScript（フレームワーク不要）
- 外部通信なし・API通信なし・課金サービス不使用
- Google Fonts（Syne, Noto Sans JP）のみ外部リソース

## デプロイ方法（Vercel）

### 方法①: Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### 方法②: GitHub 連携（推奨）

1. このリポジトリを GitHub に push する
2. [vercel.com](https://vercel.com) にログイン
3. **New Project** → GitHub リポジトリを選択
4. **Framework Preset**: Other
5. **Output Directory**: `public`
6. **Deploy** をクリック

vercel.json により自動的に `public/index.html` が配信されます。

## ローカル確認

```bash
# 任意の静的ファイルサーバーで起動
npx serve public
# または
python3 -m http.server 3000 --directory public
```

ブラウザで `http://localhost:3000` を開く。

## ファイル構成

```
chemistry-lab/
├── public/
│   └── index.html   # アプリ本体（全コード1ファイル）
├── vercel.json      # Vercel デプロイ設定
└── README.md
```
