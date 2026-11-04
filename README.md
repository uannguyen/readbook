# readbook

PWA đọc truyện cá nhân, hiện có bộ "Kiếm Lai". Dự án viết bằng JavaScript thuần, không framework, không build step, không test. Mỗi chương là một file Markdown, cào từ truyenfull.live.

## Yêu cầu

- Node.js 20.11 trở lên, để chạy các script
- Python 3, để chạy web ở máy

## Chạy web ở máy

```bash
cd web && python3 -m http.server 8765
```

Mở http://localhost:8765. Phải phục vụ từ thư mục `web/`, nếu không sẽ gặp lỗi 404. Service worker chỉ hoạt động trên localhost hoặc HTTPS.

## Việc thường làm

### Thêm chương mới

1. Cào chương về, hoặc tự đặt file vào `web/chapters/kiem-lai/chuong-<số>.md`. Dòng đầu file có dạng `# Chương N: tiêu đề`.

   ```bash
   node scripts/scrape.mjs kiem-lai 583 600
   ```

2. Sinh lại danh sách chương. Thiếu bước này thì chương mới không hiện trên web.

   ```bash
   node scripts/build-index.mjs kiem-lai
   ```

3. Tải lại trang. Service worker lấy cache trước rồi mới làm mới ngầm, nên có thể phải tải lại lần nữa.

### Viết lại chương dịch máy

Từ chương 578, bản dịch máy khó hiểu và dùng sai xưng hô "anh/em/cô". Các chương này được viết lại bằng skill `rewrite-chapter` của Claude Code, từ bản thô trong `raw/<slug>/`, mỗi đợt tối đa 3 chương.

```bash
node .claude/skills/rewrite-chapter/scripts/prep-chapter.mjs kiem-lai 581 583
node .claude/skills/rewrite-chapter/scripts/check-chapter.mjs kiem-lai 581
```

Nếu đổi tiêu đề chương, chạy lại `build-index.mjs`.

### Sửa giao diện

Khi sửa `web/app.js`, `web/style.css`, `web/index.html` hoặc danh sách `SHELL`, phải tăng `VERSION` trong `web/sw.js`. Nếu không, máy đã cài PWA vẫn dùng bản cũ.

## Các script

| Script | Công dụng | Cách dùng |
| --- | --- | --- |
| `scripts/scrape.mjs` | Cào chương vào `web/chapters/<slug>/` | `node scripts/scrape.mjs <slug> <từ> <đến>` |
| `scripts/build-index.mjs` | Sinh lại `index.json`, danh sách chương của web | `node scripts/build-index.mjs [slug]` |
| `scripts/style-lint.mjs` | Dò lỗi văn phong theo `docs/style-guide-kiem-lai.md` | `node scripts/style-lint.mjs <từ> <đến> [--fix] [--show]` |
| `.claude/skills/rewrite-chapter/scripts/prep-chapter.mjs` | Lưu bản thô vào `raw/<slug>/` trước khi viết lại | `node .claude/skills/rewrite-chapter/scripts/prep-chapter.mjs <slug> <từ> [đến]` |
| `.claude/skills/rewrite-chapter/scripts/check-chapter.mjs` | So chương đã viết lại với bản thô | `node .claude/skills/rewrite-chapter/scripts/check-chapter.mjs <slug> <n>` |

Chạy mọi lệnh từ thư mục gốc repo. `style-lint.mjs`, `prep-chapter.mjs` và `check-chapter.mjs` dùng đường dẫn tương đối nên chạy ở nơi khác sẽ không tìm thấy file.

### `scrape.mjs`

- Bỏ qua chương đã có file, nên chạy lại không ghi đè.
- Nghỉ 1,5 giây giữa các chương và thử lại tối đa 5 lần khi lỗi mạng.
- Dừng hẳn ở chương đầu tiên trả về lỗi HTTP. Xem log để biết chương nào chưa cào được.
- Không tự cập nhật `index.json`.

### `build-index.mjs`

- Đọc dòng đầu của mỗi `chuong-*.md` để lấy tiêu đề.
- Mặc định `slug` là `kiem-lai`.

### `style-lint.mjs`

- Mặc định chỉ báo cáo, không ghi file.
- `--show` in thêm các đoạn cần sửa tay.
- `--fix` áp các thay thế tự động vào file. Cách này từng bị đánh giá là quá cứng nhắc, nên không dùng khi viết lại chương.
- Chỉ chạy trên `kiem-lai` vì đường dẫn được gắn cứng.

### `prep-chapter.mjs`

- Không ghi đè bản thô đã có.
- Lấy bản thô từ git nếu chương đã từng được commit, nếu không thì chép từ file hiện tại.

### `check-chapter.mjs`

- So độ dài, số đoạn, số chỗ đánh dấu `[?]` và các tên riêng bị mất.
- Kết quả là cảnh báo để xem lại, không phải lỗi chắc chắn.

## Cấu trúc thư mục

```text
web/                 Toàn bộ trang web, là thư mục được deploy
  app.js             Cài đặt giao diện, renderer Markdown, logic mở chương
  style.css          Giao diện, điều khiển bằng CSS variables
  sw.js              Service worker
  chapters/<slug>/   chuong-<n>.md và index.json
scripts/             Script cào truyện, sinh danh sách chương, dò văn phong
raw/<slug>/          Bản dịch máy gốc của các chương đã viết lại
docs/                Style guide
.claude/skills/      Skill rewrite-chapter và hồ sơ truyện
```

`.claude/` đang nằm trong `.gitignore`, nên skill và hai script `prep-chapter`, `check-chapter` chỉ có ở máy này, không đi theo repo.

## Deploy

Vercel phục vụ thư mục `web/` theo cấu hình trong `vercel.json`. Chương mới chỉ xuất hiện trên bản online sau khi deploy lại.
