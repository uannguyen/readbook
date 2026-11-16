# Hồ sơ văn phong dịch Kiếm Lai

## Mục đích và nguồn tham chiếu

Dùng khi dịch, dịch lại hoặc biên tập từ bản Trung hay bản Việt có sẵn, do người dùng cung cấp hoặc trong repository. Có thể viết lại bản Việt chưa ưng ý mà không cần bản Trung. Người dùng yêu cầu ngày 2026-11-07: lấy văn phong 300 chương đầu trong `web/chapters/kiem-lai/` làm gốc cho các chương dịch sau. Bản thử hiện tại: `translations/kiem-lai/chuong-1.md`; bản dịch đầu: `translations/kiem-lai/chuong-1-v1.md`; bản theo hồ sơ 200 chương: `translations/kiem-lai/chuong-1-v2-200-chuong.md`. Yêu cầu hiện tại thay thế phạm vi 200 chương trước đó.

Đây là hướng dẫn tham chiếu trong repository, không phải huấn luyện lại mô hình. Mỗi lần dịch cần đọc lại hồ sơ này cùng các mẫu phù hợp. Chỉ coi bản thử là bản đã được duyệt sau khi người dùng xác nhận.

Đọc kèm [style guide hiện có](./style-guide-kiem-lai.md), nhất là tên riêng, xưng hô và các lựa chọn Hán Việt đã được người dùng yêu cầu. Thứ tự ưu tiên: yêu cầu hiện tại của người dùng; nghĩa của bản Trung khi có, hoặc nội dung bản Việt nguồn khi chỉ có bản Việt; quy ước dự án; đặc điểm văn phong rút từ chương mẫu. Không lấy một câu sai trong bản Việt để sửa nghĩa bản Trung cho giống nó. Khi thiếu bản Trung, không coi nội dung bản Việt là đã được xác minh với nguyên tác.

## Căn cứ khảo sát

Đã thống kê đủ 300 file: khoảng 4,88 triệu ký tự, 32.094 đoạn không phải tiêu đề. Độ dài đoạn trung bình 33,7 đơn vị cách trắng, trung vị 21; không dùng số này làm chỉ tiêu chia đoạn.

Đọc [phân tích chi tiết chương 1–300](./style-analysis-kiem-lai-1-300.md) để xem phạm vi đọc kỹ, số liệu theo từng nhóm 100 chương và căn cứ về mạch kể, nhịp câu, đối thoại, cảm xúc. Đã thống kê toàn bộ và đọc kỹ các cửa sổ mẫu, không phải đọc sát từng câu của cả 300 chương.

Cách diễn đạt thay đổi rõ giữa các nhóm, đặc biệt ở lão nhân/ông lão và cách trình bày lời thoại. Lấy ưu điểm chung về mạch kể và cú pháp Việt, ưu tiên độ tự nhiên, trôi chảy theo yêu cầu mới. Không sao chép những câu sai nghĩa, từ đảo hoặc lỗi nguồn.

Tập mẫu có nhiều cách xưng hô và hai kiểu trình bày lời thoại, không phải một bản dịch hoàn toàn đồng nhất. Quy ước Hán Việt của dự án vẫn có hiệu lực: chẳng hạn dùng lão nhân, nam tử/hán tử theo ngữ cảnh, không đổi về ông lão/người đàn ông chỉ vì tần suất cao hơn. Dùng ngoặc kép cho lời thoại theo quy ước hiện tại.

## Giọng kể cần giữ

- Kể bình thản, mộc mạc; để cảnh vật, hành động và lời nói bộc lộ cảm xúc. Giữ phần bình luận, suy nghĩ khi nguyên tác có; không tự thêm thương cảm, hào hùng hoặc giải thích động cơ.
- Dùng tiếng Việt đúng trật tự: chủ thể rồi hành động; địa danh như ngõ Nê Bình, ngõ Kỵ Long. Giữ tên Hán Việt và thuật ngữ cần thiết, nhưng không biến cả câu thành lời convert.
- Xen câu vừa với câu ngắn. Những câu như một cái gật đầu, một lần im lặng, một ý nghĩ bật ra có thể đứng riêng. Không ghép chúng vào đoạn giải thích dài.
- Đoạn kể dài được tách khi chuyển thời điểm, chuyển ý hoặc chuyển người hành động. Không chia đều theo số từ; lời thoại dài và một chuỗi hành động liền mạch có thể dài hơn mức trung bình. Không tách mỗi động tác thành một đoạn hoặc cô lập câu ngắn chỉ để tạo vẻ sâu sắc.
- Ưu tiên những động tác rõ: đưa tay, ngẩng đầu, xoay người, lắc đầu, khẽ nhíu mày, chậm rãi đứng dậy. Chỉ dùng khi bản gốc có hành động tương ứng.
- Dùng tự nhiên những từ quen thuộc: trấn nhỏ, thiếu niên, thiếu nữ, hán tử, sư phụ, đột nhiên, nhẹ giọng, giống như, thật sự. Không cố nhét từ để đạt tần suất.
- Cho phép nhắc lại tên nhân vật và từ khóa để giữ nhịp, làm rõ chủ thể; không đổi sang một danh xưng cầu kỳ chỉ để tránh lặp.
- Giữ sắc thái của người nói: Bình An ít lời, chân chất; Tập Tân cợt nhả, khinh bạc trong cảnh chương 1; thiếu niên cẩm y thản nhiên. Không dùng các mô tả này để suy diễn tâm tính ở mọi cảnh về sau.

