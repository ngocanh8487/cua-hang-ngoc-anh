/* ============================================================
   FILE DỮ LIỆU CỬA HÀNG — ĐÂY LÀ FILE BẠN SẼ SỬA NHIỀU NHẤT
   Mở bằng Notepad, sửa xong bấm Lưu (Ctrl+S), tải lại trang web là thấy.
   ============================================================ */

/* ---------- 1. CẤU HÌNH CHUNG (sửa tên shop, tỷ giá ở đây) ---------- */
const CAU_HINH = {
  tenCuaHang: "Cửa Hàng Ngọc Anh",        // ← Đổi tên cửa hàng tại đây
  khauHieu: "Chất lượng thật – Giá thật",  // ← Câu khẩu hiệu trên banner
  soDienThoai: "Lào 020 9226 7779 – Việt 0972 080 487", // ← SĐT hiển thị cuối trang
  diaChi: "Địa chỉ cửa hàng của bạn",      // ← Địa chỉ hiển thị cuối trang
  tyGiaLAK: 0.85,                           // ← 1 VND = 0.85 LAK (sửa tỷ giá tại đây)
  soZaloNhanDon: "0972080487"               // ← Số Zalo NHẬN ĐƠN HÀNG (chỉ số, không cách)
};

/* ---------- 2. DANH MỤC SẢN PHẨM ----------
   Mỗi dòng là 1 danh mục. Muốn thêm danh mục: chép 1 dòng, sửa lại.
   "id" viết thường, không dấu, nối bằng dấu gạch (-). */
const DANH_MUC = [
  { id: "thuc-pham",  ten: "Thực phẩm",         icon: "🍚" },
  { id: "do-uong",    ten: "Đồ uống",            icon: "🧃" },
  { id: "gia-dung",   ten: "Đồ gia dụng",        icon: "🏠" },
  { id: "cham-soc",   ten: "Chăm sóc cá nhân",   icon: "🧴" },
  { id: "tai-lieu",   ten: "Tài liệu",            icon: "📄" },
  { id: "prompt-ai",  ten: "Prompt AI",           icon: "🤖" }
];

/* ---------- 3. DANH SÁCH SẢN PHẨM ----------
   Mỗi khối { ... } là 1 sản phẩm. Giá tính bằng VND.
   - "anh": để "" thì hiện biểu tượng (icon); có ảnh thật thì ghi
     tên file, ví dụ: "gao.jpg"
   - Muốn THÊM sản phẩm: chép nguyên 1 khối { ... }, sửa id (không trùng),
     tên, giá. Nhớ dấu phẩy giữa các khối.
   - Muốn XÓA: xóa nguyên khối { ... } đó (cả dấu phẩy sau nó). */
const SAN_PHAM = [
  {
    id: 1,
    ten: "Gạo thơm Lài 5kg",
    danhMuc: "thuc-pham",
    gia: 95000,
    icon: "🌾",
    anh: "",
    moTa: "Gạo thơm Lài dẻo mềm, thơm tự nhiên, túi 5kg. Phù hợp bữa cơm gia đình hàng ngày."
  },
  {
    id: 2,
    ten: "Mì gói thùng 30 gói",
    danhMuc: "thuc-pham",
    gia: 105000,
    icon: "🍜",
    anh: "",
    moTa: "Thùng 30 gói mì ăn liền vị bò/gà. Tiện lợi, để được lâu."
  },
  {
    id: 3,
    ten: "Nước mắm cá cơm 500ml",
    danhMuc: "thuc-pham",
    gia: 45000,
    icon: "🐟",
    anh: "",
    moTa: "Nước mắm nguyên chất từ cá cơm, độ đạm cao, chai 500ml."
  },
  {
    id: 4,
    ten: "Nước suối thùng 24 chai",
    danhMuc: "do-uong",
    gia: 85000,
    icon: "💧",
    anh: "",
    moTa: "Thùng 24 chai nước suối 500ml, tinh khiết, tiện mang theo."
  },
  {
    id: 5,
    ten: "Cà phê rang xay 500g",
    danhMuc: "do-uong",
    gia: 120000,
    icon: "☕",
    anh: "",
    moTa: "Cà phê rang xay nguyên chất 100%, gói 500g, thơm đậm đà."
  },
  {
    id: 6,
    ten: "Trà xanh hộp 25 túi lọc",
    danhMuc: "do-uong",
    gia: 35000,
    icon: "🍵",
    anh: "",
    moTa: "Trà xanh túi lọc, hộp 25 túi, vị thanh mát dễ uống."
  },
  {
    id: 7,
    ten: "Bộ nồi inox 3 món",
    danhMuc: "gia-dung",
    gia: 450000,
    icon: "🍲",
    anh: "",
    moTa: "Bộ 3 nồi inox cao cấp đáy từ, dùng được mọi loại bếp."
  },
  {
    id: 8,
    ten: "Chảo chống dính 26cm",
    danhMuc: "gia-dung",
    gia: 180000,
    icon: "🍳",
    anh: "",
    moTa: "Chảo chống dính 26cm, lớp phủ an toàn, chiên xào không sát."
  },
  {
    id: 9,
    ten: "Bột giặt túi 3kg",
    danhMuc: "gia-dung",
    gia: 98000,
    icon: "🧺",
    anh: "",
    moTa: "Bột giặt sạch sâu, thơm lâu, túi lớn 3kg tiết kiệm."
  },
  {
    id: 10,
    ten: "Dầu gội thảo dược 650ml",
    danhMuc: "cham-soc",
    gia: 89000,
    icon: "🧴",
    anh: "",
    moTa: "Dầu gội chiết xuất thảo dược, dịu nhẹ, chai 650ml."
  },
  {
    id: 11,
    ten: "Kem đánh răng hộp 2 tuýp",
    danhMuc: "cham-soc",
    gia: 52000,
    icon: "🪥",
    anh: "",
    moTa: "Combo 2 tuýp kem đánh răng ngừa sâu răng, hơi thở thơm mát."
  },
  {
    id: 12,
    ten: "Khăn tắm cotton cao cấp",
    danhMuc: "cham-soc",
    gia: 75000,
    icon: "🛁",
    anh: "",
    moTa: "Khăn tắm 100% cotton mềm mịn, thấm hút tốt, kích thước lớn."
  },
  {
    id: 13,
    ten: "Câu lệnh AI: Poster điện ảnh KOL – Chợ Bến Thành",
    danhMuc: "prompt-ai",
    gia: 5882,
    icon: "🎬",
    anh: "poster-luna-tran.jpg",
    moTa: "Câu lệnh (prompt) tạo poster điện ảnh cao cấp phong cách Netflix: nhân vật KOL giữa Chợ Bến Thành, ánh nắng hoàng hôn, bố cục 2 lớp như poster phim, phong cách quiet luxury. Dài hơn 2.000 ký tự, chi tiết từng lớp ánh sáng, màu sắc, bố cục và chữ trên poster — chỉ cần dán vào công cụ AI tạo ảnh là ra kết quả như ảnh mẫu. 📩 Sau khi thanh toán, câu lệnh đầy đủ được gửi qua Zalo trong ngày."
  }
];
