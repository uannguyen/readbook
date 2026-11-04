// Cào chương truyện từ truyenfull.live -> web/chapters/<slug>/chuong-<n>.md
// Dùng: node scripts/scrape.mjs <slug> <từ> <đến>
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const [slug = 'kiem-lai', from = '578', to = '582'] = process.argv.slice(2);
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const DELAY_MS = 1500;
const outDir = path.join(import.meta.dirname, '..', 'web', 'chapters', slug);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => access(p).then(() => true, () => false);

async function fetchRetry(url, tries = 5) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, 'Accept-Language': 'vi,en;q=0.8' },
        signal: AbortSignal.timeout(30000),
      });
      return { ok: res.ok, status: res.status, html: res.ok ? await res.text() : '' };
    } catch (e) {
      if (i >= tries) throw e;
      console.log(`  thử lại ${i}/${tries - 1}: ${e.cause?.code || e.message}`);
      await sleep(2000 * i);
    }
  }
}

const decode = (s) =>
  s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

function parse(html) {
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');

  const title = decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '')
    .split('|')[0].replace(/^.*?-\s*(?=Chương)/, '').trim();

  const start = html.search(/<div[^>]*id="chapter-c"/i);
  if (start < 0) throw new Error('Không thấy #chapter-c');
  const markers = ['ads-chapter-bottom', 'chapter-nav-bot', 'chapter-end-bot']
    .map((k) => html.indexOf(k, start)).filter((i) => i > 0);
  const end = markers.length ? html.lastIndexOf('<div', Math.min(...markers)) : html.length;

  let body = html.slice(start, end)
    .replace(/<div[^>]*id="ads-chapter-top"[\s\S]*?<\/div>/i, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  body = decode(body)
    // chữ rác SEO ("truyen full, truyenfullvn, truyenfull vn...") kèm dấu ngăn xung quanh
    .replace(/[\s,;]*truyen\s?full\w*(?:[\s,.;]*(?:truyen\s?full\w*|vn\b))*[\s,.;]*/gi, '');

  const lines = body.split('\n').map((l) => l.trim()).filter((l) => /[\p{L}\p{N}]/u.test(l));
  return { title, text: lines.join('\n\n') };
}

await mkdir(outDir, { recursive: true });
for (let n = +from; n <= +to; n++) {
  const file = path.join(outDir, `chuong-${n}.md`);
  if (await exists(file)) { console.log(`bỏ qua ${n} (đã có)`); continue; }
  const url = `https://truyenfull.live/${slug}/chuong-${n}/`;
  const res = await fetchRetry(url);
  if (!res.ok) { console.log(`LỖI ${n}: HTTP ${res.status}`); break; }
  const { title, text } = parse(res.html);
  await writeFile(file, `# ${title || `Chương ${n}`}\n\n${text}\n`);
  console.log(`ok ${n}: "${title}" — ${text.length} ký tự, ${text.split('\n\n').length} đoạn`);
  await sleep(DELAY_MS);
}
