// Giữ bản dịch thô vào raw/<slug>/ trước khi viết lại. Không ghi đè bản đã có.
//   node .claude/skills/rewrite-chapter/scripts/prep-chapter.mjs kiem-lai 581 583
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const [slug, from, to = from] = process.argv.slice(2);
if (!slug || !from) {
  console.error('Cách dùng: prep-chapter.mjs <slug> <từ> [đến]');
  process.exit(1);
}

function fromGit(path) {
  try {
    return execFileSync('git', ['show', `HEAD:${path}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
  } catch {
    return null; // Chương chưa từng commit: file hiện tại chính là bản thô.
  }
}

fs.mkdirSync(`raw/${slug}`, { recursive: true });
for (let n = Number(from); n <= Number(to); n++) {
  const name = `chuong-${n}.md`;
  const current = `web/chapters/${slug}/${name}`;
  const raw = `raw/${slug}/${name}`;
  if (fs.existsSync(raw)) {
    console.log(`ch.${n}: đã có ${raw}`);
    continue;
  }
  const committed = fromGit(current);
  if (committed !== null) {
    fs.writeFileSync(raw, committed);
    console.log(`ch.${n}: lấy từ git -> ${raw}`);
  } else if (fs.existsSync(current)) {
    fs.copyFileSync(current, raw);
    console.log(`ch.${n}: chép từ file hiện tại -> ${raw}`);
  } else {
    console.log(`ch.${n}: KHÔNG có chương này, cần cào trước`);
  }
}
