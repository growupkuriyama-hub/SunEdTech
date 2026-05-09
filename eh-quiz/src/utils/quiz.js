/**
 * クイズロジック
 * 外部API通信なし・fetch不使用・完全静的
 */

/**
 * 配列をシャッフルする（Fisher-Yatesアルゴリズム）
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * 配列からランダムにn個取得
 */
export function sampleN(array, n) {
  return shuffle(array).slice(0, n);
}

/**
 * クイズ問題を1問生成する
 * @param {Object} wordEntry - { word, meaning, level, partOfSpeech }
 * @param {Array} wordPool - 誤答選択肢を選ぶためのプール
 * @param {'en2ja'|'ja2en'} type - 問題タイプ
 * @returns {Object} question
 */
export function generateQuestion(wordEntry, wordPool, type) {
  const isEnToJa = type === 'en2ja';

  // 正解
  const correct = isEnToJa ? wordEntry.meaning : wordEntry.word;

  // 誤答候補：同じ単語・同じ意味を除く
  const wrongCandidates = wordPool.filter(
    (w) => w.word !== wordEntry.word && w.meaning !== wordEntry.meaning
  );

  // 誤答3つ
  const wrongs = sampleN(wrongCandidates, 3).map((w) =>
    isEnToJa ? w.meaning : w.word
  );

  // 4択をシャッフル
  const choices = shuffle([correct, ...wrongs]);

  return {
    id: `${wordEntry.word}-${type}-${Date.now()}-${Math.random()}`,
    word: wordEntry.word,
    meaning: wordEntry.meaning,
    type,
    partOfSpeech: wordEntry.partOfSpeech || 'other',
    question: isEnToJa ? wordEntry.word : wordEntry.meaning,
    questionLabel: isEnToJa ? '英語' : '日本語',
    answerLabel: isEnToJa ? '日本語の意味' : '英単語',
    correct,
    correctAnswer: correct,
    choices,
  };
}

/**
 * クイズセッションを生成する
 * @param {Array} wordPool - 出題対象単語
 * @param {number} count - 問題数
 * @returns {Array} questions
 */
export function generateQuiz(wordPool, count) {
  if (wordPool.length < 4) {
    return [];
  }

  // 出題する単語をシャッフルして最大count個選ぶ
  const selected = sampleN(wordPool, Math.min(count, wordPool.length));

  return selected.map((wordEntry) => {
    const type = Math.random() < 0.5 ? 'en2ja' : 'ja2en';
    return generateQuestion(wordEntry, wordPool, type);
  });
}

/**
 * 苦手単語クイズを生成する
 * @param {Array} weakWords - 苦手単語リスト（単語エントリ）
 * @param {Array} fullPool - 誤答候補プール
 * @param {number} count
 */
export function generateWeakQuiz(weakWords, fullPool, count) {
  if (weakWords.length < 1) return [];

  // 苦手単語が少ない場合は繰り返す
  let pool = [...weakWords];
  while (pool.length < count) {
    pool = [...pool, ...weakWords];
  }
  pool = pool.slice(0, count);

  return pool.map((wordEntry) => {
    const type = Math.random() < 0.5 ? 'en2ja' : 'ja2en';
    const combinedPool = fullPool && fullPool.length >= 4 ? fullPool : weakWords;
    return generateQuestion(wordEntry, combinedPool, type);
  });
}
