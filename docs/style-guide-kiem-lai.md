# Style guide biên tập — Kiếm Lai (từ chương 578)

> Cập nhật 2026-11-07: chuẩn tham chiếu dịch hiện tại là **chương 1–300**, theo [hồ sơ văn phong](./translation-profile-kiem-lai.md) và [phân tích chi tiết](./style-analysis-kiem-lai-1-300.md). Áp dụng cho cả dịch từ bản Trung và dịch lại hoặc biên tập bản Việt có sẵn. Các số đếm Đ ở tài liệu này vẫn là khảo sát lịch sử chương 1–200, chưa đổi thành số đếm 300 chương. Những chỉ dẫn tách đoạn theo số từ và quy trình thay thế máy ở mục 7–8 (kể cả giới hạn không viết lại cả chương) không dùng làm quy trình cho bản dịch mới hoặc khi người dùng yêu cầu dịch lại; ưu tiên sự tự nhiên theo ngữ cảnh và soát với bản Trung khi có, hoặc bản Việt nguồn khi chỉ có bản Việt.

Tài liệu cho agent biên tập. Số trong ngoặc là số lần xuất hiện đo bằng script: **Đ** = ch.1–200 (~2,6 triệu ký tự), **M** = ch.581–600 chưa sửa (~850 nghìn ký tự). Các quy tắc sửa được bằng máy nằm trong `scripts/style-lint.mjs`; khi đổi bảng ở đây phải đổi cả script.

## 1. Thứ tự ưu tiên khi các nguồn mâu thuẫn

1. Ý kiến trực tiếp của chủ dự án.
2. Cách dùng ổn định ở ch.1–200.
3. Thói quen chung của truyện tiên hiệp, chỉ khi hai nguồn trên không nói gì.

**Ch.1–200 không phải là mẫu Hán-Việt.** Đoạn đầu truyện dùng nhiều từ thuần Việt: rừng trúc (44) so với trúc lâm (0), thuyền nhỏ (21) so với tiểu thuyền (0), ông lão (436) so với lão nhân (290), người đàn ông (381) so với nam tử (63). Ch.1–200 cũng còn "tôi" (505), "ông ta" (457), "cô ấy" (61). Vì vậy bản này học từ ch.1–200 về trật tự từ, độ dài đoạn và từ ít hiện đại, còn mức Hán-Việt lấy theo ý chủ dự án.

## 2. Trật tự từ (lỗi kiểu convert)

Tiếng Việt đặt danh từ chính trước, định ngữ sau.

| Sai (giữ thứ tự tiếng Trung) | Đúng | Căn cứ |
|---|---|---|
| thần tiên tiền, tuyết hoa tiền, tiểu thử tiền, cốc vũ tiền | tiền thần tiên, tiền tuyết hoa, tiền tiểu thử, tiền cốc vũ | Chủ dự án; Đ: "đồng tiền kim tinh" (18) |
| Xuân Lộ phố, Phúc Lộc phố, lão hòe phố | phố Xuân Lộ, phố Phúc Lộc, phố Lão Hòe | Đ: phố + tên 22, tên + phố 6 |
| Nê Bình ngõ | ngõ Nê Bình | Đ: 254 so với 1 |
| Ngọc Oánh sườn dốc | sườn dốc Ngọc Oánh | Quy tắc chung |
| Đạo gia nhất mạch | một mạch của Đạo gia | Quy tắc chung, sửa tay |

Lưu ý khi thay:
- "thần tiên tiền bối" là **vị tiền bối**, không đảo.
- Tên + hậu tố Hán-Việt **được giữ**: Chính Dương sơn, Kim Lân cung, Chân Cảnh tông, Ngũ Lăng quốc, Bảo Bình châu, Kinh Trập phủ, Thư Giản hồ. Chỉ đảo khi danh từ là thuần Việt.
- Không đảo ngược thành convert: viết "thiếu nữ thanh y", không viết "thanh y thiếu nữ".

## 3. Hán-Việt hóa

Do chủ dự án yêu cầu. Các cặp này **khác ch.1–200**, nên đừng dùng ch.1–200 để cãi lại.

