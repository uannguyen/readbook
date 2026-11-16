// So chương đã viết lại với bản thô. Kết quả là cảnh báo để xem lại, không phải lỗi chắc chắn.
//   node .agents/skills/rewrite-chapter/scripts/check-chapter.mjs kiem-lai 578
import fs from 'node:fs';

const [slug, n] = process.argv.slice(2);
if (!slug || !n) {
  console.error('Cách dùng: check-chapter.mjs <slug> <n>');
  process.exit(1);
}
const rawText = fs.readFileSync(`raw/${slug}-vi/chuong-${n}.md`, 'utf8');
const newText = fs.readFileSync(`web/chapters/${slug}/chuong-${n}.md`, 'utf8');

const paragraphs = (t) => t.split('\n').filter((l) => l.trim() && !l.startsWith('# '));
const words = (ps) => ps.join(' ').split(/\s+/).length;
const rawParas = paragraphs(rawText);
const newParas = paragraphs(newText);
const ratio = words(newParas) / words(rawParas);
console.log(`Độ dài: ${words(rawParas)} -> ${words(newParas)} từ (tỷ lệ ${ratio.toFixed(2)})${ratio < 0.75 ? '  CẢNH BÁO: có thể mất ý' : ''}`);
console.log(`Đoạn: ${rawParas.length} -> ${newParas.length}, trung bình ${(words(newParas) / newParas.length).toFixed(1)} từ/đoạn`);
console.log(`Chỗ đánh dấu [?]: ${(newText.match(/\[\?\]/g) || []).length}`);

const NAME = /\p{Lu}\p{L}*(?: \p{Lu}\p{L}*){1,2}/gu;
const norm = (s) => s.toLocaleLowerCase('vi');
const newLower = norm(newText);
const missing = [...new Set(rawText.match(NAME) || [])].filter((name) => !newLower.includes(norm(name)));
console.log(`Tên có ở bản thô, không thấy ở bản mới: ${missing.join('; ') || 'không'}`);

const B = '(?<![\\p{L}\\p{N}])';
const A = '(?![\\p{L}\\p{N}])';
const SUSPECTS = [
  ['anh', `(?<!nguyên )${B}anh${A}(?! (?:hùng|linh|kiệt|minh|tuấn|hào|dũng|tài))`],
  ['em', `${B}em${A}(?! (?:bé|nhỏ))`],
  ['cô', `(?<!cô )${B}cô${A}(?! (?:cô|nương|độc|đơn|quạnh|hồn|tịch|lập|đọng|nhi))`],
  ['tôi', `${B}tôi${A}(?! (?:luyện|rèn))`],
  ['bạn/cậu', `(?<!kết )${B}(?:bạn|cậu)${A}(?! (?:bè|hữu|ấy))`],
  ['y', `${B}y${A}(?= (?:nói|hỏi|đáp|cười|vẫn|đã|lại|cũng|không|chỉ))`],
  ['chữ bị che', '\\p{L}\\*+\\p{L}'],
  ['đảo kiểu convert', `${B}(?:thần tiên|tuyết hoa|tiểu thử|cốc vũ) tiền${A}(?! bối)`],
];
for (const [label, src] of SUSPECTS) {
  const hits = [...newText.matchAll(new RegExp(src, 'giu'))];
  if (!hits.length) continue;
  console.log(`\n"${label}": ${hits.length} chỗ`);
  for (const h of hits.slice(0, 5)) {
    console.log(`  ...${newText.slice(Math.max(0, h.index - 30), h.index + 30).replace(/\n/g, ' ')}...`);
  }
}
