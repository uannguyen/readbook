'use strict';
const STORY = 'kiem-lai';
const STORY_TITLE = 'Kiếm Lai';
const BASE = `chapters/${STORY}/`;

// Cấu hình giống truyenfull: [giá trị, nhãn]
const BGS = {
  '#F4F4F4': ['Xám nhạt', '#F4F4F4'], '#E9EBEE': ['Xanh nhạt', '#E9EBEE'],
  '#F4F4E4': ['Vàng nhạt', '#F4F4E4'], '#EAE4D3': ['Màu sepia', '#EAE4D3'],
  '#D5D8DC': ['Xanh đậm', '#D5D8DC'], '#FAFAC8': ['Vàng đậm', '#FAFAC8'],
  '#EFEFAB': ['Vàng ố', '#EFEFAB'], '#FFF': ['Màu trắng', '#FFFFFF'],
  hatsan: ['Hạt sạn', '#F2F2F2', 'img/bg_op.png'],
  sachcu: ['Sách cũ', '#C2B49B', 'img/bg_book_op.png'],
  '#232323': ['Màu tối', '#232323', 'img/bg_dark.gif', 'rgba(255,255,255,.6)'],
};
const FONTS = [
  ['Palatino Linotype', "'Palatino Linotype', serif"], ['Bookerly', 'Bookerly, serif'],
  ['Minion', 'Minion, serif'], ['Segoe UI', "'Segoe UI', sans-serif"],
  ['Roboto', 'Roboto, sans-serif'], ['Roboto Condensed', "'Roboto Condensed', sans-serif"],
  ['Patrick Hand', "'Patrick Hand', sans-serif"], ['Noticia Text', "'Noticia Text', sans-serif"],
  ['Times New Roman', "'Times New Roman', serif"], ['Verdana', 'Verdana, sans-serif'],
  ['Tahoma', 'Tahoma, sans-serif'], ['Arial', 'Arial, sans-serif'],
];
const SIZES = Array.from({ length: 13 }, (_, i) => 16 + i * 2);   // 16..40
const LHS = [100, 120, 140, 160, 180, 200];
const DEFAULTS = { bg: '#232323', font: 'Arial, sans-serif', size: 20, lh: 180, full: 'no' };

const $ = (id) => document.getElementById(id);
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ---------- Cài đặt giao diện ----------
let cfg = { ...DEFAULTS, ...store.get('cfg2', {}) };

function applyCfg() {
  const [, color, img, fg] = BGS[cfg.bg] || BGS[DEFAULTS.bg];
  const s = document.documentElement.style;
  s.setProperty('--font', cfg.font);
  s.setProperty('--size', cfg.size + 'px');
  s.setProperty('--lh', cfg.lh / 100);
  s.setProperty('--bg', color);
  s.setProperty('--bgimg', img ? `url(${img})` : 'none');
  s.setProperty('--fg', fg || '#2b2b2b');
  document.documentElement.classList.toggle('full', cfg.full === 'yes');
  document.documentElement.classList.toggle('dark', cfg.bg === '#232323');
  document.querySelector('meta[name=theme-color]').content = color;
  $('bgSelect').value = cfg.bg;
  $('fontSelect').value = cfg.font;
  $('sizeSelect').value = cfg.size;
  $('lhSelect').value = cfg.lh;
  document.querySelector(`input[name=full][value=${cfg.full}]`).checked = true;
  store.set('cfg2', cfg);
}
function update(patch) { cfg = { ...cfg, ...patch }; applyCfg(); }