| Thay | Bằng | Đ (cũ / mới) |
|---|---|---|
| rừng trúc | trúc lâm | 44 / 0 |
| thuyền nhỏ | tiểu thuyền | 21 / 0 |
| cưỡi gió, ngự gió | ngự phong | 6 / 4 |
| gió mát, gió nhẹ, gió lạnh | thanh phong, vi phong, hàn phong | 16 / — |
| gió xuân, gió thu, gió tuyết | xuân phong, thu phong, phong tuyết | — |
| áo trắng, áo xanh, áo đen | bạch y, thanh y, hắc y | 62 / 0 (áo trắng) |
| cửa núi | sơn môn | 0 / 19 |
| núi sông | sơn hà | 98 / — |
| ông lão | lão nhân | 436 / 290 |
| người đàn ông | nam tử | 381 / 63 |
| người phụ nữ, người nữ tử | nữ tử | 21 / — |

**"gió" đứng một mình giữ nguyên**: "gió thổi", "một trận gió", không viết "phong thổi". Chỉ đổi khi là cụm cố định như trên. Áp dụng tương tự cho mưa, núi, sông, rượu.

## 4. Từ hiện đại cần tránh

Các từ này gần như không có ở ch.1–200, là dấu hiệu rõ nhất của bản dịch máy đoạn sau.

| Thay | Bằng | Đ / M của từ cũ |
|---|---|---|
| điều đó, điều này | chuyện đó, chuyện này | 30 / 191 |
| thực sự | thật sự | 23 / 112 |
| tâm trạng | tâm tình | 1 / 34 |
| giờ đây | bây giờ | 0 / 15 |
| như thể | tựa như | 1 / 13 |
| mối quan hệ | quan hệ | 1 / 25 |
| thông tin | tin tức | 0 / 14 |
| bạn bè | bằng hữu | 8 / 19 |
| người tu đạo | tu sĩ | 3 / 63 |
| vũ phu | võ phu | 2 / 47 |
| kỵ sĩ | kỵ binh | 1 / 22 |
| khách sạn | khách điếm | 1 / 24 |
| nhẹ gật đầu | khẽ gật đầu | 0 / 18 |
| mũ có vải che mặt | mũ che mặt | 0 / 18 |

Sửa tay theo ngữ cảnh, không thay máy: những điều (3 / 56), tổ chức (0 / 13), cuộc chiến (0 / 14), trinh sát (2 / 21), mặt nạ (0 / 12), trên thực tế (30 / 22), "cười và…" (0 / 12), "và nói" (0 / 25), "một trong những" , "là những người".

## 5. Xưng hô

| Bản dịch máy | Thay bằng | Cách sửa |
|---|---|---|
| anh ta, anh ấy | hắn | máy |
| cô ấy | nàng | máy |
| chàng trai / cô gái | thiếu niên / thiếu nữ | máy |
| em trai / em gái | đệ đệ / muội muội | máy |
| anh trai / chị gái | ca ca / tỷ tỷ | máy |
| "anh", "cô" đơn lẻ chỉ người | hắn, nàng hoặc tên nhân vật | tay |
| tôi, mình (tự xưng trong lời thoại) | ta, tại hạ, vãn bối tùy vai vế | tay |
| bạn, cậu | ngươi, công tử, tiền bối, đạo hữu tùy vai vế | tay |
| ông ta, ông ấy | hắn, lão, hoặc tên nhân vật | tay |

Không đụng: cô nương, anh hùng, huynh đệ, "mình" nghĩa phản thân ("của mình", "thân mình"). Giữ giọng thân mật cho dân thường vùng quê nếu ngữ cảnh rõ.

## 6. Giữ nguyên (ch.1–200 dùng ổn định)

trấn nhỏ (832), thiếu niên, thiếu nữ, cô nương, tiên sinh, sư phụ, phi kiếm, kiếm khí, luyện khí sĩ, tu sĩ, người đọc sách, đạo nhân, thư sinh, hán tử, bọn họ, cho nên, đột nhiên, nhẹ giọng, gật đầu, sắc mặt, ngọn núi, tâm tình. Đừng Hán-Việt hóa quá tay kiểu "tiểu trấn", "đầu lĩnh", "phong thổi".

Ch.1–200 cũng ưu tiên các từ này, đoạn sau hay thiếu: "chuyện này" (293 so với 15), "giống như" (1088 so với 95), "đưa tay", "xoay người", "ngẩng đầu".

## 7. Câu và đoạn

1. Đoạn trung bình khoảng 33 từ (Đ) so với 46 từ (đoạn sau). Tách đoạn dài hơn 60 từ ở chỗ đổi ý hoặc đổi người nói.
2. Giảm "những" (Đ 35, M 94 trên 100 nghìn ký tự) và "đã" (Đ 103, M 146). Bỏ khi không đổi nghĩa.
3. Lời thoại đặt trong ngoặc kép, không dùng gạch đầu dòng kiểu cũ, để nhất quán với 578+.
4. Không thêm tình tiết, không bỏ ý. Chỗ vô nghĩa thì đoán theo ngữ cảnh và đánh dấu `[?]`.
5. Khôi phục chữ bị che của nguồn khi chắc nghĩa ("k*ch th*ch" thành "kích thích"); không chắc thì đánh dấu `[?]`.

