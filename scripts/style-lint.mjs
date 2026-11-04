// Dò và sửa lỗi văn phong theo docs/style-guide-kiem-lai.md, không tốn token.
//   node scripts/style-lint.mjs 581 600            báo cáo, không ghi file
//   node scripts/style-lint.mjs 581 600 --fix      áp các thay thế an toàn vào file
//   node scripts/style-lint.mjs 581 581 --show     in thêm các đoạn cần biên tập tay
import fs from 'node:fs';

const DIR = 'web/chapters/kiem-lai/';
const NAME = '\\p{Lu}\\p{L}*(?: \\p{Lu}\\p{L}*){1,2}'; // tên riêng từ 2 âm tiết, tránh dính "Trong phố"
const BEFORE = '(?<![\\p{L}\\p{N}])';
const AFTER = '(?![\\p{L}\\p{N}])';
// "thần tiên tiền bối" là vị tiền bối, không phải đồng tiền.
const NOT_TIEN_X = '(?! (?:bối|nhiệm|đồ|triều|kiếp|thân|tuyến|lệ|tài|bạc|sử))';

// Thay thế an toàn: [từ gốc, từ thay]. Giải thích và số liệu ở mục 3-5 của style guide.
const AUTO = [
  // Trật tự từ kiểu convert
  ['thần tiên tiền' + NOT_TIEN_X, 'tiền thần tiên'],
  ['tuyết hoa tiền' + NOT_TIEN_X, 'tiền tuyết hoa'],
  ['tiểu thử tiền' + NOT_TIEN_X, 'tiền tiểu thử'],
  ['cốc vũ tiền' + NOT_TIEN_X, 'tiền cốc vũ'],
  ['lão hòe phố', 'phố Lão Hòe'],
  // Hán-Việt hóa theo ví dụ của chủ dự án
  ['rừng trúc', 'trúc lâm'],
  ['thuyền nhỏ', 'tiểu thuyền'],
  ['(?:cưỡi|ngự) gió', 'ngự phong'],
  ['gió mát', 'thanh phong'],
  ['gió nhẹ', 'vi phong'],
  ['gió lạnh', 'hàn phong'],
  ['gió xuân', 'xuân phong'],
  ['gió thu', 'thu phong'],
  ['gió tuyết', 'phong tuyết'],
  ['áo trắng(?! (?:tinh|muốt|ngà))', 'bạch y'],
  ['áo xanh(?! (?:lam|lá|biếc|ngọc|đậm|nhạt|thẫm|nước))', 'thanh y'],
  ['áo đen', 'hắc y'],
  // Sau khi đổi áo, đưa về danh từ chính đứng trước: "thanh y tiểu đồng" -> "tiểu đồng thanh y"
  ...['bạch y', 'thanh y', 'hắc y'].flatMap((y) =>
    ['thiếu nữ', 'thiếu niên', 'tiểu đồng', 'nam tử', 'nữ tử', 'lão nhân', 'thư sinh', 'đạo nhân', 'hán tử']
      .map((who) => [`${y} ${who}`, `${who} ${y}`])),
  ['cửa núi', 'sơn môn'],
  ['núi sông', 'sơn hà'],
  ['ông lão', 'lão nhân'],
  ['người đàn ông', 'nam tử'],
  ['người (?:phụ nữ|nữ tử)', 'nữ tử'],
  // Xưng hô đã duyệt
  ['anh (?:ta|ấy)', 'hắn'],
  ['cô ấy', 'nàng'],
  ['chàng trai', 'thiếu niên'],
  ['cô gái', 'thiếu nữ'],
  ['em trai', 'đệ đệ'],
  ['em gái', 'muội muội'],
  ['anh trai', 'ca ca'],
  ['chị gái', 'tỷ tỷ'],
  // Từ hiện đại, ch.1-200 dùng từ bên phải
  ['người tu đạo', 'tu sĩ'],
  ['vũ phu', 'võ phu'],
  ['thực sự', 'thật sự'],
  ['tâm trạng', 'tâm tình'],
  ['giờ đây', 'bây giờ'],
  ['như thể', 'tựa như'],
  ['mối quan hệ', 'quan hệ'],
  ['thông tin', 'tin tức'],
  ['bạn bè', 'bằng hữu'],
  ['kỵ sĩ', 'kỵ binh'],
  ['khách sạn', 'khách điếm'],
  ['nhẹ gật đầu', 'khẽ gật đầu'],
  ['mũ có vải che mặt', 'mũ che mặt'],
  ['điều đó', 'chuyện đó'],
  ['điều này', 'chuyện này'],
].map(([from, to]) => ({ re: new RegExp(`${BEFORE}${from}${AFTER}`, 'giu'), to }));

