import './style.css';
import { PROBLEM_BANK } from './problems.js';

const CAT_MAP = {
  all:      { label: 'すべて' },
  speed:    { label: '速さ・時間' },
  volume:   { label: '体積・面積' },
  fraction: { label: '分数計算' },
  ratio:    { label: '割合・百分率' },
  unit:     { label: '単位換算' },
};

let currentProblem = null;
let stats = { total: 0, correct: 0 };
let selectedCat = 'all';
let answered = false;
let lastProblemId = null;
let shuffledQueue = [];

// ─── render skeleton ────────────────────────────────────────────────────────
document.getElementById('app').innerHTML = `
  <div class="header">
    <h1><i class="ti ti-math" aria-hidden="true"></i>算数文章題 練習</h1>
    <span class="badge">小学5年生</span>
  </div>

  <div class="stats">
    <div class="stat"><div class="stat-label">問題数</div><div class="stat-val" id="s-total">0</div></div>
    <div class="stat"><div class="stat-label">正解</div><div class="stat-val good" id="s-correct">0</div></div>
    <div class="stat"><div class="stat-label">正答率</div><div class="stat-val" id="s-rate">—</div></div>
  </div>

  <div class="progress-bar"><div class="progress-fill" id="progress" style="width:0%"></div></div>

  <div class="category-bar" id="catBar">
    ${Object.entries(CAT_MAP).map(([k, v]) =>
      `<button class="cat-btn${k === 'all' ? ' active' : ''}" data-cat="${k}">${v.label}</button>`
    ).join('')}
  </div>

  <div class="problem-card" id="problemCard">
    <div class="loading" id="loadingMsg">問題を選んでいます…</div>
    <div id="problemContent" style="display:none">
      <div class="problem-cat" id="problemCat"></div>
      <div class="problem-text" id="problemText"></div>
      <div class="answer-area" id="answerArea"></div>
    </div>
  </div>

  <div class="feedback" id="feedback"></div>

  <div class="btn-row">
    <button class="btn btn-primary" id="checkBtn" style="display:none">
      <i class="ti ti-check" aria-hidden="true"></i>答え合わせ
    </button>
    <button class="btn" id="nextBtn">
      <i class="ti ti-refresh" aria-hidden="true"></i>次の問題
    </button>
  </div>
`;

// ─── events ─────────────────────────────────────────────────────────────────
document.getElementById('catBar').addEventListener('click', e => {
  const btn = e.target.closest('[data-cat]');
  if (!btn) return;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedCat = btn.dataset.cat;
  shuffledQueue = [];
  loadProblem();
});

document.getElementById('checkBtn').addEventListener('click', checkAnswer);
document.getElementById('nextBtn').addEventListener('click', loadProblem);

// ─── local problem selection ────────────────────────────────────────────────
function getProblemsForSelectedCategory() {
  if (selectedCat === 'all') return PROBLEM_BANK;
  return PROBLEM_BANK.filter(problem => problem.category === selectedCat);
}

function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

function pickProblem() {
  const source = getProblemsForSelectedCategory();
  if (source.length === 0) return null;

  if (shuffledQueue.length === 0) {
    shuffledQueue = shuffle(source);
    if (shuffledQueue.length > 1 && shuffledQueue[0].id === lastProblemId) {
      shuffledQueue.push(shuffledQueue.shift());
    }
  }

  const picked = shuffledQueue.shift();
  lastProblemId = picked.id;
  return structuredCloneSafe(picked);
}

