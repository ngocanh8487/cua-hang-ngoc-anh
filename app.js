/* ============================================================
   app.js — BỘ NÃO CỦA WEBSITE (không cần sửa file này)
   Phiên bản Giai đoạn 4: trang chủ + chi tiết SP + GIỎ HÀNG THẬT.
   Giỏ hàng lưu trong bộ nhớ trình duyệt (localStorage) —
   tải lại trang hoặc tắt máy mở lại vẫn còn.
   ============================================================ */

/* ---------- Định dạng giá tiền ---------- */
function dinhDangVND(so) {
  return so.toLocaleString("vi-VN") + " ₫";
}
function dinhDangLAK(soVND) {
  const lak = Math.round(soVND * CAU_HINH.tyGiaLAK);
  return lak.toLocaleString("vi-VN") + " ₭";
}

/* ---------- Trạng thái lọc hiện tại ---------- */
let danhMucDangChon = "tat-ca";
let tuKhoaTimKiem = "";
let khoangGiaDangChon = "tat-ca";

/* Các khoảng giá của bộ lọc */
const KHOANG_GIA = [
  { id: "tat-ca",   ten: "Mọi mức giá",         tu: 0,      den: Infinity },
  { id: "duoi-50",  ten: "Dưới 50.000 ₫",       tu: 0,      den: 50000 },
  { id: "50-100",   ten: "50.000 – 100.000 ₫",  tu: 50000,  den: 100000 },
  { id: "100-200",  ten: "100.000 – 200.000 ₫", tu: 100000, den: 200000 },
  { id: "tren-200", ten: "Trên 200.000 ₫",      tu: 200000, den: Infinity }
];

/* ============================================================
   GIỎ HÀNG — lưu dạng [{id: 1, soLuong: 2}, ...]
   ============================================================ */
function layGio() {
  try {
    return JSON.parse(localStorage.getItem("gioHang")) || [];
  } catch (e) {
    return [];
  }
}
function luuGio(gio) {
  localStorage.setItem("gioHang", JSON.stringify(gio));
  capNhatDemGio();
}
function themVaoGio(id, soLuong) {
  const gio = layGio();
  const dong = gio.find(function (d) { return d.id === id; });
  if (dong) {
    dong.soLuong += soLuong;
  } else {
    gio.push({ id: id, soLuong: soLuong });
  }
  luuGio(gio);
}
function doiSoLuong(id, thayDoi) {
  const gio = layGio();
  const dong = gio.find(function (d) { return d.id === id; });
  if (!dong) return;
  dong.soLuong += thayDoi;
  if (dong.soLuong < 1) dong.soLuong = 1;
  luuGio(gio);
}
function xoaKhoiGio(id) {
  const gio = layGio().filter(function (d) { return d.id !== id; });
  luuGio(gio);
}
function tongSoLuongGio() {
  return layGio().reduce(function (t, d) { return t + d.soLuong; }, 0);
}
function tongTienGio() {
  return layGio().reduce(function (t, d) {
    const sp = SAN_PHAM.find(function (s) { return s.id === d.id; });
    return sp ? t + sp.gia * d.soLuong : t;
  }, 0);
}
/* Cập nhật số đếm "Giỏ hàng (n)" trên menu mọi trang */
function capNhatDemGio() {
  document.querySelectorAll(".gio-hang").forEach(function (a) {
    a.textContent = "🛒 Giỏ hàng (" + tongSoLuongGio() + ")";
  });
}

/* ---------- Thông báo nhỏ khi thêm vào giỏ ---------- */
function thongBao(noiDung) {
  const cu = document.querySelector(".thong-bao-noi");
  if (cu) cu.remove();
  const o = document.createElement("div");
  o.className = "thong-bao-noi";
  o.textContent = noiDung;
  document.body.appendChild(o);
  setTimeout(function () { o.classList.add("hien"); }, 10);
  setTimeout(function () {
    o.classList.remove("hien");
    setTimeout(function () { o.remove(); }, 300);
  }, 2200);
}

/* ---------- Điền tên cửa hàng vào các vị trí chung ---------- */
function dienThongTinShop() {
  document.querySelectorAll("[data-ten-shop]").forEach(function (el) {
    el.textContent = CAU_HINH.tenCuaHang;
  });
  const khauHieu = document.getElementById("khau-hieu");
  if (khauHieu) khauHieu.textContent = CAU_HINH.khauHieu;
  const lienHe = document.getElementById("thong-tin-lien-he");
  if (lienHe) {
    lienHe.textContent = CAU_HINH.diaChi + " • ĐT: " + CAU_HINH.soDienThoai;
  }
}

