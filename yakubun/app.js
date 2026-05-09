'use strict';

const PRIMES = [2, 3, 5, 7, 11, 13];

let level = 1;
let correct = 0;
let wrong = 0;
let streak = 0;
let curNum, curDen;
let answered = false;

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function genQuestion() {
  const ranges = [[2, 6], [3, 15], [4, 25]];
  const [lo, hi] = ranges[level - 1];
  const maxPrimeIdx = level === 3 ? 5 : level === 2 ? 4 : 3;

  let n, d, g;
  let tries = 0;
  do {
    const factor = PRIMES[Math.floor(Math.random() * maxPrimeIdx)];
    n = (Math.floor(Math.random() * (hi - lo + 1)) + lo) * factor;
    d = (Math.floor(Math.random() * (hi - lo + 1)) + lo) * factor;
    g = gcd(n, d);
    tries++;
  } while ((g === 1 || n === d || n / g === n) && tries < 200);

  curNum = n;
  curDen = d;
}

function renderQuestion() {
  genQuestion();
  document.getElementById('numerator').textContent = curNum;
  document.getElementById('denominator').textContent = curDen;
  document.getElementById('ans-num').value = '';
  document.getElementById('ans-den').value = '';

  const fb = document.getElementById('feedback');
  fb.textContent = '';
  fb.className = 'feedback';

  document.getElementById('hint').textContent = '';
  document.getElementById('check-btn').disabled = false;
  answered = false;
  document.getElementById('ans-num').focus();
}

function checkAnswer() {
  if (answered) return;

  const an = parseInt(document.getElementById('ans-num').value, 10);
  const ad = parseInt(document.getElementById('ans-den').value, 10);

  if (!an || !ad || an <= 0 || ad <= 0) {
    document.getElementById('hint').textContent = '分子と分母の両方をいれてね';
    return;
  }

  const g = gcd(curNum, curDen);
  const rn = curNum / g;
  const rd = curDen / g;
  const isCorrect = an === rn && ad === rd && gcd(an, ad) === 1;

  answered = true;
  document.getElementById('check-btn').disabled = true;

  const fb = document.getElementById('feedback');
  if (isCorrect) {
    correct++;
    streak++;
    fb.textContent = 'せいかい！';
    fb.className = 'feedback ok';
    document.getElementById('hint').textContent = '';
    setTimeout(renderQuestion, 1300);
  } else {
    wrong++;
    streak = 0;
    fb.textContent = 'ざんねん…';
    fb.className = 'feedback ng';
    document.getElementById('hint').textContent = `こたえは ${rn} / ${rd} だよ`;
  }

  updateStats();
}

function updateStats() {
  document.getElementById('correct-count').textContent = correct;
  document.getElementById('wrong-count').textContent = wrong;
  document.getElementById('streak-count').textContent = streak;
}

function showHint() {
  const g = gcd(curNum, curDen);
  document.getElementById('hint').textContent =
    `ヒント：${curNum} と ${curDen} のこうやくすうは ${g} だよ`;
}

function setLevel(l) {
  level = l;
  document.querySelectorAll('.lvl-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.level, 10) === l);
  });
  renderQuestion();
}

function resetAll() {
  correct = 0;
  wrong = 0;
  streak = 0;
  updateStats();
  renderQuestion();
}

document.querySelectorAll('.lvl-btn').forEach(btn => {
  btn.addEventListener('click', () => setLevel(parseInt(btn.dataset.level, 10)));
});

document.getElementById('check-btn').addEventListener('click', checkAnswer);
document.getElementById('hint-btn').addEventListener('click', showHint);
document.getElementById('next-btn').addEventListener('click', renderQuestion);
document.getElementById('reset-btn').addEventListener('click', resetAll);

['ans-num', 'ans-den'].forEach(id => {
  document.getElementById(id).addEventListener('keydown', e => {
    if (e.key === 'Enter') checkAnswer();
  });
  document.getElementById(id).addEventListener('input', () => {
    const an = document.getElementById('ans-num').value;
    const ad = document.getElementById('ans-den').value;
    if (an && ad && !answered) checkAnswer();
  });
});

renderQuestion();
