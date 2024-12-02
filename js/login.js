// Kiểm tra trạng thái đăng nhập của người dùng khi trang được tải lại
window.onload = function() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const accountLink = document.getElementById('accountLink');
    
    if (userInfo) {
        accountLink.textContent = 'Tài khoản'; // Đổi liên kết thành "Thông tin tài khoản"
    } else {
        accountLink.textContent = 'Tài khoản'; // Nếu chưa đăng nhập, hiển thị "Tài khoản"
    }
};

// Hiển thị popup đăng nhập
function showLoginPopup() {
    document.getElementById('loginPopup').style.display = 'flex';
    closePopup('signupPopup'); // Đóng popup đăng ký nếu đang mở
    closePopup('accountPopup'); // Đảm bảo popup tài khoản bị ẩn khi mở popup đăng nhập
}

// Hiển thị popup thông tin tài khoản
function showAccountPopup() {
    const accountPopup = document.getElementById('accountPopup');
    const accountDetails = document.getElementById('accountDetails');

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const accountLink = document.getElementById('accountLink');

    if (userInfo) {
        // Hiển thị thông tin tài khoản
        accountDetails.innerHTML = `
            <p><strong>Họ tên:</strong> ${userInfo.name}</p>
            <p><strong>Email:</strong> ${userInfo.email}</p>
            <p><strong>Số điện thoại:</strong> ${userInfo.phone}</p>
            <p><strong>Tên đăng nhập:</strong> ${userInfo.username}</p>
        `;
        accountPopup.style.display = 'flex'; // Hiển thị popup thông tin tài khoản
        accountLink.textContent = 'Tài khoản'; // Cập nhật liên kết thành "Tài khoản"
    } else {
        alert('Bạn chưa đăng nhập!');
        closePopup('accountPopup'); // Ẩn popup tài khoản nếu chưa đăng nhập
        showLoginPopup(); // Hiển thị popup đăng nhập
    }
}

// Đăng nhập
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngừng hành động mặc định (không gửi form)
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || []; // Lấy danh sách người dùng từ localStorage

    const account = users.find(user => user.username === username && user.password === password);
    if (account) {
        alert('Đăng nhập thành công!');
        localStorage.setItem('userInfo', JSON.stringify(account)); // Lưu thông tin người dùng vào localStorage
        closePopup('loginPopup');
        showAccountPopup(); // Hiển thị popup thông tin tài khoản
        document.getElementById('accountLink').textContent = 'Tài khoản'; // Cập nhật lại liên kết tài khoản
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
});

// Đăng ký
function saveAccountData() {
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordError = document.getElementById('passwordError');

    // Kiểm tra tên khách hàng (không chứa số)
    const nameRegex = /^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+(\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$/;
    if (!nameRegex.test(name)) {
        alert("Tên khách hàng không được chứa số.");
        return false;
    }

    // Kiểm tra số điện thoại (bắt đầu bằng số 0 và có 10 số)
    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số.");
        return false;
    }

    // Kiểm tra mật khẩu có ít nhất 1 ký tự đặc biệt và 1 chữ cái in hoa
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt và 1 chữ cái in hoa.';
        return false;
    }

    // Kiểm tra mật khẩu nhập lại có trùng với mật khẩu
    if (password !== confirmPassword) {
        passwordError.textContent = 'Mật khẩu nhập lại không khớp.';
        return false;
    }

    // Xóa thông báo lỗi nếu hợp lệ
    passwordError.textContent = '';

    // Lưu thông tin tài khoản vào localStorage
    const userAccount = { name, username, email, phone, password };
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Kiểm tra xem tên đăng nhập đã tồn tại chưa
    if (users.some(user => user.username === username)) {
        alert("Tên đăng nhập đã tồn tại.");
        return false;
    }

    users.push(userAccount);
    localStorage.setItem('users', JSON.stringify(users)); // Lưu danh sách người dùng
    localStorage.setItem('userInfo', JSON.stringify(userAccount)); // Lưu thông tin người dùng đăng ký

    alert("Đăng ký thành công!");
    closePopup('signupPopup');
    showAccountPopup(); // Hiển thị popup thông tin tài khoản
    document.getElementById('accountLink').textContent = 'Tài khoản'; // Cập nhật liên kết tài khoản
    return false; // Ngăn chặn form gửi lại và tải lại trang
}

// Đăng xuất
function logout() {
    localStorage.removeItem('userInfo'); // Xóa thông tin người dùng
    closePopup('accountPopup');
    alert('Bạn đã đăng xuất thành công!');
    document.getElementById('accountLink').textContent = 'Tài khoản'; // Cập nhật lại liên kết "Tài khoản"
    showLoginPopup(); // Quay lại popup đăng nhập khi đăng xuất
}

// Đóng popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}
