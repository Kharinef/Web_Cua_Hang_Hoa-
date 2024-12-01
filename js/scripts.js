// scripts.js

// Tìm kiếm sản phẩm
function performSearch() {
  const query = document.getElementById("searchInput").value;
  if (query.trim()) {
    window.location.href = `/search?query=${encodeURIComponent(query)}`;
  } else {
    alert("Vui lòng nhập từ khóa để tìm kiếm.");
  }
}

// Gợi ý sản phẩm (placeholder)
function showSuggestions() {
  const input = document.getElementById("searchInput").value;
  const suggestionsBox = document.getElementById("suggestions");

  // Hiển thị gợi ý (giả lập)
  if (input.trim()) {
    suggestionsBox.innerHTML = `<p>Gợi ý: ${input}</p>`;
  } else {
    suggestionsBox.innerHTML = "";
  }
}

// Placeholder: Gợi ý sản phẩm (có thể fetch từ API trong thực tế)
function loadRelatedProducts() {
  console.log("Gợi ý sản phẩm đã được tải.");
  // Thêm logic fetch dữ liệu nếu cần
}

document.addEventListener("DOMContentLoaded", loadRelatedProducts);

//read more
function toggleDescription() {
  var description = document.querySelector(".product-details-description");
  var button = description.querySelector(".read-more");

  if (description.classList.contains("expanded")) {
    description.classList.remove("expanded");
    button.textContent = "Xem thêm"; // Thay đổi chữ của nút thành "Xem thêm"
  } else {
    description.classList.add("expanded");
    button.textContent = "Thu gọn"; // Thay đổi chữ của nút thành "Thu gọn"
  }
}