function initSettings() {
  const opts = (arr) => arr.map(([v, t]) => `<option value="${v}">${t}</option>`).join('');
  $('bgSelect').innerHTML = opts(Object.entries(BGS).map(([k, v]) => [k, v[0]]));
  $('fontSelect').innerHTML = opts(FONTS.map(([n, v]) => [v, n]));
  $('sizeSelect').innerHTML = opts(SIZES.map((n) => [n, n]));
  $('lhSelect').innerHTML = opts(LHS.map((n) => [n, n + '%']));
  $('bgSelect').onchange = (e) => update({ bg: e.target.value });
  $('fontSelect').onchange = (e) => update({ font: e.target.value });
  $('sizeSelect').onchange = (e) => update({ size: +e.target.value });
  $('lhSelect').onchange = (e) => update({ lh: +e.target.value });
  document.querySelectorAll('input[name=full]').forEach((r) => r.onchange = () => update({ full: r.value }));
  $('resetBtn').onclick = () => update(DEFAULTS);
  $('settingsBtn').onclick = () => $('settings').showModal();
  $('settings').addEventListener('click', (e) => { if (e.target === $('settings')) $('settings').close(); });
}

// ---------- Markdown tối giản ----------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>');

function renderMd(md) {
  return md.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).map((b) => {
    const h = b.match(/^(#{1,3})\s+(.*)$/);
    if (h) return `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;
    if (/^(-{3,}|\*{3,})$/.test(b)) return '<hr>';
    return `<p>${inline(b).replace(/\n/g, '<br>')}</p>`;
  }).join('\n');
}

// ---------- Đọc chương ----------
let chapters = [];     // [{n, title}]
let current = null;    // số chương đang đọc

const idxOf = (n) => chapters.findIndex((c) => c.n === n);

async function openChapter(n, scrollY = 0) {
  const i = idxOf(n);
  if (i < 0) return;
  current = n;
  $('chapterSelect').value = n;
  $('reader').innerHTML = '<div class="msg">Đang tải…</div>';
  try {
    const res = await fetch(`${BASE}chuong-${n}.md`);
    if (!res.ok) throw new Error(res.status);
    const body = renderMd(await res.text()).replace(/^<h1>.*?<\/h1>\n?/, '');
    const pager = (cls) => `<nav class="pager ${cls}">
      <button data-go="-1"${i === 0 ? ' disabled' : ''}>‹ Chương trước</button>
      <button data-go="1"${i === chapters.length - 1 ? ' disabled' : ''}>Chương tiếp ›</button></nav>`;
    $('reader').innerHTML = `<a class="truyen-title">${esc(STORY_TITLE)}</a>
      <h1 class="chapter-title">${esc(chapters[i].title)}</h1><hr class="chapter-start">
      ${pager('top')}<div class="chapter-c">${body}</div><hr class="chapter-end">${pager('bottom')}`;
    document.title = chapters[i].title;
  } catch {
    $('reader').innerHTML = '<div class="msg">Không tải được chương này (có thể đang offline và chưa đọc lần nào).</div>';
  }
  window.scrollTo(0, scrollY);
  store.set('pos', { n, y: scrollY });
  const next = chapters[i + 1];            // nạp trước chương sau để đọc offline
  if (next) fetch(`${BASE}chuong-${next.n}.md`).catch(() => {});
}

function go(delta) {
  const c = chapters[idxOf(current) + delta];
  if (c) openChapter(c.n);
}

let saveTimer;
window.addEventListener('scroll', () => {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => current && store.set('pos', { n: current, y: Math.round(scrollY) }), 300);
}, { passive: true });

document.addEventListener('keydown', (e) => {
  if (e.target.matches('input, select') || $('settings').open) return;
  if (e.key === 'ArrowLeft') go(-1);
  if (e.key === 'ArrowRight') go(1);
});

async function init() {
  initSettings();
  applyCfg();
  $('reader').onclick = (e) => { const b = e.target.closest('[data-go]'); if (b) go(+b.dataset.go); };
  $('chapterSelect').onchange = (e) => openChapter(+e.target.value);

  try {
    const res = await fetch(`${BASE}index.json`);
    chapters = (await res.json()).chapters;
  } catch {
    $('reader').innerHTML = '<div class="msg">Không tải được danh sách chương.</div>';
    return;
  }
  $('chapterSelect').innerHTML = chapters.map((c) => `<option value="${c.n}">${esc(c.title)}</option>`).join('');
  const pos = store.get('pos', null);
  if (pos && idxOf(pos.n) >= 0) openChapter(pos.n, pos.y);
  else openChapter(chapters[0].n);
}

init();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
