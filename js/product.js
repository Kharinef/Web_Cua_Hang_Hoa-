// === Xử lý tìm kiếm ===
function performSearch() {
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
        window.location.href = `/search?query=${encodeURIComponent(query)}`;
    } else {
        alert("Vui lòng nhập từ khóa để tìm kiếm.");
    }
}

// === Hiển thị gợi ý tìm kiếm ===
function showSuggestions() {
    const suggestions = document.getElementById("suggestions");
    const query = document.getElementById("searchInput").value.trim().toLowerCase();

    // Ví dụ: danh sách gợi ý tĩnh
    const sampleSuggestions = ["Hoa Hồng", "Hoa Cưới", "Hoa Sinh Nhật"];
    const filteredSuggestions = sampleSuggestions.filter(item =>
        item.toLowerCase().includes(query)
    );

    if (query && filteredSuggestions.length) {
        suggestions.innerHTML = filteredSuggestions
            .map(suggestion => `<div class="suggestion-item">${suggestion}</div>`)
            .join("");
        suggestions.style.display = 'block'; // Hiển thị gợi ý
    } else {
        suggestions.style.display = 'none'; // Ẩn gợi ý nếu không có kết quả
    }
}

// === Tăng/giảm số lượng sản phẩm ===
function initQuantityButtons() {
    const qtyInput = document.getElementById("qty");
    const qtyMinus = document.querySelector(".qtyminus");
    const qtyPlus = document.querySelector(".qtyplus");

    // Tăng số lượng
    qtyPlus.addEventListener("click", () => {
        let currentValue = parseInt(qtyInput.value);
        if (currentValue < 20) {
            qtyInput.value = currentValue + 1;
        }
    });

    // Giảm số lượng
    qtyMinus.addEventListener("click", () => {
        let currentValue = parseInt(qtyInput.value);
        if (currentValue > 1) {
            qtyInput.value = currentValue - 1;
        }
    });
}

// === Xử lý đặt hoa ===
function initOrderButton() {
    const orderButton = document.querySelector(".btn-orders");
    const qtyInput = document.getElementById("qty");
    const productName = document.querySelector(".product-info h3").textContent;

    orderButton.addEventListener("click", () => {
        const qty = parseInt(qtyInput.value);
        if (qty > 0) {
            // Thêm sản phẩm vào giỏ hàng (localStorage)
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProductIndex = cart.findIndex(item => item.name === productName);

            if (existingProductIndex > -1) {
                // Cập nhật số lượng nếu sản phẩm đã có trong giỏ
                cart[existingProductIndex].qty += qty;
            } else {
                // Thêm mới sản phẩm vào giỏ
                cart.push({
                    name: productName,
                    qty,
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`Bạn đã thêm ${qty} sản phẩm "${productName}" vào giỏ hàng.`);
        } else {
            alert("Vui lòng nhập số lượng hợp lệ.");
        }
    });
}

// === Khởi tạo các chức năng khi DOM sẵn sàng ===
document.addEventListener("DOMContentLoaded", () => {
    initQuantityButtons(); // Tăng/giảm số lượng
    initOrderButton();     // Đặt hoa
});
