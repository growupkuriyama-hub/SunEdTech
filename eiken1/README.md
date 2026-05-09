# Math & Science Vocabulary Quiz

A static HTML quiz covering math and science English vocabulary at the EIKEN Grade 2 level (elementary–junior high school).

- 15 questions total, 10 randomly selected per round
- 3-level Japanese hints per question
- Instant feedback with explanations
- Light / dark mode support

---

## Local Development

```bash
npm install
npm start        # http://localhost:3000 で確認
```

---

## Deploy to Vercel

### 方法 A — Vercel Dashboard（GUI、推奨）

1. このリポジトリを GitHub に push する（下記「GitHub 手順」参照）
2. https://vercel.com/new を開く
3. **「Import Git Repository」** から対象リポジトリを選択
4. 設定画面で以下を確認（自動入力されるはず）：

   | 項目 | 値 |
   |---|---|
   | Framework Preset | **Other** |
   | Build Command | `echo 'no build'` |
   | Output Directory | `.` |

5. **「Deploy」** ボタンを押す → 1〜2分で公開完了
6. 発行された `*.vercel.app` URL にアクセスして確認

### 方法 B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel          # プロジェクトルートで実行
# "Link to existing project?" → No
# "What's your project's name?" → math-science-quiz
# "In which directory is your code located?" → ./
# Override build settings? → No
```

---

## GitHub への Push 手順

```bash
# 1. ローカルでリポジトリを初期化
cd math-science-quiz
git init
git add .
git commit -m "initial commit"

# 2. GitHub でリポジトリを新規作成
#    https://github.com/new → リポジトリ名: math-science-quiz
#    (README の自動生成は「なし」にする)

# 3. リモートを追加して push
git remote add origin https://github.com/YOUR_USERNAME/math-science-quiz.git
git branch -M main
git push -u origin main
```

---

## File Structure

```
math-science-quiz/
├── index.html     ← アプリ本体
├── package.json   ← ローカル開発用
├── vercel.json    ← Vercel デプロイ設定
├── .gitignore
└── README.md
```