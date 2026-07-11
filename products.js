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
    id: 13,
    ten: "Câu lệnh AI: Poster điện ảnh KOL – Chợ Bến Thành",
    danhMuc: "prompt-ai",
    gia: 5882,
    icon: "🎬",
    anh: "poster-luna-tran.jpg",
    moTa: "Câu lệnh (prompt) tạo poster điện ảnh cao cấp phong cách Netflix: nhân vật KOL giữa Chợ Bến Thành, ánh nắng hoàng hôn, bố cục 2 lớp như poster phim, phong cách quiet luxury. Dài hơn 2.000 ký tự, chi tiết từng lớp ánh sáng, màu sắc, bố cục và chữ trên poster — chỉ cần dán vào công cụ AI tạo ảnh là ra kết quả như ảnh mẫu. 📩 Sau khi thanh toán, câu lệnh đầy đủ được gửi qua Zalo trong ngày."
  }
];
