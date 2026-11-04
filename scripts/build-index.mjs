// Quét web/chapters/<slug>/chuong-*.md -> index.json (danh sách chương cho reader)
// Dùng: node scripts/build-index.mjs [slug]
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const slug = process.argv[2] || 'kiem-lai';
const dir = path.join(import.meta.dirname, '..', 'web', 'chapters', slug);

const files = (await readdir(dir)).filter((f) => /^chuong-\d+\.md$/.test(f));
const chapters = [];
for (const f of files) {
  const n = +f.match(/\d+/)[0];
  const first = (await readFile(path.join(dir, f), 'utf8')).split('\n', 1)[0];
  chapters.push({ n, title: first.replace(/^#+\s*/, '') || `Chương ${n}` });
}
chapters.sort((a, b) => a.n - b.n);
await writeFile(path.join(dir, 'index.json'), JSON.stringify({ chapters }, null, 1));
console.log(`index.json: ${chapters.length} chương (${chapters[0]?.n}–${chapters.at(-1)?.n})`);
