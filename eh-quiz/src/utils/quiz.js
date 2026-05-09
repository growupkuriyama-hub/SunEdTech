export function shuffle(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function pickMany(items, count) {
  return shuffle(items).slice(0, Math.min(count, items.length));
}

function uniqueChoices(choices) {
  const seen = new Set();
  const result = [];
  choices.forEach((choice) => {
    if (choice && !seen.has(choice)) {
      seen.add(choice);
      result.push(choice);
    }
  });
  return result;
}

export function makeQuestion(entry, pool) {
  const type = Math.random() < 0.5 ? 'wordToMeaning' : 'meaningToWord';
  const askMeaning = type === 'wordToMeaning';
  const correctAnswer = askMeaning ? entry.meaning : entry.word;
  const wrongSource = shuffle(pool).filter((item) => {
    if (!item) return false;
    if (item.word === entry.word) return false;
    if (askMeaning && item.meaning === entry.meaning) return false;
    if (!askMeaning && item.word === entry.word) return false;
    return true;
  });
  const wrongChoices = uniqueChoices(
    wrongSource.map((item) => (askMeaning ? item.meaning : item.word))
  ).slice(0, 3);
  const choices = shuffle(uniqueChoices([correctAnswer, ...wrongChoices]));

  return {
    word: entry.word,
    meaning: entry.meaning,
    level: entry.level,
    partOfSpeech: entry.partOfSpeech || 'other',
    type,
    prompt: askMeaning ? entry.word : entry.meaning,
    promptLabel: askMeaning ? '英単語の意味を選びましょう' : '意味に合う英単語を選びましょう',
    correctAnswer,
    choices,
  };
}

export function makeQuiz(pool, count) {
  if (!Array.isArray(pool) || pool.length < 4) return [];
  return pickMany(pool, count)
    .map((entry) => makeQuestion(entry, pool))
    .filter((question) => question.choices.length === 4);
}

export function makeReviewQuiz(reviewWords, fullPool, count) {
  if (!Array.isArray(reviewWords) || reviewWords.length < 4) return [];
  const source = [];
  while (source.length < count) {
    source.push(...shuffle(reviewWords));
  }
  const pool = Array.isArray(fullPool) && fullPool.length >= 4 ? fullPool : reviewWords;
  return source.slice(0, count)
    .map((entry) => makeQuestion(entry, pool))
    .filter((question) => question.choices.length === 4);
}