/* ---------- Vẽ các nút danh mục ---------- */
function veDanhMuc() {
  const khung = document.getElementById("khung-danh-muc");
  if (!khung) return;
  let html =
    '<button class="nut-danh-muc active" data-dm="tat-ca">⭐ Tất cả</button>';
  DANH_MUC.forEach(function (dm) {
    html +=
      '<button class="nut-danh-muc" data-dm="' + dm.id + '">' +
      dm.icon + " " + dm.ten + "</button>";
  });
  khung.innerHTML = html;

  khung.querySelectorAll(".nut-danh-muc").forEach(function (nut) {
    nut.addEventListener("click", function () {
      khung.querySelectorAll(".nut-danh-muc").forEach(function (n) {
        n.classList.remove("active");
      });
      nut.classList.add("active");
      danhMucDangChon = nut.dataset.dm;
      veSanPham();
    });
  });
}

/* ---------- Vẽ ô chọn khoảng giá ---------- */
function veLocGia() {
  const o = document.getElementById("o-loc-gia");
  if (!o) return;
  let html = "";
  KHOANG_GIA.forEach(function (kg) {
    html += '<option value="' + kg.id + '">' + kg.ten + "</option>";
  });
  o.innerHTML = html;
  o.addEventListener("change", function () {
    khoangGiaDangChon = o.value;
    veSanPham();
  });
}

/* ---------- Tạo HTML cho 1 thẻ sản phẩm (dùng chung) ---------- */
function theSanPhamHTML(sp) {
  const anhHtml = sp.anh
    ? '<img src="' + sp.anh + '" alt="' + sp.ten + '">'
    : '<span class="icon-sp">' + sp.icon + "</span>";
  return (
    '<div class="the-san-pham">' +
    '  <a class="vung-bam" href="product.html?id=' + sp.id + '">' +
    '    <div class="anh-san-pham">' + anhHtml + "</div>" +
    '    <div class="noi-dung-the">' +
    '      <h3 class="ten-sp">' + sp.ten + "</h3>" +
    '      <p class="gia-vnd">' + dinhDangVND(sp.gia) + "</p>" +
    '      <p class="gia-lak">≈ ' + dinhDangLAK(sp.gia) + "</p>" +
    "    </div>" +
    "  </a>" +
    '  <div class="chan-the">' +
    '    <button class="nut-them-gio" data-id="' + sp.id + '">' +
    "      🛒 Thêm vào giỏ</button>" +
    "  </div>" +
    "</div>"
  );
}

/* ---------- Gắn nút "Thêm vào giỏ" (hoạt động thật) ---------- */
function ganNutThemGio(vung) {
  vung.querySelectorAll(".nut-them-gio").forEach(function (nut) {
    nut.addEventListener("click", function () {
      const id = parseInt(nut.dataset.id);
      /* Ở trang chi tiết có ô số lượng; trang khác mặc định 1 */
      const oSoLuong = document.getElementById("so-luong");
      const soLuong =
        oSoLuong && nut.classList.contains("nut-lon")
          ? parseInt(oSoLuong.textContent)
          : 1;
      themVaoGio(id, soLuong);
      const sp = SAN_PHAM.find(function (s) { return s.id === id; });
      thongBao("✅ Đã thêm " + soLuong + " × " + sp.ten + " vào giỏ");
    });
  });
}

/* ---------- Vẽ lưới sản phẩm trang chủ ---------- */
function veSanPham() {
  const luoi = document.getElementById("luoi-san-pham");
  if (!luoi) return;

  const kg = KHOANG_GIA.find(function (k) { return k.id === khoangGiaDangChon; });

  const ds = SAN_PHAM.filter(function (sp) {
    const dungDanhMuc =
      danhMucDangChon === "tat-ca" || sp.danhMuc === danhMucDangChon;
    const dungTuKhoa =
      tuKhoaTimKiem === "" ||
      sp.ten.toLowerCase().includes(tuKhoaTimKiem.toLowerCase());
    const dungGia = sp.gia >= kg.tu && sp.gia < kg.den;
    return dungDanhMuc && dungTuKhoa && dungGia;
  });

  if (ds.length === 0) {
    luoi.innerHTML =
      '<p class="khong-co-sp">Không tìm thấy sản phẩm phù hợp. ' +
      "Hãy thử từ khóa khác hoặc bỏ bớt bộ lọc.</p>";
    return;
  }

  luoi.innerHTML = ds.map(theSanPhamHTML).join("");
  ganNutThemGio(luoi);
}

