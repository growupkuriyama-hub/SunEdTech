import { useMemo, useState } from 'react';
import { wordsByLevel } from './data/index.js';
import { makeQuiz, makeReviewQuiz } from './utils/quiz.js';
import { getWeakWords, loadStats, recordAnswer, resetStats } from './utils/storage.js';

const LEVELS = [
  { key: 'elementary', label: '小学校' },
  { key: 'grade1', label: '中1' },
  { key: 'grade2', label: '中2' },
  { key: 'grade3', label: '中3' },
  { key: 'all', label: '全範囲' },
];

const COUNTS = [10, 20, 50];

const POS_LABELS = {
  noun: '名詞',
  verb: '動詞',
  adjective: '形容詞',
  adverb: '副詞',
  preposition: '前置詞',
  conjunction: '接続詞',
  pronoun: '代名詞',
  phrase: '表現',
  other: 'その他',
};

function getLevelCountText() {
  return LEVELS.map((level) => {
    const words = wordsByLevel[level.key] || [];
    return `${level.label}: ${words.length}語`;
  }).join(' / ');
}

function TopScreen({ onStart, onStartReview, refreshKey }) {
  const [level, setLevel] = useState('elementary');
  const [count, setCount] = useState(10);
  const stats = useMemo(() => loadStats(), [refreshKey]);
  const weakWords = useMemo(() => getWeakWords(wordsByLevel.all), [refreshKey]);
  const rate = stats.totalAnswers > 0 ? Math.round((stats.totalCorrect / stats.totalAnswers) * 100) : 0;

  function handleReset() {
    const ok = window.confirm('学習データをリセットしますか？');
    if (!ok) return;
    resetStats();
    window.location.reload();
  }

  return (
    <section className="panel top-panel">
      <div className="hero">
        <div className="hero-mark">📚</div>
        <h1>中学卒業レベル 英単語クイズ</h1>
        <p>小学校内容も含めた英単語を、4択クイズで確認できます。</p>
      </div>

      <div className="mini-info">{getLevelCountText()}</div>

      {stats.totalAnswers > 0 && (
        <div className="stats-box">
          <span>累計 {stats.totalAnswers}問</span>
          <span>正解 {stats.totalCorrect}問</span>
          <strong>正答率 {rate}%</strong>
        </div>
      )}

      <div className="control-block">
        <h2>レベル</h2>
        <div className="button-grid level-grid">
          {LEVELS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={level === item.key ? 'button selected' : 'button'}
              onClick={() => setLevel(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-block">
        <h2>問題数</h2>
        <div className="button-grid count-grid">
          {COUNTS.map((item) => (
            <button
              key={item}
              type="button"
              className={count === item ? 'button selected accent' : 'button'}
              onClick={() => setCount(item)}
            >
              {item}問
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="main-button" onClick={() => onStart(level, count)}>
        ▶ クイズをはじめる
      </button>

      <button
        type="button"
        className="sub-button"
        onClick={() => onStartReview(count)}
        disabled={weakWords.length < 4}
      >
        🔁 苦手単語だけ復習する（{weakWords.length}語）
      </button>

      {weakWords.length < 4 && (
        <p className="hint-text">苦手単語が4語以上になると、復習モードが使えます。</p>
      )}

      {stats.totalAnswers > 0 && (
        <button type="button" className="danger-button" onClick={handleReset}>
          学習データをリセット
        </button>
      )}
    </section>
  );
}

function QuizScreen({ questions, onFinish }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState('');
  const [records, setRecords] = useState([]);

  const question = questions[index];
  const answered = selected !== '';
  const isCorrect = answered && selected === question.correctAnswer;
  const correctSoFar = records.filter((record) => record.isCorrect).length;
  const progress = Math.round((index / questions.length) * 100);

  function choose(choice) {
    if (answered) return;
    const ok = choice === question.correctAnswer;
    setSelected(choice);
    recordAnswer(question, ok);
    setRecords((old) => [
      ...old,
      {
        word: question.word,
        meaning: question.meaning,
        selected: choice,
        correctAnswer: question.correctAnswer,
        isCorrect: ok,
      },
    ]);
  }

  function next() {
    if (index + 1 >= questions.length) {
      const finalRecords = records.length === questions.length ? records : records;
      onFinish(finalRecords);
      return;
    }
    setIndex((old) => old + 1);
    setSelected('');
  }

  function choiceClass(choice) {
    if (!answered) return 'choice-button';
    if (choice === question.correctAnswer) return 'choice-button correct';
    if (choice === selected) return 'choice-button wrong';
    return 'choice-button muted';
  }

  return (
    <section className="quiz-layout">
      <div className="quiz-topline">
        <span>{index + 1} / {questions.length}</span>
        <span>正解 {correctSoFar}問</span>
      </div>
      <div className="progress-bar" aria-hidden="true">
        <div style={{ width: `${progress}%` }} />
      </div>

      <div className="panel question-panel">
        <p className="prompt-label">{question.promptLabel}</p>
        <div className="prompt-text">{question.prompt}</div>
        <p className="pos-text">{POS_LABELS[question.partOfSpeech] || ''}</p>
      </div>

      <div className="choices-grid">
        {question.choices.map((choice) => (
          <button key={choice} type="button" className={choiceClass(choice)} onClick={() => choose(choice)}>
            {choice}
          </button>
        ))}
      </div>

      {answered && (
        <div className={isCorrect ? 'feedback good' : 'feedback bad'}>
          {isCorrect ? '🎉 正解！' : `❌ 不正解　正解：${question.correctAnswer}`}
        </div>
      )}

      {answered && (
        <button type="button" className="main-button" onClick={next}>
          {index + 1 >= questions.length ? '結果を見る' : '次の問題へ'}
        </button>
      )}
    </section>
  );
}

function ResultScreen({ records, onRetry, onTop, onReviewWrong }) {
  const total = records.length;
  const correct = records.filter((record) => record.isCorrect).length;
  const wrong = records.filter((record) => !record.isCorrect);
  const rate = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <section className="panel result-panel">
      <div className="result-mark">{rate >= 80 ? '🌟' : rate >= 50 ? '😊' : '💪'}</div>
      <h1>結果</h1>
      <div className="score-big">{correct} / {total}</div>
      <p className="score-rate">正答率 {rate}%</p>

      {wrong.length > 0 && (
        <div className="wrong-list">
          <h2>間違えた単語</h2>
          {wrong.map((item) => (
            <div className="wrong-row" key={`${item.word}-${item.selected}`}>
              <strong>{item.word}</strong>
              <span>{item.meaning}</span>
              <small>あなたの答え：{item.selected}</small>
            </div>
          ))}
        </div>
      )}

      {wrong.length >= 4 && (
        <button type="button" className="sub-button" onClick={() => onReviewWrong(wrong)}>
          間違えた単語だけ復習する
        </button>
      )}
      <button type="button" className="main-button" onClick={onRetry}>もう一度</button>
      <button type="button" className="plain-button" onClick={onTop}>トップへ戻る</button>
    </section>
  );
}

export default function App() {
  const [screen, setScreen] = useState('top');
  const [questions, setQuestions] = useState([]);
  const [records, setRecords] = useState([]);
  const [lastLevel, setLastLevel] = useState('elementary');
  const [lastCount, setLastCount] = useState(10);
  const [reviewMode, setReviewMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  function start(level, count) {
    const pool = wordsByLevel[level] || wordsByLevel.all;
    const quiz = makeQuiz(pool, count);
    if (quiz.length === 0) {
      window.alert('この範囲の単語データが不足しています。');
      return;
    }
    setLastLevel(level);
    setLastCount(count);
    setReviewMode(false);
    setQuestions(quiz);
    setRecords([]);
    setScreen('quiz');
  }

  function startReview(count) {
    const weakWords = getWeakWords(wordsByLevel.all);
    const quiz = makeReviewQuiz(weakWords, wordsByLevel.all, count);
    if (quiz.length === 0) {
      window.alert('苦手単語が4語以上になると復習できます。');
      return;
    }
    setLastCount(count);
    setReviewMode(true);
    setQuestions(quiz);
    setRecords([]);
    setScreen('quiz');
  }

  function finish(finalRecords) {
    setRecords(finalRecords);
    setRefreshKey((old) => old + 1);
    setScreen('result');
  }

  function retry() {
    if (reviewMode) {
      startReview(lastCount);
    } else {
      start(lastLevel, lastCount);
    }
  }

  function reviewWrong(wrongRecords) {
    const words = wrongRecords.map((item) => ({
      word: item.word,
      meaning: item.meaning,
      level: 'review',
      partOfSpeech: 'other',
    }));
    const quiz = makeReviewQuiz(words, wordsByLevel.all, words.length);
    if (quiz.length === 0) return;
    setReviewMode(true);
    setQuestions(quiz);
    setRecords([]);
    setScreen('quiz');
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-inner">
          <span className="logo">📖</span>
          <span>英単語クイズ</span>
          {reviewMode && <span className="mode-badge">復習</span>}
        </div>
      </header>

      <main className="app-main">
        {screen === 'top' && <TopScreen onStart={start} onStartReview={startReview} refreshKey={refreshKey} />}
        {screen === 'quiz' && questions.length > 0 && <QuizScreen questions={questions} onFinish={finish} />}
        {screen === 'result' && <ResultScreen records={records} onRetry={retry} onTop={() => setScreen('top')} onReviewWrong={reviewWrong} />}
      </main>

      <footer className="app-footer">
        このアプリは外部API通信を行わない静的教材です
      </footer>
    </div>
  );
}
