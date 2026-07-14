/* File này được tạo từ trang Quản lý (admin.html) ngày 14:08:34 14/7/2026 */

const CAU_HINH = {
  tenCuaHang: "Cửa Hàng Ngọc Anh",
  khauHieu: "Chất lượng thật – Giá thật",
  soDienThoai: "Lào 020 9226 7779 – Việt 0972 080 487",
  diaChi: "Địa chỉ cửa hàng của bạn",
  tyGiaLAK: 0.85,
  soZaloNhanDon: "0972080487"
};

const DANH_MUC = [
  { id: "thuc-pham", ten: "Thực phẩm", icon: "🍚" },
  { id: "do-uong", ten: "Đồ uống", icon: "🧃" },
  { id: "gia-dung", ten: "Đồ gia dụng", icon: "🏠" },
  { id: "cham-soc", ten: "Chăm sóc cá nhân", icon: "🧴" },
  { id: "tai-lieu", ten: "Tài liệu", icon: "📄" },
  { id: "prompt-ai", ten: "Prompt AI", icon: "🤖" }
];

const SAN_PHAM = [
  {
    id: 13,
    ten: "Câu lệnh AI: Poster điện ảnh KOL – Chợ Bến Thành",
    danhMuc: "prompt-ai",
    gia: 5882,
    icon: "🎬",
    anh: "poster-luna-tran.jpg",
    moTa: "Câu lệnh (prompt) tạo poster điện ảnh cao cấp phong cách Netflix: nhân vật KOL giữa Chợ Bến Thành, ánh nắng hoàng hôn, bố cục 2 lớp như poster phim, phong cách quiet luxury. Dài hơn 2.000 ký tự, chi tiết từng lớp ánh sáng, màu sắc, bố cục và chữ trên poster — chỉ cần dán vào công cụ AI tạo ảnh là ra kết quả như ảnh mẫu. 📩 Sau khi thanh toán, câu lệnh đầy đủ được gửi qua Zalo trong ngày."
  },
  {
    id: 14,
    ten: "Tài liệu kiến thức Toán tiểu học",
    danhMuc: "tai-lieu",
    gia: 10000,
    icon: "📦",
    anh: "Tai-lieu-Toan-lop-4.jpg",
    moTa: "Đầy đủ kiến thức Toán chuyên sâu từng dạng Toán lớp 4, có đầy đủ kiến thức cốt lõi chuyên sâu dành cho học sinh yếu kém và mất gốc, cách ghi nhớ, và mẹo tính nhanh cho học sinh khá giõi,và rất nhiều bài tập tự luyện dành cho các phân bậc học lực từ yếu đến giõi"
  }
];