/* ---------- Ô tìm kiếm ---------- */
function ganTimKiem() {
  const o = document.getElementById("o-tim-kiem");
  if (!o) return;
  o.addEventListener("input", function () {
    tuKhoaTimKiem = o.value.trim();
    veSanPham();
  });
}

/* ---------- Menu trên điện thoại (nút 3 gạch) ---------- */
function ganMenuMobile() {
  const nut = document.getElementById("nut-menu");
  const menu = document.getElementById("menu-chinh");
  if (!nut || !menu) return;
  nut.addEventListener("click", function () {
    menu.classList.toggle("mo");
  });
}

/* ============================================================
   TRANG CHI TIẾT SẢN PHẨM (product.html)
   ============================================================ */
function veChiTietSanPham() {
  const khung = document.getElementById("chi-tiet-sp");
  if (!khung) return;

  const id = parseInt(new URLSearchParams(window.location.search).get("id"));
  const sp = SAN_PHAM.find(function (s) { return s.id === id; });

  if (!sp) {
    khung.innerHTML =
      '<p class="khong-co-sp">Không tìm thấy sản phẩm. ' +
      '<a href="index.html">Quay về trang chủ</a></p>';
    return;
  }

  document.title = sp.ten + " – " + CAU_HINH.tenCuaHang;
  const dm = DANH_MUC.find(function (d) { return d.id === sp.danhMuc; });
  const anhHtml = sp.anh
    ? '<img src="' + sp.anh + '" alt="' + sp.ten + '">'
    : '<span class="icon-sp-lon">' + sp.icon + "</span>";

  khung.innerHTML =
    '<div class="chi-tiet">' +
    '  <div class="chi-tiet-anh">' + anhHtml + "</div>" +
    '  <div class="chi-tiet-thong-tin">' +
    '    <p class="nhan-danh-muc">' + (dm ? dm.icon + " " + dm.ten : "") + "</p>" +
    "    <h1>" + sp.ten + "</h1>" +
    '    <p class="gia-vnd gia-lon">' + dinhDangVND(sp.gia) + "</p>" +
    '    <p class="gia-lak">≈ ' + dinhDangLAK(sp.gia) + "</p>" +
    '    <p class="mo-ta">' + sp.moTa + "</p>" +
    '    <div class="chon-so-luong">' +
    '      <span>Số lượng:</span>' +
    '      <button id="nut-giam" class="nut-so-luong">−</button>' +
    '      <span id="so-luong">1</span>' +
    '      <button id="nut-tang" class="nut-so-luong">+</button>' +
    "    </div>" +
    '    <button class="nut-them-gio nut-lon" data-id="' + sp.id + '">' +
    "      🛒 Thêm vào giỏ hàng</button>" +
    "  </div>" +
    "</div>";

  let soLuong = 1;
  const oSoLuong = document.getElementById("so-luong");
  document.getElementById("nut-tang").addEventListener("click", function () {
    soLuong++;
    oSoLuong.textContent = soLuong;
  });
  document.getElementById("nut-giam").addEventListener("click", function () {
    if (soLuong > 1) soLuong--;
    oSoLuong.textContent = soLuong;
  });

  ganNutThemGio(khung);

  const lienQuan = SAN_PHAM.filter(function (s) {
    return s.danhMuc === sp.danhMuc && s.id !== sp.id;
  }).slice(0, 4);
  if (lienQuan.length > 0) {
    document.getElementById("khung-lien-quan").style.display = "block";
    const luoi = document.getElementById("luoi-lien-quan");
    luoi.innerHTML = lienQuan.map(theSanPhamHTML).join("");
    ganNutThemGio(luoi);
  }
}

/* ============================================================
   TRANG GIỎ HÀNG (cart.html)
   ============================================================ */