## 8. Quy trình cho một đợt chương

1. `node scripts/style-lint.mjs <từ> <đến> --fix` để áp mục 2–5 phần máy làm được. Không tốn token.
2. `node scripts/style-lint.mjs <từ> <đến> --show` để in các đoạn còn lỗi.
3. Chỉ biên tập tay các đoạn đó, sửa bằng Edit theo từng đoạn. **Không viết lại cả chương.**
4. Nếu đổi tiêu đề chương thì chạy `node scripts/build-index.mjs kiem-lai`.

Khi chủ dự án báo lỗi mới: thêm vào bảng phù hợp ở trên và vào script, rồi chạy lại. Script an toàn khi chạy nhiều lần.

## 9. Việc script không làm được

Script chỉ bắt lỗi từ vựng, trật tự từ và xưng hô đã biết. Nó **không** phát hiện câu sai nghĩa, câu đảo lộn ý, hay nhân vật bị nhầm vai. Muốn sửa chắc phần đó cần bản tiếng Trung để đối chiếu.

## 10. Chờ chủ dự án quyết

- "gậy leo núi" (M 36): có thể đổi thành "hành sơn trượng". Tôi nhớ nguyên văn là 行山杖 nhưng chưa đối chiếu được.
- "Tùy Cảnh Rừng": "Rừng" có vẻ là chữ bị dịch nghĩa, có thể là "Cảnh Trừng". Chưa kiểm chứng.
- Tên quốc gia: ch.1–200 viết "nước Hoàng Đình", đoạn sau viết "Ngũ Lăng quốc". Tạm giữ theo từng chương vì mục 3 ưu tiên Hán-Việt.

## 11. Tên riêng chuẩn (từ ch.1–200)

Nhân vật: Trần Bình An (3072), Tống Tập Tân (565), Lý Hòe (471), Lưu Tiện Dương (448), Tề Tĩnh Xuân (443), Lý Bảo Bình (437), Lâm Thủ Nhất (401), Ninh Diêu (380), Chu Hà (275), Nê Bình (254), Nguyễn Cung (253), Thôi Sàm (244), Thôi Đông Sơn (243), Tống Trường Kính (227), Phù Nam Hoa (214), Lưu Bá Kiều (192), Chu Lộc (187), Trĩ Khuê (177), Nguyễn Tú (173), Ngô Diên (167), Mã Khổ Huyền (152), Thái Kim Giản (142), Trần Tùng Phong (141), Cố Sán (116), Hàn Thực (95), Ngụy Bách (92), Trần Đối (86), Vu Lộc (82), Hồng Chúc (80), Triệu Diêu (77), Thôi Minh Hoàng (77), Tạ Tạ (73), Lô Chính Thuần (63), Ngụy Tấn (55), Lý Nhị (51), Trịnh Đại Phong (41), Thạch Xuân Gia (40).

Địa danh / thế lực: Đại Ly (825), Chính Dương (175), Đông Bảo Bình Châu (150), Sơn Nhai (98), Kỳ Đôn (95), Ly Châu (91), Đại Tùy (87), Phúc Lộc (86), Phong Tuyết (75), Phong Lôi (73), Bàn Sơn (71), Long Tuyền (64), Vân Hà (62), Chân Vũ (62), Hoàng Đình (58), Hạnh Hoa (50).

Giới tính chủ dự án đã xác nhận: Liễu Chất Thanh là **nam**, luôn dùng "hắn", dù bản dịch máy có chỗ viết "nàng".

Tên chỉ có ở ch.578+ (chưa xác minh): Hồ Tân Phong, Tào Phú, Tùy Cảnh Rừng, Liễu Chất Thanh, Dương Nguyên, Đại Triện, Kim Phi, Tùy Tân Vũ, Kim Lân, Lâm Thù, Ngũ Lăng, Đỗ Huỳnh, Tiêu Thúc Dạ, Tranh Vanh, Trịnh Thủy Châu, Ngọc Oánh, Xuân Lộ, Lan Phòng, Bắc Câu Lô Châu, Trà Mã, Vương Độn, Phó Trăn, Kê Nhạc, Thanh Từ, Tùy Văn Pháp, Tống Lan Tiều, Hoành Độ.