// Tên + danh từ thuần Việt phải đảo; phân biệt hoa thường để không dính "Thôi Đông Sơn".
const ORDER = ['phố', 'ngõ', 'sườn dốc'].map(
  (head) => ({ re: new RegExp(`${BEFORE}(${NAME}) ${head}${AFTER}`, 'gu'), head }),
);

// Không sửa máy được, phải xem từng đoạn.
const FLAG = [
  ['xưng "anh"', `${BEFORE}anh${AFTER}(?! (?:hùng|em|linh|kiệt|minh|tuấn|hào|dũng|hoa|tài))`],
  ['xưng "em"', `${BEFORE}em${AFTER}(?! (?:bé|nhỏ))`],
  ['xưng "cô"', `${BEFORE}cô${AFTER}(?! (?:nương|độc|đơn|quạnh|hồn|phong|tịch|lập|đọng|nhi|tử))`],
  ['xưng "tôi"', `${BEFORE}tôi${AFTER}`],
  ['xưng "bạn/cậu"', `${BEFORE}(?:bạn|cậu)${AFTER}`],
  ['xưng "ông ta/ấy"', `${BEFORE}ông (?:ta|ấy)${AFTER}`],
  ['từ hiện đại', `${BEFORE}(?:những điều|tổ chức|cuộc chiến|trinh sát|mặt nạ|trên thực tế|nhưng thực tế)${AFTER}`],
  ['câu kiểu máy', `${BEFORE}(?:cười và|và nói|một trong những|là những người)${AFTER}`],
  ['trật tự convert', `${BEFORE}(?:nhất mạch)${AFTER}`],
  ['chữ bị che', '\\p{L}\\*+\\p{L}'],
].map(([label, src]) => ({ label, re: new RegExp(src, 'giu') }));

const LONG_PARAGRAPH_WORDS = 120;

const capitalize = (s) => s[0].toLocaleUpperCase('vi') + s.slice(1);
const atSentenceStart = (whole, offset) => /(?:^|[.!?:"“”-]\s*)$/u.test(whole.slice(0, offset));

function fixLine(line) {
  let out = line;
  let count = 0;
  for (const { re, to } of AUTO) {
    out = out.replace(re, (m, ...rest) => {
      count++;
      const [offset, whole] = rest.slice(-2);
      // Chỉ viết hoa ở đầu câu: "Tuyết Hoa tiền" giữa câu phải thành "tiền tuyết hoa".
      return /^\p{Lu}/u.test(m) && atSentenceStart(whole, offset) ? capitalize(to) : to;
    });
  }
  for (const { re, head } of ORDER) {
    out = out.replace(re, (m, name, offset, whole) => {
      count++;
      return `${atSentenceStart(whole, offset) ? capitalize(head) : head} ${name}`;
    });
  }
  return { out, count };
}

function flagsOf(line) {
  const hits = FLAG.filter(({ re }) => line.search(re) !== -1).map(({ label }) => label);
  if (line.split(/\s+/).length > LONG_PARAGRAPH_WORDS) hits.push('đoạn quá dài');
  return hits;
}

const args = process.argv.slice(2);
const write = args.includes('--fix');
const show = args.includes('--show');
const [from, to] = args.filter((a) => !a.startsWith('--')).map(Number);
if (!from || !to) {
  console.error('Cách dùng: node scripts/style-lint.mjs <từ> <đến> [--fix] [--show]');
  process.exit(1);
}

let totalAuto = 0;
let totalParas = 0;
let totalFlagged = 0;
const byLabel = {};
for (let n = from; n <= to; n++) {
  const file = `${DIR}chuong-${n}.md`;
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let auto = 0;
  let paras = 0;
  const flagged = [];
  const result = lines.map((line, i) => {
    if (!line.trim() || line.startsWith('# ')) return line;
    paras++;
    const { out, count } = fixLine(line);
    auto += count;
    const hits = flagsOf(out);
    if (hits.length) flagged.push({ line: i + 1, hits, text: out });
    return out;
  });
  if (write && auto) fs.writeFileSync(file, result.join('\n'));
  totalAuto += auto;
  totalParas += paras;
  totalFlagged += flagged.length;
  for (const f of flagged) for (const h of f.hits) byLabel[h] = (byLabel[h] || 0) + 1;
  console.log(`ch.${n}: ${auto} thay thế, ${flagged.length}/${paras} đoạn cần xem`);
  if (show) for (const f of flagged) console.log(`  L${f.line} [${f.hits.join(', ')}] ${f.text}`);
}
const pct = totalParas ? ((totalFlagged / totalParas) * 100).toFixed(1) : '0';
console.log(`\nTổng: ${totalAuto} thay thế${write ? ' (đã ghi)' : ' (chưa ghi)'}, ${totalFlagged}/${totalParas} đoạn cần xem (${pct}%)`);
console.log(Object.entries(byLabel).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k}: ${v}`).join(' · '));