function veGioHang() {
  const khung = document.getElementById("khung-gio-hang");
  if (!khung) return;

  const gio = layGio();

  if (gio.length === 0) {
    khung.innerHTML =
      '<div class="gio-trong">' +
      '  <p class="icon-gio-trong">🛒</p>' +
      "  <p>Giỏ hàng của bạn đang trống.</p>" +
      '  <a href="index.html" class="nut-banner nut-xanh">← Tiếp tục mua sắm</a>' +
      "</div>";
    return;
  }

  let html = "";
  gio.forEach(function (d) {
    const sp = SAN_PHAM.find(function (s) { return s.id === d.id; });
    if (!sp) return;
    const anhHtml = sp.anh
      ? '<img src="' + sp.anh + '" alt="' + sp.ten + '">'
      : '<span class="icon-dong-gio">' + sp.icon + "</span>";
    html +=
      '<div class="dong-gio">' +
      '  <a href="product.html?id=' + sp.id + '" class="anh-dong-gio">' + anhHtml + "</a>" +
      '  <div class="thong-tin-dong-gio">' +
      '    <a href="product.html?id=' + sp.id + '" class="ten-dong-gio">' + sp.ten + "</a>" +
      '    <p class="gia-vnd">' + dinhDangVND(sp.gia) + '</p>' +
      '    <p class="gia-lak">≈ ' + dinhDangLAK(sp.gia) + "</p>" +
      "  </div>" +
      '  <div class="dieu-khien-dong-gio">' +
      '    <div class="chon-so-luong">' +
      '      <button class="nut-so-luong nut-giam-gio" data-id="' + sp.id + '">−</button>' +
      '      <span class="so-luong-gio">' + d.soLuong + "</span>" +
      '      <button class="nut-so-luong nut-tang-gio" data-id="' + sp.id + '">+</button>' +
      "    </div>" +
      '    <p class="thanh-tien">' + dinhDangVND(sp.gia * d.soLuong) + "</p>" +
      '    <button class="nut-xoa" data-id="' + sp.id + '">🗑 Xóa</button>' +
      "  </div>" +
      "</div>";
  });

  const tong = tongTienGio();
  html +=
    '<div class="tong-gio">' +
    '  <div class="dong-tong">' +
    "    <span>Tổng cộng (" + tongSoLuongGio() + " sản phẩm):</span>" +
    '    <span class="gia-vnd gia-lon">' + dinhDangVND(tong) + "</span>" +
    "  </div>" +
    '  <p class="gia-lak tong-lak">≈ ' + dinhDangLAK(tong) + "</p>" +
    '  <a href="checkout.html" class="nut-thanh-toan">Tiến hành thanh toán →</a>' +
    '  <a href="index.html" class="tiep-tuc-mua">← Tiếp tục mua sắm</a>' +
    "</div>";

  khung.innerHTML = html;

  /* Gắn nút tăng / giảm / xóa */
  khung.querySelectorAll(".nut-tang-gio").forEach(function (nut) {
    nut.addEventListener("click", function () {
      doiSoLuong(parseInt(nut.dataset.id), 1);
      veGioHang();
    });
  });
  khung.querySelectorAll(".nut-giam-gio").forEach(function (nut) {
    nut.addEventListener("click", function () {
      doiSoLuong(parseInt(nut.dataset.id), -1);
      veGioHang();
    });
  });
  khung.querySelectorAll(".nut-xoa").forEach(function (nut) {
    nut.addEventListener("click", function () {
      const sp = SAN_PHAM.find(function (s) { return s.id === parseInt(nut.dataset.id); });
      if (confirm("Xóa \"" + (sp ? sp.ten : "sản phẩm") + "\" khỏi giỏ hàng?")) {
        xoaKhoiGio(parseInt(nut.dataset.id));
        veGioHang();
      }
    });
  });

}

/* ============================================================
   TRANG THANH TOÁN (checkout.html)
   ============================================================ */

/* Soạn nội dung đơn hàng thành văn bản gửi Zalo */
function soanNoiDungDon(ten, sdt, diaChi, ghiChu, cachTT) {
  const gio = layGio();
  const maDon =
    "DH" +
    new Date().toISOString().slice(2, 10).replace(/-/g, "") +
    "-" +
    String(Math.floor(Math.random() * 900) + 100);
  let dong = [];
  dong.push("🛒 ĐƠN HÀNG MỚI – " + CAU_HINH.tenCuaHang);
  dong.push("Mã đơn: " + maDon);
  dong.push("Khách: " + ten);
  dong.push("SĐT: " + sdt);
  dong.push("Địa chỉ: " + diaChi);
  if (ghiChu) dong.push("Ghi chú: " + ghiChu);
  dong.push("--------------------");
  let stt = 1;
  gio.forEach(function (d) {
    const sp = SAN_PHAM.find(function (s) { return s.id === d.id; });
    if (!sp) return;
    dong.push(
      stt + ". " + sp.ten + "  x" + d.soLuong +
      " = " + dinhDangVND(sp.gia * d.soLuong)
    );
    stt++;
  });
  dong.push("--------------------");
  const tong = tongTienGio();
  dong.push("TỔNG: " + dinhDangVND(tong) + " (≈ " + dinhDangLAK(tong) + ")");
  dong.push(
    "Thanh toán: " +
    (cachTT === "qr" ? "Chuyển khoản qua QR" : "Tiền mặt khi nhận hàng")
  );
  return dong.join("\n");
}