function structuredCloneSafe(value) {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function loadProblem() {
  answered = false;
  document.getElementById('feedback').style.display = 'none';
  document.getElementById('checkBtn').style.display = 'none';
  document.getElementById('problemContent').style.display = 'none';
  document.getElementById('loadingMsg').textContent = '問題を選んでいます…';
  document.getElementById('loadingMsg').style.display = 'block';

  currentProblem = pickProblem();
  if (!currentProblem) {
    document.getElementById('loadingMsg').innerHTML =
      '<span class="error-msg"><i class="ti ti-alert-circle" aria-hidden="true"></i> このカテゴリにはまだ問題がありません。</span>';
    return;
  }

  renderProblem();
}

// ─── render problem ──────────────────────────────────────────────────────────
function renderProblem() {
  document.getElementById('loadingMsg').style.display = 'none';
  document.getElementById('problemContent').style.display = 'block';
  document.getElementById('problemCat').textContent = currentProblem.cat;
  document.getElementById('problemText').innerHTML =
    escapeHtml(currentProblem.text).replace(/\n/g, '<br>');

  const area = document.getElementById('answerArea');
  area.innerHTML = '';
  const labels = ['❶', '❷'];

  currentProblem.parts.forEach((p, i) => {
    const row = document.createElement('div');
    row.className = 'answer-row';
    row.innerHTML = `
      <span class="answer-label">${currentProblem.parts.length > 1 ? labels[i] + ' ' : ''}答え</span>
      <input class="answer-input" type="text" id="ans${i}"
             placeholder="${escapeHtml(p.question)}" aria-label="答え${i + 1}" />
      <span class="answer-unit">${escapeHtml(p.unit)}</span>
    `;
    area.appendChild(row);
    row.querySelector(`#ans${i}`).addEventListener('keydown', e => {
      if (e.key === 'Enter') checkAnswer();
    });
  });

  document.getElementById('checkBtn').style.display = 'inline-flex';
  document.getElementById('ans0').focus();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>'"]/g, ch => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  }[ch]));
}

// ─── check answer ────────────────────────────────────────────────────────────
function parseAnswer(str) {
  str = String(str).trim();
  if (str === '') return NaN;

  // 全角数字・記号の簡易正規化
  str = str.replace(/[０-９]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
    .replace(/[．]/g, '.')
    .replace(/[，]/g, ',')
    .replace(/[／]/g, '/')
    .replace(/[％]/g, '%')
    .replace(/%/g, '')
    .replace(/円|人|分|秒|時間|km|mL|cm³|cm2|cm²|m²|cm|m|L|kg|g|ページ/g, '')
    .trim();

  if (str.includes('/')) {
    const [n, d] = str.split('/').map(Number);
    if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) return NaN;
    return n / d;
  }
  return parseFloat(str.replace(/,/g, ''));
}

function checkAnswer() {
  if (!currentProblem || answered) return;
  answered = true;

  let allCorrect = true;
  const resultLines = [];

  currentProblem.parts.forEach((p, i) => {
    const input = document.getElementById(`ans${i}`);
    const userVal = parseAnswer(input.value);
    const correctVal = parseAnswer(p.answer);
    const isOk = !Number.isNaN(userVal) && Math.abs(userVal - correctVal) < 0.01;
    if (!isOk) allCorrect = false;
    input.classList.add(isOk ? 'correct' : 'wrong');
    resultLines.push(
      `${currentProblem.parts.length > 1 ? ['❶','❷'][i] + ' ' : ''}<strong>${escapeHtml(p.answer)} ${escapeHtml(p.unit)}</strong>`
    );
  });

  stats.total++;
  if (allCorrect) stats.correct++;
  updateStats();

  const fb = document.getElementById('feedback');
  fb.className = 'feedback ' + (allCorrect ? 'correct' : 'wrong');
  fb.innerHTML =
    (allCorrect ? '✓ <strong>正解！</strong>　' : '✗ <strong>不正解</strong>　') +
    '答え：' + resultLines.join('　') +
    '<br><br>' + escapeHtml(currentProblem.explanation);
  fb.style.display = 'block';
  document.getElementById('checkBtn').style.display = 'none';
}

// ─── stats ───────────────────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('s-total').textContent = stats.total;
  document.getElementById('s-correct').textContent = stats.correct;
  const rate = stats.total > 0
    ? Math.round(stats.correct / stats.total * 100) + '%'
    : '—';
  document.getElementById('s-rate').textContent = rate;
  document.getElementById('progress').style.width =
    Math.min(stats.total * 10, 100) + '%';
}

// kick off
loadProblem();
