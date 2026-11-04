# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tổng quan

PWA đọc truyện cá nhân (hiện chỉ có bộ "Kiếm Lai"), không build step, không framework, không test. Nội dung cào từ truyenfull.live về dạng một file Markdown mỗi chương. Người dùng nói tiếng Việt; tài liệu và trả lời viết tiếng Việt có dấu.

## Lệnh thường dùng

```bash
# Chạy local (phải cd vào web/, nếu không sẽ 404). PWA/service worker cần localhost hoặc HTTPS
cd web && python3 -m http.server 8765

# Cào chương <từ>..<đến> -> web/chapters/<slug>/chuong-<n>.md (bỏ qua file đã có, nghỉ 1,5s/chương)
node scripts/scrape.mjs kiem-lai 583 600

# Dò lỗi văn phong theo style guide; --fix áp thay thế an toàn, --show in đoạn cần sửa tay
node scripts/style-lint.mjs 581 583 --fix

# Sinh lại index.json sau khi thêm/xóa chương
node scripts/build-index.mjs kiem-lai
```

Deploy: Vercel phục vụ thư mục `web/` (`vercel.json`). Trong sandbox của Claude, shell không có mạng; chạy script cào qua `ctx_execute` (JavaScript) thì fetch được.

## Kiến trúc

- `scripts/scrape.mjs`: lấy `div#chapter-c`, bỏ quảng cáo và chuỗi spam "truyenfull…", ghi `# Chương N: tiêu đề` rồi các đoạn cách nhau một dòng trống. Có retry khi lỗi mạng.
- `scripts/build-index.mjs`: đọc dòng đầu mỗi `chuong-*.md` để tạo `web/chapters/<slug>/index.json` (`{chapters:[{n,title}]}`). Reader dựa hoàn toàn vào file này để liệt kê và điều hướng chương, nên thiếu bước này thì chương mới không hiện.
- `web/app.js`: một file vanilla JS. Gồm cài đặt giao diện (lưu `localStorage` key `cfg2`, vị trí đọc key `pos`), renderer Markdown tối giản (heading, đoạn, đậm/nghiêng, hr) và logic mở chương. Hằng `STORY`/`BASE` đang gắn cứng `kiem-lai`.
- `web/style.css`: giao diện mô phỏng trang chương của truyenfull; màu/font/cỡ chữ điều khiển bằng CSS variables do `applyCfg()` gán. Sprite/nền ở `web/img/`.
- `web/sw.js`: cache-first + làm mới ngầm. **Khi sửa `app.js`, `style.css`, `index.html` hoặc danh sách `SHELL`, phải tăng `VERSION`**, nếu không máy đã cài vẫn dùng bản cũ.

## Biên tập bản dịch

Bản dịch máy của các chương sau (từ 578) khó hiểu và dùng "anh/em/cô". Khi viết lại chương, dùng skill `rewrite-chapter` (`.claude/skills/rewrite-chapter/`): viết lại từ bản thô trong `raw/<slug>/`, theo giọng các chương mẫu, từng đợt tối đa 3 chương; không thêm hay bỏ tình tiết; chỗ đoán nghĩa thì đánh dấu `[?]`. Góp ý của người dùng được ghi vào hồ sơ truyện trong skill. Thay thế máy bằng `scripts/style-lint.mjs --fix` đã bị người dùng đánh giá là quá cứng nhắc. Tên riêng chỉ có ở 578+ (vd "Tùy Cảnh Rừng") chưa xác minh.
