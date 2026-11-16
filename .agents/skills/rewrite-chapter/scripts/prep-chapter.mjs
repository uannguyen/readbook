// Giữ bản dịch máy tiếng Việt vào raw/<slug>-vi/ trước khi viết lại. Không ghi đè bản đã có.
// Nguồn là lần commit đầu tiên của file chương (bản cào gốc), chưa commit thì lấy file hiện tại.
// Lưu ý: raw/<slug>/ chứa bản Trung đánh số theo bản Trung, không dùng cho skill này.
//   node .agents/skills/rewrite-chapter/scripts/prep-chapter.mjs kiem-lai 581 583
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const [slug, from, to = from] = process.argv.slice(2);
if (!slug || !from) {
  console.error('Cách dùng: prep-chapter.mjs <slug> <từ> [đến]');
  process.exit(1);
}

const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });

function firstCommitted(path) {
  try {
    const first = git('log', '--diff-filter=A', '--format=%H', '--', path).trim().split('\n').pop();
    return first ? git('show', `${first}:${path}`) : null;
  } catch {
    return null;
  }
}

const dir = `raw/${slug}-vi`;
fs.mkdirSync(dir, { recursive: true });
for (let n = Number(from); n <= Number(to); n++) {
  const name = `chuong-${n}.md`;
  const current = `web/chapters/${slug}/${name}`;
  const raw = `${dir}/${name}`;
  let note = 'đã có';
  if (!fs.existsSync(raw)) {
    const committed = firstCommitted(current);
    if (committed !== null) {
      fs.writeFileSync(raw, committed);
      note = 'lấy từ commit đầu tiên';
    } else if (fs.existsSync(current)) {
      fs.copyFileSync(current, raw);
      note = 'chép từ file hiện tại';
    } else {
      console.log(`ch.${n}: KHÔNG có chương này, cần cào trước`);
      continue;
    }
  }
  const lines = fs.readFileSync(raw, 'utf8').split('\n').length;
  console.log(`ch.${n}: ${raw} (${note}, ${lines} dòng)`);
}
