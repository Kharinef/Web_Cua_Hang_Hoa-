// Hàm mở popup
function openPopup() {
    document.getElementById('adminPopup').style.display = 'flex';
}

// Hàm đóng popup
function closePopup() {
    document.getElementById('adminPopup').style.display = 'none';
}

// Hàm đăng xuất
function logout() {
    alert("Đã đăng xuất!");
    window.location.href = '../admin/admin.html'; // Chuyển đến trang đăng nhập
}





// Function to load users from localStorage and display them in the table
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userTableBody = document.getElementById('userTableBody');
    userTableBody.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.status}</td>
            <td>
                <button class="btn-primary" onclick="toggleUserStatus(${index})">${user.status === 'Active' ? 'Khóa' : 'Mở khóa'}</button>
                <button class="btn-primary" onclick="showAddUserPopup(${index})">Chỉnh Sửa</button>
                <button class="btn-primary" onclick="deleteProduct(${index})">Xóa</button>
            </td>
        `;
        userTableBody.appendChild(row);
    });
}

// Function to toggle (lock/unlock) a user status
function toggleUserStatus(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users[index].status = users[index].status === 'Active' ? 'Locked' : 'Active';
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Function to delete a user
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}




// Function to show a popup for adding or editing a user
function showAddUserPopup(index = null) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEditing = index !== null;

    const user = isEditing ? users[index] : { username: '', name: '', email: '' };

    let username, name, email;

    // Validate and prompt for username
    do {
        username = prompt('Nhập tên đăng nhập:', user.username);
        if (!username) {
            alert('Tên đăng nhập không được để trống!');
        } else if (!isEditing && users.some(user => user.username === username)) {
            alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
            username = null; // Reset để buộc nhập lại
        }
    } while (!username);

    // Validate and prompt for name
    do {
        name = prompt('Nhập họ và tên:', user.name);
        const nameRegex = /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/;
        if (!name) {
            alert('Họ và tên không được để trống!');
        } else if (!nameRegex.test(name)) {
            alert('Họ và tên không hợp lệ. Vui lòng không chứa số hoặc ký tự đặc biệt.');
            name = null; // Reset để buộc nhập lại
        }
    } while (!name);

    // Validate and prompt for email
    do {
        email = prompt('Nhập email:', user.email);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert('Email không được để trống!');
        } else if (!emailRegex.test(email)) {
            alert('Email không hợp lệ. Vui lòng nhập lại.');
            email = null; // Reset để buộc nhập lại
        } else if (!isEditing && users.some(user => user.email === email)) {
            alert('Email đã tồn tại. Vui lòng sử dụng email khác.');
            email = null; // Reset để buộc nhập lại
        }
    } while (!email);

    // Set status to 'Active' by default
    const status = 'Active';

    const newUser = { username, name, email, status };

    if (isEditing) {
        users[index] = newUser; // Update existing user
    } else {
        users.push(newUser); // Add new user
    }

    localStorage.setItem('users', JSON.stringify(users));
    loadUsers();
}

// Initial load of users when the page is loaded
document.addEventListener('DOMContentLoaded', loadUsers);








//
// Hàm để lưu sản phẩm vào localStorage
function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

// Hàm để tải sản phẩm từ localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productTableBody = document.getElementById('productTableBody');
    productTableBody.innerHTML = ''; // Xóa bảng cũ

    products.forEach((product, index) => {
        const row = document.createElement('tr');

        const cellGiftFor = document.createElement('td');
        const cellName = document.createElement('td');
        const cellPrice = document.createElement('td');
        const cellImage = document.createElement('td');
        const cellActions = document.createElement('td');

        cellGiftFor.textContent = product.giftFor;
        cellName.textContent = product.name;
        cellPrice.textContent = product.price;  // Đã định dạng sẵn
        cellImage.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;">`;

        cellActions.innerHTML = `
            <button class="btn-primary" onclick="openEditModal(${index})">Chỉnh Sửa</button>
            <button class="btn-danger" onclick="deleteProduct(${index})">Xóa</button>
        `;

        row.appendChild(cellGiftFor);
        row.appendChild(cellName);
        row.appendChild(cellPrice);
        row.appendChild(cellImage);
        row.appendChild(cellActions);

        productTableBody.appendChild(row);
    });
}

// Hàm định dạng giá
function formatPrice(price) {
    return parseFloat(price).toLocaleString('en-US') + ' VND';
}

// Hàm để thêm hoặc cập nhật sản phẩm
function saveProductToLocalStorage(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const formattedPrice = formatPrice(price);  // Định dạng giá
    const image = document.getElementById('productImage').files[0]
        ? URL.createObjectURL(document.getElementById('productImage').files[0])
        : '';
    const giftFor = document.getElementById('category').value;
    const productId = document.getElementById('productId').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    if (productId) {
        // Cập nhật sản phẩm hiện tại
        const index = parseInt(productId);
        products[index] = { id: index, name, price: formattedPrice, image, giftFor };
    } else {
        // Thêm sản phẩm mới
        const newProduct = { id: products.length, name, price: formattedPrice, image, giftFor };
        products.push(newProduct);
    }

    saveProducts(products);
    loadProducts();
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = ''; // Reset form
}

// Hàm mở modal để chỉnh sửa sản phẩm
function openEditModal(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products[index];

    if (product) {
        document.getElementById('modalProductId').value = index;
        document.getElementById('modalProductName').value = product.name;
        document.getElementById('modalProductPrice').value = product.price.replace(/[^0-9]/g, '');  // Loại bỏ ký tự không phải là số
        document.getElementById('modalCategory').value = product.giftFor;
        document.getElementById('modalProductImage').setAttribute('data-image', product.image);

        document.getElementById('modalOverlay').classList.add('open');
        document.getElementById('editProductModal').classList.add('open');
    }
}

// Hàm đóng modal
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.getElementById('editProductModal').classList.remove('open');
}

// Hàm lưu sản phẩm đã chỉnh sửa vào localStorage
function saveProductEditToLocalStorage(event) {
    event.preventDefault();

    const name = document.getElementById('modalProductName').value;
    const price = document.getElementById('modalProductPrice').value;
    const formattedPrice = formatPrice(price);  // Định dạng giá
    const image = document.getElementById('modalProductImage').files[0]
        ? URL.createObjectURL(document.getElementById('modalProductImage').files[0])
        : document.getElementById('modalProductImage').getAttribute('data-image');
    const giftFor = document.getElementById('modalCategory').value;
    const productId = document.getElementById('modalProductId').value;

    const products = JSON.parse(localStorage.getItem('products')) || [];

    const index = parseInt(productId);
    products[index] = { id: index, name, price: formattedPrice, image, giftFor };

    saveProducts(products);
    loadProducts();
    closeModal();
}

// Hàm để xóa sản phẩm
function deleteProduct(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.splice(index, 1); // Xóa sản phẩm tại chỉ số index
        saveProducts(products);
        loadProducts();
    }
}

// Chạy hàm khi trang được tải
window.onload = function() {
    
    loadProducts();

    // Lắng nghe sự kiện submit form
    document.getElementById('productForm').addEventListener('submit', saveProductToLocalStorage);
    document.getElementById('editProductForm').addEventListener('submit', saveProductEditToLocalStorage);
};

