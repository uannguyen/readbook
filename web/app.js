'use strict';
const STORY = 'kiem-lai';
const BASE = `chapters/${STORY}/`;

const FONTS = [
  ['Georgia', 'Georgia, "Times New Roman", serif'],
  ['Times New Roman', '"Times New Roman", Times, serif'],
  ['Noto Serif', '"Noto Serif", Georgia, serif'],
  ['Palatino', '"Palatino Linotype", Palatino, "Book Antiqua", serif'],
  ['Arial', 'Arial, Helvetica, sans-serif'],
  ['Roboto', 'Roboto, "Segoe UI", sans-serif'],
  ['Tahoma', 'Tahoma, Geneva, sans-serif'],
  ['Verdana', 'Verdana, Geneva, sans-serif'],
  ['Mặc định hệ thống', 'system-ui, sans-serif'],
];
// [tên, nền, chữ]
const PRESETS = [
  ['Sáng', '#ffffff', '#222222'],
  ['Giấy', '#f4ecd8', '#3b3226'],
  ['Xám', '#e3e3e3', '#222222'],
  ['Xanh nhạt', '#dff0e4', '#1f3a2a'],
  ['Tối', '#1c1c1e', '#b8b8b8'],
  ['Đen', '#000000', '#9a9a9a'],
];
const DEFAULTS = { font: FONTS[0][1], size: 20, lh: 1.8, bg: '#f4ecd8', fg: '#3b3226' };

const $ = (id) => document.getElementById(id);
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// ---------- Cài đặt giao diện ----------
let cfg = { ...DEFAULTS, ...store.get('cfg', {}) };

function applyCfg() {
  const s = document.documentElement.style;
  s.setProperty('--font', cfg.font);
  s.setProperty('--size', cfg.size + 'px');
  s.setProperty('--lh', cfg.lh);
  s.setProperty('--bg', cfg.bg);
  s.setProperty('--fg', cfg.fg);
  document.querySelector('meta[name=theme-color]').content = cfg.bg;
  $('fontSelect').value = cfg.font;
  $('size').value = cfg.size; $('sizeVal').textContent = cfg.size + 'px';
  $('lh').value = cfg.lh; $('lhVal').textContent = cfg.lh;
  $('bg').value = cfg.bg; $('fg').value = cfg.fg;
  store.set('cfg', cfg);
}
function update(patch) { cfg = { ...cfg, ...patch }; applyCfg(); }

function initSettings() {
  $('fontSelect').innerHTML = FONTS.map(([n, v]) => `<option value='${v}'>${n}</option>`).join('');
  $('presets').innerHTML = PRESETS.map(([n, bg, fg], i) =>
    `<button type="button" data-i="${i}" title="${n}" style="background:${bg};color:${fg}">A</button>`).join('');
  $('presets').onclick = (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const [, bg, fg] = PRESETS[b.dataset.i]; update({ bg, fg });
  };
  $('fontSelect').onchange = (e) => update({ font: e.target.value });
  $('size').oninput = (e) => update({ size: +e.target.value });
  $('lh').oninput = (e) => update({ lh: +e.target.value });
  $('bg').oninput = (e) => update({ bg: e.target.value });
  $('fg').oninput = (e) => update({ fg: e.target.value });
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
  $('prevBtn').disabled = i === 0;
  $('nextBtn').disabled = i === chapters.length - 1;
  $('reader').innerHTML = '<div class="msg">Đang tải…</div>';
  try {
    const res = await fetch(`${BASE}chuong-${n}.md`);
    if (!res.ok) throw new Error(res.status);
    $('reader').innerHTML = renderMd(await res.text());
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
  $('prevBtn').onclick = () => go(-1);
  $('nextBtn').onclick = () => go(1);
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
