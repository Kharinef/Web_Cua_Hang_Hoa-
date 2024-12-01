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

// Chức năng cuộn ngang
const scrollContainer = document.querySelector('.related-products-list');
const scrollLeftButton = document.querySelector('.scroll-left');
const scrollRightButton = document.querySelector('.scroll-right');

// Tính toán số lượng sản phẩm hiển thị
const productWidth = 300; // Kích thước mỗi sản phẩm (bao gồm margin/padding)
const visibleProducts = 5; // Số sản phẩm hiển thị trong khung
let currentScroll = 0; // Vị trí cuộn hiện tại

scrollLeftButton.addEventListener('click', () => {
    if (currentScroll > 0) {
        currentScroll--;
        scrollContainer.style.transform = `translateX(-${currentScroll * productWidth}px)`;
    }
});

scrollRightButton.addEventListener('click', () => {
    const maxScroll = document.querySelectorAll('.product-card').length - visibleProducts;
    if (currentScroll < maxScroll) {
        currentScroll++;
        scrollContainer.style.transform = `translateX(-${currentScroll * productWidth}px)`;
    }
}

// === PHẦN 3: Hiển thị thông tin trong modal "Đặt hoa" ===
function initOrderModal() {
    const orderButton = document.querySelector('.btn-orders');
    const qtyInput = document.querySelector('#qty');
    const productName = document.querySelector('#product-name');
    const modalQty = document.querySelector('#modal-qty');

    if (orderButton && qtyInput && productName && modalQty) {
        orderButton.addEventListener('click', () => {
            modalQty.value = qtyInput.value;
            document.querySelector('#product-qty').textContent = qtyInput.value;
        });
    }
}

// === PHẦN 4: Xử lý nút "Xem thêm/Thu gọn" mô tả sản phẩm ===
function initReadMore() {
    const readMoreButton = document.querySelector('.read-more');
    const description = document.querySelector('.product-details-description p');

    if (readMoreButton && description) {
        readMoreButton.addEventListener('click', function () {
            if (description.style.display === 'block') {
                description.style.display = 'none';
                this.textContent = 'Xem thêm';
            } else {
                description.style.display = 'block';
                this.textContent = 'Thu gọn';
            }
        });
    }
}

// === PHẦN 5: Tính toán và hiển thị giảm giá ===
function calculateDiscount() {
    const priceNew = 250000; // Giá mới
    const priceOld = 380000; // Giá cũ
    const discountPercent = Math.round(((priceOld - priceNew) / priceOld) * 100);
    const priceElement = document.querySelector('.price');

    if (priceElement) {
        priceElement.innerHTML += ` (<span class="text-success">${discountPercent}% off</span>)`;
    }
}

// === PHẦN 6: Thêm sản phẩm vào giỏ hàng ===
function initAddToCart() {
    const orderButton = document.querySelector('.btn-orders');
    const qtyInput = document.querySelector('#qty');

    if (orderButton && qtyInput) {
        orderButton.addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let product = {
                id: 'HT001',
                name: 'Hoa Tươi',
                price: 250000,
                qty: parseInt(qtyInput.value),
            };
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
        });
    }
}

// === KHỞI TẠO TẤT CẢ CHỨC NĂNG ===
function initializePage() {
    initCarousel();           // Trình chiếu ảnh
    initQuantityButtons();    // Nút tăng/giảm số lượng
    initOrderModal();         // Xử lý modal "Đặt hoa"
    initReadMore();           // Nút "Xem thêm/Thu gọn"
    calculateDiscount();      // Hiển thị giảm giá
    initAddToCart();          // Thêm sản phẩm vào giỏ hàng
}

// Chạy tất cả chức năng khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', initializePage);
// === PHẦN 7: Sắp xếp sản phẩm theo giá ===
function initSortByPrice() {
    const sortBySelect = document.getElementById('sortBy');
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(document.querySelectorAll('.product-item'));

    if (sortBySelect && productGrid) {
        sortBySelect.addEventListener('change', () => {
            const sortBy = sortBySelect.value;

            products.sort((a, b) => {
                const priceA = parseInt(a.querySelector('.price').innerText.replace(/[^\d]/g, ''));
                const priceB = parseInt(b.querySelector('.price').innerText.replace(/[^\d]/g, ''));

                if (sortBy === 'priceLowToHigh') {
                    return priceA - priceB; // Sắp xếp tăng dần
                } else if (sortBy === 'priceHighToLow') {
                    return priceB - priceA; // Sắp xếp giảm dần
                }
                return 0; // Mặc định không thay đổi
            });

            // Cập nhật DOM với danh sách sản phẩm đã sắp xếp
            productGrid.innerHTML = '';
            products.forEach(product => productGrid.appendChild(product));
        });
    }
}

