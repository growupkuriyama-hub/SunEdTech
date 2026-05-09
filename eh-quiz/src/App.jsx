import { useState, useEffect } from "react";
import { wordsByLevel } from "./data/index.js";
import { generateQuiz, generateWeakQuiz } from "./utils/quiz.js";
import { loadStats, recordAnswer, getWeakWords, resetStats } from "./utils/storage.js";

// ========== 定数 ==========
const LEVELS = [
  { key: "elementary", label: "小学校" },
  { key: "grade1",     label: "中1" },
  { key: "grade2",     label: "中2" },
  { key: "grade3",     label: "中3" },
  { key: "all",        label: "全範囲" },
];

const QUESTION_COUNTS = [10, 20, 50];

// ========== トップ画面 ==========
function TopScreen({ onStart, onStartReview }) {
  const [level, setLevel] = useState("elementary");
  const [count, setCount] = useState(10);
  const stats = loadStats();

  const totalAnswers = stats.totalAnswers || 0;
  const totalCorrect = stats.totalCorrect || 0;
  const rate = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : null;

  const allWords = wordsByLevel.all;
  const weakWords = getWeakWords(allWords);

  function handleReset() {
    if (window.confirm("学習データをすべてリセットしますか？この操作は元に戻せません。")) {
      resetStats();
      window.location.reload();
    }
  }

  return (
    <div className="top-screen">
      <div className="card">
        <div className="top-title">
          <span className="top-emoji">📚</span>
          <h2>英単語クイズ</h2>
          <p className="top-subtitle">中学卒業レベル</p>
        </div>

        {/* 累計スコア */}
        {totalAnswers > 0 && (
          <div className="stats-summary">
            <span>📊 累計</span>
            <strong>{totalAnswers}問</strong>
            <span>正解</span>
            <strong>{totalCorrect}問</strong>
            <span className="rate-badge">{rate}%</span>
          </div>
        )}

        {/* レベル選択 */}
        <div className="section-label">📖 レベルを選ぶ</div>
        <div className="level-buttons">
          {LEVELS.map((l) => (
            <button
              key={l.key}
              className={`btn ${level === l.key ? "btn-primary" : "btn-outline"}`}
              onClick={() => setLevel(l.key)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* 問題数選択 */}
        <div className="section-label">🔢 問題数を選ぶ</div>
        <div className="count-buttons">
          {QUESTION_COUNTS.map((n) => (
            <button
              key={n}
              className={`btn ${count === n ? "btn-accent" : "btn-outline"}`}
              onClick={() => setCount(n)}
            >
              {n}問
            </button>
          ))}
        </div>

        {/* スタートボタン */}
        <button
          className="btn btn-primary btn-lg btn-block"
          onClick={() => onStart(level, count)}
        >
          ▶ クイズをはじめる
        </button>

        {/* 苦手単語復習 */}
        <button
          className="btn btn-secondary btn-block"
          onClick={() => onStartReview(count)}
          disabled={weakWords.length < 4}
          title={weakWords.length < 4 ? "苦手単語が4語以上になると使えます" : ""}
        >
          🔁 苦手単語を復習する
          {weakWords.length > 0 && (
            <span className="weak-count-badge">{weakWords.length}語</span>
          )}
        </button>
        {weakWords.length < 4 && (
          <p className="weak-hint">
            ※ 苦手単語が4語以上になると復習モードが使えます（現在{weakWords.length}語）
          </p>
        )}

        {/* リセット */}
        {totalAnswers > 0 && (
          <button className="btn btn-danger btn-sm" onClick={handleReset}>
            🗑 学習データをリセット
          </button>
        )}
      </div>
    </div>
  );
}

// ========== クイズ画面 ==========
function QuizScreen({ questions, onFinish }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]); // {word, correct, selected, isCorrect}
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const question = questions[currentIdx];
  const total = questions.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;

  function handleSelect(choice) {
    if (showFeedback) return;
    const isCorrect = choice === question.correctAnswer;
    setSelectedAnswer(choice);
    setShowFeedback(true);
    recordAnswer(question.word, isCorrect);
    setAnswers((prev) => [
      ...prev,
      {
        word: question.word,
        meaning: question.meaning,
        correct: question.correctAnswer,
        selected: choice,
        isCorrect,
        type: question.type,
      },
    ]);
  }

  function handleNext() {
    if (currentIdx + 1 >= total) {
      onFinish(answers);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  }

  function getChoiceClass(choice) {
    if (!showFeedback) return "btn btn-outline choice-btn";
    if (choice === question.correctAnswer) return "btn choice-btn choice-correct";
    if (choice === selectedAnswer) return "btn choice-btn choice-wrong";
    return "btn btn-outline choice-btn choice-disabled";
  }

  const progress = ((currentIdx) / total) * 100;

  return (
    <div className="quiz-screen">
      {/* ヘッダー情報 */}
      <div className="quiz-header">
        <span className="question-num">
          {currentIdx + 1} / {total}
        </span>
        <span className="score-display">
          ✅ {correctCount}問正解
        </span>
      </div>

      {/* プログレスバー */}
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* 問題カード */}
      <div className="card question-card">
        <div className="question-type-label">
          {question.type === "en2ja" ? "🇬🇧 英語→日本語" : "🇯🇵 日本語→英語"}
        </div>
        <div className="question-text">
          {question.type === "en2ja" ? question.word : question.meaning}
        </div>
        {question.partOfSpeech && (
          <div className="part-of-speech">
            {partOfSpeechLabel(question.partOfSpeech)}
          </div>
        )}
      </div>

      {/* 選択肢 */}
      <div className="choices">
        {question.choices.map((choice, i) => (
          <button
            key={i}
            className={getChoiceClass(choice)}
            onClick={() => handleSelect(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {/* フィードバック */}
      {showFeedback && (
        <div className={`feedback-box ${answers[answers.length - 1]?.isCorrect ? "feedback-correct" : "feedback-wrong"}`}>
          {answers[answers.length - 1]?.isCorrect ? (
            <span>🎉 正解！</span>
          ) : (
            <span>
              ❌ 不正解　正解：<strong>{question.correctAnswer}</strong>
            </span>
          )}
        </div>
      )}

      {/* 次へボタン */}
      {showFeedback && (
        <button className="btn btn-primary btn-lg btn-block next-btn" onClick={handleNext}>
          {currentIdx + 1 >= total ? "📊 結果を見る" : "次の問題 →"}
        </button>
      )}
    </div>
  );
}

// ========== 結果画面 ==========
function ResultScreen({ answers, onRetry, onReviewWrong, onTop }) {
  const total = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const rate = Math.round((correctCount / total) * 100);
  const wrongAnswers = answers.filter((a) => !a.isCorrect);

  function getEmoji() {
    if (rate === 100) return "🏆";
    if (rate >= 80) return "🌟";
    if (rate >= 60) return "😊";
    if (rate >= 40) return "😅";
    return "💪";
  }

  function getMessage() {
    if (rate === 100) return "パーフェクト！全問正解です！";
    if (rate >= 80) return "すごい！よくできました！";
    if (rate >= 60) return "なかなかいい調子です！";
    if (rate >= 40) return "もう少し！頑張りましょう！";
    return "復習してまた挑戦しましょう！";
  }

  return (
    <div className="result-screen">
      <div className="card result-card">
        <div className="result-emoji">{getEmoji()}</div>
        <h2 className="result-title">結果発表</h2>
        <p className="result-message">{getMessage()}</p>

        <div className="result-score-box">
          <div className="result-score-main">
            <span className="result-correct">{correctCount}</span>
            <span className="result-slash"> / </span>
            <span className="result-total">{total}</span>
          </div>
          <div className="result-rate">{rate}%</div>
        </div>

        {/* 間違えた単語リスト */}
        {wrongAnswers.length > 0 && (
          <div className="wrong-list">
            <h3 className="wrong-list-title">❌ 間違えた単語 ({wrongAnswers.length}語)</h3>
            <div className="wrong-items">
              {wrongAnswers.map((a, i) => (
                <div key={i} className="wrong-item">
                  <span className="wrong-word">{a.word}</span>
                  <span className="wrong-meaning">{a.meaning}</span>
                  <span className="wrong-detail">
                    あなたの答え：{a.selected}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ボタン群 */}
        <div className="result-buttons">
          {wrongAnswers.length >= 4 && (
            <button className="btn btn-secondary btn-block" onClick={onReviewWrong}>
              🔁 間違えた単語で復習する
            </button>
          )}
          <button className="btn btn-primary btn-block" onClick={onRetry}>
            ▶ もう一度同じ設定で
          </button>
          <button className="btn btn-outline btn-block" onClick={onTop}>
            🏠 トップへ戻る
          </button>
        </div>
      </div>
    </div>
  );
}

// ========== ユーティリティ ==========
function partOfSpeechLabel(pos) {
  const map = {
    noun: "名詞",
    verb: "動詞",
    adjective: "形容詞",
    adverb: "副詞",
    preposition: "前置詞",
    conjunction: "接続詞",
    pronoun: "代名詞",
    phrase: "フレーズ",
    other: "",
  };
  return map[pos] ? `[${map[pos]}]` : "";
}

// ========== メインApp ==========
export default function App() {
  // screen: "top" | "quiz" | "result"
  const [screen, setScreen] = useState("top");
  const [currentLevel, setCurrentLevel] = useState("elementary");
  const [currentCount, setCurrentCount] = useState(10);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [isReviewMode, setIsReviewMode] = useState(false);

  function startQuiz(level, count) {
    const pool = wordsByLevel[level] || wordsByLevel["all"];
    const qs = generateQuiz(pool, count);
    if (qs.length === 0) {
      alert("この範囲の単語が足りません。別のレベルを選んでください。");
      return;
    }
    setCurrentLevel(level);
    setCurrentCount(count);
    setQuestions(qs);
    setAnswers([]);
    setIsReviewMode(false);
    setScreen("quiz");
  }

  function startReview(count) {
    const allWords = wordsByLevel.all;
    const weakWords = getWeakWords(allWords);
    if (weakWords.length < 4) {
      alert("苦手単語が4語以上になると復習モードが使えます。");
      return;
    }
    const pool = wordsByLevel["all"] || allWords;
    const qs = generateWeakQuiz(weakWords, pool, count);
    if (qs.length === 0) {
      alert("復習クイズの生成に失敗しました。");
      return;
    }
    setQuestions(qs);
    setAnswers([]);
    setIsReviewMode(true);
    setScreen("quiz");
  }

  function handleFinish(ans) {
    setAnswers(ans);
    setScreen("result");
  }

  function handleRetry() {
    if (isReviewMode) {
      startReview(currentCount);
    } else {
      startQuiz(currentLevel, currentCount);
    }
  }

  function handleReviewWrong(wrongAnswers) {
    const wrongWords = wrongAnswers
      .filter((a) => !a.isCorrect)
      .map((a) => ({ word: a.word, meaning: a.meaning }));
    if (wrongWords.length < 4) {
      alert("間違えた単語が4語未満のため復習モードに入れません。");
      return;
    }
    const allWords = wordsByLevel.all;
    const pool = wordsByLevel["all"] || allWords;
    const qs = generateWeakQuiz(wrongWords, pool, wrongWords.length);
    if (qs.length === 0) {
      alert("復習クイズの生成に失敗しました。");
      return;
    }
    setQuestions(qs);
    setAnswers([]);
    setIsReviewMode(true);
    setScreen("quiz");
  }

  return (
    <div className="app-wrapper">
      <header className="app-header">
        <span className="header-emoji">📖</span>
        <span className="header-title">英単語クイズ</span>
        {isReviewMode && <span className="review-badge">復習モード</span>}
      </header>

      <main className="app-main">
        {screen === "top" && (
          <TopScreen onStart={startQuiz} onStartReview={startReview} />
        )}
        {screen === "quiz" && (
          <QuizScreen
            questions={questions}
            onFinish={handleFinish}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            answers={answers}
            onRetry={handleRetry}
            onReviewWrong={() => handleReviewWrong(answers)}
            onTop={() => setScreen("top")}
          />
        )}
      </main>

      <footer className="app-footer">
        このアプリは外部API通信を行わない静的教材です
      </footer>
    </div>
  );
}
