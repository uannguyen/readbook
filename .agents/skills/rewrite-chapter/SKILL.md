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

Mỗi lượt làm tối đa 3 chương, trừ khi người dùng yêu cầu khác, vì mỗi chương tốn khoảng 40 nghìn token và người dùng cần đọc thử giữa các đợt để chỉnh hướng.

**1. Giữ bản thô, một lần cho mỗi chương**

```bash
node .Codex/skills/rewrite-chapter/scripts/prep-chapter.mjs <slug> <từ> <đến>
```

Script chép bản dịch máy vào `raw/<slug>/`, lấy từ git nếu file đã bị sửa. Luôn viết lại từ bản thô: dựa vào bản đã biên tập trước đó sẽ giữ nguyên lỗi cũ, và nguồn của nhiều chương chưa có trong git nên đây là bản duy nhất.

**2. Học giọng văn**

Đọc khoảng 60-80 dòng đầu của các chương mẫu trong hồ sơ, chỉ cần một lần mỗi phiên. Chú ý cách câu nối nhau, cách dẫn lời thoại, cách gọi nhân vật. Trong cùng một bộ truyện có thể có nhiều dịch giả chất lượng khác nhau, nên chỉ lấy mẫu từ các chương hồ sơ đã chọn, không lấy trung bình cả dải.

**3. Đọc bản thô và ngữ cảnh**

Đọc toàn bộ `raw/<slug>/chuong-<n>.md`. Đọc thêm khoảng 30 dòng cuối của chương trước để nối mạch. Với nhân vật có xưng hô lẫn lộn, grep tên đó ở các chương khác trước khi kết luận giới tính.

**4. Viết lại**

- Giữ đủ mọi ý và tình tiết, không thêm chi tiết mới. Được tách, gộp hoặc đảo câu để đọc thuận.
- Khi một câu vô lý, hãy đoán cụm tiếng Trung gốc đã bị dịch sai rồi dựng lại nghĩa. Thành ngữ bị dịch từng chữ là lỗi phổ biến nhất ("sửa mái nhà dột" từ 捡漏 thực ra là "nhặt của hời").
- Xác định rõ ai làm gì với ai. Bản máy hay nhầm chủ ngữ và đại từ, nên dùng lại tên nhân vật khi đại từ gây nhầm lẫn.
- Giữ đúng cách xưng hô theo vai vế và quan hệ, theo hồ sơ.
- Khôi phục chữ bị che của nguồn ("k*ch th*ch" thành "kích thích").
- Chỗ không chắc nghĩa thì đánh dấu `[?]` ngay sau cụm đó, đừng tự chế tình tiết. Thà có `[?]` còn hơn đọc trôi mà sai.
- Giữ dòng tiêu đề `# Chương N: ...`, trừ khi tiêu đề rõ ràng sai.

Trước khi ghi đè phải Read file đích (`limit: 1` là đủ), nếu không lệnh Write sẽ bị từ chối và phải gõ lại cả chương. Ghi trực tiếp vào `web/chapters/<slug>/chuong-<n>.md`.

**5. Kiểm tra bằng script**

```bash
node .Codex/skills/rewrite-chapter/scripts/check-chapter.mjs <slug> <n>
```

Script so với bản thô và báo tỷ lệ độ dài, tên riêng có thể bị mất, từ xưng hô đáng ngờ và chữ bị che. Đây là cảnh báo để xem lại, không phải lỗi chắc chắn: tên đổi thứ tự (Kinh Trập phủ thành phủ Kinh Trập) sẽ bị báo nhầm. Tỷ lệ dưới 0,75 thường là đã làm mất ý, hãy đối chiếu lại.

**6. Hoàn tất**

Nếu đổi tiêu đề chương thì chạy `node scripts/build-index.mjs <slug>`, vì mục lục đọc từ `index.json`.

Báo cáo ngắn: chương đã xong, số `[?]`, những suy luận đáng kiểm tra (giới tính, tên riêng), và phần chưa làm. Đừng dán nội dung chương vào chat, người dùng đọc trong app. Nhắc họ rằng app giữ bản cũ ở lần mở đầu (phải mở lại hoặc tải lại) và bản deploy chỉ đổi sau khi commit, vì lỗi "vẫn thấy sai" từng xuất phát từ việc đọc bản cũ.

## Khi người dùng sửa lỗi

Mỗi góp ý là dữ liệu quý. Ghi ngay vào mục phù hợp của hồ sơ để các chương sau không lặp lại, rồi sửa các chương đã viết nếu lỗi có ở đó. Trước khi kết luận lỗi, kiểm tra file thật: có thể họ đang đọc bản cũ. Nếu góp ý mâu thuẫn với chương mẫu, ý người dùng được ưu tiên, và hãy ghi rõ điều đó trong hồ sơ.

## Bộ truyện mới

Chép cấu trúc `references/kiem-lai.md` sang `references/<slug>.md`. Chọn 2-3 chương mẫu bằng cách đọc thử rải rác và lấy chương tự nhiên nhất, rồi hỏi người dùng có đồng ý không. Xưng hô và thuật ngữ bắt đầu từ những gì chương mẫu dùng, sau đó bổ sung theo góp ý.
