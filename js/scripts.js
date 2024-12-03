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
  const description = document.getElementById("product-description");
  const button = document.getElementById("toggle-description");

  if (description.classList.contains("expanded")) {
    description.classList.remove("expanded");
    button.textContent = "Xem thêm"; // Chuyển lại thành "Xem thêm"
  } else {
    description.classList.add("expanded");
    button.textContent = "Thu gọn"; // Thay đổi thành "Thu gọn"
  }
}

const productList = document.querySelector(".related-products-list");
const scrollLeft = document.querySelector(".scroll-left");
const scrollRight = document.querySelector(".scroll-right");

// Clone sản phẩm đầu và cuối
const firstProduct = productList.firstElementChild.cloneNode(true);
const lastProduct = productList.lastElementChild.cloneNode(true);
productList.appendChild(firstProduct);
productList.insertBefore(lastProduct, productList.firstElementChild);

let currentIndex = 1; // Bắt đầu từ phần tử thực đầu tiên
const productWidth = productList.firstElementChild.offsetWidth + 20; // 20 là margin

// Đặt vị trí ban đầu
productList.style.transform = `translateX(-${currentIndex * productWidth}px)`;

// Hàm thay đổi vị trí
const updatePosition = (index) => {
    productList.style.transition = "transform 0.5s ease-in-out";
    productList.style.transform = `translateX(-${index * productWidth}px)`;
};

// Hàm kiểm tra tuần hoàn
const checkLoop = () => {
    if (currentIndex === 0) {
        setTimeout(() => {
            productList.style.transition = "none";
            currentIndex = productList.children.length - 2;
            productList.style.transform = `translateX(-${currentIndex * productWidth}px)`;
        }, 500);
    } else if (currentIndex === productList.children.length - 1) {
        setTimeout(() => {
            productList.style.transition = "none";
            currentIndex = 1;
            productList.style.transform = `translateX(-${currentIndex * productWidth}px)`;
        }, 500);
    }
};

// Hàm cuộn trái
scrollLeft.addEventListener("click", () => {
    currentIndex--;
    updatePosition(currentIndex);
    checkLoop();
});

// Hàm cuộn phải
scrollRight.addEventListener("click", () => {
    currentIndex++;
    updatePosition(currentIndex);
    checkLoop();
});


//
function updateItemsPerPage() {
  const itemsPerPage = parseInt(document.getElementById("itemsPerPage").value);

  // Lấy tên file hiện tại (không bao gồm phần mở rộng .html)
  let currentPage = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

  // Kiểm tra số lượng và chuyển hướng
  if (itemsPerPage === 12) {
    // Chuyển đến trang có 12 sản phẩm (file "4", ví dụ: me2 -> me4)
    if (
      currentPage.startsWith("me") ||
      currentPage.startsWith("ban") ||
      currentPage.startsWith("re") ||
      currentPage.startsWith("sang") ||
      currentPage.startsWith("ny")
    ) {
      const baseName = currentPage.replace(/[1-3]$/, ""); // Xóa số 1, 2 hoặc 3 ở cuối
      window.location.href = `${baseName}4.html`;
    } else {
      console.error(
        "File hiện tại không đúng định dạng (ví dụ: me1, ban2, re3)."
      );
    }
  } else if (itemsPerPage === 4) {
    // Chuyển về các trang 4 sản phẩm (file "1", "2", "3", tùy theo logic của bạn)
    if (currentPage.endsWith("4")) {
      const baseName = currentPage.replace("4", "1"); // Quay về trang đầu tiên (ví dụ: me4 -> me1)
      window.location.href = `${baseName}.html`;
    } else {
      console.error("File hiện tại không hỗ trợ quay về trang 4 sản phẩm.");
    }
  }
}
