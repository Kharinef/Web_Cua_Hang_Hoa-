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





// Function to show a popup for adding or editing a user
function showAddUserPopup(index = null) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEditing = index !== null;

    const user = isEditing ? users[index] : { username: '', name: '', email: '' };

    let username, name, email;

    // Hàm kiểm tra nếu người dùng nhấn hủy
    function promptWithCancel(message, defaultValue) {
        const input = prompt(message, defaultValue);
        return input === null ? 'cancel' : input; // Nếu nhấn Cancel, trả về 'cancel'
    }

    // Validate and prompt for username
    do {
        username = promptWithCancel('Nhập tên đăng nhập:', user.username);
        if (username === 'cancel') {
            return; // Nếu người dùng chọn Cancel, dừng lại
        }
        if (!username) {
            alert('Tên đăng nhập không được để trống!');
        } else if (!isEditing && users.some(user => user.username === username)) {
            alert('Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.');
            username = null; // Reset để buộc nhập lại
        }
    } while (!username);

    // Validate and prompt for name
    do {
        name = promptWithCancel('Nhập họ và tên:', user.name);
        if (name === 'cancel') {
            return; // Nếu người dùng chọn Cancel, dừng lại
        }
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
        email = promptWithCancel('Nhập email:', user.email);
        if (email === 'cancel') {
            return; // Nếu người dùng chọn Cancel, dừng lại
        }
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
        users[index] = newUser; // Cập nhật người dùng hiện tại
    } else {
        users.push(newUser); // Thêm người dùng mới
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
            <button class="btn-primary" onclick="deleteProduct(${index})">Xóa</button>
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







//
document.addEventListener('DOMContentLoaded', function () {
    const orders = [
        { id: 1, customer: 'Nguyễn Văn A', date: '2024-12-01', address: 'Hà Nội, Quận Ba Đình', status: 'new', details: 'order1.html' },
        { id: 2, customer: 'Trần Thị B', date: '2024-12-02', address: 'Hồ Chí Minh, Quận 1', status: 'confirmed', details: 'order2.html' },
        { id: 3, customer: 'Lê Minh C', date: '2024-12-03', address: 'Đà Nẵng, Quận Hải Châu', status: 'delivered', details: 'order3.html' },
        { id: 4, customer: 'Phan Thị D', date: '2024-12-04', address: 'Hà Nội, Quận Cầu Giấy', status: 'cancelled', details: 'order4.html' },
    ];

    // Hàm hiển thị tất cả đơn hàng
    function displayOrders(filteredOrders) {
        const tableBody = document.getElementById('orderTableBody');
        tableBody.innerHTML = '';  // Xóa hết các dòng hiện tại

        filteredOrders.forEach(order => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.date}</td>
                <td>${order.address}</td>
                <td>${getStatusText(order.status)}</td>
                <td>
                    <a href="${order.details}">Xem chi tiết</a>
                    <button onclick="updateOrderStatus(${order.id}, 'new')">Chưa xử lý</button>
                    <button onclick="updateOrderStatus(${order.id}, 'confirmed')">Đã xác nhận</button>
                    <button onclick="updateOrderStatus(${order.id}, 'delivered')">Đã giao</button>
                    <button onclick="updateOrderStatus(${order.id}, 'cancelled')">Đã hủy</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Hàm lấy tên trạng thái
    function getStatusText(status) {
        const statusMap = {
            new: 'Chưa xử lý',
            confirmed: 'Đã xác nhận',
            delivered: 'Đã giao',
            cancelled: 'Đã hủy'
        };
        return statusMap[status] || 'Không xác định';
    }

    // Cập nhật trạng thái đơn hàng
    function updateOrderStatus(orderId, newStatus) {
        const order = orders.find(order => order.id === orderId);
        if (order) {
            order.status = newStatus;
            filterOrders();  // Sau khi cập nhật trạng thái, lọc lại danh sách
        }
    }

    // Lọc đơn hàng theo thời gian và trạng thái
    function filterOrders() {
        const startDate = document.getElementById('filterStartDate').value;
        const endDate = document.getElementById('filterEndDate').value;
        const statusFilter = document.getElementById('filterStatus').value;

        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.date);
            const isDateInRange = (!startDate || orderDate >= new Date(startDate)) && (!endDate || orderDate <= new Date(endDate));
            const isStatusMatch = !statusFilter || order.status === statusFilter;
            return isDateInRange && isStatusMatch;
        });

        // Hiển thị đơn hàng đã lọc
        displayOrders(filteredOrders);
    }

    // Hàm sắp xếp đơn hàng theo địa chỉ (quận)
    function sortOrdersByAddress() {
        const sortedOrders = [...orders].sort((a, b) => {
            const addressA = a.address.split(',')[1];  // Lấy phần quận
            const addressB = b.address.split(',')[1];
            return addressA.localeCompare(addressB);
        });

        displayOrders(sortedOrders);
    }

    // Thêm sự kiện lọc khi thay đổi thông tin lọc
    document.getElementById('filterForm').addEventListener('submit', function (event) {
        event.preventDefault();  // Ngừng việc gửi form
        filterOrders();  // Lọc đơn hàng
    });

    // Sắp xếp đơn hàng theo địa chỉ khi cần
    document.getElementById('sortButton').addEventListener('click', function () {
        sortOrdersByAddress();
    });

    // Hiển thị tất cả đơn hàng khi mới tải trang
    displayOrders(orders);
});
