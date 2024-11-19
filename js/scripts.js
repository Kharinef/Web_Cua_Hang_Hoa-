<p>

// === PHẦN 1: Xử lý Carousel (Trình chiếu ảnh) ===
function initCarousel() {
    let carousel = document.querySelector('#product-img-carousel');
    if (carousel) {
        new bootstrap.Carousel(carousel, {
            interval: 3000, // Tự động chuyển slide sau 3 giây
            pause: 'hover', // Dừng khi di chuột qua
        });
    }
}

// === PHẦN 2: Xử lý nút tăng/giảm số lượng sản phẩm ===
function initQuantityButtons() {
    const qtyInput = document.querySelector('#qty');
    const qtyMinus = document.querySelector('.qtyminus');
    const qtyPlus = document.querySelector('.qtyplus');

    if (qtyInput && qtyMinus && qtyPlus) {
        qtyMinus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) qtyInput.value = currentValue - 1;
        });

        qtyPlus.addEventListener('click', () => {
            let currentValue = parseInt(qtyInput.value);
            if (currentValue < 20) qtyInput.value = currentValue + 1;
        });
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

</p>