/* Sao chép văn bản (có phương án dự phòng cho mọi trình duyệt) */
function saoChep(vanBan) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(vanBan).catch(function () {});
  }
  const o = document.createElement("textarea");
  o.value = vanBan;
  o.style.position = "fixed";
  o.style.opacity = "0";
  document.body.appendChild(o);
  o.select();
  try { document.execCommand("copy"); } catch (e) {}
  o.remove();
}

function veThanhToan() {
  const form = document.getElementById("form-thanh-toan");
  if (!form) return;

  const gio = layGio();
  const khuDatHang = document.getElementById("khu-dat-hang");

  /* Giỏ trống thì không cho thanh toán */
  if (gio.length === 0) {
    khuDatHang.innerHTML =
      '<div class="gio-trong">' +
      '  <p class="icon-gio-trong">🛒</p>' +
      "  <p>Giỏ hàng đang trống, chưa thể thanh toán.</p>" +
      '  <a href="index.html" class="nut-banner nut-xanh">← Chọn sản phẩm</a>' +
      "</div>";
    return;
  }

  /* Vẽ tóm tắt đơn hàng */
  const tomTat = document.getElementById("tom-tat-don");
  let html = "";
  gio.forEach(function (d) {
    const sp = SAN_PHAM.find(function (s) { return s.id === d.id; });
    if (!sp) return;
    html +=
      '<div class="dong-tom-tat">' +
      "  <span>" + sp.ten + " × " + d.soLuong + "</span>" +
      "  <span>" + dinhDangVND(sp.gia * d.soLuong) + "</span>" +
      "</div>";
  });
  const tong = tongTienGio();
  html +=
    '<div class="dong-tom-tat dong-tong-tt">' +
    "  <span>TỔNG CỘNG</span>" +
    '  <span class="gia-vnd">' + dinhDangVND(tong) + "</span>" +
    "</div>" +
    '<p class="gia-lak tong-lak">≈ ' + dinhDangLAK(tong) + "</p>";
  tomTat.innerHTML = html;

  /* Xử lý khi bấm "Xác nhận đặt hàng" */
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const ten = document.getElementById("kh-ten").value.trim();
    const sdt = document.getElementById("kh-sdt").value.trim();
    const diaChi = document.getElementById("kh-diachi").value.trim();
    const ghiChu = document.getElementById("kh-ghichu").value.trim();
    const cachTT = document.querySelector('input[name="cach-tt"]:checked').value;
    const baoLoi = document.getElementById("bao-loi");

    /* Kiểm tra dữ liệu bắt buộc */
    if (!ten) { baoLoi.textContent = "⚠️ Vui lòng nhập họ tên."; return; }
    if (!sdt) { baoLoi.textContent = "⚠️ Vui lòng nhập số điện thoại."; return; }
    if (!/^[0-9+\s.-]{8,15}$/.test(sdt)) {
      baoLoi.textContent = "⚠️ Số điện thoại không hợp lệ (8–15 chữ số).";
      return;
    }
    if (!diaChi) { baoLoi.textContent = "⚠️ Vui lòng nhập địa chỉ nhận hàng."; return; }
    baoLoi.textContent = "";

    /* Soạn đơn, sao chép, xóa giỏ, hiện màn hình thành công */
    const noiDung = soanNoiDungDon(ten, sdt, diaChi, ghiChu, cachTT);
    saoChep(noiDung);
    luuGio([]); /* xóa giỏ sau khi đặt */

    khuDatHang.style.display = "none";
    const khuHoanTat = document.getElementById("khu-hoan-tat");
    khuHoanTat.style.display = "block";
    document.getElementById("vung-don").value = noiDung;
    document.getElementById("nut-mo-zalo").href =
      "https://zalo.me/" + CAU_HINH.soZaloNhanDon;
    document.getElementById("nut-chep-lai").addEventListener("click", function () {
      saoChep(noiDung);
      thongBao("📋 Đã sao chép nội dung đơn");
    });
    window.scrollTo(0, 0);
  });
}

/* ---------- Khởi động khi trang tải xong ---------- */
document.addEventListener("DOMContentLoaded", function () {
  dienThongTinShop();
  veDanhMuc();
  veLocGia();
  veSanPham();
  ganTimKiem();
  ganMenuMobile();
  veChiTietSanPham();
  veGioHang();
  veThanhToan();
  capNhatDemGio();
  if (document.getElementById("luoi-san-pham")) {
    document.title = CAU_HINH.tenCuaHang;
  }
});
