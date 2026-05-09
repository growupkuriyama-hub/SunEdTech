const STORAGE_KEY = 'english_quiz_static_stats_v1';

const emptyStats = {
  totalAnswers: 0,
  totalCorrect: 0,
  words: {},
};

export function loadStats() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyStats, words: {} };
    const parsed = JSON.parse(raw);
    return {
      totalAnswers: Number(parsed.totalAnswers) || 0,
      totalCorrect: Number(parsed.totalCorrect) || 0,
      words: parsed.words && typeof parsed.words === 'object' ? parsed.words : {},
    };
  } catch {
    return { ...emptyStats, words: {} };
  }
}

export function saveStats(stats) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // 保存できない環境でもクイズ自体は続ける
  }
}

export function recordAnswer(wordEntry, isCorrect) {
  const stats = loadStats();
  const key = wordEntry.word;
  const old = stats.words[key] || {
    word: wordEntry.word,
    meaning: wordEntry.meaning,
    level: wordEntry.level,
    partOfSpeech: wordEntry.partOfSpeech || 'other',
    correct: 0,
    wrong: 0,
  };

  stats.totalAnswers += 1;
  if (isCorrect) {
    stats.totalCorrect += 1;
    old.correct += 1;
  } else {
    old.wrong += 1;
  }

  stats.words[key] = old;
  saveStats(stats);
}

export function resetStats() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 何もしない
  }
}

export function getWeakWords(allWords) {
  const stats = loadStats();
  return allWords.filter((entry) => {
    const item = stats.words[entry.word];
    if (!item) return false;
    return item.wrong > 0 && item.wrong >= item.correct;
  });
}
