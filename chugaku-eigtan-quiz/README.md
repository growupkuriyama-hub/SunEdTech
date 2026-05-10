# 英単語マスター ★

中学生のための英語単語テストアプリです。

## 特徴

- 中1・中2・中3レベルの英単語 **1,555語**収録
- 英語→日本語 / 日本語→英語 / スペリング入力の3モード
- ライフ制（ハート3つ）・コンボシステムでゲーム感覚で学習
- ベストスコア記録（localStorage）
- 外部APIなし・完全オフライン動作
- 単体HTMLファイル（index.html 1ファイルのみ）

## 単語数内訳

| 学年 | 語数 |
|------|------|
| 中1  | 716語 |
| 中2  | 422語 |
| 中3  | 417語 |
| 合計 | 1,555語 |

## ゲームの遊び方

1. 学年を選ぶ（中1 / 中2 / 中3 / 全部）
2. 出題形式を選ぶ（英→日 / 日→英 / スペリング入力）
3. 問題数を選ぶ（10 / 20 / 30 / 50問）
4. 「スタート!」ボタンを押す
5. ハートが3つ。間違えるとハートが減る。全部なくなるとゲームオーバー
6. 連続正解でコンボボーナス！

## デプロイ方法（Cloudflare Pages）

### 手順
1. このリポジトリをGitHubにpush（index.html と README.md）
2. [Cloudflare Pages](https://pages.cloudflare.com/) にログイン
3. 「Create a project」→「Connect to Git」
4. GitHubリポジトリを選択して接続
5. ビルド設定：
   - **Framework preset**: None
   - **Build command**: （空欄）
   - **Build output directory**: `/`（ルート）
6. 「Save and Deploy」をクリック
7. 数秒〜数分でデプロイ完了！

### ローカルで使う場合
`index.html` をブラウザで直接開くだけで動作します。
サーバー不要・インストール不要です。

## 技術仕様

- 純粋なHTML / CSS / JavaScript（バニラJS）
- 外部ライブラリ：Google Fonts（Nunito）のみ
- 外部API・AI通信：一切なし
- ブラウザのlocalStorageでベストスコードを保存
