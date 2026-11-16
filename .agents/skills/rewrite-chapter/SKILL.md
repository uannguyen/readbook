---
name: rewrite-chapter
description: Viết lại hoặc biên tập chương truyện dịch máy trong repo này thành văn tự nhiên, đúng giọng các chương dịch tốt của chính bộ truyện. Dùng skill này bất cứ khi nào người dùng muốn "viết lại", "dịch lại", "sửa bản dịch", "biên tập", "làm tiếp" một chương hoặc dải chương (vd "viết lại 579", "làm tiếp 581-583"), hoặc than phiền chương nào đó tối nghĩa, sai xưng hô, sai giới tính, giống convert, kể cả khi họ không nói rõ chữ "viết lại".
---

# Viết lại chương truyện

Biến bản dịch máy khó hiểu thành chương đọc tự nhiên, giữ nguyên tình tiết. Chạy mọi lệnh từ thư mục gốc repo. Trả lời người dùng bằng tiếng Việt có dấu.

Hồ sơ từng bộ truyện nằm ở `references/<slug>.md` (hiện có `kiem-lai`). Hồ sơ chứa xưng hô, thuật ngữ, chương mẫu và các lỗi người dùng đã sửa, nên đọc nó trước khi viết. Bộ truyện chưa có hồ sơ thì xem cuối file này.

## Vì sao viết tay, không thay thế máy

Dự án đã thử bộ quy tắc thay từ tự động (`scripts/style-lint.mjs`) và người dùng đánh giá quá cứng nhắc: nó không sửa được câu sai nghĩa, lại tạo cảm giác chắp vá. Vì vậy đừng dùng `--fix` của script đó, và học giọng văn từ chương mẫu thay vì áp bảng từ.

## Quy trình

Mỗi lượt làm tối đa 3 chương, trừ khi người dùng yêu cầu khác, vì người dùng cần đọc thử giữa các đợt để chỉnh hướng.

### Vì sao mỗi chương một subagent

Mỗi lượt gọi model gửi lại toàn bộ ngữ cảnh. Làm nhiều chương trong cùng một ngữ cảnh khiến bản thô và bản viết của chương trước nằm lại, ngữ cảnh phình từ khoảng 70 nghìn lên hơn 300 nghìn token, và mọi lượt gọi sau đều phải trả cho phần đó. Vì vậy phiên chính chỉ điều phối, còn từng chương được viết trong một subagent riêng rồi bỏ đi.

### Phiên chính: điều phối

**1. Giữ bản thô**

```bash
node .agents/skills/rewrite-chapter/scripts/prep-chapter.mjs <slug> <từ> <đến>
```

Script ghi bản dịch máy tiếng Việt gốc vào `raw/<slug>-vi/chuong-<n>.md`, lấy từ lần commit đầu tiên của file chương (bản cào gốc). Luôn viết lại từ bản này: dựa vào bản đã biên tập trước đó sẽ giữ nguyên lỗi cũ. **Không dùng `raw/<slug>/`**: thư mục đó chứa bản Trung đánh số theo bản Trung (chương Việt 643 ứng với chương Trung 581), không phải bản nguồn của skill này.

**2. Giao mỗi chương cho một subagent**

Mỗi chương một subagent, có thể chạy song song. Phiên chính không tự đọc bản thô hay chương mẫu.

- Claude Code: gọi Agent (`general-purpose`), gửi nhiều lệnh trong cùng một tin nhắn.
- Codex: spawn subagent cho từng chương nếu có. Nếu không có, làm tuần tự theo mục "Subagent: viết một chương" và khuyên người dùng mở phiên mới sau mỗi đợt.

Prompt mẫu:

> Viết lại chương <n> của bộ `<slug>`. Đọc `.agents/skills/rewrite-chapter/SKILL.md` mục "Subagent: viết một chương" và `.agents/skills/rewrite-chapter/references/<slug>.md`, rồi làm đúng theo đó. Góp ý thêm của người dùng: <nếu có>. Trả về báo cáo dưới 10 dòng, không dán nội dung chương.

**3. Hoàn tất**

Nếu có chương đổi tiêu đề thì chạy `node scripts/build-index.mjs <slug>`, vì mục lục đọc từ `index.json`.

Gộp báo cáo của các subagent: chương đã xong, số `[?]`, những suy luận đáng kiểm tra (giới tính, tên riêng), và phần chưa làm. Đừng dán nội dung chương vào chat, người dùng đọc trong app. Nhắc họ rằng app giữ bản cũ ở lần mở đầu (phải mở lại hoặc tải lại) và bản deploy chỉ đổi sau khi commit, vì lỗi "vẫn thấy sai" từng xuất phát từ việc đọc bản cũ.