## Làm cho lời văn tự nhiên và liền mạch

1. **Rõ ý trước, chọn chữ sau.** Xác định chủ thể, hành động, đối tượng và quan hệ thời gian/nhân quả. Với câu nguồn nhiều vế, sắp lại thành câu Việt nhưng giữ đủ ý, đúng quan hệ và mức độ chắc chắn.
2. **Nối câu bằng điểm tựa có sẵn.** Câu tiếp theo bám vào người, đồ vật, vị trí hoặc việc đang diễn ra. Không chêm hành động ngoài nguyên tác để nối. Không cần thêm “sau đó”, “cho nên”, “lúc này” nếu thứ tự đã rõ; giữ khi nó mang nghĩa quan trọng.
3. **Ngắt theo hơi kể.** Đọc liền hai đoạn kề nhau để xét câu có bị cụt hoặc lặp mở đầu không. Gộp những câu vụn cùng ý; tách câu phải đọc lại mới biết ai đang làm gì. Không áp giới hạn 60 từ cứng nhắc.
4. **Giảm lớp danh từ trừu tượng.** Ưu tiên người làm việc gì thay cho “việc… của…”, “cảnh tượng…”, “sự…”, khi không mất ý. Lược chủ ngữ trùng lúc rõ người; nhắc tên khi cần phân biệt nhiều nam/nữ trong cùng cảnh.
5. **Thoại phải nói được thành lời.** Đọc câu hỏi cùng câu đáp; xác định thái độ và vai vế. Giữ giọng thân tình, ngập ngừng, cợt nhả hoặc trang trọng theo cảnh, không mặc định mọi nhân vật đều dùng một giọng cổ phong. Quan hệ cha/mẹ/con, ông/cháu cần giữ tự nhiên.
6. **Hán Việt có chọn lọc.** Giữ các lựa chọn dự án đã chốt, nhưng diễn đạt phần còn lại bằng cú pháp Việt rõ nghĩa. Không mở rộng bảng thay từ sang những tổ hợp gượng; khi một quy tắc cũ khiến câu tối nghĩa, ghi lại để chỉnh trong ngữ cảnh thay vì áp máy.
7. **Giữ điểm rơi.** Nếu câu đáp ngắn hoặc một hành động đã kết thúc cảnh đủ sức gợi, không thêm lời giảng giải. Lối chơi chữ không chuyển được thì ghi chú riêng, không buộc câu kể gánh cả lời giải thích.

## Giữ nghĩa khi chuyển văn phong

- Khi có bản Trung, dịch trực tiếp và đối chiếu với bản Trung; bản Việt mẫu chỉ hướng dẫn cách diễn đạt. Khi chỉ có bản Việt cần dịch lại, dùng bản đó làm nguồn nội dung, viết lại câu và đoạn theo hồ sơ cùng style guide, không chỉ thay vài từ máy móc. Giữ đủ tình tiết và ý nghĩa của nguồn; chỗ chưa rõ thì đánh dấu `[?]`, không tự suy đoán nguyên tác.
- Đối chiếu đủ từng đoạn nguồn, nhất là phủ định, số tiền, vai vế, tuổi, thứ tự hành động và ý còn bỏ lửng. Không biết tên thì tra trong các chương hiện có; chưa xác minh được thì đánh dấu `[?]`, không đoán thành một cái tên mới.
- Thành ngữ có thể diễn đạt bằng tiếng Việt tương đương. Giữ hình ảnh khi nó liên quan đến tình tiết, thế giới truyện hoặc lối chơi chữ.
- Ví dụ cần tránh từ bản chương 1 cũ: 银子 là bạc tiền, không phải tóc bạc; 拉坯 là chuốt phôi, không mặc định là làm chén; 无从下手 trong câu phá gia chi tử là chẳng có gì để phá, không phải không muốn ở căn nhà đó.
- Với câu cuối chương 1, giữ nhịp lẩm nhẩm và các chữ bình/an, nhưng ghi chú riêng rằng 碎碎 và 岁岁 đồng âm. Không khẳng định tiếng Việt tái tạo được đầy đủ phép chơi chữ.
- Ghi chú dịch thuật đặt cuối chương, không chen vào lời kể. Không thêm cảnh, nâng giọng văn hay giải thích điều tác giả đang cố ý giấu.

## Góp ý về từ khó — áp dụng khi dịch

