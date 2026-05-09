/**
 * localStorage管理ユーティリティ
 * 外部API通信なし・完全ローカル保存
 */

const KEYS = {
  TOTAL_ANSWERS: 'eq_total_answers',
  TOTAL_CORRECT: 'eq_total_correct',
  WORD_STATS: 'eq_word_stats',     // { [word]: { correct: number, wrong: number } }
};

function safeGet(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    if (val === null) return defaultValue;
    return JSON.parse(val);
  } catch {
    return defaultValue;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage が使えない環境（プライベートブラウジング容量超過など）は無視
  }
}

/** 全学習データを読み込む */
export function loadStats() {
  return {
    totalAnswers: safeGet(KEYS.TOTAL_ANSWERS, 0),
    totalCorrect: safeGet(KEYS.TOTAL_CORRECT, 0),
    wordStats: safeGet(KEYS.WORD_STATS, {}),
  };
}

/** 1問分の解答を記録する */
export function recordAnswer(word, isCorrect) {
  const stats = loadStats();
  stats.totalAnswers += 1;
  if (isCorrect) stats.totalCorrect += 1;

  if (!stats.wordStats[word]) {
    stats.wordStats[word] = { correct: 0, wrong: 0 };
  }
  if (isCorrect) {
    stats.wordStats[word].correct += 1;
  } else {
    stats.wordStats[word].wrong += 1;
  }

  safeSet(KEYS.TOTAL_ANSWERS, stats.totalAnswers);
  safeSet(KEYS.TOTAL_CORRECT, stats.totalCorrect);
  safeSet(KEYS.WORD_STATS, stats.wordStats);
}

/**
 * 苦手単語リストを返す
 * 基準: wrong >= 1 かつ wrong > correct
 * @param {Array} allWords - 全単語データ
 * @returns {Array} wordEntries
 */
export function getWeakWords(allWords) {
  const stats = loadStats();
  return allWords.filter((entry) => {
    const s = stats.wordStats[entry.word];
    if (!s) return false;
    return s.wrong >= 1 && s.wrong > s.correct;
  });
}

/** 全学習データをリセットする */
export function resetStats() {
  safeSet(KEYS.TOTAL_ANSWERS, 0);
  safeSet(KEYS.TOTAL_CORRECT, 0);
  safeSet(KEYS.WORD_STATS, {});
}
