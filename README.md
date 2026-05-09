# 🌸 ローマ字れんしゅう

小学生向けのローマ字練習Webアプリです。ひらがなを見てローマ字を選ぶ・入力するゲーム形式で楽しく学べます。

## 機能

- **えらぶモード** — 4択からローマ字を選ぶ
- **うつモード** — キーボードでローマ字を入力する
- **グループ選択** — きほん（清音）／だくてん（濁音・半濁音）／ぜんぶ
- **一覧表** — ローマ字対応表をいつでも確認できる
- **結果表示** — 10問ごとに⭐で評価
- ビルド不要・フレームワーク不要（`index.html` 単体で動作）

## フォルダ構成

```
romaji-app/
├── index.html    # アプリ本体（すべてここに含まれる）
├── vercel.json   # Vercel デプロイ設定
├── .gitignore
└── README.md
```

---

## GitHubにアップロードする手順

### 前提

- [Git](https://git-scm.com/) がインストールされていること
- [GitHub](https://github.com/) アカウントがあること

### 手順

```bash
# 1. このフォルダに移動
cd romaji-app

# 2. Gitリポジトリを初期化
git init

# 3. すべてのファイルをステージング
git add .

# 4. 最初のコミット
git commit -m "first commit"

# 5. ブランチ名を main に設定
git branch -M main
```

次に GitHub でリポジトリを作成します：

1. https://github.com/new を開く
2. Repository name に `romaji-app` など任意の名前を入力
3. Public を選択（Vercel 無料プランで公開するため）
4. **「Initialize this repository」のチェックは外す**
5. 「Create repository」をクリック

表示されたリモートURLを使って push します：

```bash
# 6. リモートリポジトリを登録（URL は自分のものに変更）
git remote add origin https://github.com/あなたのユーザー名/romaji-app.git

# 7. GitHubにプッシュ
git push -u origin main
```

---

## Vercel で公開する手順

### 前提

- [Vercel](https://vercel.com/) アカウントがあること（GitHub アカウントでサインアップできます）

### 手順

1. https://vercel.com/new を開く
2. 「Import Git Repository」で先ほど作成した `romaji-app` リポジトリを選択
3. 設定画面ではすべてデフォルトのままでOK
   - Framework Preset: **Other**（自動検出されます）
   - Build Command: **空欄のまま**
   - Output Directory: **空欄のまま**
4. 「Deploy」をクリック
5. 1〜2分でデプロイ完了し、`https://romaji-app-xxxx.vercel.app` のようなURLが発行されます

### 以降の更新

ローカルで `index.html` を編集して `git push` するだけで、Vercel が自動的に再デプロイします。

```bash
git add .
git commit -m "update"
git push
```

---

## ローカルで確認する方法

ビルド不要です。`index.html` をブラウザで直接開くか、簡易サーバーを使ってください：

```bash
# Python 3 がある場合
python3 -m http.server 3000
# → http://localhost:3000 を開く

# Node.js がある場合
npx serve .
# → 表示されたURLを開く
```

---

## ライセンス

MIT