Người dùng chỉ ra các cụm “chuốt phôi”, “núi khe”, “nếm đủ các loại đất chung quanh”, “tu hành ở mỗi người” vẫn tối nghĩa. Ưu tiên cách diễn đạt hiểu được ngay trong cảnh; đây là yêu cầu mới bổ sung cho mức Hán Việt đã chọn, không phải yêu cầu thay toàn bộ từ Hán Việt.

| Cụm cần xem lại | Cách xử lý theo ngữ cảnh chương 1 |
|---|---|
| Chuốt phôi / 拉坯 | Lần đầu: “nặn đất tạo hình đồ gốm trên bàn xoay”; sau đó dùng “nặn gốm”. Thuật ngữ chuyên môn có thể ghi chú cuối, không bắt người đọc tra chú giải mới hiểu hành động. Không thu hẹp thành làm chén vì nguồn không chỉ định loại đồ gốm. |
| Núi khe / 山山水水 | “Vùng núi non, sông suối”; không tạo tổ hợp lạ chỉ để rút gọn. |
| Nếm đủ các loại đất / 尝遍…土壤的滋味 | Giữ hành động nếm thật: “nếm thử hết loại đất này đến loại đất khác”. Có thể chú thích liên hệ với nghề gốm, đánh dấu rõ đó là cách hiểu từ ngữ cảnh. Không đổi thành xem đất, không tự thêm phương pháp chọn đất vào lời kể. |
| Sư phụ dẫn vào cửa, tu hành ở mỗi người / 师父领进门，修行在个人 | Trong cảnh học nghề: “Sư phụ chỉ dẫn bước đầu, còn học được đến đâu phải tùy mỗi người”. Chỉ dùng cách nói tu hành nếu đúng ngữ cảnh tu luyện. |
| Nhắm mắt / 闭眼了 | Ở đoạn lão Diêu: chết, không phải ngủ. Có thể nói rõ “đã qua đời” để không mơ hồ. |
| 翻了个白眼 | Đảo mắt tỏ vẻ xem thường, khác với trợn mắt vì kinh ngạc/giận dữ. |

Khi nhận xét hai bản, đối chiếu cả nguyên tác và ranh giới chương. Chương 1 bản Trung ở `raw/kiem-lai/chuong-1.md` tương ứng chương web 1 và phần đầu chương web 2, đến lời lẩm nhẩm bình an. Không suy ra chương web 1 bị mất phần còn lại hoặc bản dịch mới tự thêm tình tiết chỉ vì số file khác nhau.

## Quy trình cho chương tiếp theo

1. Đọc bản nguồn cần dịch hoặc viết lại (Trung hay Việt), hồ sơ này và style guide. Nếu có cả hai bản, dùng bản Trung để đối chiếu nghĩa. Chọn vài đoạn mẫu cùng loại cảnh từ 300 chương đầu để đối chiếu giọng kể.
2. Dịch đúng nghĩa trước, sau đó đọc lại bằng tiếng Việt để chỉnh nhịp câu, lời thoại và trật tự từ. Không chạy thay thế máy hàng loạt để quyết định văn phong.
3. Soát lại từ đầu đến cuối với bản Trung khi có, hoặc bản Việt nguồn nếu không có bản Trung; kiểm tra tên, xưng hô, con số và đủ tình tiết. Sau đó đọc riêng toàn bản Việt như một người đọc truyện: kiểm tra đầu/cuối đoạn, chủ thể, lời thoại, liên kết ý, độ lặp và nhịp. Cuối cùng đối chiếu lại các câu vừa chỉnh với nguồn để tránh sửa mượt nhưng sai nghĩa.
4. Mặc định lưu bản thử ở `translations/kiem-lai/chuong-N.md`; chỉ thay bản trong `web/chapters/kiem-lai/` khi người dùng yêu cầu. Nếu đổi tiêu đề bản phục vụ reader thì sinh lại index theo `CLAUDE.md`.
5. Ghi lại góp ý cụ thể của người dùng tại mục dưới để áp dụng về sau. Không coi sự im lặng là duyệt bản thử.

## Góp ý đã nhận

- 2026-11-07: người dùng khá ưng bản dịch đầu chương 1, muốn thử lại theo văn phong 200 chương đầu và dùng nguồn này làm gốc cho các chương sau. Bản chỉnh theo hồ sơ đang chờ nhận xét.

- 2026-11-07, yêu cầu mới nhất: mở rộng nguồn mẫu thành 300 chương đầu; phân tích sâu để lời văn tự nhiên và trôi chảy hơn. Ưu tiên mạch kể, nhịp câu và giọng thoại; không chỉ tăng số chương thống kê. Bản thử theo hồ sơ mới chưa được người dùng duyệt.

- 2026-11-07: áp dụng hồ sơ văn phong và style guide cho cả bản Trung lẫn bản Việt có sẵn, kể cả khi người dùng yêu cầu dịch lại bản Việt chưa ưng ý mà không cung cấp bản Trung.
