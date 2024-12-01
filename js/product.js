
// <>Tăng số lượng
document.querySelector(".qtyplus").addEventListener("click", function () {
  var qtyInput = document.getElementById("qty");
  var currentValue = parseInt(qtyInput.value);
  if (currentValue < 20) {
    qtyInput.value = currentValue + 1; // Tăng số lượng
  }
});

// Giảm số lượng
document.querySelector(".qtyminus").addEventListener("click", function () {
  var qtyInput = document.getElementById("qty");
  var currentValue = parseInt(qtyInput.value);
  if (currentValue > 1) {
    qtyInput.value = currentValue - 1; // Giảm số lượng
  }
});

//<> Chức năng Thêm vào giỏ hàng khi nhấn nút "Đặt hoa"
document.getElementById("add-to-cart").addEventListener("click", function () {
  // Lấy thông tin sản phẩm
  const product = {
    id: "HT001", // Mã sản phẩm
    name: "Aurora", // Tên sản phẩm
    category: "Hoa cưới", // Danh mục sản phẩm
    price: 499000, // Giá sản phẩm (VND)
    image: "/images/hoa25.jpg", // Hình ảnh sản phẩm
    quantity: parseInt(document.getElementById("qty").value), // Số lượng sản phẩm
  };

  // Lấy giỏ hàng từ localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Kiểm tra nếu sản phẩm đã có trong giỏ hàng, nếu có thì tăng số lượng
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    cart.push(product);
  }

  // Lưu giỏ hàng vào localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Thông báo cho người dùng rằng sản phẩm đã được thêm vào giỏ hàng
  alert("Sản phẩm đã được thêm vào giỏ hàng!");

  // Tùy chỉnh: Đóng modal nếu cần (ví dụ: khi sản phẩm được thêm vào giỏ)
  $("#Modalcheck-user").modal("hide");
});