### Subagent: viết một chương

Chỉ đọc một nguồn là bản thô tiếng Việt. Không đọc bản Trung, không đọc bản hiện tại trong `web/chapters/` (trừ đoạn cuối chương trước để nối mạch).

**1. Học giọng văn.** Đọc khoảng 60 dòng đầu của các chương mẫu trong hồ sơ. Chú ý cách câu nối nhau, cách dẫn lời thoại, cách gọi nhân vật. Chỉ lấy mẫu từ các chương hồ sơ đã chọn, vì cùng một bộ có nhiều dịch giả chất lượng khác nhau.

**2. Đọc bản thô và ngữ cảnh.** Đọc toàn bộ `raw/<slug>-vi/chuong-<n>.md` trong **một** lần đọc (Claude: Read với `limit: 2000`; Codex: `cat`), đừng chia khúc, vì mỗi khúc là thêm một lượt gọi. Đọc thêm khoảng 30 dòng cuối của `web/chapters/<slug>/chuong-<n-1>.md`. Với nhân vật có xưng hô lẫn lộn, grep tên đó ở các chương khác (in số lần đếm, đừng in cả đoạn) trước khi kết luận giới tính.

**3. Viết lại**

- Giữ đủ mọi ý và tình tiết, không thêm chi tiết mới. Được tách, gộp hoặc đảo câu để đọc thuận.
- Khi một câu vô lý, hãy đoán cụm tiếng Trung gốc đã bị dịch sai rồi dựng lại nghĩa. Thành ngữ bị dịch từng chữ là lỗi phổ biến nhất ("sửa mái nhà dột" từ 捡漏 thực ra là "nhặt của hời").
- Xác định rõ ai làm gì với ai. Bản máy hay nhầm chủ ngữ và đại từ, nên dùng lại tên nhân vật khi đại từ gây nhầm lẫn.
- Giữ đúng cách xưng hô theo vai vế và quan hệ, theo hồ sơ.
- Khôi phục chữ bị che của nguồn ("k*ch th*ch" thành "kích thích").
- Chỗ không chắc nghĩa thì đánh dấu `[?]` ngay sau cụm đó, đừng tự chế tình tiết. Thà có `[?]` còn hơn đọc trôi mà sai.
- Giữ dòng tiêu đề `# Chương N: ...`, trừ khi tiêu đề rõ ràng sai.

Viết cả chương trong một lần ghi duy nhất vào `web/chapters/<slug>/chuong-<n>.md`, đừng viết từng phần. Claude: dùng Write, trước đó Read file đích với `limit: 1`, nếu không Write bị từ chối và phải gõ lại cả chương. Codex: ghi đè bằng heredoc `cat > file <<'EOF'`, hoặc apply_patch xóa file rồi thêm lại.

**4. Kiểm tra bằng script**

```bash
node .agents/skills/rewrite-chapter/scripts/check-chapter.mjs <slug> <n>
```

Script so với bản thô và báo tỷ lệ độ dài, tên riêng có thể bị mất, từ xưng hô đáng ngờ và chữ bị che. Đây là cảnh báo để xem lại, không phải lỗi chắc chắn: tên đổi thứ tự (Kinh Trập phủ thành phủ Kinh Trập) sẽ bị báo nhầm. Tỷ lệ dưới 0,75 thường là đã làm mất ý, hãy đối chiếu lại. Sửa bằng chỉnh sửa nhỏ tại chỗ (Edit hoặc apply_patch), không ghi lại cả chương.

**5. Báo cáo** dưới 10 dòng: tiêu đề có đổi không, số `[?]`, suy luận đáng kiểm tra, cảnh báo của script còn lại.

## Khi người dùng sửa lỗi

Mỗi góp ý là dữ liệu quý. Ghi ngay vào mục phù hợp của hồ sơ để các chương sau không lặp lại, rồi sửa các chương đã viết nếu lỗi có ở đó. Trước khi kết luận lỗi, kiểm tra file thật: có thể họ đang đọc bản cũ. Nếu góp ý mâu thuẫn với chương mẫu, ý người dùng được ưu tiên, và hãy ghi rõ điều đó trong hồ sơ.

## Bộ truyện mới

Chép cấu trúc `references/kiem-lai.md` sang `references/<slug>.md`. Chọn 2-3 chương mẫu bằng cách đọc thử rải rác và lấy chương tự nhiên nhất, rồi hỏi người dùng có đồng ý không. Xưng hô và thuật ngữ bắt đầu từ những gì chương mẫu dùng, sau đó bổ sung theo góp ý.
